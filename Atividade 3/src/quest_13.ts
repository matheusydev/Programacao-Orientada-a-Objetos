class TradutorEmojis {
    dicionario: { [palavra: string]: string } = {
        "amor": "❤️",
        "futebol": "⚽",
        "cachorro": "🐶"
    };

    traduzir(frase: string): string {
        return frase
            .split(" ")
            .map(palavra => this.dicionario[palavra] || palavra)
            .join(" ");
    }
}

const tradutor = new TradutorEmojis();
console.log(tradutor.traduzir("O amor do brasileiro é o futebol"));

