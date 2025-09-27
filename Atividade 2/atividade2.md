# Exercícios 2 de POO

## 1. Qual a diferença entre tipagem dinâmica e tipagem estática?

A tipagem dinâmica ocorre quando o tipo da variável é definido e verificado somente em tempo de execução, permitindo que uma mesma variável assuma valores de diferentes tipos ao longo do programa. A vantagem da tipagem dinâmica é a maior flexibilidade facilitada na escrita do código e seu maior defeito é a maior quantidade de erros de operações inválidas ou de tipagem.

Tipagem estática é caracterizado quando definimos o tipo da variável no momento em que declaramos (ex: em C `int idade = 18;`). A variável `idade` é do tipo inteiro e não pode ser alterada para outro tipo, como transformar ela num string. A tipagem estática permite a detecção de erros de tipo mais cedo no ciclo de desenvolvimento, aumentando a segurança e confiabilidade do código, entretanto exige um rigor maior por parte do programador, já que desde o início declaramos o tipo da variável.

## 2. Qual o principal problema do uso de tipagem dinâmica?

O principal problema é o erro de tipo, e ele só é identificado durante a execução do código.

## 3. Pesquise um exemplo na internet em que a tipagem dinâmica pode ser problemática.

Um exemplo em que a tipagem dinâmica pode ser problemática acontece em linguagens como JavaScript. Imagine uma variável inicialmente declarada como número, recebendo o valor 25. Em seguida, essa mesma variável é atribuída a uma string, como “vinte cinco”. Quando o programa tenta multiplicar essa variável por 2, o resultado não é o esperado, pois a operação entre string e número não faz sentido, retornando o valor especial `NaN` (“Not a Number”). Esse tipo de situação é perigoso porque o erro só é identificado em tempo de execução, podendo causar falhas inesperadas e difíceis de rastrear, já que em programas maiores pode ser complicado descobrir em qual ponto a variável deixou de ser numérica.

## 4. Crie uma variável chamada idade do tipo number e tente atribuir a ela um valor string. O que acontece?

Ocorre o seguinte erro: `Type 'string' is not assignable to type 'number'`. O compilador não permite que eu atribua um valor do tipo ‘string’ a um do tipo ‘number’.

## 5. Agora crie a variável nome sem declarar o tipo (apenas `let nome = "Ely";`). Qual o tipo inferido pelo TypeScript?

```typescript
let nome = "Ely";
console.log(typeof nome);
```

Automaticamente, o TypeScript assume que `nome` é do tipo ‘string’. Também poderíamos especificar o tipo antes, o que daria no mesmo resultado.

## 6. Pesquise e exemplifique porque dizemos que a linguagem C, mesmo tendo tipagem estática, possui tipagem fraca.

A linguagem C é estaticamente tipada porque os tipos das variáveis são definidos em tempo de compilação, mas é fracamente tipada porque permite conversões automáticas (implícitas) entre tipos de dados incompatíveis sem gerar erro. Essa conversão automática, embora flexível, pode resultar em resultados imprevisíveis e é a razão pela qual, apesar da tipagem estática, ela é considerada fracamente tipada.

```c
float a;   // Variável de ponto flutuante
int b = 1;
int c = 2;

a = b / c; // O compilador não gera erro, mas realiza uma conversão implícita que pode levar a um resultado inesperado (0.0 em vez de 0.5).
```

## 7. Poderíamos dizer que a tipagem do TypeScript é fraca por uma variável do tipo `number` aceitar tanto inteiros como ponto flutuante?

Não, o fato de o tipo `number` no TypeScript aceitar inteiros e números de ponto flutuante não indica tipagem fraca. TypeScript é estaticamente tipado e mantém a consistência dos tipos. Tipagem fraca ocorreria quando há mistura de tipos diferentes (como `string` e `number`) sem verificação de consistência.

---

### Quais os resultados? Teça comentários a respeito

## 8. Execute os exemplos abaixo em um ambiente de JavaScript puro:

* **a. Exemplo 1:** O resultado foi “105”. Isso porque ele concatena a variável tipo `number` `a` (que é 10) com a `string` "5", resultando na string "105".
* **b. Exemplo 2:** O resultado é `3`. JavaScript realiza uma coerção de tipo, tratando o valor `true` da variável `x` como o número `1` e o soma com `y`, que é `2`.
* **c. Exemplo 3:** O resultado é `true` para ambos os casos. Em JavaScript, o número `0` e uma string vazia `""` são considerados valores "falsy" (falsos) em contextos booleanos. A negação (`!`) de um valor "falsy" resulta em `true`.

## 9. Execute os dois mesmos exemplos em um ambiente TypeScript. Verifique o que acontece e comente sobre.

Ambos os exemplos geraram erros de compilação. TypeScript, por ter tipagem estática, não permite operações entre tipos incompatíveis sem uma conversão explícita, prevenindo os comportamentos inesperados que ocorrem em JavaScript puro.