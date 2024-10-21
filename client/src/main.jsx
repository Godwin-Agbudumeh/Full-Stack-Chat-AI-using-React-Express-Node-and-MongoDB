import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage'
import DashboardPage from './pages/dashboardPage/DashboardPage'
import ChatPage from './pages/chatPage/ChatPage'
import RootLayout from './layouts/rootLayout/RootLayout'
import DashboardLayout from './layouts/rootLayout/dashboardLayout/DashboardLayout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
     {
       path: "/",
       element: <Homepage />,
     },
     {
      element: <DashboardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/dashboard/chats/:id",
          element: <ChatPage />,
        },
      ]
    },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
