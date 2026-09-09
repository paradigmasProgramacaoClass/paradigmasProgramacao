import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../config/firebase.js";
import Disciplina from "../models/Disciplina.js";

class DisciplinaService {
  #uid;

  constructor(uid) {
    this.#uid = uid;
  }

  // Caminho da subcollection: users/{uid}/disciplinas
  #ref() {
    return collection(db, "users", this.#uid, "disciplinas");
  }

  // Adiciona uma disciplina nova
  async adicionar(disciplina) {
    const docRef = await addDoc(this.#ref(), disciplina.toJSON());
    return docRef.id;
  }

  // Lista todas as disciplinas do aluno
  async listar() {
    const snapshot = await getDocs(this.#ref());
    return snapshot.docs.map((doc) => {
      // Passa o id do documento para o model manter o encapsulamento
      return Disciplina.fromJSON(doc.data(), doc.id);
    });
  }

  // Atualiza uma disciplina (nome, creditos, prerequisitos)
  async atualizar(id, disciplina) {
    const ref = doc(db, "users", this.#uid, "disciplinas", id);
    await updateDoc(ref, disciplina.toJSON());
  }

  // Remove uma disciplina
  async remover(id) {
    const ref = doc(db, "users", this.#uid, "disciplinas", id);
    await deleteDoc(ref);
  }

  // Marca ou desmarca como concluida usando o model como fonte de verdade
  async toggleConcluida(disciplina) {
    if (disciplina.isConcluida()) {
      disciplina.desmarcarConcluida();
    } else {
      disciplina.marcarConcluida();
    }

    const id = disciplina.getId();
    const ref = doc(db, "users", this.#uid, "disciplinas", id);
    await updateDoc(ref, { concluida: disciplina.isConcluida() });
  }

  // Lista as disciplinas que o aluno pode cursar agora
  // (pre-requisitos cumpridos e ainda nao concluidas)
  async listarDisponiveis() {
    const todas = await this.listar();

    // Cria um Set com os nomes das disciplinas concluidas
    const nomesConcluidos = new Set(
      todas.filter((d) => d.isConcluida()).map((d) => d.getNome())
    );

    // Retorna as nao concluidas cujos pre-requisitos estao todos no Set
    return todas.filter((d) => {
      if (d.isConcluida()) return false;
      const prereqs = d.getPrerequisitos();
      return prereqs.every((nome) => nomesConcluidos.has(nome));
    });
  }
}

export default DisciplinaService;