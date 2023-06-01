import AppBar from "./appBar/AppBar";
import DashBoard from "./dashboard/DashBoard";
import Profile from "./profile/Profile";
import Todos from "./todos/Todos";
import Weather from "./weather/Weather";

const Main = () => {
  return (
    <>
      <AppBar />
      <DashBoard />
      <Todos />
      <Weather />
      <Profile />
    </>
  );
};

export default Main;
