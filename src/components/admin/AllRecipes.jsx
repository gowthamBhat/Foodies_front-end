import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import RecipeView from './../Recipes/RecipeView'
import ImageModel from './../Recipes/ImageModel'
function AllRecipes() {
  const [recipes, setrecipes] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)

  useEffect(() => {
    getAllRecipes()
  }, [])
  const getAllRecipes = async () => {
    const { data } = await axios.get('http://localhost:8000/recipe')
    setrecipes(data)
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
  //   console.log('recipe from admin dash', recipe)

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
          Total Recipes {recipes.length}
        </h2>
      </center>

      <div className="" style={publishedRecipeStyle}>
        {recipes !== [] && (
          <RecipeView
            setSelectedImg={setSelectedImg}
            recipes={recipes}
            deleteHandler={deleteHandler}
          />
        )}
      </div>

      {selectedImg && (
        <ImageModel
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          isAdmin={true}
        />
      )}
    </div>
  )
}

export default AllRecipes
