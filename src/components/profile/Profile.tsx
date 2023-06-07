import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { ThemeContext } from "../../utils/ThemeProvider";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [name, setName] = useState<string>("");
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const storedName = window.localStorage.getItem("username");
    if (storedName) {
      setName(storedName);
    }
    const storedLang = window.localStorage.getItem("lang");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLangChange = (event: SelectChangeEvent<string>) => {
    setLang(event.target.value);
  };

  const handleSave = () => {
    window.localStorage.setItem("username", name);
    window.localStorage.setItem("lang", lang);
    window.localStorage.setItem("theme", theme);
  };

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: theme === "light" ? "white" : "#292828",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        Profile
      </Typography>
      <Box
        sx={{
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
          sx={{
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 2,
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        >
          <InputLabel
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            Language
          </InputLabel>
          <Select
            value={lang}
            onChange={handleLangChange}
            label="Language"
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <MenuItem
              value="en"
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
            >
              English
            </MenuItem>
            <MenuItem
              value="fa"
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Farsi
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: theme === "light" ? "white" : "#292828",
            color: theme === "light" ? "black" : "white",
          }}
        >
          <InputLabel
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            Theme
          </InputLabel>
          <Select
            value={theme}
            onChange={toggleTheme}
            label="Theme"
            sx={{
              backgroundColor: theme === "light" ? "white" : "#292828",
              color: theme === "light" ? "black" : "white",
            }}
          >
            <MenuItem
              value="light"
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Light
            </MenuItem>
            <MenuItem
              value="dark"
              sx={{
                backgroundColor: theme === "light" ? "white" : "#292828",
                color: theme === "light" ? "black" : "white",
              }}
            >
              Dark
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          mt: 2,
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            mt: 2,
            backgroundColor: theme === "light" ? "white" : "#010724",
            color: theme === "light" ? "black" : "white",
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
