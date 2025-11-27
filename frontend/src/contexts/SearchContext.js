// import { createContext, useState, useEffect } from "react";
// import { SEARCH_ENDPOINT } from "../config/constants";
// const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cuisines, setCuisines] = useState([]);
//   const [diets, setDiets] = useState([]);
//   const [maxCookTime, setMaxCookTime] = useState("");
//   const [minCookTime, setMinCookTime] = useState("");
//   const [searchUrl, setSearchUrl] = useState(SEARCH_ENDPOINT);

//   useEffect(() => {
//     const baseUrl = SEARCH_ENDPOINT;
//     const queryParams = [];

//     if (searchQuery) {
//       queryParams.push(`search=${searchQuery}`);
//     }

//     if (cuisines && cuisines.length > 0) {
//       queryParams.push(`cuisines=${cuisines.join(",")}`);
//     }

//     if (diets && diets.length > 0) {
//       queryParams.push(`diets=${diets.join(",")}`);
//     }

//     if (maxCookTime) {
//       queryParams.push(`max_cooktime=${maxCookTime}`);
//     }

//     if (minCookTime) {
//       queryParams.push(`min_cooktime=${minCookTime}`);
//     }

//     const newUrl =
//       queryParams.length > 0 ? `${baseUrl}?${queryParams.join("&")}` : baseUrl;
//     setSearchUrl(newUrl);
//   }, [searchQuery, cuisines, diets, maxCookTime, minCookTime]);

//   return (
//     <SearchContext.Provider
//       value={{
//         searchQuery,
//         setSearchQuery,
//         cuisines,
//         setCuisines,
//         diets,
//         setDiets,
//         maxCookTime,
//         setMaxCookTime,
//         minCookTime,
//         setMinCookTime,
//         searchUrl,
//         setSearchUrl,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export default SearchContext;
