import { Link } from "react-router-dom"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  return (
    <div className="min-h-screen bg-regular-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-3xl border border-border p-10 shadow-sm">
        
        {/* LOGO */}
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xs tracking-wider">LOGO</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Login</h1>

        {/* Formulário */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-regular-700 font-normal">E-mail</Label>
            <Input
              id="email"
              type="email"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-sm text-regular-700 font-normal">Senha</Label>
            <div className="relative">
              <Input
                id="senha"
                type="password"
                className="h-12 rounded-xl pr-10"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-regular-500 hover:text-regular-700"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-1">
            <Link
              to="/recuperar-senha"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <div className="pt-6">
            <Link to="/" className="block w-full">
              <Button className="w-full h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 text-white">
                Entrar
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-regular-700">
            Ainda não é um usuário{" "}
            <Link
              to="/registro"
              className="font-bold text-primary hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
