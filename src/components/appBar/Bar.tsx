import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Bar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography width="100%" textAlign={"center"}>
            App Bar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
