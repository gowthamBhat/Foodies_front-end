import React, { useState, useEffect } from 'react'
import '../../App.css'

import Axios from 'axios'
import Alert from './Alert'
import NavBar from './../NavBar'
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
  console.log(currentUser)

  const getData = async () => {
    const { data } = await Axios.get('http://localhost:8000/recipe')
    setRecipes(data)
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
      <ToastContainer />

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
          <RecipeView setSelectedImg={setSelectedImg} recipes={recipes} />
        )}
      </div>
      {selectedImg && (
        <ImageModel selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  )
}

export default Recipes
