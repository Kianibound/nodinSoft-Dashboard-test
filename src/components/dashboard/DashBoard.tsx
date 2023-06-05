import { CenterFocusStrong } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

// localStorage.getItem('name') || ''
const DashBoard = () => {
  const [name, setName] = useState<string>("Ehsan");
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const [exactTime, setExactTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      let newTimeOfDay: string = "";
      if (hour >= 5 && hour < 12) {
        newTimeOfDay = "morning";
      } else if (hour >= 12 && hour < 18) {
        newTimeOfDay = "afternoon";
      } else {
        newTimeOfDay = "evening";
      }

      setTimeOfDay(newTimeOfDay);

      let newExactTime: string = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
      setExactTime(newExactTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, width: 800 }}>
      <Typography
        textAlign={"center"}
      >{`Good ${timeOfDay}, ${name}!`}</Typography>
      <Typography textAlign={"center"}>{`${exactTime}`}</Typography>
    </Paper>
  );
};

export default DashBoard;
