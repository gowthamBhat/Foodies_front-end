import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import LocalStroageContainer from './LocalStroageContainer'
import axios from 'axios'
import RecipeView from './Recipes/RecipeView'
import ImageModel from './Recipes/ImageModel'
import { ToastContainer, toast } from 'react-toastify'

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
      const { data } = await axios.get(
        `http://localhost:8000/recipe/${token._id}`
      )
      setrecipes(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(recipes)
  const updateHandler = (recipe_id) => {
    console.log('update handler called', recipe_id)
  }
  const deleteHandler = async (recipe_id) => {
    const previousRecipeState = recipes
    const recipe = recipes.filter((x) => x._id !== recipe_id)
    setrecipes(recipe)
    try {
      const result = await axios.delete(
        `http://localhost:8000/recipe/${recipe_id}`
      )
      toast.success('Post deleted')
      console.log(result)
    } catch (e) {
      toast.error('Something went wrong while Deleting Movie')
      setrecipes(previousRecipeState)
    }
  }
  return (
    <div className="App">
      <ToastContainer />
      <NavBar currentUser={currentUser} />
      <h2
        style={{ fontFamily: 'monospace', marginTop: '5px', fontSize: '20px' }}
      >
        Number of Recipes published {recipes.length}
      </h2>
      <div className="recipes">
        {recipes !== [] && (
          <RecipeView
            setSelectedImg={setSelectedImg}
            recipes={recipes}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          />
        )}
      </div>
      {selectedImg && (
        <ImageModel selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  )
}

export default UserDashBoard
