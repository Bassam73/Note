import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import UserContextProvider from "./Contexts/UserToken";
import NotFound from "./Components/NotFound/NotFound";
import Guard from "./Components/Guard/Guard";
import NotesProvider, { Notes } from "./Contexts/Note";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Guard>
              <Home />
            </Guard>
          ),
        },
        {
          path: "*",
          element: (
            <Guard>
              <NotFound />
            </Guard>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <NotesProvider>
          <RouterProvider router={routes} />
        </NotesProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
