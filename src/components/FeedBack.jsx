import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Axios from 'axios'
import LocalStroageContainer from './LocalStroageContainer'
import { jwt } from 'jwt-decode'

function FeedBack() {
  const [feed, setFeed] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  useEffect(() => {
    let jwt = LocalStroageContainer.getCurrentUser()
    setCurrentUser(jwt)
    console.log(jwt)
  }, [])
  const onTypeFeedHandler = (e) => {
    // let oldFeed = feed
    setFeed(e.target.value)
  }
  const submitHandler = async () => {
    try {
      const { data } = await Axios.post('http://localhost:8000/feedback', {
        feedbackText: feed,
        userId: currentUser._id,
        username: currentUser.name,
        email: currentUser.email
      })
      toast.success('feedback successfully submited')
      setFeed('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <textarea
        className="feedback-textarea"
        onChange={onTypeFeedHandler}
        value={feed}
      ></textarea>
      <button
        className="feedback-submit admin-dash-delete-btn"
        onClick={submitHandler}
      >
        submit
      </button>
    </div>
  )
}

export default FeedBack
