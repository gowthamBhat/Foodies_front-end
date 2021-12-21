import React, { useState, useEffect } from 'react'
import './AddRecipes.css'
import { v4 as uuidv4 } from 'uuid'
import LocalStroageContainer from './../LocalStroageContainer'
import { toast } from 'react-toastify'
import { getRecipe, saveRecipe } from './RecipeServices'

function AddRecipes(props) {
  //main state
  const [state, setstate] = useState({
    label: '',
    source: '',
    dietlabels: [],
    healthlabels: [],
    cuisineType: '',
    ingredients: [],
    mealType: [],
    makingDescription: '',
    recipeImage: null
  })
  //secondary state
  const [arrayState, arraySetSate] = useState({
    dietlabels: '',
    healthlabels: '',
    // cuisineType: '',
    ingredients: { text: '', weight: '' },
    mealType: ''
  })

  //state to save current user details
  const [loggedUserDetails, setLoggedUserDetails] = useState({
    authorUsername: '',
    authorId: ''
  })

  //use effect to get the current user details
  useEffect(() => {
    try {
      const { name: authorUsername, _id: authorId } =
        LocalStroageContainer.getCurrentUser()
      setLoggedUserDetails({ authorUsername, authorId })
    } catch (error) {
      toast.warn(' Login to add Recipes!')
      setInterval(() => {
        window.location = '/login'
      }, 5000)
    }
  }, [])

  //use effect to prepoulate the movie, only if the request is coming from update handler from Userdashboard.jsx
  useEffect(() => {
    populateMovie()
  }, [])

  const populateMovie = async () => {
    try {
      const recipeId = props.match.params.id
      // console.log(recipeId);

      if (recipeId === 'new') return
      //retriving whole recipe document to fetch it to state and populate it
      const recipe = await getRecipe(recipeId)

      setstate(mapToViewModel(recipe[0]))
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error)
      }
    }
  }

  //structuring the backend response according to state
  const mapToViewModel = (recipe) => {
    return {
      _id: recipe._id,
      label: recipe.label,
      source: recipe.source,
      dietlabels: recipe.dietLabels,
      healthlabels: recipe.healthLabels,
      cuisineType: recipe.cuisineType,
      ingredients: recipe.ingredients,
      mealType: recipe.mealType,
      makingDescription: recipe.makingDescription,
      recipeImage: null
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await saveRecipe(state, loggedUserDetails)
      console.log('add recipe api response', response)

      state._id
        ? toast.success('Recipe Updated Successfully')
        : toast.success('Recipe Added Successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const subIngredientStatePush = (event) => {
    let replica = { ...arrayState }
    replica.ingredients[event.target.name] = event.target.value
    arraySetSate(replica)
  }
  //string type field data handling
  const stringTypeFieldDataHandler = (event) => {
    let replicateState = { ...state }
    replicateState[event.target.name] = event.target.value
    setstate(replicateState)
  }
  //image file handling
  const imageUploadFileHandler = (event) => {
    let replicateState = { ...state }
    replicateState['recipeImage'] = event.target.files[0]
    setstate(replicateState)
  }

  //array elements data handling
  const arrayElementSeparateStateHandler = (event) => {
    let repilica = { ...arrayState }
    repilica[event.target.name] = event.target.value
    arraySetSate(repilica)
  }
  const addDietLabels = () => {
    let replica = { ...state }
    let arrayreplica = { ...arrayState }
    replica.dietlabels.push(arrayState.dietlabels)
    setstate(replica)
    arrayreplica.dietlabels = ''
    arraySetSate(arrayreplica)
  }
  const addHealthLables = () => {
    let replica = { ...state }
    let arrayreplica = { ...arrayState }
    replica.healthlabels.push(arrayState.healthlabels)
    setstate(replica)
    arrayreplica.healthlabels = ''
    arraySetSate(arrayreplica)
  }
  // const addcuisineType = () => {
  //   let replica = { ...state }
  //   let arrayreplica = { ...arrayState }
  //   replica.cuisineType.push(arrayState.cuisineType)
  //   setstate(replica)
  //   arrayreplica.cuisineType = ''
  //   arraySetSate(arrayreplica)
  // }
  const addmealType = () => {
    let replica = { ...state }
    let arrayreplica = { ...arrayState }
    replica.mealType.push(arrayState.mealType)
    setstate(replica)
    arrayreplica.mealType = ''
    arraySetSate(arrayreplica)
  }
  const AddingredientsClick = () => {
    let replica = { ...state }
    let arrayreplica = { ...arrayState }
    let ingredientObj = {
      text: arrayState.ingredients.text,
      weight: arrayState.ingredients.weight
    }
    replica.ingredients.push(ingredientObj)
    setstate(replica)
    arrayreplica.ingredients = { text: '', weight: '' }

    arraySetSate(arrayreplica)
  }
  const clearArrayFields = (event) => {
    let copyOFstate = { ...state }
    copyOFstate[event.target.name] = []
    setstate(copyOFstate)
  }

  return (
    <div className="recipeForm App">
      <form
        className="recipe-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        <label className="addrecipe-labels" htmlFor="label">
          Enter Recipe Name
        </label>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="recipe name"
          className="inputs"
          value={state.label}
          onChange={stringTypeFieldDataHandler}
        />
        <br />
        <label className="addrecipe-labels" htmlFor="source">
          Recipe Source
        </label>
        <input
          type="text"
          id="source"
          name="source"
          placeholder="enter source"
          value={state.source}
          onChange={stringTypeFieldDataHandler}
          className="inputs"
        />
        <label className="addrecipe-labels" htmlFor="cuisineType">
          cuisine type
        </label>
        <div className="addrecipe-fields-arraytypes">
          <input
            type="text"
            id="cuisineType"
            value={state.cuisineType}
            onChange={stringTypeFieldDataHandler}
            name="cuisineType"
            placeholder="enter cuisine"
            className="inputs"
          />
          {/* <button type="button" onClick={addcuisineType}>
            Add
          </button>
          <button type="button" name="cuisineType" onClick={clearArrayFields}>
            Clear
          </button> */}
          {/* {String(state.cuisineType)} */}
        </div>

        <label className="addrecipe-labels" htmlFor="dietlabels">
          diet labels
        </label>
        <div className="addrecipe-fields-arraytypes">
          <input
            type="text"
            id="dietlabels"
            name="dietlabels"
            onChange={arrayElementSeparateStateHandler}
            value={arrayState.dietlabels}
            placeholder="type labels"
            className="inputs"
          />
          <button type="button" onClick={addDietLabels}>
            Add
          </button>
          <button type="button" name="dietlabels" onClick={clearArrayFields}>
            Clear
          </button>
          <p>{String(state.dietlabels)}</p>
        </div>
        <label className="addrecipe-labels" htmlFor="healthlabels">
          Health labels
        </label>
        <div className="addrecipe-fields-arraytypes">
          <input
            type="text"
            value={arrayState.healthlabels}
            onChange={arrayElementSeparateStateHandler}
            id="healthlabels"
            name="healthlabels"
            placeholder="health lables"
            className="inputs"
          />
          <button type="button" onClick={addHealthLables}>
            Add
          </button>
          <button type="button" name="healthlabels" onClick={clearArrayFields}>
            Clear
          </button>
          {String(state.healthlabels)}
        </div>

        <label className="addrecipe-labels" htmlFor="mealtype">
          meal type
        </label>
        <div className="addrecipe-fields-arraytypes">
          <input
            type="text"
            id="mealtype"
            name="mealType"
            value={arrayState.mealType}
            onChange={arrayElementSeparateStateHandler}
            placeholder="meal type"
            className="inputs"
          />
          <button type="button" onClick={addmealType}>
            Add
          </button>
          <button type="button" name="mealType" onClick={clearArrayFields}>
            Clear
          </button>
          {String(state.mealType)}
        </div>
        <label className="addrecipe-labels" htmlFor="ingredients">
          ingredients
        </label>
        <div className="addrecipe-fields-arraytypes">
          <input
            type="text"
            id="ingredients"
            name="text"
            value={arrayState.ingredients.text}
            placeholder="ingredient"
            className="inputs"
            onChange={subIngredientStatePush}
            style={{ margin: '0 5px' }}
          />
          <input
            type="text"
            id="quantity"
            name="weight"
            value={arrayState.ingredients.weight}
            onChange={subIngredientStatePush}
            placeholder="quantity"
            className="inputs"
          />
          <button
            style={{ marginLeft: '5px' }}
            type="button"
            onClick={AddingredientsClick}
          >
            Add
          </button>
          <button type="button" name="ingredients" onClick={clearArrayFields}>
            Clear
          </button>
        </div>
        {state.ingredients &&
          state.ingredients.map((x) => (
            <span
              key={uuidv4()}
              style={{ color: '#45a049', fontSize: 'medium' }}
            >
              item:{x.text},quantity:{x.weight}
            </span>
          ))}
        <label className="addrecipe-labels" htmlFor="recipe-description">
          Recipe description
        </label>
        <textarea
          id="recipe-description"
          name="makingDescription"
          value={state.makingDescription}
          onChange={stringTypeFieldDataHandler}
          placeholder="Write something.."
          style={{ height: '200px' }}
          className="inputs"
        ></textarea>

        <div style={{ margin: '15px 0' }}>
          <label
            className="addrecipe-labels"
            htmlFor="recipeImage"
            style={{ marginRight: '5px' }}
          >
            Add recipe image
          </label>
          <input
            type="file"
            name="recipeImage"
            onChange={imageUploadFileHandler}
            id="recipeImage"
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="inputs submit"
          onClick={onFormSubmit}
        />
      </form>
    </div>
  )
}

export default AddRecipes
