import React, { useState, useEffect, Suspense, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import "./App.css";
import Main from "./components/Main";
import { ThemeProvider, ThemeContext } from "./utils/ThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const storedUsername = window.localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const muitheme = createTheme({
    palette: {
      mode: theme as PaletteMode,
    },
  });

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
          <ThemeProvider>
            <MuiThemeProvider theme={muitheme}>
              <Main />
            </MuiThemeProvider>
          </ThemeProvider>
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
