/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import Immutable from "immutable";
import * as actions from './actions'

const taskRecord = Immutable.Record({
  newTaskDialog: false,
  tasksCompleted: 0,
  totalTasks: 0,
  latestTasks: [],
  allTasks: [],
  addTaskField: '',
  searchField: '',
  displayedTasks: [],
  neweditTaskText: "+ New Task",
  taskBeingEdited: null
})

const initialState = new taskRecord()

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.STORE_DASHBOARD_DATA: {
      const dashboardData = action.payload
      return state.merge({
        tasksCompleted: dashboardData.tasksCompleted,
        totalTasks: dashboardData.totalTasks,
        latestTasks: dashboardData.latestTasks
      })
    }
    case actions.STORE_ALL_TASKS: {
      const allTasks = action.payload
      let displayedTasks = []
      if(state.searchField !== ''){
        if(allTasks && allTasks.length > 0){
          displayedTasks = allTasks.filter( task => {
            return task.name.toLowerCase().indexOf(state.searchField.toLowerCase()) > -1
          })
        }
      } else if(state.searchField  === ''){
        displayedTasks = Object.assign([], action.payload)
      }
      return state.merge({
        allTasks: allTasks,
        displayedTasks: displayedTasks
      })
    }
    case actions.EDIT_SERACH_FIELD: {
      const search = action.payload
      let displayedTasks = []
      if(search !== ''){
        if(state.allTasks && state.allTasks.length > 0){
          displayedTasks = state.allTasks.filter( task => {
            return task.name.toLowerCase().indexOf(search.toLowerCase()) > -1
          })
        }
      } else if(search === ''){
        displayedTasks = Object.assign([], state.allTasks)
      }
      return state.merge({
        searchField: search,
        displayedTasks: displayedTasks
      })
    }
    case actions.CHANGE_NEW_TASK_DIALOG: {
      const newTasksDialog = action.payload
      return state.merge({
        newTaskDialog: newTasksDialog
      })
    }
    case actions.CHANGE_ADD_TASK_FIELD: {
      const addTaskField = action.payload
      return state.merge({
        addTaskField: addTaskField
      })
    }
    case actions.CHANGE_NEW_EDIT_TASK_TEXT: {
      const name = action.payload
      return state.merge({
        neweditTaskText: name
      })
    }
    case actions.TASK_BEING_EDITED: {
      const task = action.payload
      return state.merge({
        taskBeingEdited: task
      })
    }
    default:
      return state
  }
}

export default taskReducer