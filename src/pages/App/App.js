import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import userService from '../../utils/userService';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import AllTasksPage from '../AllTasksPage/AllTasksPage';
import AllChildTasksPage from '../AllChildTasksPage/AllChildTasksPage';
import EditTaskPage from '../EditTaskPage/EditTaskPage';
import * as tasksService from '../../utils/tasksService';
import './App.css';

class App extends Component {
  state = {
    tasks: [],
    user: userService.getUser(),
  }

  async componentDidMount() {
    const tasks = await tasksService.getAllTasks();
    this.setState({ tasks });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null }, () => this.props.history.push('/'));
  }

  handleSignupOrLogin = () => {
    this.setState({
      user: userService.getUser()
    }, () => {
      this.getAllTasks();
    });
  }

  getAllTasks = async () => {
    const tasks = await tasksService.getAllTasks();
    this.setState({
      tasks
    }, () => this.props.history.push('/'));
  }

  handleAddTask = async newTask => {
    await tasksService.createTask(newTask);
    this.getAllTasks();
  }
  
  handleAddTask = async newTask => {
    await tasksService.createTask(newTask);
    this.getAllChildTasks();
  }

  handleUpdateTask = async updatedTaskData => {
    await tasksService.updateTask(updatedTaskData);
    this.getAllTasks();
  }

  handleDeleteTask = async idOfTaskToDelete => {
    await tasksService.deleteTask(idOfTaskToDelete);
    this.setState(state => ({
      tasks: state.tasks.filter(task => task._id !== idOfTaskToDelete)
    }), () => this.props.history.push('/'));
  }

  getAllChildTasks = async parentTaskID => {
    const tasks = await tasksService.getAllChildTasks(parentTaskID);
    this.setState({
      tasks
    }, () => this.props.history.push(`/${parentTaskID}`));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          TaskDrill
          <nav>
            {userService.getUser() ?
              <>
                {userService.getUser().name ? `WELCOME, ${userService.getUser().name.toUpperCase()}` : ''}
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/logout' onClick={this.handleLogout}>LOGOUT</NavLink>
              </>
              :
              <>
                <NavLink exact to='/signup'>SIGNUP</NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink exact to='/login'>LOGIN</NavLink>
                &nbsp;&nbsp;&nbsp;
              </>
            }
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path='/signup' render={({ history }) =>
              <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
            } />
            <Route exact path='/login' render={({ history }) =>
              <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
            } />
            <Route exact path='/' render={({ history }) =>
              userService.getUser() ?
                <AllTasksPage 
                  tasksFromParent={this.state.tasks} 
                  handleDeleteTask={this.handleDeleteTask} 
                  handleUpdateTask={this.handleUpdateTask} 
                  handleAddTask={this.handleAddTask}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path='/edit' render={({ history, location }) =>
              userService.getUser() ?
              <EditTaskPage 
              handleUpdateTask={this.handleUpdateTask}
              location={location}
              />
              :
              <Redirect to='/login' />
            }/>
            <Route exact path='/:id' render={({ history, location }) =>
              userService.getUser() ?
                <AllChildTasksPage 
                  // HERE WE NEED TO LIMIT THE TASKS TO ONLY HAVE THOSE OF THE CHILD
                  // SOMETHING SIMILAR TO CLICKEDONPUPPY
                  tasksFromParent={this.state.tasks} 
                  handleDeleteTask={this.handleDeleteTask} 
                  handleUpdateTask={this.handleUpdateTask} 
                  handleAddTask={this.handleAddTask}
                  getAllChildTasks={this.getAllChildTasks}
                  location={location}
                />
                :
                <Redirect to='/login' />
            } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
