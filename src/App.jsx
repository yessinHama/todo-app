import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import Login from './components/Login'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [user, setUser] = useState(localStorage.getItem('username') || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) loadTodos()
  }, [user])

  const loadTodos = async () => {
    setLoading(true)
    try {
      const data = await fetchTodos()
      setTodos(data)
    } catch (err) {
      if (err.message === '401') handleLogout()
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (username) => {
    localStorage.setItem('username', username)
    setUser(username)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null)
    setTodos([])
  }

  const addTodo = async (text) => {
    const todo = await createTodo(text)
    setTodos(prev => [...prev, todo])
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    const updated = await updateTodo(id, { completed: !todo.completed })
    setTodos(prev => prev.map(t => t.id === id ? updated : t))
  }

  const editTodo = async (id, text) => {
    const updated = await updateTodo(id, { text })
    setTodos(prev => prev.map(t => t.id === id ? updated : t))
  }

  const removeTodo = async (id) => {
    await deleteTodo(id)
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  if (!user) return <Login onLogin={handleLogin} />

  const total = todos.length
  const done = todos.filter(t => t.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1><span>✅</span> Ma Todo List</h1>
        <div className="header-right">
          <div className="header-stats">
            <span className="stat-badge">{total} tâche{total !== 1 ? 's' : ''}</span>
            <span className="stat-badge done">{done} complétée{done !== 1 ? 's' : ''}</span>
          </div>
          <div className="header-user">
            <span>👤 {user}</span>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <div className="sidebar-card">
            <h2>Nouvelle tâche</h2>
            <TodoForm onAdd={addTodo} />
          </div>
        </aside>

        <main className="app-main">
          <div className="list-header">
            <h2>Mes tâches</h2>
            {loading && <span className="loading-text">Chargement...</span>}
          </div>
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} onEdit={editTodo} />
        </main>
      </div>
    </div>
  )
}

export default App
