import Axios from 'axios'

const endPoint = 'http://localhost:8000/recipe'

export function saveRecipe(state, loggedUserDetails) {
  const fd = new FormData()
  fd.append('recipeImage', state.recipeImage, state.recipeImage.name)
  fd.append('authorUsername', loggedUserDetails.authorUsername)
  fd.append('authorId', loggedUserDetails.authorId)
  fd.append('label', state.label)
  fd.append('source', state.source)
  fd.append('dietlabels', JSON.stringify(state.dietlabels))
  fd.append('healthlabels', JSON.stringify(state.healthlabels))
  fd.append('ingredients', JSON.stringify(state.ingredients))
  fd.append('cuisineType', JSON.stringify(state.cuisineType))
  fd.append('mealType', JSON.stringify(state.mealType))
  fd.append('makingDescription', state.makingDescription)
  if (state._id) {
    return Axios.put(`${endPoint}/${state._id}`, fd)
  }
  return Axios.post(endPoint, fd)
}
export async function getRecipe(id) {
  console.log(id)

  const { data } = await Axios.get(`${endPoint}/byId/${id}`)
  return data
}
const getAllRecipes = async () => {
  const { data } = await Axios.get('http://localhost:8000/recipe')
  return data
}
