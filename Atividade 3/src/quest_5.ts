function exibir(...lista: string[]): string {
    let resultado = "";
    for (let atual of lista) {
        resultado += atual;
    }
    return resultado;
}

console.log(exibir("a", "b"));          
console.log(exibir("a", "b", "c"));      
console.log(exibir("a", "b", "c", "d")); 
