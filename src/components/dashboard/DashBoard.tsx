import { Paper, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";

const DashBoard = () => {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState<string>("");
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const [exactTime, setExactTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();

      const storedName = window.localStorage.getItem("username");
      if (storedName) {
        setName(storedName);
      }

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
    <Paper
      elevation={3}
      sx={{
        p: 3,
        width: 800,
        backgroundColor: theme === "light" ? "white" : "#292828",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Typography
        textAlign={"center"}
        sx={{ color: theme === "light" ? "black" : "white" }}
      >{`Good ${timeOfDay}, ${name}!`}</Typography>
      <Typography
        textAlign={"center"}
        sx={{ color: theme === "light" ? "black" : "white" }}
      >{`${exactTime}`}</Typography>
    </Paper>
  );
};

export default DashBoard;
