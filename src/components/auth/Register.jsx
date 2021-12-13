import React from 'react'
import axios from 'axios'
import LocalStroageContainer from './../LocalStroageContainer'
import { ToastContainer, toast } from 'react-toastify'
export class Register extends React.Component {
  state = {
    account: { username: '', password: '', phone: '', email: '' },
    error: {}
  }
  handleInput = (event) => {
    const account = { ...this.state.account }
    account[event.target.name] = event.target.value
    this.setState({ account })
  }
  onRegisterClick = async () => {
    const { username, phone, password, email } = this.state.account

    try {
      const response = await axios.post('http://localhost:8000/signup', {
        email,
        password,
        phone: Number(phone),
        username
      })
      console.log(response)
      LocalStroageContainer.saveToken(response.headers['x-auth-token'])
      window.location = '/'
      // this.props.history.push('/')
    } catch (e) {
      if (e.response && e.response.status === 400) {
        toast.error('Account Already Exists')
        const errors = { ...this.state.errors }
        errors.email = 'Account Already Exists'
        this.setState({ errors })
        console.log(this.state.errors)
      }
    }
  }
  render() {
    const { username, phone, password, email } = this.state.account

    return (
      <div className="base-container">
        {/* {this.state.error.email && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ width: '250px' }}
          >
            <p>Error occured</p>
            {this.state.error.email}
          </div>
        )} */}
        <div className="header">Register </div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                onChange={this.handleInput}
                value={username}
                placeholder="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">email:</label>
              <input
                type="email"
                name="email"
                onChange={this.handleInput}
                value={email}
                placeholder="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                onChange={this.handleInput}
                value={password}
                placeholder="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                onChange={this.handleInput}
                value={phone}
                placeholder="phone"
              />
            </div>
          </div>
          <div className="footer">
            <div type="button" className="btn" onClick={this.onRegisterClick}>
              Register
            </div>
          </div>
        </div>
      </div>
    )
  }
}
