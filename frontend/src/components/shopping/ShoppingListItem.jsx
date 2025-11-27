import { useContext, useState } from "react";
import ShoppingContext from "../../contexts/ShoppingContext";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog"; // For <ConfirmDialog /> component
import { motion, AnimatePresence } from "framer-motion";

function ShoppingListItem({ item }) {
  const {
    deleteRecipe,
    increaseServingSize,
    decreaseServingSize,
    ingredientsLoading,
  } = useContext(ShoppingContext); // will use to edit shopping items
  const [servingSize, setServingSize] = useState(item.serving_size);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const increase = () => {
    setServingSize(servingSize + 1);

    increaseServingSize(item.recipe.id);
  };

  const decrease = () => {
    if (servingSize === 0) {
      return;
    }

    setServingSize(servingSize - 1);

    decreaseServingSize(item.recipe.id);
  };

  return (
    <div className="d-flex flex-row mb-4">
      <div className="p-2 me-2">
        <img
          src={item.recipe.images[0] && BASE_URL + item.recipe.images[0].image}
          className="small-recipe-pic rounded-3"
          alt="recipe pic"
        />
      </div>
      <div className="p-2">
        <h4 className="mb-0">
          <Link
            to={`/recipes/${item.recipe.id}`}
            className="link-dark text-decoration-none"
          >
            {item.recipe.name}
          </Link>
        </h4>
        <span className="date mt-0"></span>
        <div className="mt-2">
          <Button
            icon="pi pi-minus"
            className="serving-btn"
            rounded
            onClick={decrease}
            disabled={ingredientsLoading}
          />
          <span className="me-2 ms-2 text-333 text-serving">
            {servingSize} servings
          </span>
          <Button
            icon="pi pi-plus"
            className="serving-btn"
            rounded
            onClick={increase}
            disabled={ingredientsLoading}
          />
        </div>
      </div>
      <div className="p-2 ms-auto">
        {/* <Button
          icon="pi pi-file-edit"
          rounded
          text
          aria-label="Edit"
          className="serving-btn-general"
          style={{
            width: "25px",
            height: "25px",
          }}
        /> */}

        <Button
          icon="pi pi-times"
          rounded
          text
          aria-label="Cancel"
          className="serving-btn-general"
          style={{
            width: "25px",
            height: "25px",
          }}
          onClick={() => setShowConfirmDialog(true)}
        />

        <ConfirmDialog
          visible={showConfirmDialog}
          onHide={() => setShowConfirmDialog(false)}
          message="Are you sure you want to remove this recipe?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => deleteRecipe(item)}
          reject={() => setShowConfirmDialog(false)}
          acceptLabel="Yes"
          rejectLabel="No"
        />
      </div>
    </div>
  );
}

export default ShoppingListItem;
