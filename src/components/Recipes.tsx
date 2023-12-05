import React from "react";
import Recipe from "./Recipe";
import { Recipe as RecipeType } from "../App";

type Props = {
  recipes: RecipeType[];
  prevInput: string;
};

const Recipes = (props: Props) => {
  const { recipes, prevInput } = props;
  return (
    <div className="recipes_main">
      <h2 style={{ textAlign: "center" }}>{`${prevInput} Results`}</h2>
      <div className="recipes_container">
        {recipes.map((el, idx) => {
          return <Recipe key={el.label + idx} recipe={el} />;
        })}
      </div>
    </div>
  );
};

export default Recipes;
