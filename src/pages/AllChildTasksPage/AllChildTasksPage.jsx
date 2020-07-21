import React, { Component } from 'react';
import '../AllTasksPage/AllTasksPage.css';
import { Link } from 'react-router-dom';
import TaskCard from '../../components/TaskCard/TaskCard';
import NewChildTaskForm from '../../components/NewChildTaskForm/NewChildTaskForm';
// import * as tasksService from '../../utils/tasksService';


// function AllChildTasksPage({ tasksFromParent, handleDeleteTask, handleUpdateTask, handleAddTask, getAllChildTasks, location }) {
//     // Does the below only work in the case of a class component?
//     // parentTaskID = this.props.location.state.parentTask._id
//     // console.log( parentTask, '<====================parentTask')
//     console.log( location, '<====================location')
//     const parentTask = location.state.parentTask
//     console.log( parentTask, '<====================parentTask')

//     // const children = (async () => { 
//     //     await getAllChildTasks(parentTask._id);
//     // })();
    
//     // MAYBE CALL FUNCTION IN LOCATION > STATE DECLARATION IN PARENT?
//     // const children = (async () => { 
//     //     const result = await getAllChildTasks(parentTask._id);
//     //     return result;
//     // })();
//     // console.log( children, '<====================children') // IS THIS EVEN CLOSE? LOLOL
    
//     return (
//         <>
//             {/*---------- BE SURE TO INCLUDE PARENT NAME HERE-------------*/}
//             <h1>You've Gone Deeper</h1>
//             <div className='AllTasksPage-grid'>
//                 {/* {children.map(task => 
//                     <TaskCard
//                         key={task._id}
//                         taskFromParent={task}
//                         handleDeleteTask={handleDeleteTask}
//                         handleUpdateTask={handleUpdateTask}
//                     />
//                 )} */}
//                 <NewChildTaskForm 
//                     handleAddTask={handleAddTask}
//                     // parentTaskID={parentTaskID}
//                 />
//             </div>
//         </>
//     )
// }

class AllChildTasksPage extends Component {
    // state = {
    //     // tasks: [],
    //     parentTask: this.props.location.state.parentTask
    // }

    // pass up to app
    // handleUpdateChildren = (tasks) => {
    //     console.log(tasks, '<==============tasks')
    //     this.setState({ tasks });
    // };

    // async componentDidMount() {
    //     const tasks = await tasksService.getAllChildTasks(this.state.parentTask._id);
    //     this.handleUpdateChildren(tasks)
    // }

    // {{ pathname:`/${taskFromParent._id}`, state: {parentTask: taskFromParent} } }

    handleOnNavigateBack = () => {
        this.setState()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
        //   this.onRouteChanged();
            console.log(this.props.location, '<=================this.props.location');
            console.log(prevProps.location, '<=================prevProps.location');
            this.props.getAllChildTasks(this.props.location.state.parentTask._id)
        }
    }

    // onRouteChanged() {
        
    // }



    render() {
        return(
            <>
                <h1 className="page-header">INSIDE "{this.props.location.state.parentTask.name.toUpperCase()}"</h1>
                {/* <p>{this.props.drilledPath.map( (task, index) =>
                    <Link to={{ 
                        pathname:`/${task._id}`,
                        state: {parentTask: task}
                    }}>{"> "}{task.name}</Link>
                )}</p> */}
                <div className='AllTasksPage-grid'>
                    <NewChildTaskForm 
                        handleAddChildTask={this.props.handleAddChildTask}
                        parentTaskID={this.props.location.state.parentTask._id}
                    />
                    {this.props.tasksFromParent.length ? this.props.tasksFromParent.map(task => 
                        <TaskCard
                            key={task._id}
                            taskFromParent={task}
                            handleDeleteTask={this.props.handleDeleteTask}
                            handleUpdateTask={this.props.handleUpdateTask}
                            getAllChildTasks={this.props.getAllChildTasks}
                            componentDidMount={this.props.componentDidMount}
                        />
                    )
                    :
                        <div className='panel panel-default'>
                            <h3 className='panel-title'>NOTHING HERE YET!</h3>
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default AllChildTasksPage;