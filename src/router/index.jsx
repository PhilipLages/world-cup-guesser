import React from 'react';
import {  createBrowserRouter,  RouterProvider } from "react-router-dom";
import ErrorPage from '../pages/errorPage';
import Home from '../pages/home';
import Login from '../pages/login';
import SignUp from '../pages/signup';

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
