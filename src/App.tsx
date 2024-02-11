import React, { useState, useRef } from "react";
import "./App.css";
import RecipeForm from "./components/RecipeForm";
import { customAxios as Axios, baseURL } from "./services/customAxios";
import Recipes from "./components/Recipes";

export type Recipe = {
  label: string;
  image: string;
  images?: { REGULAR: { url: string } };
  cuisineType: string[];
  ingredientLines: string[];
  calories: number;
  dishType: string[];
  url: string;
};

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const prevInput = useRef<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    Axios.get(`${baseURL}q=${inputText}`)
      .then((res) => {
        const results: Recipe[] = res.data.hits.map(
          (hit: { recipe: Recipe }): Recipe => {
            return {
              label: hit.recipe.label,
              image: hit.recipe?.images?.REGULAR?.url || "",
              cuisineType: hit.recipe.cuisineType,
              ingredientLines: hit.recipe.ingredientLines,
              calories: Math.round(hit.recipe.calories),
              dishType: hit.recipe.dishType,
              url: hit.recipe.url,
            };
          }
        );
        setRecipes(results || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    prevInput.current = inputText;
    setInputText("");
  };

  console.log("inputText", inputText);
  console.log("prevInput", prevInput.current);

  return (
    <div className="App">
      <div className="main_container">
        <div className="title_container">
          <h1>Free Recipes</h1>
          <h2>For Everyone</h2>
        </div>
        <RecipeForm
          inputText={inputText}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      {recipes.length ? (
        <Recipes recipes={recipes} prevInput={prevInput.current} />
      ) : !recipes.length && prevInput.current && !isLoading ? (
        <h2 style={{ textAlign: "center" }}>No Recipes Found!</h2>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
