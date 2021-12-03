import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import LocalStroageContainer from './LocalStroageContainer'
import axios from 'axios'
import RecipeView from './Recipes/RecipeView'
import ImageModel from './Recipes/ImageModel'

function UserDashBoard() {
  const [recipes, setrecipes] = useState([])
  const [currentUser, setcurrentUser] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)
  useEffect(() => {
    let jwt = LocalStroageContainer.getCurrentUser()
    setcurrentUser(jwt)
    getUserSpecificRecipe(jwt)
  }, [])
  const getUserSpecificRecipe = async (token) => {
    try {
      const { data } = await axios.post('http://localhost:8000/userRecipes', {
        user_id: token._id
      })
      setrecipes(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(recipes)

  return (
    <div className="App">
      <NavBar currentUser={currentUser} />
      <h2
        style={{ fontFamily: 'monospace', marginTop: '5px', fontSize: '20px' }}
      >
        Number of Recipes published {recipes.length}
      </h2>
      <div className="recipes">
        {recipes !== [] && (
          <RecipeView setSelectedImg={setSelectedImg} recipes={recipes} />
        )}
      </div>
      {selectedImg && (
        <ImageModel selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  )
}

export default UserDashBoard
