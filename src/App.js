/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import './App.css';
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from "./app/components/login/Login";
import Dashboard from "./app/components/dashboard/dashboard"
import NewTask from "./app/components/newTask/newTask";

import 'antd/dist/antd.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
   
  }

  render() {
    let {isLoggedIn, userToken} = this.props
    return (
      <div className='App'>
        {!isLoggedIn && <Login />}
        {isLoggedIn && userToken && <Dashboard />}
        <NewTask />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.app.loginDetails.isLoggedIn,
  userToken: state.app.loginDetails.userToken
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
