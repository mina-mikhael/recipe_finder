import React, { useState, useRef } from "react";
import "./App.css";
import RecipeForm from "./components/RecipeForm";
import { customAxios as Axios, baseURL } from "./services/customAxios";
import Recipes from "./components/Recipes";

export type Recipe = {
  label: string;
  image: string;
  cuisineType: string[];
  ingredientLines: string[];
  calories: number;
  dishType: string[];
  url: string;
};

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const prevInput = useRef<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios.get(`${baseURL}q=${inputText}`)
      .then((res) => {
        const results: Recipe[] = res.data.hits.map((hit: any): Recipe => {
          return {
            label: hit.recipe.label,
            image: hit.recipe.images.REGULAR.url,
            cuisineType: hit.recipe.cuisineType,
            ingredientLines: hit.recipe.ingredientLines,
            calories: Math.round(hit.recipe.calories),
            dishType: hit.recipe.dishType,
            url: hit.recipe.url,
          };
        });
        setRecipes(results || []);
      })
      .catch((err) => {
        console.error(err);
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
      ) : !recipes.length && prevInput.current ? (
        <h2>No Recipes Found</h2>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
