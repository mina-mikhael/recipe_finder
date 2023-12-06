import React from "react";

type Props = {
  inputText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RecipeForm = (props: Props) => {
  const { inputText, handleChange, handleSubmit } = props;

  return (
    <div className="input_container">
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="type to search for a recipe, ex: seafood pizza"
        />
        {inputText.length > 0 && <button type="submit">Search</button>}
      </form>
    </div>
  );
};

export default RecipeForm;
