import React from 'react'

import { v4 as uuidv4 } from 'uuid'

function RecipeView({ recipes, setSelectedImg }) {
  let serverAddress = `http://localhost:8000/`
  return (
    <>
      {recipes.map((recipe) => (
        <div
          className="recipe"
          key={uuidv4()}
          onClick={() => setSelectedImg(recipe)}
        >
          <h2>{recipe.label}</h2>
          <img
            src={serverAddress + recipe.url}
            alt={recipe.label}
            height="200"
            width="300"
          />

          {/* <button onClick={() => setShow(!show)}>Ingredients</button> */}
          {/* {show && <RecipeDetails ingredients={recipe.ingredients} />} */}
        </div>
      ))}
    </>
  )
}

export default RecipeView
