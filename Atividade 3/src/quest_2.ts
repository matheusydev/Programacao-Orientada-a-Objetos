function saudacao(nome: string = " ", saudacao: string = "Sr."): string{
    return saudacao + " " + nome
}

console.log(saudacao('Matheus'))
console.log(saudacao('Matheus', 'Doutor'))