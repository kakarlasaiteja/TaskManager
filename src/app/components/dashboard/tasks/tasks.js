/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeNewTaskDialog, editATask, deleteATask, editSearchField } from "../../../../lib/store/tasks/actions";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
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
    this.props.changeNewTaskDialog(true)
  }

  handleTaskEdit = (id) => {
    this.props.editATask(id)
  }

  handleTaskDelete = (id) => {
    this.props.deleteATask(id)
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
            <Input className="searchInput" onChange={this.handleSearch} placeholder="Search by task name"></Input>
            <button className="newTaskButton"  onClick={() => this.handleNewTaskClick()}>+ New Task</button>
          </div>
        </div>
        <div className="tasksList">
            {
              displayedTasks && displayedTasks.length > 0 && 
              displayedTasks.map((task, index) => (
                <div key={task.name} className="eachTask">
                  <div className={task.completed ? "completedTask" : ""}>
                  <Checkbox checked={task.completed} onChange={() => this.handleTaskEdit(allTasks.indexOf(task))}>{task.name}</Checkbox>
                  </div>
                  <a onClick={() => this.handleTaskDelete(allTasks.indexOf(task))}><DeleteOutlined /></a>
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
  editSearchField: (payload) => dispatch(editSearchField(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
