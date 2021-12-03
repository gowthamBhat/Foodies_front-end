import jwt from 'jwt-decode'

const tokenKey = 'token'

function loggingOut() {
  localStorage.removeItem(tokenKey)
}
function getCurrentUser() {
  try {
    const embeddedToken = localStorage.getItem(tokenKey)
    return jwt(embeddedToken)
  } catch (error) {
    return null
  }
}
function saveToken(token) {
  localStorage.setItem(tokenKey, token)
}
function getJwt() {
  return localStorage.getItem(tokenKey)
}

const LocalStroageContainer = {
  loggingOut,
  getCurrentUser,
  saveToken,
  getJwt
}

export default LocalStroageContainer
