import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RECIPE_DETAIL_ENDPOINT } from "../config/constants";
import CustomCard from "../components/shared/CustomCard";
import RecipeForm from "../components/shared/RecipeForm";

function DuplicateRecipe() {
  const { id } = useParams();
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

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <CustomCard title="Duplicate Recipe">
      <RecipeForm
        isEditing={false}
        isDuplicating={true}
        initialValues={recipe && buildFormikInitialValues(recipe)}
        recipeId={id}
      />
    </CustomCard>
  );
}

export default DuplicateRecipe;
