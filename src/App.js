import React from 'react'
import './App.css'
import Recipes from './components/Recipes/Recipes'
import Auth from './components/auth/Auth'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserDashBoard from './components/UserDashBoard'

import AddRecipes from './components/Recipes/AddRecipes'

import NotFound from './components/NotFound'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={UserDashBoard} />
        <Route path="/addrecipe" component={AddRecipes} />
        <Route path="/notfound" component={NotFound} />

        <Route path="/" exact component={Recipes} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  )
}

export default App
