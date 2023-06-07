import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DashBoard from "../dashboard/DashBoard";
import Todos from "../todos/Todos";
import Weather from "../weather/Weather";
import Profile from "../profile/Profile";
import { ThemeContext } from "../../utils/ThemeProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const { theme } = useContext(ThemeContext);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        width: "100%",
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
      }}
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
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "90vh",
        width: "100%",
        border: "1px solid blue",
        backgroundColor: theme === "light" ? "white" : "#292828",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          borderBottom: 1,
          backgroundColor: theme === "light" ? "white" : "#292828",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <Tab
          label="Dashoard"
          {...a11yProps(0)}
          sx={{ color: theme === "light" ? "black" : "white" }}
        />
        <Tab
          label="Todos"
          {...a11yProps(1)}
          sx={{ color: theme === "light" ? "black" : "white" }}
        />
        <Tab
          label="Weather"
          {...a11yProps(2)}
          sx={{ color: theme === "light" ? "black" : "white" }}
        />
        <Tab
          label="Profile"
          {...a11yProps(3)}
          sx={{ color: theme === "light" ? "black" : "white" }}
        />
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
