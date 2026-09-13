import { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/config/firebase"
import { useAuth } from "@/context/AuthContext"
import { traduzirErroAuth } from "@/lib/auth-errors"

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  if (user !== null && user !== undefined) {
    return <Navigate to="/" replace />;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (err) {
      setErro(traduzirErroAuth(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-regular-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-3xl border border-border p-10 shadow-sm">

        {/* LOGO */}
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xs tracking-wider">LOGO</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Login</h1>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-regular-700 font-normal">E-mail</Label>
            <Input
              id="email"
              type="email"
              className="h-12 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-sm text-regular-700 font-normal">Senha</Label>
            <div className="relative">
              <Input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                className="h-12 rounded-xl pr-10"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-regular-500 hover:text-regular-700"
                onClick={() => setMostrarSenha((prev) => !prev)}
              >
                {mostrarSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <div className="pt-1">
            <Link
              to="/recuperar-senha"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 text-white"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>

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
