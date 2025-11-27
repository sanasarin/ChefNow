import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RECIPE_DETAIL_ENDPOINT } from "../config/constants";
import AccountContext from "../contexts/AccountContext";
import CustomCard from "../components/shared/CustomCard";
import RecipeForm from "../components/shared/RecipeForm";

// issue: if cuisine is not from constants it ll bug out

function EditRecipe() {
  const { id } = useParams();
  const { account } = useContext(AccountContext);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(RECIPE_DETAIL_ENDPOINT(id));
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const buildFormikInitialValues = (recipe) => {
    const formikInitialValues = {
      name: recipe.name,
      description: recipe.description,
      cuisines: recipe.cuisines.map((cuisine) => cuisine.name),
      serving_size: recipe.serving_size,
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      diets: recipe.diets.map((diet) => diet.name),
      ingredients: recipe.ingredients_list,
      steps: recipe.steps,
      images: recipe.images,
      videos: recipe.videos,
    };

    return formikInitialValues;
  };

  if (recipe && recipe.creator !== account.username) {
    return <div>You are not the creator of this recipe!</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <CustomCard title="Edit Recipe">
      <RecipeForm
        isEditing={true}
        initialValues={recipe && buildFormikInitialValues(recipe)}
        recipeId={id}
      />
    </CustomCard>
  );
}

export default EditRecipe;
