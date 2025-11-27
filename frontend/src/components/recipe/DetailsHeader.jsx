import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/recipe-details.css";
import DetailsLikeRate from "./DetailsLikeRate";
import RecipeCarousel from "./RecipeCarousel";
import AccountContext from "../../contexts/AccountContext";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { Message } from "primereact/message";

function DetailsHeader({ recipe }) {
  const { account, isAuth } = useContext(AccountContext);
  const [deleted, setDeleted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (deleted) {
      const timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [deleted]);

  return (
    <div className="row gx-5">
      {deleted && (
        <Message
          severity="warn"
          text={`Recipe was successfully deleted. You will be redirected to the home page in ${secondsRemaining} seconds.`}
          className="alert force-font mb-4 fw-semibold"
          style={{ alignItems: "left", padding: "0.75rem 1rem" }}
        />
      )}

      <div className="col-lg-5">
        {recipe && recipe.images.length === 0 && recipe.videos.length === 0 && (
          <div className="recipe-details-image">
            <img
              src="https://placehold.co/600x400?text=No+Photo"
              alt="recipe-placeholder"
              className="rounded recipe-detail-image"
            />
          </div>
        )}

        {recipe && (
          <RecipeCarousel
            images={recipe && recipe.images}
            videos={recipe && recipe.videos}
          />
        )}
      </div>

      <div className="col-lg-6">
        <span className="text-capitalize">By: {recipe && recipe.creator}</span>

        {account && account.username === recipe.creator && (
          <div
            className="btn-group float-end me-3"
            style={{ paddingTop: "4px" }}
          >
            <button
              type="button"
              className="btn btn-sm"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa-solid fa-ellipsis fa-lg"
                style={{ fontSize: "28px" }}
              ></i>
            </button>

            <ul className="dropdown-menu">
              <li>
                <Link to="edit" className="dropdown-item">
                  Edit
                </Link>
              </li>
              <li>
                <DeleteConfirmDialog
                  recipe={recipe}
                  onConfirm={() => {
                    setDeleted(true);
                  }}
                />
              </li>
            </ul>
          </div>
        )}

        {isAuth && (
          <Link to="create">
            <button
              className={`btn btn-secondary btn-sm float-end ${
                account && account.username === recipe.creator && "me-3"
              }`}
            >
              Duplicate
            </button>
          </Link>
        )}

        <h1>{recipe && recipe.name}</h1>

        <DetailsLikeRate
          numFavs={recipe && recipe.num_favourites}
          avgRating={recipe && recipe.avg_rating}
          recipeId={recipe && recipe.id}
        />

        <p>{recipe && recipe.description}</p>

        <div id="recipe-tags-section" className="mb-2">
          <span
            className="text-333"
            style={{
              fontWeight: "500",
              marginRight: "4px",
              color: "#215754",
            }}
          >
            Cuisine:
          </span>

          {recipe &&
            recipe.cuisines &&
            recipe.cuisines.map((cuisine, index) => (
              <span className="text-333">
                {cuisine.name}
                {index !== recipe.cuisines.length - 1 && ", "}
              </span>
            ))}
        </div>

        <div id="recipe-tags-section-2" className="mb-4">
          <span
            className="text-333"
            style={{
              fontWeight: "500",
              marginRight: "4px",
              color: "#215754",
            }}
          >
            Diet:
          </span>

          {recipe &&
            recipe.diets &&
            recipe.diets.map((diet, index) => (
              <span className="text-333">
                {diet.name}
                {index !== recipe.diets.length - 1 && ", "}
              </span>
            ))}
        </div>

        <div id="recipe-time-section">
          <div className="recipe-details-icons mt-4">
            <div>
              <i className="fas fa-clock"></i>
              <h5>prep time</h5>
              <p>{recipe && recipe.prep_time} min</p>
            </div>

            <div>
              <i className="far fa-clock"></i>
              <h5>cook time</h5>
              <p>{recipe && recipe.cook_time} min</p>
            </div>

            <div>
              <i className="fas fa-user-friends"></i>
              <h5>serving size</h5>
              <p>{recipe && recipe.active_serving_size}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
