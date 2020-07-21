import React, { Component } from 'react';
import '../AllTasksPage/AllTasksPage.css';
import TaskCard from '../../components/TaskCard/TaskCard';
import NewChildTaskForm from '../../components/NewChildTaskForm/NewChildTaskForm';


class AllChildTasksPage extends Component {

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


    render() {
        return(
            <>
                <h1 className="page-header">INSIDE "{this.props.location.state.parentTask.name.toUpperCase()}"</h1>
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