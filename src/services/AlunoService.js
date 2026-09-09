import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import Aluno from "../models/Aluno.js";

class AlunoService {
  #uid;
  #disciplinaService;

  constructor(uid, disciplinaService) {
    this.#uid = uid;
    this.#disciplinaService = disciplinaService;
  }

  #ref() {
    return doc(db, "users", this.#uid);
  }

  // Salva o perfil do aluno no Firestore
  // Usa setDoc: cria se nao existir, sobrescreve se existir
  async salvar(aluno) {
    await setDoc(this.#ref(), aluno.toJSON());
  }

  // Busca o perfil do aluno
  async buscar() {
    const snapshot = await getDoc(this.#ref());
    if (!snapshot.exists()) {
      return null;
    }
    return Aluno.fromJSON(snapshot.data());
  }

  // Calcula quantos creditos o aluno ja concluiu
  async creditosConcluidos() {
    const disciplinas = await this.#disciplinaService.listar();
    return disciplinas
      .filter((d) => d.isConcluida())
      .reduce((total, d) => total + d.getCreditos(), 0);
  }

  // Calcula quantos creditos faltam para formatura
  async creditosRestantes() {
    const aluno = await this.buscar();
    if (!aluno) return 0;
    const concluidos = await this.creditosConcluidos();
    return Math.max(0, aluno.getCreditosNecessarios() - concluidos);
  }
}

export default AlunoService;