import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Formik, Form, Field } from "formik";
import { RecipeCusines, RecipeDiets } from "../../config/constants";
import { useContext } from "react";
import SearchContext from "../../contexts/SearchContext";

function FilterModal({ visible, onHide }) {
  const [recipeCuisines, setRecipeCuisines] = useState(RecipeCusines);
  const [recipeDiets, setRecipeDiets] = useState(RecipeDiets);
  const {
    setCuisines,
    setDiets,
    setMaxCookTime,
    cuisines,
    diets,
    maxCookTime,
    minCookTime,
    setMinCookTime,
  } = useContext(SearchContext);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDropdown = (event, type, sourceArray) => {
    const query = event.query.trim();

    if (!query) {
      return sourceArray;
    }

    const filtered = sourceArray.filter((item) => {
      return item.toLowerCase().startsWith(query.toLowerCase());
    });

    if (!filtered.includes(query)) {
      filtered.push(query);
    }

    if (type === "cuisines") {
      setRecipeCuisines(filtered);
    } else if (type === "diets") {
      setRecipeDiets(filtered);
    }
  };

  const handleApply = (values) => {
    setCuisines(values.cuisines);
    setDiets(values.diets);
    setMaxCookTime(values.maxCookTime);
    setMinCookTime(values.minCookTime);
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      style={{ width: "40vw" }}
      header="Filter Search"
    >
      <Formik
        initialValues={{
          cuisines: cuisines || [],
          diets: diets || [],
          maxCookTime: maxCookTime || 0,
          minCookTime: minCookTime || 0,
        }}
        onSubmit={handleApply}
      >
        {({ setFieldValue, values }) => (
          <Form onKeyDown={handleKeyDown}>
            <div className="p-field">
              <label htmlFor="cuisines" className="mb-2">
                Cuisines
              </label>
              <Field name="cuisines">
                {({ field }) => (
                  <AutoComplete
                    {...field}
                    id="cuisines"
                    dropdown
                    multiple
                    suggestions={recipeCuisines}
                    value={values.cuisines}
                    completeMethod={(e) =>
                      handleDropdown(e, "cuisines", recipeCuisines)
                    }
                    onChange={(e) => setFieldValue("cuisines", e.value)}
                    className="autocomplete-custom"
                    style={{ width: "100%" }}
                  />
                )}
              </Field>
            </div>

            <div className="p-field mt-4">
              <label htmlFor="diets" className="mb-2">
                Diets
              </label>
              <Field name="diets">
                {({ field }) => (
                  <AutoComplete
                    {...field}
                    id="diets"
                    dropdown
                    multiple
                    suggestions={recipeDiets}
                    value={values.diets}
                    completeMethod={(e) =>
                      handleDropdown(e, "diets", recipeDiets)
                    }
                    onChange={(e) => setFieldValue("diets", e.value)}
                    className="autocomplete-custom"
                    style={{ width: "100%" }}
                  />
                )}
              </Field>
            </div>

            <div className="p-field mt-4">
              <label htmlFor="minCookTime" className="mb-4">
                Minimum Cooking Time
              </label>
              <Field name="minCookTime">
                {({ field }) => (
                  <Slider
                    {...field}
                    id="minCookTime"
                    min={0}
                    max={180}
                    step={1}
                    onChange={(e) => setFieldValue("minCookTime", e.value)}
                    value={values.minCookTime}
                  />
                )}
              </Field>
              {values.minCookTime > 0 && (
                <div className="mt-2 small">
                  {`Selected: ${values.minCookTime} Minutes`}
                </div>
              )}
            </div>

            <div className="p-field mt-4">
              <label htmlFor="maxCookTime" className="mb-4">
                Maximum Cooking Time
              </label>
              <Field name="maxCookTime">
                {({ field }) => (
                  <Slider
                    {...field}
                    id="maxCookTime"
                    min={0}
                    max={180}
                    step={1}
                    onChange={(e) => setFieldValue("maxCookTime", e.value)}
                    value={values.maxCookTime}
                  />
                )}
              </Field>
              {values.maxCookTime > 0 && (
                <div className="mt-2 small">
                  {`Selected: ${values.maxCookTime} Minutes`}
                </div>
              )}
            </div>

            <Button type="submit" className="float-end mt-4" label="Apply" />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default FilterModal;
