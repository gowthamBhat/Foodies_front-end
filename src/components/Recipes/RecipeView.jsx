import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import Moment from 'react-moment'
function RecipeView({
  recipes,
  setSelectedImg,
  deleteHandler,
  updateHandler,
  onLike,
  onDislike,
  currentUser,
  ignore
}) {
  let serverAddress = `http://localhost:8000/`

  return (
    <>
      {recipes.map((recipe) => (
        <div className="recipe" key={uuidv4()}>
          <h2>{recipe.label}</h2>
          <span
            style={{
              fontWeight: 'bold',
              color: 'black',
              marginBottom: '6px',
              fontSize: '13px'
            }}
          >
            <Moment fromNow>{recipe.createdAt}</Moment>
          </span>

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
                  className="fas fa-heart fa-2x"
                ></i>
              ) : (
                <i
                  className="far fa-heart fa-2x"
                  onClick={() => onLike(recipe._id)}
                ></i>
              ))}

            {currentUser && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <span className="likes-label">Likes-{recipe.likes.length}</span>
                <span className="likes-label">
                  coins-{recipe.likes.length * 2}
                </span>
              </div>
            )}
          </div>
          <div className="recipe-handle-button-container">
            {(deleteHandler || updateHandler) && (
              <div>
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
            <div>
              {' '}
              {ignore && (
                <button onClick={() => ignore(recipe._id)}>ignore</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default RecipeView
