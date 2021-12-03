import React from 'react'
import './App.css'
import Recipes from './components/Recipes/Recipes'
import Auth from './components/auth/Auth'
import { Route, Switch } from 'react-router-dom'
import UserDashBoard from './components/UserDashBoard'

import AddRecipes from './components/Recipes/AddRecipes'
function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={UserDashBoard} />
        <Route path="/addrecipe" component={AddRecipes} />
        <Route path="/" exact component={Recipes} />
      </Switch>
    </div>
  )
}

export default App
