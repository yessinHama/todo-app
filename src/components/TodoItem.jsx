function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? "todo-item completed" : "todo-item"}>
      <button className="check-btn" onClick={() => onToggle(todo.id)} title="Marquer comme complétée">
        {todo.completed ? "✅" : "⬜"}
      </button>
      <span>{todo.text}</span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>Supprimer</button>
    </li>
  );
}

export default TodoItem;
