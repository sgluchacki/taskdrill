import React from 'react';
import { Link } from 'react-router-dom';

function TaskCard({ taskFromParent, handleDeleteTask }) {
    return (
        <div className='panel panel-default'>
            <div className="panel-heading">
                <h3 className='panel-title'>{taskFromParent.name}</h3>
            </div>
            <div className='panel-body'>
                <p>{taskFromParent.details}</p>
            </div>
        </div>
    )
}

export default TaskCard;