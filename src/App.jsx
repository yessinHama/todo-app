import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const total = todos.length
  const done = todos.filter(t => t.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1><span>✅</span> Ma Todo List</h1>
        <div className="header-stats">
          <span className="stat-badge">{total} tâche{total !== 1 ? 's' : ''}</span>
          <span className="stat-badge done">{done} complétée{done !== 1 ? 's' : ''}</span>
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
          </div>
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </main>
      </div>
    </div>
  )
}

export default App
