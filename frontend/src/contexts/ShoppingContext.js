import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import useAuthToken from "../hooks/useAuthToken";
import { API_BASE_URL, BASE_URL } from "../config/constants";

const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  useAuthToken();
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const hasMountedRef = useRef(false);
  const [ingredientsPagination, setIngredientsPagination] = useState({
    limit: 4, // initial limit
    size: 4, // increase by 4 each time
    hasMore: null,
  });

  // Load the Ingredients
  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}shopping_list/?limit=${ingredientsPagination.limit}`
      );

      // we update the ingredients
      setIngredients(response.data.results);

      // are there more things to load?
      if (response.data.next) {
        setIngredientsPagination((prev) => ({
          ...prev,
          hasMore: true,
          // limit: prev.limit + prev.size, // commented to prevent re-render duplicates
        }));
      } else {
        setIngredientsPagination((prev) => ({
          ...prev,
          hasMore: false,
        }));
      }

      setIngredientsLoading(false);
    } catch (error) {
      console.error(error);
      setIngredientsLoading(false);
    }
  };

  // load recipes
  const fetchShoppingList = async (cursor = null) => {
    try {
      setLoading(true);
      const response = await axios.get(
        cursor
          ? `${API_BASE_URL}shopping_list/recipes/?cursor=${cursor}`
          : `${API_BASE_URL}shopping_list/recipes/`
      );

      if (response.data.next) {
        setNextCursor(response.data.next.split("=")[1]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setShoppingItems((prevItems) => [...prevItems, ...response.data.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // UseEffect for Ingredients
  useEffect(() => {
    setIngredientsLoading(true);
    fetchIngredients();
    setIngredientsLoading(false);
  }, [shoppingItems, ingredientsPagination.limit]);

  // useEffect for Added Recipes
  useEffect(() => {
    if (!hasMountedRef.current) {
      fetchShoppingList();
      hasMountedRef.current = true;
    }
    setLoading(false);
  }, []);

  const loadMoreIngredients = () => {
    if (ingredientsPagination.hasMore) {
      setIngredientsPagination((prev) => ({
        ...prev,
        limit: prev.limit + prev.size,
      }));
      // fetchIngredients();
      // instead of manually invoking fetch
      // i added it as a dependency for useEffect
      // be cautious of this to watch out for
      // infinite loops
    }
  };

  const loadMoreRecipes = () => {
    fetchShoppingList(nextCursor);
  };

  const updateServingSize = async (recipeId, servingSize) => {
    setIngredientsLoading(true);
    try {
      await axios.put(`${API_BASE_URL}shopping_list/recipes/`, {
        recipe_id: recipeId,
        serving_size: servingSize,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const increaseServingSize = (recipeId) => {
    const updatedItems = shoppingItems.map((item) => {
      if (item.recipe.id === recipeId) {
        const updatedServingSize = item.serving_size + 1;
        updateServingSize(recipeId, updatedServingSize);
        return { ...item, serving_size: updatedServingSize };
      }
      return item;
    });

    setShoppingItems(updatedItems);
  };

  const decreaseServingSize = (recipeId) => {
    const updatedItems = shoppingItems.map((item) => {
      if (item.recipe.id === recipeId && item.serving_size > 0) {
        const updatedServingSize = item.serving_size - 1;
        updateServingSize(recipeId, updatedServingSize);
        return { ...item, serving_size: updatedServingSize };
      }
      return item;
    });

    setShoppingItems(updatedItems);
  };

  const deleteRecipeFromBackend = async (recipeId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}shopping_list/recipes/${recipeId}/`
      );

      console.log("Shopping item successfully deleted");
    } catch (error) {
      console.error("Error deleting shopping item", error);
    }
  };

  const deleteRecipe = (item) => {
    setShoppingItems(
      shoppingItems.filter((i) => i.recipe.id !== item.recipe.id)
    );

    deleteRecipeFromBackend(item.recipe.id);
  };

  return (
    <ShoppingContext.Provider
      value={{
        shoppingItems,
        loading,
        increaseServingSize,
        decreaseServingSize,
        ingredients,
        ingredientsLoading,
        deleteRecipe,
        hasMore,
        loadMoreRecipes,
        loadMoreIngredients,
        ingredientsHasMore: ingredientsPagination.hasMore,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
