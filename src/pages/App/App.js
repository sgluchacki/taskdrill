import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom';
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
    drilledPath: [],
    user: userService.getUser(),
  }

  // drilledPath: [id1, id2, id3, ...]

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
  
  handleAddChildTask = async newTask => {
    await tasksService.createTask(newTask);
    this.getAllChildTasks(newTask.parentTask);
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
    console.log('you hit getAllChildTasks')
    const tasks = await tasksService.getAllChildTasks(parentTaskID);
    this.setState({
      tasks
      // drilledPath: [...this.state.drilledPath, parentTask]
    });
    // // this.setState({
    //   tasks
    // }, () => this.props.history.push(`/${parentTaskID}`));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/' onClick={this.getAllTasks}><img className="logo" src={process.env.PUBLIC_URL + '/taskdrill-logo.png'}/></Link>
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
                  getAllChildTasks={this.getAllChildTasks}
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
            <Route exact path={'/:id'} render={({ history, location }) =>
              userService.getUser() ?
                <AllChildTasksPage 
                  // HERE WE NEED TO LIMIT THE TASKS TO ONLY HAVE THOSE OF THE CHILD
                  // SOMETHING SIMILAR TO CLICKEDONPUPPY
                  tasksFromParent={this.state.tasks} 
                  drilledPath={this.state.drilledPath}
                  handleDeleteTask={this.handleDeleteTask} 
                  handleUpdateTask={this.handleUpdateTask} 
                  handleAddChildTask={this.handleAddChildTask}
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
