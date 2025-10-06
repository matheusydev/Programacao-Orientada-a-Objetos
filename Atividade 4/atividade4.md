### 1° Assinale verdadeiro ou falso:

-   ( **F** ) Objetos são modelos para classes;
-   ( **V** ) Atributos de uma classe devem ser obrigatoriamente inicializados para que as classes compilem;
-   ( **F** ) Uma variável declarada dentro de um método deve ser inicializada para que a classe seja compilável;
-   ( **F** ) Uma variável que seja uma classe declarada em um método é automaticamente inicializada com `undefined`;
-   ( **V** ) Construtores são rotinas especiais que servem para inicializar e configurar os objetos no momento da instanciação;
-   ( **V** ) Construtores não possuem tipo de retorno e podem ou não ter parâmetros;
-   ( **V** ) Uma classe pode ter várias instâncias.

### 2° Suponha uma classe Hotel que sirva apenas para guardar a quantidade de solicitações de reservas feitas conforme abaixo:

```typescript
class Hotel {
  quantReservas: number;

  adicionarReserva(): void {
    this.quantReservas++;
  }
}
```

### Podemos afirmar que haverá um problema de compilação, pois a variável inteira não foi inicializada previamente? Justifique. 

RESPOSTA: Sim, podemos afirmar que haverá um problema, mas não necessariamente de compilação, e sim de lógica em tempo de execução.

### 3º Ainda sobre a classe do exemplo anterior, considere o código abaixo:

```typescript
let hotel : Hotel = new Hotel(2);
console.log(hotel.quantReservas);
```
### Adicione o construtor que aceite um parâmetro inteiro e faça a inicialização do atributo quantReservas. 

RESPOSTA:
```typescript
class Hotel {
    quantReservas: number;


    constructor(valorInicial: number) {
        this.quantReservas = valorInicial;
    }


    adicionarReserva(): void {
        this.quantReservas++;
    }
}


let hotel: Hotel = new Hotel(2);
console.log(hotel.quantReservas);
```

### 4º Considere a classe Radio e as instruções que fazem seu uso abaixo:
```typescript
class Radio {
 volume : number;
 constructor(volume : number) {
 this.volume = volume;
 }
}
let r : Radio = new Radio();
r.volume = 10;
```
### Justifique o erro de compilação e proponha uma solução

RESPOSTA: O erro de compilação ocorre porque a classe `Radio` possui um construtor que exige obrigatoriamente um parâmetro do tipo number (constructor(volume : number)). No entanto, a tentativa de instanciação let r : Radio = new Radio(); chama o construtor sem passar nenhum argumento, o que entra em conflito com a definição da classe.

```typescript
class Radio {
    volume : number;


    constructor(volume : number) {
        this.volume = volume;
    }
}

let r : Radio = new Radio(10);
console.log(r.volume);
```

### 5º Considerando o uso da classe Conta apresentada em aula e seu uso abaixo:
```typescript
let c1: Conta = new Conta("1",100);
let c2: Conta = new Conta("2",100);
let c3: Conta;
c1 = c2;
c3 = c1;
c1.sacar(10);
c1.transferir(c2,50);
console.log(c1.consultarSaldo());
console.log(c2.consultarSaldo());
console.log(c3.consultarSaldo());
```

### a. Qual o resultado dos dois "prints"? Justifique sua resposta. 
RESPOSTA: Todos os três console.log imprimirão o valor 90.
JUSTUFICATIVA: 
1. Passo: c1 e c2 são criados como dois objetos distintos na memória. c1 aponta para a Conta "1" e c2 aponta para a Conta "2".

2. Passo: A linha c1 = c2; faz com que a variável c1 deixe de apontar para a Conta "1" e passe a apontar para o mesmo objeto que c2 aponta (a Conta "2").

3. Passo: A linha c3 = c1; faz com que c3 também aponte para esse mesmo objeto (a Conta "2").

4. Passo: Neste ponto, c1, c2, e c3 são três referências diferentes para o mesmo objeto na memória (a Conta "2" com saldo 100).

5. Passo: c1.sacar(10); retira 10 do saldo desse único objeto, que passa a ser 90.

6. Passo: c1.transferir(c2, 50); tenta transferir 50 do objeto para ele mesmo. O resultado líquido é nulo (saca 50 e deposita 50 no mesmo lugar), então o saldo permanece 90.

7. Passo: Como todas as variáveis apontam para o mesmo objeto, ao consultar o saldo através de qualquer uma delas (c1, c2 ou c3), o resultado será o saldo atual do único objeto modificado: 90.


### b. O que acontece com o objeto para o qual a referência c1 apontava?

RESPOSTA: O objeto original para o qual c1 apontava (a Conta com número "1" e saldo 100) perde sua única referência. Ele se torna um "lixo" na memória, pois nenhuma variável no programa tem mais acesso a ele.

JUSTIFICATIVA: Em ambientes com Garbage Collector (Coletor de Lixo), como o que executa TypeScript, esse objeto órfão será eventualmente identificado e removido da memória, liberando os recursos que ele ocupava. Sua resposta está perfeitamente correta.
