import './App.css';
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import BillingPage from "./components/BillingPage/BillingPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/billingpage",
      element: <BillingPage />,
    },
  ]);
  return (
    <div className="">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
