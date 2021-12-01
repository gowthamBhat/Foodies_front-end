import React, { useState } from 'react'
import RecipeDetails from './RecipeDetails'

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false)
  const { label, url, ingredients } = recipe
  let addedUrl = `http://localhost:8000/${url}`
  return (
    <div className="recipe">
      <h2>{label}</h2>
      <img src={addedUrl} alt={label} height="200" width="300" />
      {/* <a href={url} target="_blank" rel="noopener noreferrer">
        URL
      </a> */}

      <button onClick={() => setShow(!show)}>Ingredients</button>
      {show && <RecipeDetails ingredients={ingredients} />}
    </div>
  )
}

export default Recipe
