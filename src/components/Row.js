import React from 'react';  

export default function Row({ task, deleteTask }) {
  return (
    <li key={task.id}>{task.description}
      <button className='delete-button' onClick={() => deleteTask(task)}>Delete</button>
    </li>
  );
}