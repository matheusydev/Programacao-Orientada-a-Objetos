"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Autenticacao {
    usuario;
    senha;
    constructor(usuario, senha) {
        this.usuario = usuario;
        this.senha = senha;
    }
    validar() {
        if (this.usuario === "admin" && this.senha === "1234") {
            return "verdadeiro";
        }
        else {
            return "falso";
        }
    }
}
const auth = new Autenticacao("admin", "1234");
console.log(auth.validar());
