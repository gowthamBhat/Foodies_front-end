import React from 'react'
import './App.css'
import Recipes from './components/Recipes/Recipes'
import Auth from './components/auth/Auth'
import { Routes, Route } from 'react-router-dom'
import UserDashBoard from './components/UserDashBoard'

import AddRecipes from './components/Recipes/AddRecipes'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Recipes />} />

        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<UserDashBoard />} />
        <Route path="/addrecipe" element={<AddRecipes />} />
      </Routes>
      {/*  */}
    </div>
  )
}

export default App
