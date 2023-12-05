import React from "react";
import Recipe from "./Recipe";
import { Recipe as RecipeType } from "../App";

type Props = {
  recipes: RecipeType[];
};

const Recipes = (props: Props) => {
  const { recipes } = props;
  return (
    <div className="recipes_container">
      {recipes.map((el, idx) => {
        return <Recipe key={el.label + idx} recipe={el} />;
      })}
    </div>
  );
};

export default Recipes;
