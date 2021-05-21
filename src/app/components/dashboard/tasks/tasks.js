/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeNewTaskDialog, editATask, deleteATask } from "../../../../lib/store/tasks/actions";
import { DeleteOutlined } from "@ant-design/icons"
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

  render() {
    let { allTasks, totalTasks } = this.props
    return (
      <>
      {totalTasks !== 0 && 
      <div className='tasks'>
        <div className='tasksHeader'>
          <div>
            <h3 className="tasksHeading">Tasks</h3>
          </div>
          <div className="searchAndNewTask">
            <Input className="searchInput" placeholder="Search by task name"></Input>
            <button className="newTaskButton"  onClick={() => this.handleNewTaskClick()}>+ New Task</button>
          </div>
        </div>
        <div className="tasksList">
            {
              allTasks && allTasks.length > 0 && 
              allTasks.map((task, index) => (
                <div key={task.name} className="eachTask">
                  <div>
                  <Checkbox class='eachTaskCheckbox' checked={task.completed} onChange={() => this.handleTaskEdit(allTasks.indexOf(task))}>{task.name}</Checkbox>
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
  totalTasks: state.app.taskDetails.totalTasks
})

const mapDispatchToProps = dispatch => ({
  changeNewTaskDialog: (payload) => dispatch(changeNewTaskDialog(payload)),
  editATask: (payload) => dispatch(editATask(payload)),
  deleteATask: (payload) => dispatch(deleteATask(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
