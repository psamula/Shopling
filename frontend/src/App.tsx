import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import Lists from "./components/Lists/Lists";
import Login from "./pages/Login";
import { removeToken } from "./utils/auth";
import Register from "./pages/Register";
import Main from "./pages/Main";
import ListPage from "./pages/ListPage"
const logout = () => {
  removeToken();
  return redirect("/login");
};

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Main />, id: "home" },
  { path: "/login", element: <Login />, id: "login" },
  { path: "/register", element: <Register />, id: "register" },
  { path: "/logout", id: "logout", loader: logout },
  { path: "/list/:listNumber", id: "list", element: <ListPage/> },
  { path: "*", element: <div>Not found</div>, id: "not-found" },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
