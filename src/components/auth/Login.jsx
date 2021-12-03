import axios from 'axios'
import React from 'react'
import LocalStroageContainer from './../LocalStroageContainer'
import { ToastContainer, toast } from 'react-toastify'
export class Login extends React.Component {
  state = {
    account: { email: '', password: '' },
    error: {}
  }

  handleInput = (e) => {
    const account = { ...this.state.account }
    account[e.target.name] = e.target.value //state will be set for both email and password whenever user types
    this.setState({ account })
  }
  onSubmitLogin = async () => {
    const { email, password } = this.state.account
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password
      })
      console.log(response)
      LocalStroageContainer.saveToken(response.headers['x-auth-token'])

      this.props.history.push('/')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Email or Password is Wrong')
        //error state is not needed now because of toast notifier
        const error = { ...this.state.error }
        error.email = 'Email or Password is Wrong'
        this.setState({ error })
      }
    }
  }
  render() {
    const { account, error } = this.state

    return (
      <div className="base-container">
        <ToastContainer />
        {/* {error.email && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ width: '250px' }}
          >
            {error.email}
          </div>
        )} */}
        <div className="header">Login </div>
        <div className="content">
          <form>
            <div className="form">
              <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={account.email}
                  onChange={this.handleInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={account.password}
                  onChange={this.handleInput}
                />
              </div>
            </div>
          </form>

          <div className="footer">
            <div type="button" className="btn" onClick={this.onSubmitLogin}>
              Login
            </div>
          </div>
        </div>
      </div>
    )
  }
}
