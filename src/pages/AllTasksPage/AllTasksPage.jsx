import React from 'react';
import './AllTasksPage.css';
import TaskCard from '../../components/TaskCard/TaskCard';

function AllTasksPage({ tasksFromParent, handleDeleteTask }) {
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
            </div>
        </>
    )
}

export default AllTasksPage;