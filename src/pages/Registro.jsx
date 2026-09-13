import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Registro() {
  return (
    <div className="min-h-screen bg-regular-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-3xl border border-border p-10 shadow-sm">
        
        {/* LOGO */}
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xs tracking-wider">LOGO</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Criar Conta</h1>
        <p className="text-sm text-regular-700 mb-8 leading-relaxed">
          Preencha os campos abaixo para iniciar seu planejamento acadêmico.
        </p>

        {/* Formulário */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm text-regular-700 font-normal">Nome</Label>
            <Input
              id="nome"
              type="text"
              className="h-12 rounded-xl"
            />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha" className="text-sm text-regular-700 font-normal">Confirmar senha</Label>
            <div className="relative">
              <Input
                id="confirmarSenha"
                type="password"
                className="h-12 rounded-xl pr-10"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-regular-500 hover:text-regular-700"
              >
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/login" className="block w-full">
              <Button className="w-full h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 text-white">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-regular-700">
            Já é um usuário?{" "}
            <Link
              to="/login"
              className="font-bold text-primary hover:underline"
            >
              Voltar para login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
