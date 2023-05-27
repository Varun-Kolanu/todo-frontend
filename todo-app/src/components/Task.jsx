import React from 'react'

export const Task = ({ task, updateHandler, deleteHandler }) => {
    return (
        <div key={task._id} className='todo'>
            <div>
                <h4> {task.title} </h4>
                <p> {task.description} </p>
            </div>
            <div className='box'>
                <input onChange={() => updateHandler(task._id)} type="checkbox" className='check' checked={task.isCompleted} />
                <button onClick={ () => deleteHandler(task._id)} className='deleteBtn'>Delete</button>
            </div>
        </div>
    )
}
