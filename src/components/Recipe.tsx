import React, { useState } from "react";
import { Recipe as RecipeType } from "../App";

type RecipeProps = {
  recipe: RecipeType;
};

const Recipe = (props: RecipeProps) => {
  const { recipe } = props;
  const [active, setActive] = useState(false);
  const [divActive, setDivActive] = useState(false);

  const {
    label,
    image,
    cuisineType,
    ingredientLines,
    calories,
    dishType,
    url,
  } = recipe;

  const handleClick = (): void => {
    window.open(url, "_blank");
  };

  const handleMouseOver = (): void => {
    setActive(true);
  };

  const handleMouseLeave = (): void => {
    setActive(false);
  };

  const divClickHandler = (): void => {
    setDivActive(!divActive);
  };

  return (
    <div className={`recipe_item ${divActive ? "active" : ""}`}>
      <div className="pic_div">
        <div
          style={{ position: "relative" }}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}>
          <img
            src={image}
            alt={label}
            className={`${active ? "active" : ""}`}
          />
          <span
            className={`learn_more ${active ? "active" : ""}`}
            onClick={() => handleClick()}>
            Learn More
          </span>
        </div>
        <h3>{label} </h3>
      </div>
      <div
        className={`first_div ${divActive ? "" : "active"}`}
        onClick={() => divClickHandler()}>
        <p>
          <strong>Calories:</strong> {calories}
        </p>
        <p>
          <strong>Cuisine Type:</strong>{" "}
          {cuisineType?.length > 0 ? cuisineType.join(", ") : ""}
        </p>
        <p>
          <strong>Dish Type:</strong>{" "}
          {dishType?.length > 0 ? dishType.join(", ") : ""}
        </p>
      </div>
      <div
        className={`second_div ${divActive ? "active" : ""}`}
        onClick={() => divClickHandler()}>
        <ul>
          <strong>Ingredients:</strong>
          {ingredientLines.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;
