import React, { useState } from "react";
import "./App.css";
import RecipeForm from "./components/RecipeForm";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputText);
    setInputText("");
  };

  return (
    <div className="App">
      <h1>Find the Perfect Recipe</h1>
      <RecipeForm
        inputText={inputText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
