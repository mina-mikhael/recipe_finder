import React, { useState } from "react";
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
    setInputText("");
  };

  console.log(recipes);

  return (
    <div className="App">
      <h1>Find the Perfect Recipe</h1>
      <RecipeForm
        inputText={inputText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <br />
      {recipes.length ? (
        <Recipes recipes={recipes} />
      ) : (
        <h2>No Recipes Found</h2>
      )}
    </div>
  );
}

export default App;
