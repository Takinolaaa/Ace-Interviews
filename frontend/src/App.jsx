import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

import Recordings from "./pages/Recordings";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/recordings", element: <Recordings /> },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
