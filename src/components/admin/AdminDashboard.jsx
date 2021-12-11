import React, { useState, useEffect } from 'react'

import { Link, Route } from 'react-router-dom'
import AllRecipes from './AllRecipes'
import { ToastContainer } from 'react-toastify'
import AllUsers from './AllUsers'
import AdminFeedback from './AdminFeedback'
function AdminDashboard() {
  return (
    <div className="App">
      <div className="userdash-nav">
        <Link to="/admin/allrecipes">All Recipes</Link>
        <Link to="/admin/allusers">All Users</Link>
        <Link to="/admin/feedback">Feedbacks</Link>
      </div>

      <Route path="/admin/allrecipes" component={AllRecipes} />
      <Route path="/admin/allusers" component={AllUsers} />
      <Route path="/admin/feedback" component={AdminFeedback} />

      <ToastContainer />
    </div>
  )
}

export default AdminDashboard
