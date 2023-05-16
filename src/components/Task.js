import React from 'react';

function Task({ task, onTaskComplete }) {
  const handleTaskComplete = () => {
    // Perform task completion API call here
    // Update the task status in the database
    onTaskComplete(task.id);
  };

  return (
    <div>
      <p>{task.name}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleTaskComplete}
      />
    </div>
  );
}

export default Task;