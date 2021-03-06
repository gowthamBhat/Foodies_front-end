import React from 'react'

import { Link, Route } from 'react-router-dom'

import WishList from './WishList'

import PublishedRecipes from './PublishedRecipes'
import RecipePoints from './RecipePoints'

function UserDashBoard(props) {
  return (
    <div className="App">
      <div className="userdash-nav">
        <Link to="/dashboard/wishlist">Wishlist</Link>
        <Link to="/dashboard/published">Published Recipes</Link>
        <RecipePoints />
      </div>

      <Route path="/dashboard/wishlist" component={WishList} />
      <Route
        path="/dashboard/published"
        render={(props) => <PublishedRecipes {...props} />}
      />
    </div>
  )
}

export default UserDashBoard
