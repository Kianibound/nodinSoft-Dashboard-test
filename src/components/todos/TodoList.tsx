import React, { useContext, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ThemeContext } from "../../utils/ThemeProvider";

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
  const [editTodoText, setEditTodoText] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleEditTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoText(event.target.value);
  };

  const handleEditTodoCancel = () => {
    setEditTodoId(null);
    setEditTodoText("");
  };

  const handleEditTodoSubmit = () => {
    if (!editTodoId) return;

    const editedTodo = {
      id: editTodoId,
      text: editTodoText,
      completed:
        todos.find((todo) => todo.id === editTodoId)?.completed ?? false,
    };

    if (onEditTodo) {
      onEditTodo(editedTodo);
    }

    setEditTodoId(null);
    setEditTodoText("");
  };

  return (
    <List
      sx={{
        backgroundColor: theme === "light" ? "white" : "#292828",
        color: theme === "light" ? "black" : "white",
      }}
    >
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        >
          {todo.id === editTodoId ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                label="Edit Todo"
                value={editTodoText}
                onChange={handleEditTodoChange}
                sx={{
                  backgroundColor: theme === "light" ? "white" : "#292828",
                  color: theme === "light" ? "black" : "white",
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={handleEditTodoCancel}
                  sx={{
                    backgroundColor: theme === "light" ? "white" : "#292828",
                    color: theme === "light" ? "black" : "white",
                  }}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={handleEditTodoSubmit}
                  sx={{
                    backgroundColor: theme === "light" ? "white" : "#292828",
                    color: theme === "light" ? "black" : "white",
                  }}
                >
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
                sx={{
                  backgroundColor: theme === "light" ? "white" : "#292828",
                  color: theme === "light" ? "black" : "white",
                }}
              />
              <ListItemText
                primary={todo.text}
                style={
                  todo.completed
                    ? { textDecoration: "line-through" }
                    : undefined
                }
                sx={{
                  backgroundColor: theme === "light" ? "white" : "#292828",
                  color: theme === "light" ? "black" : "white",
                }}
              />
              <ListItemSecondaryAction>
                {onDeleteTodo && (
                  <IconButton
                    onClick={() => onDeleteTodo?.(todo.id)}
                    aria-label="delete"
                    sx={{
                      backgroundColor: theme === "light" ? "white" : "#292828",
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => {
                    setEditTodoId(todo.id);
                    setEditTodoText(todo.text);
                  }}
                  aria-label="edit"
                  sx={{
                    backgroundColor: theme === "light" ? "white" : "#292828",
                    color: theme === "light" ? "black" : "white",
                  }}
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
