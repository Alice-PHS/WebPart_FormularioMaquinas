var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export var isValidEmail = function (email) { return EMAIL_REGEX.test(email.trim()); };
// Aceita múltiplos e-mails separados por vírgula, ponto-e-vírgula ou quebra de linha.
export var isValidEmailList = function (value) {
    var emails = value.split(/[,;\n]/).map(function (e) { return e.trim(); }).filter(Boolean);
    return emails.length > 0 && emails.every(isValidEmail);
};
//# sourceMappingURL=validation.js.map