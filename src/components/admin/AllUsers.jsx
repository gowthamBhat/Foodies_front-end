import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
function AllUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUsers()
  }, [])
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/signup')
      setUsers(data)
    } catch (error) {
      console.log('error in admin dashboard while getting all users', error)
    }
  }
  console.log('all users', users)

  return (
    <div className="App">
      <div className="allusers-container">
        <center>
          <h2
            style={{
              fontFamily: 'monospace',
              marginTop: '15px',
              marginBottom: '15px',
              fontSize: '20px'
            }}
          >
            Total Users{users.length}
          </h2>
        </center>
        <div className="admin-dash-allusers">
          {users.length > 0 &&
            users.map((x) => (
              <div key={uuidv4()} className="admin-dash-user">
                <p className="admin-dash-label">{x.email}</p>
                <button className="admin-dash-delete-btn">Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AllUsers
