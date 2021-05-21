/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginUser } from "../../../lib/store/login/actions";

import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  handleLogin = (event) => {
    let userObject = {
      username: this.props.userNameField,
      apiKey: this.props.idField
    }
    this.props.login(userObject)
    event.preventDefault()
  }

  handleIdChange = (event) => {
    this.props.changeIdField(event.target.value)
  }

  handleUserNameChange = (event) => {
    this.props.changeuserNameField(event.target.value)
  }

  render() {
    let { userNameField, idField } = this.props
    return (
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h3>Login</h3>
            </div>
          </div>
          <form className="login-form">
            <input className="text" value={idField} onChange={this.handleIdChange}  placeholder="Id" />
            <input className="password" value={userNameField} onChange={this.handleUserNameChange}  placeholder="Name" />
            <button onClick={this.handleLogin}>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userNameField: state.app.loginDetails.userNameField,
  idField: state.app.loginDetails.idField
})

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(loginUser(payload)),
  changeIdField: (payload) => dispatch({ type: "CHANGE_ID_FIELD", payload }),
  changeuserNameField: (payload) => dispatch({ type: "CHANGE_USERNAME_FIELD", payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
