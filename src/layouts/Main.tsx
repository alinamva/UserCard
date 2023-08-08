import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
};

export default Main;
