import { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const saveEdit = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li className={todo.completed ? "todo-item completed" : "todo-item"}>
      <button className="check-btn" onClick={() => onToggle(todo.id)} title="Marquer comme complétée">
        {todo.completed ? "✅" : "⬜"}
      </button>
      {editing ? (
        <input
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          autoFocus
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div className="todo-actions">
        {editing ? (
          <>
            <button className="save-btn" onClick={saveEdit} title="Sauvegarder">💾</button>
            <button className="cancel-btn" onClick={cancelEdit} title="Annuler">✖</button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => { setEditText(todo.text); setEditing(true); }} title="Modifier">✏️</button>
        )}
        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Supprimer</button>
      </div>
    </li>
  );
}

export default TodoItem;
