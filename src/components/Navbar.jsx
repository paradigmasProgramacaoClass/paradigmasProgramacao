import { Link } from "react-router-dom"
import { Menu, UserCircle2 } from "lucide-react"

export default function Navbar({ logado = false, nomeUsuario = "Fulano de Tal" }) {
  return (
    <nav className="w-full bg-white border-b border-border px-6 py-4 flex items-center justify-between shadow-sm rounded-b-2xl mb-8">
      {/* Esquerda: Menu Hambúrguer */}
      <button className="p-1 hover:bg-regular-100 rounded-md transition-colors">
        <Menu className="w-6 h-6 text-primary-800" />
      </button>

      {/* Direita: Área do usuário */}
      {logado && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">{nomeUsuario}</span>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <UserCircle2 className="w-6 h-6" />
          </div>
        </div>
      )}
    </nav>
  )
}
