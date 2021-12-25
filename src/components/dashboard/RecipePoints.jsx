import React, { useState, useEffect } from 'react'
import LocalStroageContainer from './../LocalStroageContainer'
import http from './../http'

function RecipePoints() {
  const [currentUser, setcurrentUser] = useState(null)
  const [totalLikes, setTotalLikes] = useState(0)
  useEffect(() => {
    let jwtuser = LocalStroageContainer.getCurrentUser()

    getUserSpecificPoints(jwtuser._id)
  }, [])

  const getUserSpecificPoints = async (id) => {
    try {
      const { data } = await http.get(
        `http://localhost:8000/recipe/perkcoins/${id}`
      )
      console.log(data)

      setTotalLikes(data.total_likes)
    } catch (error) {
      console.log(error)
    }
  }
  console.log('total likes', totalLikes)

  return (
    <div>
      <h1>
        total likes-{totalLikes}, coins-{totalLikes * 2}
      </h1>
    </div>
  )
}

export default RecipePoints
