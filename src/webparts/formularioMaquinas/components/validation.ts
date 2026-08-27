const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email.trim());

// Aceita múltiplos e-mails separados por vírgula, ponto-e-vírgula ou quebra de linha.
export const isValidEmailList = (value: string): boolean => {
  const emails = value.split(/[,;\n]/).map(e => e.trim()).filter(Boolean);
  return emails.length > 0 && emails.every(isValidEmail);
};
