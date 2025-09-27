"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TradutorEmojis {
    dicionario = {
        "amor": "❤️",
        "futebol": "⚽",
        "cachorro": "🐶"
    };
    traduzir(frase) {
        return frase
            .split(" ")
            .map(palavra => this.dicionario[palavra] || palavra)
            .join(" ");
    }
}
const tradutor = new TradutorEmojis();
console.log(tradutor.traduzir("O amor do brasileiro é o futebol"));
