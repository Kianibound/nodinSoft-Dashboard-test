import { Box } from "@mui/material";
import AppBar from "./appBar/Bar";

import VerticalTabs from "./tabPanel/Panel";

const Main = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5' }}>
      <AppBar />
      <VerticalTabs />
    </Box>
  );
};

export default Main;
