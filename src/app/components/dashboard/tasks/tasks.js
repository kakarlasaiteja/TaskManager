/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeNewTaskDialog, editATask, deleteATask, editSearchField, changeNewEditTaskText, taskBeingEdited } from "../../../../lib/store/tasks/actions";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons"
import { Checkbox, Input } from 'antd';

import './tasks.css'
import 'antd/dist/antd.css'

class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  handleNewTaskClick = () => {
    this.props.changeNewEditTaskText('+ New Task')
    this.props.changeNewTaskDialog(true)
  }

  handleTaskCompleteEdit = (task) => {
    this.props.editATask(task)
  }

  handleTaskDelete = (task) => {
    this.props.deleteATask(task)
  }

  handleTaskNameEdit = (task) => {
    this.props.changeTaskBeingEdited(task)
    this.props.changeNewEditTaskText('Edit Task')
    this.props.changeNewTaskDialog(true)
  } 


  handleSearch = (event) => {
    this.props.editSearchField(event.target.value)
  }

  render() {
    let { allTasks, totalTasks, displayedTasks } = this.props
    return (
      <>
        {totalTasks !== 0 &&
          <div className='tasks'>
            <div className='tasksHeader'>
              <div>
                <h3 className="tasksHeading">Tasks</h3>
              </div>
              <div className="searchAndNewTask">
                <Input prefix={<SearchOutlined className="site-form-item-icon" />} className="searchInput" onChange={this.handleSearch} placeholder="Search by task name"></Input>
                <button className="newTaskButton" onClick={() => this.handleNewTaskClick()}>+ New Task</button>
              </div>
            </div>
            <div className="tasksList">
              {
                displayedTasks && displayedTasks.length > 0 &&
                displayedTasks.map((task, index) => (
                  <div key={task.name} className={displayedTasks.indexOf(task) === displayedTasks.length - 1 ? "eachTask lastTask" : "eachTask"}>
                    <div className={task.completed ? "completedTask" : ""}>
                      <Checkbox checked={task.completed} onChange={() => this.handleTaskCompleteEdit(task)}>{task.name}</Checkbox>
                    </div>
                    <div className="icons">
                    <a onClick={() => this.handleTaskNameEdit(task)}><EditOutlined /></a>
                    <a onClick={() => this.handleTaskDelete(task)}><DeleteOutlined /></a>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  allTasks: state.app.taskDetails.allTasks,
  totalTasks: state.app.taskDetails.totalTasks,
  displayedTasks: state.app.taskDetails.displayedTasks
})

const mapDispatchToProps = dispatch => ({
  changeNewTaskDialog: (payload) => dispatch(changeNewTaskDialog(payload)),
  editATask: (payload) => dispatch(editATask(payload)),
  deleteATask: (payload) => dispatch(deleteATask(payload)),
  editSearchField: (payload) => dispatch(editSearchField(payload)),
  changeNewEditTaskText: (payload) => dispatch(changeNewEditTaskText(payload)),
  changeTaskBeingEdited: (payload) => dispatch(taskBeingEdited(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
