class Disciplina {
  #id;
  #nome;
  #creditos;
  #concluida;
  #prerequisitos;

  constructor(nome, creditos, prerequisitos = [], id = null) {
    this.#id = id;
    this.#nome = nome;
    this.#creditos = creditos;
    this.#concluida = false;
    this.#prerequisitos = prerequisitos;
  }

  getId() {
    return this.#id;
  }

  setId(id) {
    this.#id = id;
  }

  getNome() {
    return this.#nome;
  }

  getCreditos() {
    return this.#creditos;
  }

  isConcluida() {
    return this.#concluida;
  }

  getPrerequisitos() {
    return this.#prerequisitos;
  }

  marcarConcluida() {
    this.#concluida = true;
  }

  desmarcarConcluida() {
    this.#concluida = false;
  }

  toJSON() {
    return {
      nome: this.#nome,
      creditos: this.#creditos,
      concluida: this.#concluida,
      prerequisitos: this.#prerequisitos
    };
  }

  static fromJSON(data, id = null) {
    const d = new Disciplina(data.nome, data.creditos, data.prerequisitos || [], id);
    if (data.concluida) {
      d.marcarConcluida();
    }
    return d;
  }
}

export default Disciplina;