import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticate } from './auth.js';

const router = express.Router();

// In-memory storage (use a database in production)
let todos = [];

// Protect all routes below with JWT middleware
router.use(authenticate);

// GET /api/todos — récupérer toutes les tâches
router.get('/', (req, res) => {
  res.json(todos);
});

// POST /api/todos — créer une tâche
router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Le texte de la tâche est requis' });
  }

  const todo = {
    id: uuidv4(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id — modifier une tâche (texte ou statut)
router.put('/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);

  if (!todo) {
    return res.status(404).json({ error: 'Tâche introuvable' });
  }

  const { text, completed } = req.body;

  if (text !== undefined) {
    if (!text.trim()) return res.status(400).json({ error: 'Le texte ne peut pas être vide' });
    todo.text = text.trim();
  }

  if (completed !== undefined) {
    todo.completed = Boolean(completed);
  }

  res.json(todo);
});

// DELETE /api/todos/:id — supprimer une tâche
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tâche introuvable' });
  }

  todos.splice(index, 1);
  res.status(204).end();
});

export default router;
