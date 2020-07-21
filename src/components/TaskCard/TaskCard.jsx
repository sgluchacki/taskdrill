import React from 'react';
import { Link } from 'react-router-dom';
import './TaskCard.css';


// This is where we drill deeper, so inside here include AllTasksPage or an analogue
// Grab all subcards, need backend call and method in app
// Keep an eye out here, might need to convert to class-based component
// or hook it

function TaskCard({ taskFromParent, handleDeleteTask, getAllChildTasks, componentDidMount }) {
    // console.log(taskFromParent , '<===========taskFromParent')
    // onClick={() => getAllChildTasks(taskFromParent._id)}
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
                    {/* Go deeper, DRILL */}
                    <Link className='btn' to={{ pathname:`/${taskFromParent._id}`, state: {parentTask: taskFromParent} } } onClick={() => getAllChildTasks(taskFromParent._id)}>DRILL</Link>
                </div>
                    <button
                        className='btn-danger'
                        onClick={() => handleDeleteTask(taskFromParent._id)}
                    >
                    {/* maybe have this link to a delete confirmation or a popup? */}
                    X
                    </button>
            </div>
        </>
    )
}

export default TaskCard;