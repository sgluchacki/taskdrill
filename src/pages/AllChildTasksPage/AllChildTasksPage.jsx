import React, { Component } from 'react';
import '../AllTasksPage/AllTasksPage.css';
import TaskCard from '../../components/TaskCard/TaskCard';
import NewChildTaskForm from '../../components/NewChildTaskForm/NewChildTaskForm';
import * as tasksService from '../../utils/tasksService';


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
    state = {
        children: [],
        parentTask: this.props.location.state.parentTask
    }

    handleUpdateChildren = (children) => {
        console.log(children, '<==============children')
        this.setState({ children });
    };

    async componentDidMount() {
        const children = await tasksService.getAllChildTasks(this.state.parentTask._id);
        this.handleUpdateChildren(children)
    }

    render() {
        console.log( this.state.parentTask, '<==================this.state.parentTask')
        return(
            <>
                <h1>Inside "{this.state.parentTask.name}"</h1>
                <div className='AllTasksPage-grid'>
                {this.state.children.length ? this.state.children.map(task => 
                    <TaskCard
                        key={task._id}
                        taskFromParent={task}
                        handleDeleteTask={this.props.handleDeleteTask}
                        handleUpdateTask={this.props.handleUpdateTask}
                    />
                )
                :
                    <h3>No Child Tasks Yet</h3>
                }
                <NewChildTaskForm 
                    handleAddTask={this.props.handleAddTask}
                    parentTaskID={this.state.parentTask._id}
                />
                </div>
            </>
        )
    }
}

export default AllChildTasksPage;