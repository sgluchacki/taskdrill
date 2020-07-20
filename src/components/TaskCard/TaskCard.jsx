import React from 'react';
import { Link } from 'react-router-dom';

// This is where we drill deeper, so inside here include AllTasksPage or an analogue
// Grab all subcards, need backend call and method in app
// Keep an eye out here, might need to convert to class-based component
// or hook it

function TaskCard({ taskFromParent, handleDeleteTask }) {
    console.log(taskFromParent , '<===========taskFromParent')
    return (
        <>
            <div className='panel panel-default'>
                <div className="panel-heading">
                    <h3 className='panel-title'>{taskFromParent.name}</h3>
                </div>
                <div className='panel-body'>
                    <p>{taskFromParent.details}</p>
                </div>
                <div className='panel-footer'>
                    <Link className='btn btn-xs btn-warning' to={{ pathname: '/edit', state: { selectedTask: taskFromParent } }}>EDIT</Link>
                    <button
                        className='btn btn-xs btn-danger margin-left-10'
                        onClick={() => handleDeleteTask(taskFromParent._id)}
                    >
                    {/* maybe have this link to a delete confirmation or a popup? */}
                    DELETE
                    </button>
                    {/* Go deeper, DRILL */}
                    <Link to={{ pathname:`/${taskFromParent._id}`, state: {parentTask: taskFromParent} }}>DRILL</Link>
                </div>
            </div>
        </>
    )
}

export default TaskCard;