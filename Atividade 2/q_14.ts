class numero {
    valor: number;

    constructor(valor: number){
        this.valor = valor;
    }
    ehpar(): boolean {
    if (this.valor % 2 === 0) {
        return true;
    } else {
        return false;
        }
    }   
    ehimpar(): boolean {
        if (this.valor % 2 !== 0){
            return true;
        } else {
            return false;
        }
    }
}

const num1 = new numero(12);
console.log(`${num1.valor} é par? ${num1.ehpar()}`);    
console.log(`${num1.valor} é ímpar? ${num1.ehimpar()}`); 

const num2 = new numero(7);
console.log(`${num2.valor} é par? ${num2.ehpar()}`);    
console.log(`${num2.valor} é ímpar? ${num2.ehimpar()}`); 