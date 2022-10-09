import React from 'react';
import {  createBrowserRouter,  RouterProvider } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/profile",
    element: <Profile />
  }
])

export default function Router() {
  return (
    <RouterProvider router={ router } />
  )
}
