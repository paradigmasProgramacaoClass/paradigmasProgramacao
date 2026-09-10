import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/firebase"

export default function RotaProtegida({ children }) {
  const [usuario, setUsuario] = useState(undefined)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
    })

    return () => unsubscribe()
  }, [])

  if (usuario === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-paragraph text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (usuario === null) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
