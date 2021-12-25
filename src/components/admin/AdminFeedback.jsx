import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import http from './../http'
import { toast } from 'react-toastify'
function Feedback() {
  const [feedbacks, setfeedbacks] = useState(null)
  useEffect(() => {
    getFeedbacks()
  }, [])
  const getFeedbacks = async () => {
    const { data } = await Axios.get('http://localhost:8000/feedback')
    setfeedbacks(data)
  }
  const deleteFeedback = async (id) => {
    try {
      let deletedFeedback = await http.delete(
        `http://localhost:8000/feedback/${id}`
      )
      console.log('deleted feedback', deletedFeedback)

      toast.success('feedback deleted')
      let newState = feedbacks.filter((x) => x._id !== id)
      setfeedbacks(newState)
    } catch (error) {
      console.log('feedback delete error', error)
    }
  }

  return (
    <div className="admin-feedback-parent-container">
      {feedbacks &&
        feedbacks.map((x) => (
          <div key={uuidv4()} className="admin-feedback-container">
            <p className="admin-feedback-emailpassword-container">
              {x.email} ({x.username})
            </p>
            <p className="admin-feedbacktext-container">{x.feedbackText}</p>
            <button onClick={() => deleteFeedback(x._id)}>Delete</button>
          </div>
        ))}
    </div>
  )
}

export default Feedback
