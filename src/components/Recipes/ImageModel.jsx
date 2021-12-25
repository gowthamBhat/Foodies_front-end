import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import LocalStroageContainer from './../LocalStroageContainer'
import { toast } from 'react-toastify'
import http from './../http'
import Moment from 'react-moment'
function ImageModel({
  selectedImg,
  setSelectedImg,
  pageInWishListPage,
  currentUser
}) {
  // console.log(selectedImg)

  let serverAddress = `http://localhost:8000/`
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) setSelectedImg(null)
  }
  const onReport = async (id) => {
    try {
      let report = await http.put(`http://localhost:8000/recipe/report/${id}`, {
        id: id
      })
      toast.success('post reported')
      console.log('reported post', report)
    } catch (error) {
      console.log('report error', error)
    }
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
      console.log('imahe model response', response)
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.warn('already added to wishlist')
      } else {
        toast.warn(' Login to add WishList!')
      }
      console.log('error from image model', error)
    }
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="model-image-wrap">
        <img src={serverAddress + selectedImg.url} alt="enlarged recipe img" />
      </div>

      <div className="model-recipe-info">
        <div className="model-recipe-content">
          <Moment fromNow>{selectedImg.createdAt}</Moment>
          <div className="model-recipeLabel">
            <p>{selectedImg.label}</p>
          </div>
          <div className="model-info-container">
            <div className="model-author">
              <p>author-{selectedImg.authorUsername} </p>
            </div>
            <div className="model-source">
              {' '}
              <p>Recipe Source:{selectedImg.source}</p>
            </div>
            <div className="model-ingredients">
              <p>
                <i style={{ color: 'aqua', fontWeight: 'bolder' }}>
                  {' '}
                  Ingredients{' '}
                </i>
              </p>
              {selectedImg.ingredients.map((x) => (
                <p key={uuidv4()}>
                  {x.text}:{x.weight}
                </p>
              ))}
            </div>

            <div className="model-dietlabels">
              <p>
                <i style={{ color: 'aqua', fontWeight: 'bolder' }}>
                  {' '}
                  dietLabels
                </i>
              </p>
              {selectedImg.dietLabels.map((x) => (
                <span key={uuidv4()}>{x + ' '}</span>
              ))}
            </div>
            <div className="model-dietlabels">
              {' '}
              <p>
                <i style={{ color: 'aqua', fontWeight: 'bolder' }}>
                  {' '}
                  healthLabels
                </i>
              </p>
              {selectedImg.healthLabels.map((x) => (
                <span key={uuidv4()}>{x + ' '}</span>
              ))}
            </div>
            <div className="model-dietlabels">
              {' '}
              <p>
                <i style={{ color: 'aqua', fontWeight: 'bolder' }}>
                  {' '}
                  meal type
                </i>
              </p>
              {selectedImg.mealType.map((x) => (
                <span key={uuidv4()}>{x + ' '}</span>
              ))}
            </div>
            <div className="model-dietlabels">
              <p>
                <i style={{ color: 'aqua', fontWeight: 'bolder' }}>
                  {' '}
                  cuisine type
                </i>
                - {selectedImg.cuisineType}
              </p>
            </div>
            <div className="model-makingdescription">
              <p style={{ color: 'aqua', fontWeight: 'bolder' }}>
                making description
              </p>
              <p>{selectedImg.makingDescription}</p>
            </div>
          </div>
        </div>

        {!pageInWishListPage && currentUser && !currentUser.isAdmin && (
          <button
            className="btn"
            onClick={() => handleWishList(selectedImg._id)}
          >
            Add to whishlist
          </button>
        )}
        {currentUser && !currentUser.isAdmin && (
          <button
            className="btn-report"
            onClick={() => onReport(selectedImg._id)}
          >
            Report
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageModel
