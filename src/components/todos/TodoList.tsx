import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo?: (id: string) => void;
  onEditTodo?: (todo: Todo) => void;
}

function TodoList({ todos, onDeleteTodo, onEditTodo }: TodoListProps) {
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodoText, setEditTodoText] = useState('');

  const handleEditTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoText(event.target.value);
  };

  const handleEditTodoCancel = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleEditTodoSubmit = () => {
    if (!editTodoId) return;

    const editedTodo = {
      id: editTodoId,
      text: editTodoText,
      completed: todos.find((todo) => todo.id === editTodoId)?.completed ?? false,
    };

    if (onEditTodo) {
      onEditTodo(editedTodo);
    }

    setEditTodoId(null);
    setEditTodoText('');
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          {todo.id === editTodoId ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Edit Todo"
                value={editTodoText}
                onChange={handleEditTodoChange}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={handleEditTodoCancel}>
                  <Delete />
                </IconButton>
                <IconButton onClick={handleEditTodoSubmit}>
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          ) : (
            <>
              <Checkbox
                checked={todo.completed}
                onChange={() => {
                  if (onEditTodo) {
                    onEditTodo({
                      ...todo,
                      completed: !todo.completed,
                    });
                  }
                }}
              />
              <ListItemText
                primary={todo.text}
                style={todo.completed ? { textDecoration: 'line-through' } : undefined}
              />
              <ListItemSecondaryAction>
                {onDeleteTodo && (
                  <IconButton onClick={() => onDeleteTodo?.(todo.id)} aria-label="delete">
                    <Delete />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => {
                    setEditTodoId(todo.id);
                    setEditTodoText(todo.text);
                  }}
                  aria-label="edit"
                >
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;