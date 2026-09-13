import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function RotaProtegida({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-paragraph text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
