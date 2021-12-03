import React from 'react'
import './NavBar.css'

function NavBar({ currentUser }) {
  return (
    <ul>
      {currentUser && (
        <li>
          <span className="link-tag active">Welcome {currentUser.name}!!</span>
        </li>
      )}
      <li>
        <a className="link-tag" href="/">
          Home
        </a>
      </li>
      {currentUser && (
        <li style={{ cursor: 'pointer' }}>
          <a className="link-tag" href="/dashboard">
            Profile
          </a>
        </li>
      )}
      {currentUser && (
        <li style={{ cursor: 'pointer' }}>
          <a className="link-tag" href="/addrecipe">
            Add Recipe
          </a>
        </li>
      )}

      <li>
        <a href="/about" className="link-tag">
          About
        </a>
      </li>
      {!currentUser && (
        <li style={{ float: 'right', cursor: 'pointer' }}>
          <a href="/login" className="link-tag">
            Login
          </a>
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
  )
}

export default NavBar
