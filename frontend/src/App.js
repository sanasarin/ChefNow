import { useContext } from "react";

// import router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import PrimeReact components
import { ProgressSpinner } from "primereact/progressspinner";

// import contexts
import AccountContext from "./contexts/AccountContext";

// import pages and components
import Navbar from "./components/shared/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
import Recipe from "./pages/Recipe";
// import Search from "./components/landing/Search";
import CreateRecipe from "./pages/CreateRecipe";
import Shopping from "./pages/Shopping";
import MyRecipes from "./pages/MyRecipes";
import EditRecipe from "./pages/EditRecipe";
// import this as DupRecipe
import DupRecipe from "./pages/DuplicateRecipe";
// import Search from "./pages/Search";

function App() {
  const { accountLoading } = useContext(AccountContext);
  console.log(accountLoading);

  // will finalize this later.
  if (accountLoading) {
    return (
      <div className="container mt-4 pt-4" style={{ height: "100vh" }}>
        {/* <h4 className="text-center">Loading Deliciousness.</h4>
        <ProgressSpinner className="center d-block m-auto mt-4" /> */}
      </div>
    );
  }

  return (
    <Router>
      <Navbar />

      <div className="container mb-4 mt-4">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<EditProfile />} />
          {/* <Route partial path="/search" element={<Search />} /> */}
          <Route exact path="/recipes/create" element={<CreateRecipe />} />
          <Route exact path="/shopping" element={<Shopping />} />
          <Route exact path="/account/recipes" element={<MyRecipes />} />
          <Route exact path="/recipes/:id" element={<Recipe />} />
          <Route exact path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route exact path="/recipes/:id/create" element={<DupRecipe />} />
          {/* <Route exact path="/search" element={<Search />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
