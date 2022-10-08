import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }
])

export default function Router() {
  return (
    <RouterProvider router={ router } />
  )
}
