class Disciplina {
  #id;
  #nome;
  #creditos;
  #concluida;
  #prerequisitos;
  #professor;
  #dataCriacao;

  constructor(nome, creditos, prerequisitos = [], professor = "", id = null, dataCriacao = null) {
    this.#id = id;
    this.#nome = nome;
    this.#creditos = creditos;
    this.#concluida = false;
    this.#prerequisitos = prerequisitos;
    this.#professor = professor;
    this.#dataCriacao = dataCriacao || new Date().toISOString();
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

  getProfessor() {
    return this.#professor;
  }

  getDataCriacao() {
    return this.#dataCriacao;
  }

  getDataCriacaoFormatada() {
    const data = new Date(this.#dataCriacao);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
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
      prerequisitos: this.#prerequisitos,
      professor: this.#professor,
      dataCriacao: this.#dataCriacao
    };
  }

  static fromJSON(data, id = null) {
    const d = new Disciplina(
      data.nome,
      data.creditos,
      data.prerequisitos || [],
      data.professor || "",
      id,
      data.dataCriacao
    );
    if (data.concluida) {
      d.marcarConcluida();
    }
    return d;
  }
}

export default Disciplina;
