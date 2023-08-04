import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cards from "./components/Cards";
import Error from "./components/Error";
import Intro from "./components/Intro";
import Main from "./layouts/Main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Intro />,
        errorElement: <Error />,
      },
      {
        path: "/card",
        element: <Cards />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
