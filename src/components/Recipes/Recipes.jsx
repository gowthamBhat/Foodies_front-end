import React, { useState, useEffect } from 'react'
import '../../App.css'

import Axios from 'axios'
import Alert from './Alert'

import ImageModel from './ImageModel'
import RecipeView from './RecipeView'

import LocalStroageContainer from './../LocalStroageContainer'
import { toast, ToastContainer } from 'react-toastify'

function Recipes() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [selectedImg, setSelectedImg] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getData()
    let jwt = LocalStroageContainer.getCurrentUser()
    setCurrentUser(jwt)
  }, [])

  const getData = async () => {
    const { data } = await Axios.get('http://localhost:8000/recipe')
    setRecipes(data)
  }
  const onLike = async (recipeId) => {
    try {
      let { data: liked } = await Axios.put(
        'http://localhost:8000/recipe/api/like',
        {
          recipeId: recipeId,
          userId: currentUser._id
        }
      )
      //comparing old recipe with new updated like recipe if that old recipe matches with new liked recipe i will replace it with new
      //otherwise i will put the old recipes
      let newState = recipes.map((oldrecipe) => {
        if (liked._id === oldrecipe._id) return liked
        return oldrecipe
      })
      setRecipes(newState)
      console.log('liked recipe', liked)
    } catch (error) {
      toast.error('error occured while liking')
      console.log('catched error while liking', error)
    }

    // console.log('onlike called', recipeId, currentUser._id)
  }
  const onDislike = async (recipeId) => {
    try {
      let { data: disliked } = await Axios.put(
        'http://localhost:8000/recipe/api/unlike',
        {
          recipeId: recipeId,
          userId: currentUser._id
        }
      )
      let newState = recipes.map((oldrecipe) => {
        if (disliked._id === oldrecipe._id) return disliked
        return oldrecipe
      })
      setRecipes(newState)
      console.log('unliked recipe', disliked)
    } catch (error) {
      toast.error('error occured while unliking')
      console.log('catched error while un liking', error)
    }
    // console.log('ondislike called', recipeId, currentUser._id)
  }

  const getSearchResults = async () => {
    if (query !== '') {
      const { data } = await Axios.get(`http://localhost:8000/search/${query}`)
      // if (!result.data.more) {
      //   return setAlert('No food with such name')
      // }

      setRecipes(data)
      setQuery('')
      setAlert('')
    } else {
      toast.warn('please fill the search box')
    }
  }

  const onChange = (e) => setQuery(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    getSearchResults()
  }

  return (
    <div className="App">
      {alert !== '' && <Alert alert={alert} />}
      <form
        onSubmit={onSubmit}
        className="search-form"
        style={{ marginTop: '20px' }}
      >
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Search Food"
          style={{ backgroundColor: '#04AA6D', color: 'white' }}
        />
        <input
          type="submit"
          value="Search"
          style={{ backgroundColor: '#333333' }}
        />
      </form>
      <div className="recipes">
        {recipes !== [] && (
          <RecipeView
            setSelectedImg={setSelectedImg}
            recipes={recipes}
            onLike={onLike}
            onDislike={onDislike}
            currentUser={currentUser}
          />
        )}
      </div>
      {selectedImg && (
        <ImageModel selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  )
}

export default Recipes
