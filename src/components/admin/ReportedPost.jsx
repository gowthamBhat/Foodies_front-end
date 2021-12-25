import React, { useState, useEffect } from 'react'
import http from './../http'
import RecipeView from './../Recipes/RecipeView'
import ImageModel from './../Recipes/ImageModel'
import { toast } from 'react-toastify'

function ReportedPost() {
  const [recipes, setRecipes] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)
  useEffect(() => {
    getData()
  }, [])

  const deleteHandler = async (recipe_id) => {
    const previousRecipeState = recipes
    const recipe = recipes.filter((x) => x._id !== recipe_id)
    setRecipes(recipe)
    try {
      const result = await http.delete(
        `http://localhost:8000/recipe/${recipe_id}`
      )
      toast.success('Post deleted')
      console.log(result)
    } catch (e) {
      toast.error('Something went wrong while Deleting Movie')
      setRecipes(previousRecipeState)
    }
  }

  const ignoreHandler = async (id) => {
    try {
      let report = await http.put(
        `http://localhost:8000/recipe/ignorereport/${id}`,
        {
          id: id
        }
      )
      console.log('report ignored', report)

      toast.success('post ignored')
      let newState = recipes.filter((x) => x._id !== id)
      setRecipes(newState)
    } catch (error) {
      console.log('post ignore error', error)
    }
  }

  const getData = async () => {
    try {
      const { data } = await http.get(
        'http://localhost:8000/recipe/reported/allposts'
      )
      setRecipes(data)
    } catch (error) {
      console.log('error while fetching reported posts', error)
    }
  }
  return (
    <div>
      <center>
        <h2>Reported posts</h2>
      </center>

      <div className="Reported-recipes">
        {recipes !== [] && (
          <RecipeView
            setSelectedImg={setSelectedImg}
            recipes={recipes}
            deleteHandler={deleteHandler}
            ignore={ignoreHandler}
          />
        )}
      </div>
      {selectedImg && (
        <ImageModel selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  )
}

export default ReportedPost
