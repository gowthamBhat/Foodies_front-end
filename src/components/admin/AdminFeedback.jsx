import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
function Feedback() {
  const [feedbacks, setfeedbacks] = useState(null)
  useEffect(() => {
    getFeedbacks()
  }, [])
  const getFeedbacks = async () => {
    const { data } = await Axios.get('http://localhost:8000/feedback')
    setfeedbacks(data)
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
          </div>
        ))}
    </div>
  )
}

export default Feedback
