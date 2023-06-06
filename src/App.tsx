import React, { useState, useEffect, Suspense } from "react";
import { TextField, Button, Box } from "@mui/material";
import "./App.css";
import Main from "./components/Main";

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = window.localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUsername = formData.get("username") as string;
    window.localStorage.setItem("username", newUsername);
    setUsername(newUsername);
  };

  return (
    <>
      {username ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Main />
        </Suspense>
      ) : (
        <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
          <form onSubmit={handleUsernameSubmit}>
            <TextField
              name="username"
              label="Enter your name"
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Enter Dashboard
            </Button>
          </form>
        </Box>
      )}
    </>
  );
}

export default App;
