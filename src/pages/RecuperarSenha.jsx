import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { sendPasswordResetEmail } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/Navbar"
import { auth } from "@/config/firebase"
import { traduzirErroAuth } from "@/lib/auth-errors"

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRecuperar(e) {
    e.preventDefault();
    setErro("");
    setSucesso(false);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSucesso(true);
    } catch (err) {
      setErro(traduzirErroAuth(err.code));
    } finally {
      setLoading(false);
    }
  }

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
          <form onSubmit={handleRecuperar} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail cadastrado</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            {/* Alerta informativo */}
            {sucesso ? (
              <div className="flex items-start gap-2 bg-green-100 text-green-800 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <p className="text-sm">Enviamos um link de recuperação para seu e-mail.</p>
              </div>
            ) : (
              <div className="flex items-start gap-2 bg-primary/10 text-primary-800 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <p className="text-sm">
                  Se o e-mail existir, você receberá um link de recuperação em
                  instantes.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base rounded-xl"
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
