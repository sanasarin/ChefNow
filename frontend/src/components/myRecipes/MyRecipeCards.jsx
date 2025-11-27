import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import useAuthToken from "../../hooks/useAuthToken";
import RecipeCard from "../shared/RecipeCard";
import { Button } from "primereact/button";

function MyRecipeCards({ mode = "recipes" }) {
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({
    next: null,
    currPage: 1,
  });
  useAuthToken();

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + `account/${mode}/?page=${pagination.currPage}`
      );
      //setRecipes(response.data.results);

      if (pagination.currPage === 1) {
        setRecipes(response.data.results);
      } else {
        setRecipes((prev) => [...prev, ...response.data.results]);
      }

      setPagination((prev) => ({
        ...prev,
        next: response.data.next ? true : false, // need to check this
      }));
    } catch (error) {
      console.error(error);
    }
  }, [pagination.currPage, mode]);

  // load recipes on mount
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  /*
    load more recipes when user clicks on load more button
  */
  const loadMore = () => {
    if (!pagination.next) return;

    setPagination((prev) => ({
      ...prev,
      currPage: prev.currPage + 1,
    }));
  };

  // map the recipes and render them

  if (recipes.length === 0)
    return (
      <p style={{ color: "gray" }} className="mt-2">
        No recipes found
      </p>
    );

  return (
    <div className="my-recipes-cards">
      <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
        {recipes.map((recipe, idx) => (
          <div className="col" key={idx}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      {pagination.next && (
        <div className="d-flex mt-5 mb-4 justify-content-center">
          <Button
            className="my-recipes-load-more"
            icon="pi pi-angle-down"
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

export default MyRecipeCards;
