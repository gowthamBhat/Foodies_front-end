import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <ul>
      <li>
        <a className="link-tag active" href="/">
          Home
        </a>
      </li>
      <li>
        <a href="/dashboard" className="link-tag">
          Profile
        </a>
      </li>
      <li>
        <a href="/login" className="link-tag">
          Login
        </a>
      </li>
      <li>
        <a href="/addrecipe" className="link-tag">
          Add Recipe
        </a>
      </li>
      <li style={{ float: 'right' }}>
        <a href="/about" className="link-tag">
          About
        </a>
      </li>
    </ul>
  )
}

export default NavBar
