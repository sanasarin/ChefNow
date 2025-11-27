import React from "react";
import CustomCard from "../components/shared/CustomCard";
import RecipeForm from "../components/shared/RecipeForm";

function CreateRecipe() {
  return (
    <CustomCard title="Create Recipe">
      <RecipeForm />
    </CustomCard>
  );
}

export default CreateRecipe;
