function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
          <span
            className="task-title"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? '✓ ' : '○ '}{task.title}
          </span>
          <button
            className="btn-delete"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
