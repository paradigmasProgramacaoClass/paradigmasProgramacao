import { createBrowserRouter, Navigate } from "react-router-dom"
import TesteTema from "@/pages/TesteTema"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/teste" replace />,
  },
  {
    path: "/teste",
    element: <TesteTema />,
  },
  {
    path: "*",
    element: <Navigate to="/teste" replace />,
  },
])
