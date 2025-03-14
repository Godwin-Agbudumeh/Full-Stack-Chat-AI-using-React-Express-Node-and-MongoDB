import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import MainChatPage from './pages/mainChatPage/MainChatPage'
import RootLayout from './layouts/rootLayout/RootLayout'
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { ContextProvider } from './context/Context';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
     {
       path: "/",
       element: <Home />,
     },
     {
      path: "/login",
      element: <Login />,
     },
     {
      path: "/register",
      element: <Register />,
     },
     {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/chats/:id",
          element: <MainChatPage />,
        },
      ]
    },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>     
  </React.StrictMode>
)
