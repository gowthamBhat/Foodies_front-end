import React, { useState, useEffect } from 'react'
import './NavBar.css'
import LocalStroageContainer from './LocalStroageContainer'
import { Link } from 'react-router-dom'

function NavBar() {
  const [currentUser, setcurrentUser] = useState(null)
  useEffect(() => {
    setcurrentUser(LocalStroageContainer.getCurrentUser())
  }, [])
  return (
    <div className="navbar-main">
      <ul>
        {currentUser && (
          <li>
            <span className="link-tag active">
              Welcome {currentUser.name}!!
            </span>
          </li>
        )}
        <li>
          <Link className="link-tag" to="/">
            Home
          </Link>
        </li>
        {currentUser && (
          <li style={{ cursor: 'pointer' }}>
            <Link className="link-tag" to="/dashboard">
              Profile
            </Link>
          </li>
        )}
        {currentUser && (
          <li style={{ cursor: 'pointer' }}>
            <Link className="link-tag" to="/addrecipe/new">
              Add Recipe
            </Link>
          </li>
        )}

        <li>
          <Link to="/about" className="link-tag">
            About
          </Link>
        </li>
        {!currentUser && (
          <li style={{ float: 'right', cursor: 'pointer' }}>
            <Link to="/login" className="link-tag">
              Login
            </Link>
          </li>
        )}
        {currentUser && (
          <li style={{ float: 'right', cursor: 'pointer' }}>
            <span
              className="link-tag"
              onClick={() => {
                localStorage.removeItem('token')
                window.location = '/'
              }}
            >
              Logout
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NavBar
