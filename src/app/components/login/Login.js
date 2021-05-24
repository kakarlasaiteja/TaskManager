/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import { loginUser } from "../../../lib/store/login/actions";
import styled from 'styled-components';

import './Login.css'

const StyledButton = styled.button`
  font-family: "Trueno",  "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background-color: #5484ec ;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #d8e3f9;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 15px;
`;

function Login({login}) {
  const [idField, setIdField] = useState('');
  const [userNameField, setUserNameField] = useState('');

  const handleLogin = (event) => {
    event.preventDefault()
    let userObject = {
      username: userNameField,
      apiKey: idField
    }
    login(userObject)
  }

  return (
    <div className="login-page">
    <div className="form">
      <div className="login">
        <div className="login-header">
          <h3>Login</h3>
        </div>
      </div>
      <form className="login-form">
        <input className="text" value={idField} onChange={(e) => setIdField(e.target.value)} placeholder="Id" />
        <input className="password" value={userNameField} onChange={(e) => setUserNameField(e.target.value)} placeholder="Name" />
        <StyledButton id="loginButton" onClick={handleLogin}>Login</StyledButton>
      </form>
    </div>
  </div>
  );
}

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(loginUser(payload))
})

export default connect(null, mapDispatchToProps)(Login);
