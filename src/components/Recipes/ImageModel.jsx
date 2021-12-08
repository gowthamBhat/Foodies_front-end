import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import LocalStroageContainer from './../LocalStroageContainer'
import { ToastContainer, toast } from 'react-toastify'
import http from './../http'

function ImageModel({ selectedImg, setSelectedImg }) {
  console.log(selectedImg)

  let serverAddress = `http://localhost:8000/`
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) setSelectedImg(null)
  }
  const handleWishList = async (recipe_id) => {
    try {
      const { _id: authorId } = LocalStroageContainer.getCurrentUser()
      console.log('passed', recipe_id, authorId)
      let response = await http.post(serverAddress + 'wishlist', {
        userId: authorId,
        recipeId: recipe_id
      })
      toast.success('recipe added to wish list')
      console.log('wishlist APi response', response)
    } catch (error) {
      toast.warn(' Login to add WishList!')
    }
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="model-image-wrap">
        <img src={serverAddress + selectedImg.url} alt="enlarged recipe img" />
      </div>

      <div className="model-recipe-info">
        <div className="model-recipe-content">
          <p className="model-recipeLabel">{selectedImg.label}</p>
          <p>author-{selectedImg.authorUsername} </p>
          <p>Recipe Source:{selectedImg.source}</p>
          <p>
            <i> ingredients </i>
          </p>
          {selectedImg.ingredients.map((x) => (
            <p key={uuidv4()}>
              {x.text}:{x.weight}
            </p>
          ))}

          <p>
            <i> dietLabels</i>
          </p>
          {selectedImg.dietLabels.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>
            <i> healthLabels</i>
          </p>
          {selectedImg.healthLabels.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>
            <i> meal type</i>
          </p>
          {selectedImg.mealType.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>
            <i> cuisine type</i>
          </p>
          {selectedImg.cuisineType.map((x) => (
            <span key={uuidv4()}>{x + ' '}</span>
          ))}
          <p>making description</p>
          <p>{selectedImg.makingDescription}</p>
        </div>
        <button className="btn" onClick={() => handleWishList(selectedImg._id)}>
          Add to whishlist
        </button>
        <ToastContainer />
      </div>
    </div>
  )
}

export default ImageModel
