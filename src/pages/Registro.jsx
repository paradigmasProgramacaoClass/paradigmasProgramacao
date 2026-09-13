import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { createUserWithEmailAndPassword } from "firebase/auth"
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
