import AddedRecipes from "../components/shopping/AddedRecipes";
import { ShoppingProvider } from "../contexts/ShoppingContext";
import "../styles/shopping-list.css";
import ShoppingList from "../components/shopping/ShoppingList";

function Shopping() {
  return (
    <ShoppingProvider>
      <AddedRecipes />
      <ShoppingList />
    </ShoppingProvider>
  );
}

export default Shopping;
