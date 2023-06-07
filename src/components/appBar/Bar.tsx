import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";

const Bar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme === "light" ? "darkblue" : "#292828" }}
      >
        <Toolbar>
          <Typography width="100%" textAlign={"center"}
          sx={{ color: theme === "light" ? "white" : "white" }}
          >
            App Bar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
