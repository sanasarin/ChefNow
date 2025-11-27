import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import CustomMultiSelect from "./CustomMultiSelect";
import IngredientsList from "../recipeCreate/IngredientsList";
import RecipeStep from "../recipeCreate/RecipeStep";
import RecipeMedia from "../recipeCreate/RecipeMedia";

// UI Imports
import { Row, Col } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// constants
import {
  RecipeCusines,
  RecipeDiets,
  API_BASE_URL,
} from "../../config/constants";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cuisines: Yup.array().required("At least one cuisine is required"),
  serving_size: Yup.number()
    .transform((value, originalValue) => (isNaN(value) ? undefined : value))
    .nullable()
    .positive("Serving size must be a positive number")
    .required("Serving size is required"),
  prep_time: Yup.number()
    .nullable()
    .transform((value, originalValue) => (isNaN(value) ? undefined : value))
    .positive("Prep time must be a positive number")
    .required("Prep time is required"),
  cook_time: Yup.number()
    .nullable()
    .transform((value, originalValue) => (isNaN(value) ? undefined : value))
    .positive("Cook time must be a positive number")
    .required("Cook time is required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().test(
          "is-not-empty",
          "Ingredient name is required",
          (value) => value && value.trim() !== ""
        ),
        quantity: Yup.number()
          .transform((value, originalValue) =>
            isNaN(value) ? undefined : value
          )
          .nullable()
          .positive("Quantity must be a positive number")
          .required("Quantity is required"),
      })
    )
    .required("At least one ingredient is required"),
  steps: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().test(
        "is-not-empty",
        "Step description is required",
        (value) => value && value.trim() !== ""
      ),
      prep_time: Yup.number()
        .nullable()
        // .required("Prep time is required")
        .positive("Prep time must be a positive number"),
      cook_time: Yup.number()
        .nullable()
        // .required("Cook time is required")
        .positive("Cook time must be a positive number"),
      images: Yup.array(),
      videos: Yup.array(),
    })
  ),
});

function RecipeForm({
  isEditing = false,
  isDuplicating = false,
  initialValues,
  recipeId,
}) {
  const [recipeCuisines, setRecipeCuisines] = useState(RecipeCusines);
  const toast = useRef(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      description: "",
      cuisines: [],
      serving_size: null,
      prep_time: null,
      cook_time: null,
      diets: [],
      ingredients: [{ name: "", quantity: "" }],
      steps: [
        {
          description: "",
          prep_time: null,
          cook_time: null,
          images: [],
          videos: [],
        },
      ],
      images: [],
      videos: [],
    },
    validationSchema,
    onSubmit: (values) => {
      // Format the data
      const formattedValues = {
        ...values,
        diets: values.diets.map((diet) => ({ name: diet })),
        cuisines: values.cuisines.map((cuisine) => ({ name: cuisine })),
        ingredients: values.ingredients.filter((ingredient) => ingredient.name),
        images: values.images.map((image) => image.id),
        videos: values.videos.map((video) => video.id),
        base_recipe: isDuplicating ? recipeId : null, // for duplicating
        // for step images and videos, we need to extract the id from the object
        steps: values.steps.map((step) => ({
          ...step,
          images: step.images.map((image) => image.id),
          videos: step.videos.map((video) => video.id),
          cook_time: step.cook_time || null,
          prep_time: step.prep_time || null,
        })),
      };

      if (isEditing) {
        axios
          .patch(`${API_BASE_URL}recipes/${recipeId}/`, formattedValues, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Recipe updated successfully",
              life: 3000,
            });
          })
          .catch((error) => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: error.message,
              life: 5000,
            });
          });
        return;
      }

      axios
        .post("http://127.0.0.1:8000/api/recipes/", formattedValues, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // toast.current.show({
          //   severity: "success",
          //   summary: "Success",
          //   detail: "Recipe created successfully",
          //   life: 3000,
          // });
          // Go to that recipe
          navigate(`/recipes/${response.data.id}`, { state: { new: true } });

          formik.resetForm();
          formik.setFieldValue("images", []);
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 5000,
          });
        });
    },
    validateOnChange: true,
    validateOnBlur: false,
  });

  const handleCuisinesChange = (e) => {
    formik.setFieldValue("cuisines", e.value);
  };

  const handleDietsChange = (e) => {
    formik.setFieldValue("diets", e.value);
  };

  const addIngredient = () => {
    formik.setFieldValue("ingredients", [
      ...formik.values.ingredients,
      { name: "", quantity: "" },
    ]);
  };

  const handleIngredientChange = (index, fieldName, value) => {
    const updatedIngredients = formik.values.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [fieldName]: value } : ingredient
    );
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  const handleStepChange = (index, fieldName, value) => {
    const updatedSteps = formik.values.steps.map((step, i) =>
      i === index ? { ...step, [fieldName]: value } : step
    );
    formik.setFieldValue("steps", updatedSteps);
  };

  const addStep = () => {
    formik.setFieldValue("steps", [
      ...formik.values.steps,
      {
        description: "",
        prep_time: "",
        cook_time: "",
        images: [],
        videos: [],
      },
    ]);
  };

  const removeStep = (index) => {
    const updatedSteps = formik.values.steps.filter((_, i) => i !== index);
    formik.setFieldValue("steps", updatedSteps);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = formik.values.ingredients.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  return (
    <form onSubmit={formik.handleSubmit} id="create-recipe-form">
      <Toast ref={toast} />
      <Row>
        <div className="col-md-12 mt-4">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <br />
          <InputText
            id="name"
            placeholder="Blueberry Banana Pancakes"
            className="recipe-form-input"
            {...formik.getFieldProps("name")}
            autoComplete="off"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </div>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <InputTextarea
            rows={3}
            autoResize
            className="recipe-form-input"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
        </div>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label htmlFor="cuisines" className="form-label">
            Cuisines
          </label>
          <CustomMultiSelect
            options={recipeCuisines}
            value={formik.values.cuisines}
            onChange={handleCuisinesChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.cuisines}
            touched={formik.touched.cuisines}
            fieldName="cuisines"
            label="Cuisines"
            addNewItemLabel="Click here to add a cuisine."
          />
          {formik.touched.cuisines && formik.errors.cuisines ? (
            <div className="text-danger">{formik.errors.cuisines}</div>
          ) : null}
        </div>
      </Row>

      <Row className="mt-4">
        <Col>
          <label className="form-label">Serving Size</label>
          <br />
          <InputText
            className="recipe-input-form"
            placeholder="2"
            type="number"
            {...formik.getFieldProps("serving_size")}
          />
          {formik.touched.serving_size && formik.errors.serving_size ? (
            <div className="text-danger">{formik.errors.serving_size}</div>
          ) : null}
        </Col>

        <Col>
          <label className="form-label">Prep Time (Minutes)</label>
          <br />
          <InputText
            className="recipe-input-form"
            placeholder="20"
            type="number"
            {...formik.getFieldProps("prep_time")}
          />
          {formik.touched.prep_time && formik.errors.prep_time ? (
            <div className="text-danger">{formik.errors.prep_time}</div>
          ) : null}
        </Col>

        <Col>
          <label className="form-label">Cook Time (Minutes)</label>
          <br />
          <InputText
            className="recipe-input-form"
            placeholder="15"
            type="number"
            {...formik.getFieldProps("cook_time")}
          />
          {formik.touched.cook_time && formik.errors.cook_time ? (
            <div className="text-danger">{formik.errors.cook_time}</div>
          ) : null}
        </Col>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label htmlFor="diets" className="form-label">
            Diets
          </label>
          <CustomMultiSelect
            options={RecipeDiets}
            value={formik.values.diets}
            onChange={handleDietsChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.diets}
            touched={formik.touched.diets}
            fieldName="diets"
            label="Diets"
            addNewItemLabel="Click here to add a diet."
          />
          {formik.touched.diets && formik.errors.diets ? (
            <div className="text-danger">{formik.errors.diets}</div>
          ) : null}
        </div>
      </Row>

      <IngredientsList
        ingredients={formik.values.ingredients}
        handleIngredientChange={handleIngredientChange}
        addIngredient={addIngredient}
        errors={formik.errors.ingredients}
        touched={formik.touched.ingredients}
        removeIngredient={removeIngredient}
      />

      <Row className="mt-4 mb-4">
        <label style={{ fontWeight: 500 }}>
          Please enter all of the steps for this recipe
        </label>
        {formik.values.steps.map((step, index) => (
          <>
            <div className="row mb-2">
              <div className="col-md-12">
                <label
                  className="mt-2"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  Step {index + 1}
                </label>
                {index > 0 && (
                  <Button
                    icon="pi pi-times"
                    onClick={() => removeStep(index)}
                    rounded
                    text
                    severity="secondary"
                    className="float-end"
                    size="small"
                    style={{ height: "30px", width: "30px", marginTop: "8px" }}
                  />
                )}
              </div>
            </div>

            <div className="row">
              <RecipeStep
                key={index}
                step={step}
                handleStepChange={(fieldName, value) =>
                  handleStepChange(index, fieldName, value)
                }
                index={index}
                touched={formik.touched.steps}
                errors={formik.errors.steps}
                removeStep={removeStep}
              />
            </div>
          </>
        ))}
        <div className="col-lg-3 col-md-4 col-sm-7">
          <Button
            className="mt-4"
            onClick={addStep}
            severity="secondary"
            text
            style={{ fontSize: "13px", height: "35px", paddingLeft: "1px" }}
            type="button"
          >
            Click to add more steps
          </Button>
        </div>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label>Add images or videos to your recipe</label>
          <br />
          <RecipeMedia
            images={formik.values.images}
            setImages={(newImages) => formik.setFieldValue("images", newImages)}
            videos={formik.values.videos}
            setVideos={(newVideos) => formik.setFieldValue("videos", newVideos)}
          />{" "}
        </div>
      </Row>

      <Button type="submit" className="btn btn-primary-c mt-4 mb-4 float-end">
        Save
      </Button>
    </form>
  );
}

export default RecipeForm;
