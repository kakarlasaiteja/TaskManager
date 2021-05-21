/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppHeader from "./appHeader/appHeader";
import Infocards from "./infoCards/infoCards";
import Tasks from "./tasks/tasks";

import { getDashboardData } from "../../../lib/store/tasks/actions";

import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
      this.props.getDashboardData()
  }

  render() {
    return (
      <div className='dashboard'>
        <AppHeader />
        <Infocards />
        <Tasks />
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    getDashboardData: () => dispatch(getDashboardData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
