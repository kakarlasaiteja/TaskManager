/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from 'recharts';

import { changeNewTaskDialog } from "../../../../lib/store/tasks/actions";

import './infoCards.css'

const COLORS = ['#0071bc', '#e9eef7'];

class Infocards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pieChartData: []
    }
  }

  componentDidMount() {
    this.calculatePieChartData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.calculatePieChartData()
    }
  }

  calculatePieChartData = () => {
    let { totalTasks, tasksCompleted } = this.props
    this.setState({
      pieChartData: [
        {
          name: 'completed Tasks',
          value: tasksCompleted
        },
        {
          name: 'Pending Tasks',
          value: totalTasks - tasksCompleted
        }
      ]
    })
  }

  handleNewTaskClick = () => {
    console.log("method executed")
    this.props.changeNewTaskDialog(true)
  }

  render() {
    let { totalTasks, latestTasks, allTasks, tasksCompleted } = this.props
    let { pieChartData } = this.state
    return (
      <>
        {totalTasks === 0 &&
          <div className="card noTaskcard">
            <div className="cardContent">
              <div className="noTaskText">You have no task.</div>
              <button className="newTaskButton" onClick={() => this.handleNewTaskClick()}>+ New Task</button>
            </div>
          </div>}
        {totalTasks !== 0 &&
          <div className="cards">
            <div className="card">
              <h3 className="cardHeading">Tasks Completed</h3>
              <div className='ratio'>
                <span className='tasksCompleted'>{tasksCompleted}</span>
                <span className='totalTasks'>/{totalTasks}</span>
              </div>
            </div>
            <div className="card">
              <h3 className="cardHeading">Latest Created Tasks</h3>
              <ul className="latestTasksList">
                {latestTasks && latestTasks.length > 0 &&
                  latestTasks.map(task =>
                  (
                    <li key={task.name} className={task.completed ? "taskInList completed" : "taskInList"}>{task["name"]}</li>
                  )
                  )
                }
              </ul>
            </div>
            <div className="card">
              <PieChart className='pieChart' width={200} height={200}>
                <Tooltip />
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  totalTasks: state.app.taskDetails.totalTasks,
  latestTasks: state.app.taskDetails.latestTasks,
  allTasks: state.app.taskDetails.allTasks,
  tasksCompleted: state.app.taskDetails.tasksCompleted
})

const mapDispatchToProps = dispatch => ({
  changeNewTaskDialog: (payload) => dispatch(changeNewTaskDialog(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Infocards);
