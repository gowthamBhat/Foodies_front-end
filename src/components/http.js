import axios from 'axios'
import { toast } from 'react-toastify'
import LocalStroageContainer from './LocalStroageContainer'

axios.interceptors.response.use(null, (error) => {
  const expextedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  if (!expextedError) {
    // console.log('logging the error', error);
    console.log(error)

    toast.error('An unexpected error occured')
  }
  return Promise.reject(error)
})
axios.defaults.headers.common['x-auth-token'] = LocalStroageContainer.getJwt() //to send token with every request made to server

const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put
}
export default http
