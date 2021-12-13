import React, { useState, useEffect } from 'react'
import LocalStroageContainer from './../LocalStroageContainer'
import axios from 'axios'
import RecipeView from './../Recipes/RecipeView'
import ImageModel from './../Recipes/ImageModel'

function WishList() {
  const [recipes, setrecipes] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  const pageInWishList = true //passing this variable to image model just to hide the wishlist button
  useEffect(() => {
    let jwt = LocalStroageContainer.getCurrentUser()
    // setcurrentUser(jwt)
    getBookmarkedMovies(jwt)
  }, [])

  const getBookmarkedMovies = async ({ _id, name }) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/wishlist/${_id}`)
      console.log('wishlist data', data)

      setrecipes(data)
    } catch (error) {
      console.log('error from wishlist', error)
    }
  }
  console.log('wishList state', recipes)
  const publishedRecipeStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div>
      <center>
        <h2
          style={{
            fontFamily: 'monospace',
            marginTop: '15px',
            fontSize: '20px'
          }}
        >
          wishList Number of Recipes Bookmarked {recipes.length}
        </h2>
      </center>
      <div className="" style={publishedRecipeStyle}>
        {recipes !== [] && (
          <RecipeView setSelectedImg={setSelectedImg} recipes={recipes} />
        )}
      </div>
      {selectedImg && (
        <ImageModel
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          pageInWishList={pageInWishList}
        />
      )}
    </div>
  )
}

export default WishList
