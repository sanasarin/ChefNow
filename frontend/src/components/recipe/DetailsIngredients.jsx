import { useState, useEffect } from "react";
import { InputNumber } from "primereact/inputnumber";

function DetailsIngredients({ ingredients, servingSize, setServingSize }) {
  const [activeServingSize, setActiveServingSize] = useState(servingSize);
  const [activeIngredients, setActiveIngredients] = useState(ingredients);

  const midPoint = Math.ceil(activeIngredients.length / 2);
  const column1 = activeIngredients.slice(0, midPoint);
  const column2 = activeIngredients.slice(midPoint);

  // TODO: add ability to update serving size and update ingredient quantities
  useEffect(() => {
    updateIngredients(activeServingSize);
  }, [activeServingSize]);

  const updateIngredients = (newServingSize) => {
    const updatedIngredients = ingredients.map((ingredient) => {
      const newQuantity = (ingredient.quantity / servingSize) * newServingSize;
      return { ...ingredient, quantity: newQuantity };
    });
    setActiveIngredients(updatedIngredients);
  };

  const renderIngredients = (ingredientsList) => {
    return (
      <ol className="list-group mt-4">
        {ingredientsList.map((ingredient, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold text-capitalize">{ingredient.name}</div>
              {ingredient.quantity} g
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="row mt-4 recipe-detail__ingredients">
      <h3>Ingredients</h3>

      <label>Change Serving Size</label>
      <InputNumber
        value={activeServingSize && activeServingSize}
        onValueChange={(e) => setActiveServingSize(e.value)}
        showButtons
        min={1}
      />

      <div className="col-6">{renderIngredients(column1)}</div>
      <div className="col-6">{renderIngredients(column2)}</div>
    </div>
  );
}

export default DetailsIngredients;
