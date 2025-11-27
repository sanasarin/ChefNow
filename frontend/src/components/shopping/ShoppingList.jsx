import { useContext } from "react";
import ShoppingContext from "../../contexts/ShoppingContext";
import CustomCard from "../shared/CustomCard";
import IngredientsSkeleton from "./IngredientsSkeleton";
import { Button } from "primereact/button";

function ShoppingList() {
  const {
    ingredients,
    ingredientsLoading,
    loadMoreIngredients,
    ingredientsHasMore,
  } = useContext(ShoppingContext);

  if (ingredientsLoading) {
    return (
      <CustomCard title="Shopping List">
        <IngredientsSkeleton />
      </CustomCard>
    );
  }

  if (ingredients.length === 0) {
    return;
  }

  return (
    <CustomCard title="Shopping List">
      <ul className="list-group pb-4">
        {ingredients.map((ingredient) => (
          <li className="list-group-item pt-3">
            <span className="text-333 text-capitalize">{ingredient.name}</span>{" "}
            <span className="quantity">{ingredient.quantity.toFixed(2)} g</span>
          </li>
        ))}
      </ul>

      {ingredientsHasMore && (
        <Button
          className="shopping-items-load-more mb-3"
          icon="pi pi-angle-down"
          text
          severity="primary"
          rounded
          onClick={loadMoreIngredients}
        >
          See more
        </Button>
      )}
    </CustomCard>
  );
}

export default ShoppingList;
