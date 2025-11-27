import { useState, useEffect } from "react";
import CustomCard from "../shared/CustomCard";
import { RECIPE_DETAIL_ENDPOINT } from "../../config/constants";
import axios from "axios";
import DetailsHeader from "./DetailsHeader";
import DetailsIngredients from "./DetailsIngredients";
import DetailsSteps from "./DetailsSteps";
import DetailsShopping from "./DetailsShopping";
import "../../styles/recipe-details.css";
import { Link } from "react-router-dom";

function Details({ recipe_id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servingSize, setServingSize] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(RECIPE_DETAIL_ENDPOINT(recipe_id));
        setRecipe(response.data);
        console.log(response.data);
        setServingSize(response.data.active_serving_size);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe_id]);

  if (loading) {
    return <div>Loading...</div>; // Replace this with your preferred loading animation
  }

  return (
    <>
      <CustomCard bodyClass={`recipe-detail`}>
        {recipe && recipe.base_recipe && (
          <div
            class="alert alert-secondary alert-secondary-c alert-dismissible fade show"
            role="alert"
          >
            <strong>Note:</strong> This recipe is based on{" "}
            <Link to={`/recipes/${recipe.base_recipe}`} class="link-secondary">
              {recipe.base_recipe_name}
            </Link>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        <DetailsHeader recipe={recipe} />
        <hr className="mt-4" />
        {/* <DetailsIngredients
          ingredients={recipe && recipe.ingredients_list}
          servingSize={servingSize}
          setServingSize={setServingSize}
        /> */}
        {/* <hr className="mt-4" /> */}
        <DetailsSteps steps={recipe && recipe.steps} />
        <hr className="mt-4" />
        <DetailsShopping servingSize={servingSize} recipeId={recipe_id} />
      </CustomCard>
    </>
  );
}

export default Details;
