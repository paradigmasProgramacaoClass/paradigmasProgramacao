import { createBrowserRouter, Navigate } from "react-router-dom"
import RotaProtegida from "@/components/RotaProtegida"
import Login from "@/pages/Login"
import Registro from "@/pages/Registro"
import RecuperarSenha from "@/pages/RecuperarSenha"
import Home from "@/pages/Home"
import MeusCreditos from "@/pages/MeusCreditos"
import Disciplinas from "@/pages/Disciplinas"
import DisciplinasConcluidas from "@/pages/DisciplinasConcluidas"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RotaProtegida><Home /></RotaProtegida>,
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
    path: "/recuperar-senha",
    element: <RecuperarSenha />,
  },
  {
    path: "/meus-creditos",
    element: <RotaProtegida><MeusCreditos /></RotaProtegida>,
  },
  {
    path: "/disciplinas",
    element: <RotaProtegida><Disciplinas /></RotaProtegida>,
  },
  {
    path: "/disciplinas-concluidas",
    element: <RotaProtegida><DisciplinasConcluidas /></RotaProtegida>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])
