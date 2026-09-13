const erros = {
  "auth/invalid-credential": "E-mail ou senha incorretos",
  "auth/user-not-found": "Usuário não encontrado",
  "auth/wrong-password": "Senha incorreta",
  "auth/invalid-email": "E-mail inválido",
  "auth/too-many-requests": "Muitas tentativas. Tente mais tarde",
  "auth/network-request-failed": "Erro de conexão. Verifique sua internet",
  "auth/email-already-in-use": "Este e-mail já está cadastrado",
  "auth/weak-password": "A senha deve ter pelo menos 6 caracteres",
};

export function traduzirErroAuth(code) {
  return erros[code] || "Erro ao entrar. Tente novamente";
}
