// TabbedView.tsx
import React, { useState } from "react";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import Dashboard from "../dashboard/DashBoard";
import Profile from "../profile/Profile";
import Todos from "../todos/Todos";
import Weather from "../weather/Weather";

const tabStyles: { [key: string]: React.CSSProperties } = {
  customTabs: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  customTab: {
    width: "100%",
    height: "40px",
    padding: "10px",
    borderBottom: "1px solid #bbb",
  },
  customTabHover: {
    backgroundColor: "#ccc",
  },
  customTabSelected: {
    backgroundColor: "#bbb",
  },
};

const TabsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={handleTabChange}
          style={tabStyles.customTabs}
        >
          <Tab label="Dashboard" style={tabStyles.customTab} />
          <Tab label="Todos" style={tabStyles.customTab} />
          <Tab label="Weather" style={tabStyles.customTab} />
          <Tab label="Profile" style={tabStyles.customTab} />
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        <TabPanel value={activeTab} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <Todos />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <Weather />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <Profile />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabsView;
