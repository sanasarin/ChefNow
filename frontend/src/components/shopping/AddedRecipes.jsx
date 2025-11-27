import { useContext } from "react";
import ShoppingContext from "../../contexts/ShoppingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "primereact/button";

import CustomCard from "../shared/CustomCard";
import ShoppingListSkeleton from "./ShoppingListSkeleton";
import ShoppingListItem from "./ShoppingListItem";

function AddedRecipes() {
  const { loading, shoppingItems, loadMoreRecipes, hasMore } =
    useContext(ShoppingContext);

  if (loading) {
    return (
      <CustomCard title="Added Recipes">
        <ShoppingListSkeleton />
      </CustomCard>
    );
  }

  if (shoppingItems.length === 0) {
    return (
      <CustomCard title="Added Recipes">
        <p className="pt-4 pb-4">There are no recipes in your shopping list</p>
      </CustomCard>
    );
  }

  return (
    <CustomCard title="Added Recipes">
      <AnimatePresence>
        {shoppingItems.map((item, index) => (
          <motion.div
            key={item.recipe.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            <ShoppingListItem key={item.recipe.id} item={item} />
            {index + 1 < shoppingItems.length && <hr />}
          </motion.div>
        ))}
      </AnimatePresence>

      {hasMore && (
        <div className="d-flex mt-3 mb-4">
          <Button
            label="Load more"
            onClick={loadMoreRecipes}
            disabled={loading}
            className="shopping-list-load-more"
          />
        </div>
      )}
    </CustomCard>
  );
}

export default AddedRecipes;
