import CustomCard from "../components/shared/CustomCard";
import { TabView, TabPanel } from "primereact/tabview";
import "../styles/my-recipes.css";
import MyRecipeCards from "../components/myRecipes/MyRecipeCards";

function MyRecipes() {
  return (
    <CustomCard title="My Recipes" bodyClass="my-recipes-card-body">
      <TabView className="my-recipes-tabview">
        <TabPanel
          header="My Recipes"
          className="my-recipes-tabpanel"
          leftIcon="fa-solid fa-bowl-rice"
        >
          <MyRecipeCards />
        </TabPanel>
        <TabPanel
          header="Favourite"
          className="my-recipes-tabpanel"
          leftIcon="fa-regular fa-heart"
        >
          <MyRecipeCards mode="favourites" />
        </TabPanel>
        <TabPanel
          header="Interacted With"
          className="my-recipes-tabpanel"
          leftIcon="fa-solid fa-users"
        >
          <MyRecipeCards mode="interactions" />
        </TabPanel>
      </TabView>
    </CustomCard>
  );
}
export default MyRecipes;
