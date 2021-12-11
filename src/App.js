import React from 'react'
import './App.css'
import Recipes from './components/Recipes/Recipes'
import Auth from './components/auth/Auth'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserDashBoard from './components/dashboard/UserDashBoard'

import AddRecipes from './components/Recipes/AddRecipes'

import NotFound from './components/NotFound'
import Check from './components/test/Check'

import NavBar from './components/NavBar'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './components/admin/AdminDashboard'
import FeedBack from './components/FeedBack'

function App() {
  return (
    <div>
      <center>
        <NavBar />
      </center>

      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={UserDashBoard} />
        <Route path="/admin" component={AdminDashboard} />

        <Route path="/addrecipe/:id" component={AddRecipes} />
        <Route path="/check" component={Check} />
        <Route path="/feedback" component={FeedBack} />
        <Route path="/notfound" component={NotFound} />

        <Route path="/" component={Recipes} />
        <Redirect to="/notfound" />
      </Switch>
      <ToastContainer />
    </div>
  )
}

export default App
