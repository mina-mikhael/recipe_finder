import React from "react";
import { Recipe as RecipeType } from "../App";

type RecipeProps = {
  recipe: RecipeType;
};

const Recipe = (props: RecipeProps) => {
  const { recipe } = props;
  const {
    label,
    image,
    cuisineType,
    ingredientLines,
    calories,
    dishType,
    url,
  } = recipe;

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className="recipe_item">
      <h3>{label} </h3>
      <img src={image} alt={label} onClick={() => handleClick()} />
      <div className="first_div">
        <p>
          <strong>Calories:</strong> {calories}
        </p>
        <p>
          <strong>Cuisine Type:</strong> {cuisineType.join(", ")}
        </p>
        <p>
        <strong>Dish Type:</strong> {dishType.join(", ")}
      </p>
      </div>

      <ul>
        <strong>Ingredients:</strong>
        {ingredientLines.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>;
        })}
      </ul>
    </div>
  );
};

export default Recipe;
