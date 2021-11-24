import React from 'react'
import axios from 'axios'
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
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
        phone: Number(phone),
        username
      })
      console.log(response)
      window.location.assign('http://www.google.com')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const error = { ...this.state.error }
        error.email = 'Email or Password is Wrong'
        this.setState({ error })
      }
    }
  }
  render() {
    const { username, phone, password, email } = this.state.account

    return (
      <div className="base-container">
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
