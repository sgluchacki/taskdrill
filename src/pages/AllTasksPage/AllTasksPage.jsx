import React from 'react';
import './AllTasksPage.css';
import TaskCard from '../../components/TaskCard/TaskCard';
import NewTaskForm from '../../components/NewTaskForm/NewTaskForm';

function AllTasksPage({ tasksFromParent, handleDeleteTask, handleAddTask }) {
    return (
        <>
            <h1>Task List</h1>
            <div className='AllTasksPage-grid'>
                {tasksFromParent.map(task => 
                    <TaskCard
                        key={task._id}
                        taskFromParent={task}
                        handleDeleteTask={handleDeleteTask}
                    />
                )}
                <NewTaskForm handleAddTask={handleAddTask}/>
            </div>
        </>
    )
}

export default AllTasksPage;