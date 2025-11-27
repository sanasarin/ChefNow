import React from "react";
import Comments from "../components/recipe/Comments";
import Details from "../components/recipe/Details";
import { useParams, useLocation } from "react-router-dom";
import { Message } from "primereact/message";

function Recipe() {
  const { id } = useParams();
  const location = useLocation();

  // TODO change this
  const isNew = location.state && location.state.new;

  return (
    <>
      {isNew && (
        <Message
          severity="success"
          className="w-100 p-3"
          style={{ justifyContent: "left", fontWeight: "500" }}
          text="Recipe created successfully."
        />
      )}
      <Details recipe_id={id} />
      <Comments recipe_id={id} />
    </>
  );
}

export default Recipe;
