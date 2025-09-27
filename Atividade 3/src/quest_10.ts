class Autenticacao {
    usuario: string;
    senha: string;

    constructor(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }

    validar(): string {
        if (this.usuario === "admin" && this.senha === "1234") {
            return "verdadeiro";
        } else {
            return "falso";
        }
    }
}

const auth = new Autenticacao("admin", "1234");
console.log(auth.validar()); 
