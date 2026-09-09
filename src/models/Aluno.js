class Aluno {
  #nome;
  #email;
  #curso;
  #periodo;
  #creditosNecessarios;

  constructor({ nome, email, curso, periodo, creditosNecessarios }) {
    this.#nome = nome;
    this.#email = email;
    this.#curso = curso;
    this.#periodo = periodo;
    this.#creditosNecessarios = creditosNecessarios;
  }

  getNome() {
    return this.#nome;
  }

  getEmail() {
    return this.#email;
  }

  getCurso() {
    return this.#curso;
  }

  getPeriodo() {
    return this.#periodo;
  }

  getCreditosNecessarios() {
    return this.#creditosNecessarios;
  }

  setCurso(curso) {
    this.#curso = curso;
  }

  setPeriodo(periodo) {
    this.#periodo = periodo;
  }

  toJSON() {
    return {
      nome: this.#nome,
      email: this.#email,
      curso: this.#curso,
      periodo: this.#periodo,
      creditosNecessarios: this.#creditosNecessarios
    };
  }

  static fromJSON(data) {
    return new Aluno({
      nome: data.nome,
      email: data.email,
      curso: data.curso,
      periodo: data.periodo,
      creditosNecessarios: data.creditosNecessarios
    });
  }
}

export default Aluno;