import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useAluno } from "@/hooks/useAluno"
import { Menu, UserCircle2, LogOut, Home, Book, CheckCircle, Wallet, X } from "lucide-react"

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/disciplinas", label: "Disciplinas", icon: Book },
  { to: "/disciplinas-concluidas", label: "Concluídas", icon: CheckCircle },
  { to: "/meus-creditos", label: "Meus créditos", icon: Wallet },
]

export default function Navbar({ logado = false, nomeUsuario = "" }) {
  const { user, logout } = useAuth()
  const { aluno, loading: loadingAluno } = useAluno()
  const navigate = useNavigate()
  const location = useLocation()
  const [aberto, setAberto] = useState(false)

  // Prioridade: prop explícita > perfil do Firestore > displayName do Firebase > fallback
  const nome =
    nomeUsuario ||
    aluno?.getNome() ||
    user?.displayName ||
    (loadingAluno ? "" : "Usuário")

  async function handleLogout() {
    setAberto(false)
    await logout()
    navigate("/login")
  }

  return (
    <>
      <nav className="w-full bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm rounded-b-2xl mb-8">
        {/* Esquerda: Menu Hambúrguer */}
        <button
          onClick={() => setAberto(true)}
          className="p-1 hover:bg-regular-100 rounded-md transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6 text-primary-800" />
        </button>

        {/* Direita: Área do usuário */}
        {logado && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">{nome}</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <UserCircle2 className="w-6 h-6" />
            </div>
            <button
              onClick={handleLogout}
              className="text-regular-500 hover:text-foreground transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar overlay */}
      {aberto && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setAberto(false)}
          />

          {/* Painel */}
          <div className="relative w-72 h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            {/* Header do sidebar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <span className="font-bold text-foreground">Menu</span>
              <button
                onClick={() => setAberto(false)}
                className="p-1 hover:bg-regular-100 rounded-md transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5 text-regular-500" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {links.map((link) => {
                const Icon = link.icon
                const ativo = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setAberto(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      ativo
                        ? "bg-primary/10 text-primary"
                        : "text-regular-600 hover:bg-regular-100 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Footer: Sair */}
            {logado && (
              <div className="px-4 py-4 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}