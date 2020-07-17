import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import userService from '../../utils/userService';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import AllTasksPage from '../AllTasksPage/AllTasksPage';
import * as tasksService from '../../utils/tasksService';
import './App.css';

class App extends Component {
  state = {
    // tasks: this.initializeState(),
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

  handleDeleteTask = async idOfTaskToDelete => {
    await tasksService.deleteTask(idOfTaskToDelete);
    this.setState(state => ({
      tasks: state.tasks.filter(task => task._id !== idOfTaskToDelete)
    }), () => this.props.history.push('/'));
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
                  handleAddTask={this.handleAddTask}
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
