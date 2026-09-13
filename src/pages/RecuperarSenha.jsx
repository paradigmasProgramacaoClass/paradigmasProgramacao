import { Link } from "react-router-dom"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/Navbar"

export default function RecuperarSenha() {
  return (
    <div className="min-h-screen bg-regular-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-xl border border-border p-8 shadow-sm">
          {/* Voltar */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao login
          </Link>

          {/* Header */}
          <p className="text-sm font-semibold text-tertiary-700 uppercase tracking-wide">
            MEU CURRÍCULO
          </p>
          <h1 className="text-heading-sm font-bold text-foreground mt-1">
            Recuperar Senha
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Informe seu e-mail cadastrado para enviarmos as instruções de
            recuperação.
          </p>

          {/* Formulário */}
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail cadastrado</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>

            {/* Alerta informativo */}
            <div className="flex items-start gap-2 bg-primary/10 text-primary-800 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
              <p className="text-sm">
                Se o e-mail existir, você receberá um link de recuperação em
                instantes.
              </p>
            </div>

            <Button className="w-full h-11 text-base rounded-xl">
              Enviar link de recuperação
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
