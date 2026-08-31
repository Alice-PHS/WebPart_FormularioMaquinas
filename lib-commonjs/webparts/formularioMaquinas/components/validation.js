"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmailList = exports.isValidEmail = void 0;
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var isValidEmail = function (email) { return EMAIL_REGEX.test(email.trim()); };
exports.isValidEmail = isValidEmail;
// Aceita múltiplos e-mails separados por vírgula, ponto-e-vírgula ou quebra de linha.
var isValidEmailList = function (value) {
    var emails = value.split(/[,;\n]/).map(function (e) { return e.trim(); }).filter(Boolean);
    return emails.length > 0 && emails.every(exports.isValidEmail);
};
exports.isValidEmailList = isValidEmailList;
//# sourceMappingURL=validation.js.map