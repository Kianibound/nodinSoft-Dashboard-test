import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DashBoard from "../dashboard/DashBoard";
import Todos from "../todos/Todos";
import Weather from "../weather/Weather";
import Profile from "../profile/Profile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", backgroundColor: "white" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "90vh",
        width: "100%",
        border: "1px solid blue",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{ borderRight: 1, borderColor: "divider", borderBottom: 1 }}
      >
        <Tab label="Dashoard" {...a11yProps(0)} />
        <Tab label="Todos" {...a11yProps(1)} />
        <Tab label="Weather" {...a11yProps(2)} />
        <Tab label="Profile" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DashBoard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Todos />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Weather />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Profile />
      </TabPanel>
    </Box>
  );
}
