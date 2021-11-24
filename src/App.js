import React from 'react'
import './App.css'
import Recipes from './components/Recipes/Recipes'
import Auth from './components/auth/Auth'
import { Routes, Route } from 'react-router-dom'
import UserDashBoard from './components/UserDashBoard'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Recipes />} />

        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<UserDashBoard />} />
      </Routes>
      {/*  */}
    </div>
  )
}

export default App
