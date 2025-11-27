// constants.js

// API endpoints
//export const API_BASE_URL = "http://localhost:8000/api/";
export const API_BASE_URL = "https://easychef-production.up.railway.app/api/";
//export const BASE_URL = "http://localhost:8000"; // fix later
export const BASE_URL = "https://easychef-production.up.railway.app";

// Authentication endpoints
export const LOGIN_ENDPOINT = `${API_BASE_URL}account/login/`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}account/register/`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}account/logout/`;

// Account endpoints
export const ACCOUNT_ENDPOINT = `${API_BASE_URL}account/`;
export const ACCOUNT_INTERACTIONS_ENDPOINT = `${API_BASE_URL}account/interactions/`;
export const ACCOUNT_FAVOURITES_ENDPOINT = `${API_BASE_URL}account/favourites/`;
export const ACCOUNT_RECIPES_ENDPOINT = `${API_BASE_URL}account/recipes/`;

// ... more to come

// Search endpoint
export const SEARCH_ENDPOINT = `${API_BASE_URL}search/`;

// Recipe endpoints
export const RECIPES_ENDPOINT = `${API_BASE_URL}recipes/`;

/*
    Usage for constants that take input
    const url = RECIPE_DETAIL_ENDPOINT(recipeId);
    gives you 'http://localhost:8000/api/recipes/123/'
*/

export const RECIPE_DETAIL_ENDPOINT = (id) => `${RECIPES_ENDPOINT}${id}/`;
export const RECIPE_COMMENTS_ENDPOINT = (id) =>
  `${RECIPES_ENDPOINT}${id}/comments/`;

// Colors
export const PRIMARY_COLOR = "#3a9691"; // dark green

// Other constants
export const PAGE_SIZE = 10;

// Constants for recipe form
export const RecipeCusines = [
  "Italian",
  "Mediterranean",
  "American",
  "Latin American",
  "South Asian",
  "Eastern European",
  "Oceanic",
  "South-East Asian",
  "Central African",
  "Caribbean",
];

export const RecipeDiets = [
  "Vegan",
  "Vegetarian",
  "Halal",
  "Keto",
  "Paleo",
  "Gluten-Free",
  "Dairy-Free",
  "Low Carb",
  "Pescatarian",
  "DASH",
];
