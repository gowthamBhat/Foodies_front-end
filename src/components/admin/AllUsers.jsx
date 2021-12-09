import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
function AllUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUsers()
  }, [])
  //get all user list after loading
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/signup')
      setUsers(data)
    } catch (error) {
      console.log('error in admin dashboard while getting all users', error)
    }
  }

  //delete user handle
  const deleteUserHandler = async (user_id) => {
    try {
      var prevState = { ...users }
      let output = users.filter((x) => x._id !== user_id)
      setUsers(output)

      await axios.delete(`http://localhost:8000/signup/${user_id}`)
      toast.success('User deleted Successfully')
    } catch (error) {
      toast.error('error while deleting user')
      setUsers(prevState)
      console.log('user delete error', error)
    }
  }

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
                <p className="admin-dash-label">
                  {x.email} ({x.username})
                </p>
                <button
                  className="admin-dash-delete-btn"
                  onClick={() => deleteUserHandler(x._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AllUsers
