import React from 'react'

import { v4 as uuidv4 } from 'uuid'

function RecipeView({
  recipes,
  setSelectedImg,
  deleteHandler,
  updateHandler,
  onLike,
  onDislike,
  currentUser
}) {
  let serverAddress = `http://localhost:8000/`
  return (
    <>
      {recipes.map((recipe) => (
        <div className="recipe" key={uuidv4()}>
          <h2>{recipe.label}</h2>
          <img
            src={serverAddress + recipe.url}
            alt={recipe.label}
            height="200"
            width="300"
            onClick={() => setSelectedImg(recipe)}
          />

          <div className="recipe-handle-button-container">
            {currentUser &&
              (recipe.likes.includes(currentUser._id) ? (
                <i
                  onClick={() => onDislike(recipe._id)}
                  className="fas fa-heart fa-3x"
                ></i>
              ) : (
                <i
                  className="far fa-heart fa-3x"
                  onClick={() => onLike(recipe._id)}
                ></i>
              ))}
            {/* <button onClick={() => onDislike(recipe._id)}>Dislike</button> */}
            {/* <button onClick={() => onLike(recipe._id)}>Like</button> */}

            {currentUser && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <span className="likes-label">Likes-{recipe.likes.length}</span>
                <span className="likes-label">
                  coins-{recipe.likes.length * 2}
                </span>
              </div>
            )}
          </div>

          {(deleteHandler || updateHandler) && (
            <div className="recipe-handle-button-container">
              {updateHandler && (
                <button
                  onClick={() => {
                    updateHandler(recipe._id)
                  }}
                >
                  Update
                </button>
              )}
              <button
                onClick={() => {
                  deleteHandler(recipe._id)
                }}
              >
                Delete
              </button>
            </div>
          )}

          {/* <button onClick={() => setShow(!show)}>Ingredients</button> */}
          {/* {show && <RecipeDetails ingredients={recipe.ingredients} />} */}
        </div>
      ))}
    </>
  )
}

export default RecipeView
