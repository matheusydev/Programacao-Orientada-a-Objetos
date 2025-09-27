function aleatorio(nomes: string[]): string {
    const indice = Math.floor(Math.random() * nomes.length);
    return nomes[indice];
}


const lista = ["Matheus", "Ylan", "Araujo", "Moraes"];
console.log(aleatorio(lista));
