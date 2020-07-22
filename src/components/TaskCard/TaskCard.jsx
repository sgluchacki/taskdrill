import React from 'react';
import { Link } from 'react-router-dom';
import './TaskCard.css';


function TaskCard({ taskFromParent, handleDeleteTask, getAllChildTasks }) {
    console.log(taskFromParent, `<===============${taskFromParent.name}FromParent`)
    return (
        <>
            <div className='panel panel-default'>
                <div className="panel-heading">
                    <h3 className='panel-title'>{taskFromParent.name.toUpperCase()}</h3>
                </div>
                <div className='panel-body'>
                    <p className="details">{taskFromParent.details}</p>
                </div>
                <div className='task-nav'>
                    <Link className='btn' to={{ pathname: '/edit', state: { selectedTask: taskFromParent } }}>EDIT</Link>
                    <Link className='btn' to={{ pathname:`/${taskFromParent._id}`, state: {parentTask: taskFromParent} } } onClick={() => getAllChildTasks(taskFromParent._id)}>DRILL</Link>
                </div>
                    <button
                        className='btn-danger'
                        onClick={() => handleDeleteTask(taskFromParent._id)}
                    >
                    X
                    </button>
            </div>
        </>
    )
}

export default TaskCard;