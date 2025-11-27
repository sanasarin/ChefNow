import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/recipe-cards.css";
import { BASE_URL } from "../../config/constants";

// TODO: port the placeholder image to local?
function RecipeCard({ recipe }) {
  return (
    <Link className="clicky" to={`/recipes/${recipe.id && recipe.id}`}>
      <Card className="recipe shadow-sm">
        <Card.Img
          variant="top"
          src={
            recipe.images.length > 0
              ? BASE_URL + recipe.images[0].image
              : "https://placehold.co/600x400?text=No+Photo"
          }
          className="recipe-picture"
        />
        <Card.Body>
          <Card.Title>
            <h2 className="text-capitalize">{recipe.name && recipe.name}</h2>
          </Card.Title>
          <Card.Text>
            {recipe.description.length > 110
              ? recipe.description.slice(0, 110) + "..."
              : recipe.description}
          </Card.Text>
          <Container>
            <div className="card-icons">
              <div>
                <i className="fas fa-clock fa-lg"></i>
                <p>
                  prep time <br />
                  <small>{recipe.prep_time} mins</small>
                </p>
              </div>
              <div>
                <i className="far fa-clock fa-lg"></i>
                <p>
                  cook time <br />
                  <small>{recipe.cook_time} mins</small>
                </p>
              </div>
              <div className="serving">
                <i className="fas fa-user-friends fa-lg"></i>
                <p>
                  serving size <br />
                  <small>{recipe.serving_size}</small>
                </p>
              </div>
            </div>
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
}
export default RecipeCard;
