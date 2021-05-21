/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import './appHeader.css'

class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    logout = () => {
        this.props.logout()
    }

    render() {
        let { username } = this.props
        return (
            <div className='appHeader'>
                <div>
                    <img src="avatar.png" alt="Avatar"></img>
                    <span>{username}</span>
                </div>
                <div className='logoutButton'>
                    <button style={{color: "gray"}} onClick={this.logout}>Logout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.app.loginDetails.username,
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: "LOGOUT_USER"})
})

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
