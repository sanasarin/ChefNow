import { useState, useEffect, useContext } from "react";
import axios from "axios";
import useAuthToken from "../../hooks/useAuthToken";
import AccountContext from "../../contexts/AccountContext";
import NoAuthDialog from "./NoAuthDialog";
import { API_BASE_URL } from "../../config/constants";

function DetailsLikeRate({ numFavs, recipeId }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(numFavs);
  const [ratingData, setRatingData] = useState(null);
  const { isAuth } = useContext(AccountContext);
  const [showDialog, setShowDialog] = useState(false);
  useAuthToken();

  useEffect(() => {
    if (isAuth) {
      fetchRatingData();
    } else {
      fetchRatingData2();
    }
  }, []);

  useEffect(() => {
    fetchFavouriteData();
  }, []);

  async function fetchRatingData2() {
    const url = `${API_BASE_URL}recipes/${recipeId}/ratings/average/`;

    try {
      const response = await axios.get(url);
      //setRatingData(response.data);
      // only update the average rating
      setRatingData((prev) => ({
        ...prev,
        avg_rating: response.data.avg_rating,
      }));
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  }

  // gets users rating for recipe + the average
  async function fetchRatingData() {
    const url = `${API_BASE_URL}recipes/${recipeId}/ratings/`;

    try {
      const response = await axios.get(url);
      if (response.data.serving_size !== null) setRatingData(response.data);
      fetchRatingData2();
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  }

  async function fetchFavouriteData() {
    const url = `${API_BASE_URL}recipes/${recipeId}/favourite/`;

    try {
      const response = await axios.get(url);
      setIsFavorited(response.data.is_favorited);
    } catch (error) {
      console.error("Error fetching favourite data:", error);
    }
  }

  async function handleRemoveRating() {
    const url = `${API_BASE_URL}recipes/${recipeId}/ratings/`;

    try {
      await axios.delete(url);
      fetchRatingData(); // Fetch the updated rating data after removing the rating
    } catch (error) {
      console.error("Error while removing rating:", error);
    }
  }

  function renderStars() {
    const stars = [];
    const rating = ratingData.rating;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star fa fa-star${
            i <= Math.round(rating) ? " checked" : ""
          }`}
          onClick={() => handleRating(i)}
          onDoubleClick={handleRemoveRating}
        ></span>
      );
    }
    return stars;
  }

  async function handleRating(rating) {
    if (!isAuth) {
      setShowDialog(true);
      return;
    }

    const url = `${API_BASE_URL}recipes/${recipeId}/ratings/`;

    try {
      const response = await axios.put(url, { rating });
      setRatingData(response.data);
    } catch (error) {
      console.error("Error while setting rating:", error);
    }
  }

  async function handleFavourite() {
    if (!isAuth) {
      setShowDialog(true);
      return;
    }

    const url = `${API_BASE_URL}recipes/${recipeId}/favourite/`;

    try {
      if (!isFavorited) {
        // Favourite the recipe
        await axios.post(url);
        setIsFavorited(true);
        setFavoritesCount(favoritesCount + 1);
      } else {
        // Remove the favorite
        await axios.delete(url);
        setIsFavorited(false);
        setFavoritesCount(favoritesCount - 1);
      }
    } catch (error) {
      console.error("Error while favoriting/unfavoriting:", error);
    }
  }

  if (!ratingData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-2 mt-0">
        <span id="rating-bar">
          {renderStars()}(
          {ratingData.avg_rating && ratingData.avg_rating !== 0
            ? ratingData.avg_rating.toFixed(1)
            : "No ratings yet"}
          )
        </span>

        <span>
          <span className="me-1 ms-1">|</span>
          <i
            className={`fa${isFavorited ? "s liked" : "r"} fa-heart me-1`}
            onClick={handleFavourite}
          ></i>
          <span>({favoritesCount})</span>
        </span>
      </div>

      <NoAuthDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        action="rate and favourite recipes"
      />
    </>
  );
}

export default DetailsLikeRate;
