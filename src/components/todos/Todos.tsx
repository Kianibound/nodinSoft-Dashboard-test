import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: uuidv4(), text: 'Learn React', completed: false },
    { id: uuidv4(), text: 'Build a project', completed: false },
    { id: uuidv4(), text: 'Deploy to production', completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(event.target.value);
  };

  const handleNewTodoSubmit = () => {
    if (!newTodoText.trim()) return;

    const newTodo: Todo = {
      id: uuidv4(),
      text: newTodoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (editedTodo: Todo) => {
    setTodos(
      todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Todos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              variant="outlined"
              label="New Todo"
              value={newTodoText}
              onChange={handleNewTodoChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleNewTodoSubmit}
            >
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ mt: 2 }}>
        <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onEditTodo={handleEditTodo} />
      </Box>
    </Box>
  );
}

export default Todos;