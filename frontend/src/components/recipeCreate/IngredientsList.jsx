import { useState } from "react";
import { Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

const IngredientsList = ({
  ingredients,
  handleIngredientChange,
  addIngredient,
  touched,
  errors,
  removeIngredient,
}) => {
  const [items, setItems] = useState([]);

  const search = (event) => {
    axios
      .get(`${API_BASE_URL}recipes/ingredients/?name=${event.query}`)
      .then((response) => {
        //setItems(response.data.results);
        const suggestions = response.data.results.map((item) => item.name);
        setItems(suggestions);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Row className="mt-4">
      <div className="col-md-12">
        <label style={{ fontWeight: 500 }}>
          Ingredients and their corresponding quantity in grams
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="row mt-2">
            <div class="col-md-4">
              <AutoComplete
                className="me-4 autocomplete-custom w-100"
                placeholder="Blueberries"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                suggestions={items}
                completeMethod={search}
              />
              {touched && errors && errors[index] ? (
                <div className="text-danger">{errors[index].name}</div>
              ) : null}
            </div>

            <div class="col-md-6">
              <InputText
                className="recipe-form-input"
                placeholder="500"
                style={{ width: "70%" }}
                value={ingredient.quantity}
                type="number"
                min={1}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
              />
              {touched && errors && errors[index] ? (
                <div className="text-danger">{errors[index].quantity}</div>
              ) : null}
            </div>

            <div class="col-md-2">
              {index > 0 && (
                <Button
                  icon="pi pi-times"
                  onClick={() => removeIngredient(index)}
                  rounded
                  text
                  severity="secondary"
                  className="float-end"
                  size="small"
                  style={{ height: "30px", width: "30px", marginTop: "4px" }}
                />
              )}
            </div>
          </div>
        ))}
        <div className="">
          <Button
            className="mt-4"
            onClick={addIngredient}
            severity="secondary"
            text
            style={{ fontSize: "13px", height: "35px", paddingLeft: 0 }}
            type="button"
          >
            Click to add more Ingredients
          </Button>
        </div>
      </div>
    </Row>
  );
};

export default IngredientsList;
