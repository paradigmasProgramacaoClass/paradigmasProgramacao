import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/config/firebase"
import { traduzirErroAuth } from "@/lib/auth-errors"
import Aluno from "@/models/Aluno"
import AlunoService from "@/services/AlunoService"

export default function Registro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  async function handleRegistro(e) {
    e.preventDefault();
    setErro("");

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem");
      return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, senha);
      const alunoService = new AlunoService(user.uid);
      await alunoService.salvar(
        new Aluno({
          nome,
          email,
          curso: "",
          periodo: 1,
          creditosNecessarios: 1000,
        })
      );
      navigate("/login");
    } catch (err) {
      setErro(traduzirErroAuth(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setErro("");
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Se for primeiro login do Google, cria perfil no Firestore
      const alunoService = new AlunoService(result.user.uid);
      const perfilExistente = await alunoService.buscar();
      if (!perfilExistente) {
        await alunoService.salvar(
          new Aluno({
            nome: result.user.displayName || "Usuário Google",
            email: result.user.email || "",
            curso: "",
            periodo: 1,
            creditosNecessarios: 1000,
          })
        );
      }
      navigate("/");
    } catch (err) {
      setErro(traduzirErroAuth(err.code));
    } finally {
      setLoadingGoogle(false);
    }
  }

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
        <form onSubmit={handleRegistro} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm text-regular-700 font-normal">Nome</Label>
            <Input
              id="nome"
              type="text"
              className="h-12 rounded-xl"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha" className="text-sm text-regular-700 font-normal">Confirmar senha</Label>
            <div className="relative">
              <Input
                id="confirmarSenha"
                type={mostrarConfirmar ? "text" : "password"}
                className="h-12 rounded-xl pr-10"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-regular-500 hover:text-regular-700"
                onClick={() => setMostrarConfirmar((prev) => !prev)}
              >
                {mostrarConfirmar ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 text-white"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-regular-500 font-medium">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <button
          type="button"
          disabled={loadingGoogle}
          onClick={handleGoogleLogin}
          className="w-full h-12 flex items-center justify-center gap-3 rounded-full border border-border bg-white hover:bg-regular-100 text-foreground text-sm font-semibold transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.23 0 2.35.42 3.23 1.25l2.37-2.37C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
          </svg>
          {loadingGoogle ? "Conectando..." : "Entrar com Google"}
        </button>

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
