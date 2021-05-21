/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeNewTaskDialog, addATask, changeAddTaskField } from "../../../lib/store/tasks/actions";

import './newTask.css'

class NewTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }
  
  handleNewTaskClick = () => {
    let { addTaskField } = this.props
    console.log("addTaskField: ", addTaskField)
    if(addTaskField !== ''){
      this.props.addATask({
        name: addTaskField,
      })
      this.props.changeAddTaskField('')
    }
    this.props.changeNewTaskDialog(false)
  }

  handleTaskInput = (event) => {
    this.props.changeAddTaskField(event.target.value)
  }

  render() {
    let { show, addTaskField } = this.props
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
            <h3>+ New Task</h3>
            <input type="text" value={addTaskField} onChange = {this.handleTaskInput} placeholder="Task Name" size="30"/>
            <button className="newTaskButton" onClick={this.handleNewTaskClick}>+ New Task</button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  show: state.app.taskDetails.newTaskDialog,
  addTaskField: state.app.taskDetails.addTaskField
})

const mapDispatchToProps = dispatch => ({
  changeNewTaskDialog: (payload) => dispatch(changeNewTaskDialog(payload)),
  addATask: (payload) => dispatch(addATask(payload)),
  changeAddTaskField: (payload) => dispatch(changeAddTaskField(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
