import React from 'react';
import {  createBrowserRouter,  RouterProvider } from "react-router-dom";
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
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
  }
])

export default function Router() {
  return (
    <RouterProvider router={ router } />
  )
}
