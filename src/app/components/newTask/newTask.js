/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeNewTaskDialog, addATask, changeAddTaskField, editATaskName } from "../../../lib/store/tasks/actions";
import { Input } from 'antd';

import './newTask.css'

class NewTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick, false);
  }
  
  handleButtonClick = () => {
    let { addTaskField, neweditTaskText, taskBeingEdited } = this.props
    if(addTaskField !== ''){
      if(neweditTaskText === '+ New Task'){
        this.props.addATask({
          name: addTaskField,
        })
      } else if(neweditTaskText === 'Edit Task'){
        this.props.editATaskName({
          name: addTaskField,
          id: taskBeingEdited._id
        })
      }
      this.props.changeAddTaskField('')
    }
    this.props.changeNewTaskDialog(false)
  }

  handleCloseDialog = () => {
    this.props.changeAddTaskField('')
    this.props.changeNewTaskDialog(false)
  }

  handleTaskInput = (event) => {
    this.props.changeAddTaskField(event.target.value)
  }

  handleOutsideClick = e => {
    if (!this.node.contains(e.target)) this.handleCloseDialog();
  };

  render() {
    let { show, addTaskField, neweditTaskText } = this.props
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section ref={node => {
        this.node = node;
      }}  className="modal-main">
            <h3 className="newTaskHeading">{neweditTaskText}</h3>
            <Input className="taskInput" value={addTaskField} onChange = {this.handleTaskInput} placeholder="Task Name"></Input>
            <button className="newTaskButton" onClick={this.handleButtonClick}>{neweditTaskText}</button>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  show: state.app.taskDetails.newTaskDialog,
  addTaskField: state.app.taskDetails.addTaskField,
  neweditTaskText: state.app.taskDetails.neweditTaskText,
  taskBeingEdited: state.app.taskDetails.taskBeingEdited
})

const mapDispatchToProps = dispatch => ({
  changeNewTaskDialog: (payload) => dispatch(changeNewTaskDialog(payload)),
  addATask: (payload) => dispatch(addATask(payload)),
  changeAddTaskField: (payload) => dispatch(changeAddTaskField(payload)),
  editATaskName: (payload) => dispatch(editATaskName(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
