import { useState, useEffect } from 'react'
import axios from 'axios'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API = '/api'

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`)
      setTasks(res.data)
      setError(null)
    } catch (err) {
      setError('Cannot reach API — is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title) => {
    try {
      const res = await axios.post(`${API}/tasks`, { title })
      setTasks([res.data, ...tasks])
    } catch (err) {
      setError('Failed to add task')
    }
  }

  const toggleTask = async (id) => {
    try {
      const res = await axios.patch(`${API}/tasks/${id}`)
      setTasks(tasks.map(t => t.id === id ? res.data : t))
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`)
      setTasks(tasks.filter(t => t.id !== id))
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  useEffect(() => { fetchTasks() }, [])

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <p className="subtitle">Dockerized Full Stack App</p>

      {error && <div className="error">{error}</div>}

      <TaskForm onAdd={addTask} />

      {loading
        ? <p className="loading">Loading tasks...</p>
        : <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
      }
    </div>
  )
}

export default App
