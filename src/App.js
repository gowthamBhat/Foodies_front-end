import React from 'react'
import './App.css'
import Recipes from './components/Recipes/Recipes'
import Auth from './components/auth/Auth'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import UserDashBoard from './components/UserDashBoard'

import AddRecipes from './components/Recipes/AddRecipes'

import NotFound from './components/NotFound'
import Check from './components/test/Check'

import NavBar from './components/NavBar'

function App() {
  return (
    <div>
      <center>
        <NavBar />
      </center>

      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={UserDashBoard} />
        <Route path="/addrecipe/:id" component={AddRecipes} />
        <Route path="/check" component={Check} />
        <Route path="/notfound" component={NotFound} />

        <Route path="/" component={Recipes} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  )
}

export default App
