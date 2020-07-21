import React from 'react';
import './AllTasksPage.css';
import TaskCard from '../../components/TaskCard/TaskCard';
import NewTaskForm from '../../components/NewTaskForm/NewTaskForm';

function AllTasksPage({ tasksFromParent, handleDeleteTask, handleUpdateTask, handleAddTask, getAllChildTasks }) {
    return (
        <>
            <h1 className="page-header">ALL TASKS</h1>
            <div className='AllTasksPage-grid'>
                <NewTaskForm handleAddTask={handleAddTask}/>
                {tasksFromParent.map(task => 
                    <TaskCard
                        key={task._id}
                        taskFromParent={task}
                        handleDeleteTask={handleDeleteTask}
                        handleUpdateTask={handleUpdateTask}
                        getAllChildTasks={getAllChildTasks}
                    />
                )}
            </div>
        </>
    )
}

export default AllTasksPage;