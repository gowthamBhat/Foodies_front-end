import React, { useState, useEffect } from 'react'
import '../../App.css'

import Axios from 'axios'
import Alert from './Alert'
import NavBar from './../NavBar'
import ImageModel from './ImageModel'
import RecipeView from './RecipeView'

function Recipes() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [selectedImg, setSelectedImg] = useState(null)

  useEffect(async () => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await Axios.get('http://localhost:8000/recipe')
    setRecipes(data)
  }

  const getSearchResults = async () => {
    if (query !== '') {
      const { data } = await Axios.get(`http://localhost:8000/recipe/${query}`)
      // if (!result.data.more) {
      //   return setAlert('No food with such name')
      // }

      setRecipes(data)
      setQuery('')
      setAlert('')
    } else {
      setAlert('Please fill the form')
    }
  }

  const onChange = (e) => setQuery(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    getSearchResults()
  }

  return (
    <div className="App">
      <NavBar />

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
        />
        <input type="submit" value="Search" />
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
