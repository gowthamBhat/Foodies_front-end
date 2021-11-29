import React, { useState } from 'react'
import './AddRecipes.css'
function AddRecipes() {
  const [state, setstate] = useState({
    label: '',
    source: '',
    dietlabels: [],
    healthlabels: [],
    cuisineType: [],
    ingredients: [],
    mealType: [],
    makingDescription: '',
    recipeImage: null
  })
  const [arrayState, arraySetSate] = useState({
    dietlabels: '',
    healthlabels: '',
    cuisineType: '',
    ingredients: { text: '', weight: '' },
    mealType: ''
  })

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
  const addcuisineType = () => {
    let replica = { ...state }
    let arrayreplica = { ...arrayState }
    replica.cuisineType.push(arrayState.cuisineType)
    setstate(replica)
    arrayreplica.cuisineType = ''
    arraySetSate(arrayreplica)
  }
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
    replica.ingredients.push(arrayState.ingredients)
    setstate(replica)
    arrayreplica.ingredients = { text: '', weight: '' }

    arraySetSate(arrayreplica)
  }

  console.log(state.ingredients)

  return (
    <div className="recipeForm container">
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          alignItems: 'center'
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
        {/* <label className="addrecipe-labels" htmlFor="url">
          URL
        </label>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="paste url"
          className="inputs"
        /> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: '5px 5px'
          }}
        >
          <label className="addrecipe-labels" htmlFor="dietlabels">
            diet labels
          </label>
          <input
            type="text"
            id="dietlabels"
            name="dietlabels"
            onChange={arrayElementSeparateStateHandler}
            value={arrayState.dietlabels}
            placeholder="type labels"
            className="inputs"
          />
          <button
            style={{ width: '40px' }}
            type="button"
            onClick={addDietLabels}
          >
            Add
          </button>
          <p>{String(state.dietlabels)}</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: '5px 5px'
          }}
        >
          <label className="addrecipe-labels" htmlFor="healthlabels">
            Health labels
          </label>
          <input
            type="text"
            value={arrayState.healthlabels}
            onChange={arrayElementSeparateStateHandler}
            id="healthlabels"
            name="healthlabels"
            placeholder="health lables"
            className="inputs"
          />
          <button
            style={{ width: '40px' }}
            type="button"
            onClick={addHealthLables}
          >
            Add
          </button>
          {String(state.healthlabels)}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: '5px 5px'
          }}
        >
          <label className="addrecipe-labels" htmlFor="cuisineType">
            cuisine type
          </label>
          <input
            type="text"
            id="cuisineType"
            value={arrayState.cuisineType}
            onChange={arrayElementSeparateStateHandler}
            name="cuisineType"
            placeholder="add cautions"
            className="inputs"
          />
          <button
            style={{ width: '40px' }}
            type="button"
            onClick={addcuisineType}
          >
            Add
          </button>
          {String(state.cuisineType)}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: '5px 5px'
          }}
        >
          <label className="addrecipe-labels" htmlFor="mealtype">
            meal type
          </label>
          <input
            type="text"
            id="mealtype"
            name="mealType"
            value={arrayState.mealType}
            onChange={arrayElementSeparateStateHandler}
            placeholder="add cautions"
            className="inputs"
          />
          <button style={{ width: '40px' }} type="button" onClick={addmealType}>
            Add
          </button>
          {String(state.mealType)}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: '5px 5px'
          }}
        >
          <label className="addrecipe-labels" htmlFor="ingredients">
            ingredients
          </label>
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
            style={{ width: '50px', marginLeft: '7px' }}
            type="button"
            onClick={AddingredientsClick}
          >
            Add
          </button>
        </div>

        {/* 
        <label className="addrecipe-labels" htmlFor="country">
          Country
        </label>
        <select id="country" name="country" className="inputs">
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select> */}
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
          <label className="addrecipe-labels" htmlFor="recipeImage">
            Add recipe image
          </label>
          <input
            type="file"
            name="recipeImage"
            onChange={imageUploadFileHandler}
            id="recipeImage"
          />
        </div>

        <input type="submit" value="Submit" className="inputs submit" />
      </form>
    </div>
  )
}

export default AddRecipes
