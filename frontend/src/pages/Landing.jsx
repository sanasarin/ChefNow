import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/landing/Search.jsx";
import "../styles/search.css";
import RecipeCard from "../components/shared/RecipeCard.jsx";
import { SEARCH_ENDPOINT, RECIPES_ENDPOINT } from "../config/constants";
import { Button } from "primereact/button";

function Landing() {
  //Set states for searchQuery and filters as planned
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [minCookTime, setMinCookTime] = useState(null); // default min and max cook times
  const [maxCookTime, setMaxCookTime] = useState(null); // default min and max cook times
  const [searchedPage, setSearchedPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setTotal(0);

        if (
          searchQuery.length === 0 &&
          cuisines.length === 0 &&
          diets.length === 0 &&
          !maxCookTime && !minCookTime
        ) {
          setSearchedRecipes([]);
          const response = await axios.get(`${RECIPES_ENDPOINT}popular/`, {
            params: { page: popularPage },
          });
          const newRecipes = response.data.results;
          setTotal(response.data.count);
          if (popularPage === 1) {
            setPopularRecipes(newRecipes);
          } else {
            setPopularRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          }
        } else if (
          searchQuery.length !== 0 ||
          cuisines.length !== 0 ||
          diets.length !== 0 ||
          maxCookTime || minCookTime
        ) {
          setPopularRecipes([]); // Clear popular recipes array
          const params = {
            page: searchedPage,
            search: searchQuery,
            cuisines: cuisines.join(","),
            diets: diets.join(","),
            max_cook_time: maxCookTime,
            min_cook_time: minCookTime,
          };

          const response = await axios.get(SEARCH_ENDPOINT, { params });
          const newRecipes = response.data.results;
          setTotal(response.data.count);
          if (searchedPage === 1) {
            setSearchedRecipes(newRecipes);
          } else {
            setSearchedRecipes((prevRecipes) => [
              ...prevRecipes,
              ...newRecipes,
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
    setSearched(false);
  }, [popularPage, searchedPage, searched, cuisines, diets, maxCookTime, minCookTime]);

  //event handlers to update respective state variables upon user itneraction
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearched(true);
    setSearchedPage(1);
    setPopularPage(1);
  };

  const handleShowMore = () => {
    if (popularRecipes.length < total) {
      setPopularPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowMore2 = () => {
    if (searchedRecipes.length < total) {
      setSearchedPage((prevPage) => prevPage + 1);
    }
  };

  //ADD FOR POPULAR PAGE TOO?
  const handleCuisinesChange = (selectedOptions) => {
    setSearchedRecipes([]);
    setCuisines(selectedOptions.map((option) => option.value));
  };
  const handleDietsChange = (selectedOptions) => {
    setSearchedRecipes([]);
    setDiets(selectedOptions.map((option) => option.value));
  };

  const handleMaxCookTimeChange = (event, newValue) => {
    if (newValue === 0) {
      setMaxCookTime(null);
    } else {
      setMaxCookTime(newValue);
    }
  };

  const handleMinCookTimeChange = (event, newValue) => {
    if (newValue === 0) {
      setMinCookTime(null);
    } else {
      setMinCookTime(newValue);
    }
  };


  const handlePageChange = () => {
    setSearchedPage(1);
    setPopularPage(1);
  };

  const handleClear = () => {
    setSearchQuery("");
    setCuisines([]);
    setDiets([]);
    setMaxCookTime(null);
    setMinCookTime(null)
    setSearchedPage(1);
    setPopularPage(1);
    setSearched(false);
  };

  return (
    <div>
      <Search
        searchQuery={searchQuery}
        cuisines={cuisines}
        diets={diets}
        maxCookTime={maxCookTime}
        minCookTime={minCookTime}
        onSearchChange={handleSearchChange}
        onCuisinesChange={handleCuisinesChange}
        onDietsChange={handleDietsChange}
        onMaxCookTimeChange={handleMaxCookTimeChange}
        onMinCookTimeChange = {handleMinCookTimeChange}
        onSearchSubmit={handleSearchSubmit}
        onPageChange={handlePageChange}
      />
      <div>
      <h3 className="mt-1 pt-4">
        {searchedRecipes.length === 0 &&
        total > 0 &&
        diets.length === 0 &&
        cuisines.length === 0 &&
        maxCookTime === null && minCookTime === null
          ? "Popular on EasyChef"
          : total > 0
          ? `Search Results (${total})`
          : "No recipes found"}
      </h3>

      {!popularRecipes.length ? <a id="clear-results-link" onClick={handleClear}>
  Reset search
</a>
    : null}
    
      {/* {popularRecipes.length===0 ? <Button id="#clear-button" onClick={() => handleClear()} >Back to all results</Button>
    : null} */}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {popularRecipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
        {searchedRecipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      {!searchQuery ? (
        <div style={{ textAlign: "center" }}>
          {popularRecipes.length > 0 && popularRecipes.length < total && (
            <Button className="mt-3" onClick={handleShowMore}>
              Show More
            </Button>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}> 
          {searchedRecipes.length > 0 && searchedRecipes.length < total && (
            <Button className="mt-3" onClick={handleShowMore2}>
              Show More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Landing;
