import ImageModel from './../Recipes/ImageModel'
import RecipeView from './../Recipes/RecipeView'
import LocalStroageContainer from './../LocalStroageContainer'
import { toast } from 'react-toastify'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
function PublishedRecipes(props) {
  const [recipes, setrecipes] = useState([])
  // const [currentUser, setcurrentUser] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)
  useEffect(() => {
    let jwt = LocalStroageContainer.getCurrentUser()
    // setcurrentUser(jwt)
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

  const updateHandler = (recipe_id) => {
    console.log('update handler called', recipe_id)
    props.history.push(`/addrecipe/${recipe_id}`)
    // window.location = `/addrecipe/${recipe_id}`
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
          Number of Recipes published {recipes.length}
        </h2>
      </center>
      <div className="" style={publishedRecipeStyle}>
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

export default PublishedRecipes
