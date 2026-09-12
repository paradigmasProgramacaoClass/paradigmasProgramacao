import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import Registro from "@/pages/Registro"
import Home from "@/pages/Home"
import MeusCreditos from "@/pages/MeusCreditos"
import MinhasAtividades from "@/pages/MinhasAtividades"
import Disciplinas from "@/pages/Disciplinas"
import DisciplinasConcluidas from "@/pages/DisciplinasConcluidas"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/meus-creditos",
    element: <MeusCreditos />,
  },
  {
    path: "/atividades",
    element: <MinhasAtividades />,
  },
  {
    path: "/disciplinas",
    element: <Disciplinas />,
  },
  {
    path: "/disciplinas-concluidas",
    element: <DisciplinasConcluidas />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
