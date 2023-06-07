import React, { useContext, useState } from "react";
import { Box, Paper, TextField, Button, Typography, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import { ThemeContext } from "../../utils/ThemeProvider";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function Todos() {
  const { theme } = useContext(ThemeContext);

  const [todos, setTodos] = useState<Todo[]>([
    { id: uuidv4(), text: "Learn React", completed: false },
    { id: uuidv4(), text: "Build a project", completed: false },
    { id: uuidv4(), text: "Deploy to production", completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState("");

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
    setNewTodoText("");
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
    <Box
      sx={{
        p: 3,
        backgroundColor: theme === "light" ? "white" : "#292828",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: theme === "light" ? "white" : "#35363b",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            p: 2,
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        >
          Todos
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            p: 2,
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        >
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              p: 2,
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="New Todo"
              value={newTodoText}
              onChange={handleNewTodoChange}
              sx={{
                backgroundColor: theme === "light" ? "white" : "#35363b",
                color: theme === "light" ? "black" : "white",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleNewTodoSubmit}
              sx={{
                backgroundColor: theme === "light" ? "white" : "#020421",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box
        sx={{
          mt: 2,
          backgroundColor: theme === "light" ? "white" : "#35363b",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <TodoList
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
      </Box>
    </Box>
  );
}

export default Todos;
