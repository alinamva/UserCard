import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <div className="p-10 bg-white min-h-screen">
      <Outlet />
    </div>
  );
};

export default Main;
