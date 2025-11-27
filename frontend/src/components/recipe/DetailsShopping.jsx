import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import NoAuthDialog from "./NoAuthDialog";
import AccountContext from "../../contexts/AccountContext";
import { API_BASE_URL } from "../../config/constants";

function DetailsShopping({ servingSize, recipeId }) {
  const [selectedServingSize, setSelectedServingSize] = useState(null);
  const [inShoppingList, setInShoppingList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const toast = useRef(null);
  const { isAuth } = useContext(AccountContext);

  useEffect(() => {
    fetchServingSize();
  }, []);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your shopping list was updated!",
      life: 2000,
    });
  };

  const fetchServingSize = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}shopping_list/recipes/${recipeId}/`
      );
      if (response.data.serving_size) {
        setSelectedServingSize(response.data.serving_size);
        setInShoppingList(true);
      } else {
        setSelectedServingSize(servingSize);
        setInShoppingList(false);
      }
    } catch (error) {
      console.error("Error fetching serving size:", error);
    }
  };

  const handleButtonClick = async () => {
    if (!isAuth) {
      setShowDialog(true);
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}shopping_list/recipes/`, {
        recipe_id: recipeId,
        serving_size: selectedServingSize,
      });

      setInShoppingList(true);
      setUpdated(false);
      showSuccess();
    } catch (error) {
      console.error("Error updating shopping list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-4 recipe-detail__ingredients">
      <Toast ref={toast} />
      <h3>
        {inShoppingList
          ? "This recipe is in your shopping list."
          : "Like this recipe? Add it to your shopping list"}
      </h3>
      {inShoppingList && (
        <p className="text-secondary">You can update the serving size below</p>
      )}

      <div className="col-8">
        <label className="form-label">Enter Serving Size</label> <br />
        <InputNumber
          value={selectedServingSize}
          // onValueChange={(e) => {
          //   setSelectedServingSize(e.value);
          // }}
          onChange={(e) => {
            setUpdated(true);
            setSelectedServingSize(e.value);
          }}
          min={1}
          placeholder={servingSize}
          showButtons
          //onClick={() => setUpdated(true)}
        />
        <div className="mt-4">
          <button
            className="btn btn-primary btn-primary-c p-button"
            id="shop-ingredients"
            rounded
            onClick={handleButtonClick}
            disabled={
              loading ||
              (!updated && inShoppingList) ||
              selectedServingSize === null
            }
          >
            {inShoppingList ? "Update Shopping List" : "Add To Shopping List"}
          </button>
        </div>
      </div>
      <NoAuthDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        action="add recipes to your shopping list"
      />
    </div>
  );
}

export default DetailsShopping;
