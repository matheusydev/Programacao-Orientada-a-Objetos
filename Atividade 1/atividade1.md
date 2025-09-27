# Exercícios 1 de POO

## 1. Diferença entre Classe e Objeto

A **Classe** é o molde. Ela define a estrutura, os ingredientes (**atributos**) e as instruções de preparo (**métodos**) de forma genérica. Por si só, a forma de bolo não consegue fazer nada. Ela é apenas um modelo para criar algo.

O **Objeto** é o bolo. Ele é uma instância da classe. Usando a mesma forma (classe), pode criar diversos bolos (objetos), e cada um pode ter características únicas.  

**Exemplo:**  

- Classe: `FormaBolo`  
- Objetos: `BoloPistache`, `BoloMorango`, `BoloChocolate`  

A classe `FormaBolo` define que todos os bolos têm características como formato, sabor, recheio, etc., e cada bolo possui características próprias.

---

## 2. Atributos e Métodos

- **Atributos**: características próprias dos objetos de uma classe, que definem seus dados.  
- **Métodos**: ações ou comportamentos que os objetos podem executar.  

**Exemplo:**  

- Classe: `Bolo`  
- Atributos: `sabor`, `recheio`, `cobertura`, `formato`, `tamanho`  
- Métodos: `assar()`, `decorar()`, `cortar()`, `rechear()`

---

## 3. Importância de atributos em diferentes sistemas

| Atributo             | Sistemas em que não é importante       | Sistemas em que é moderadamente importante | Sistemas em que é essencial                 |
|----------------------|---------------------------------------|-------------------------------------------|--------------------------------------------|
| CPF                  | Sistema de um jogo                     | Sistema de venda de ingresso              | Sistema Governamental                       |
| Histórico de saúde   | Sistema de streaming de áudio          | Sistema escolar                            | Sistema Hospitalar                           |
| Quantidade de seguidores | Sistema escolar                     | Sistema de E-commerce                      | Sistema de rede social                       |
| Habilidade destra    | Sistema de vendas                      | Sistema escolar                            | Sistema de análise de jogadores de futebol  |
| Endereço             | Sistema de jogos                       | Sistema de e-commerce                      | Sistema de geolocalização                   |
| Saldo em conta       | Sistema de leitura                     | Sistema Bibliotecário                       | Sistema Bancário                             |
| Etnia                | Sistema de streaming                   | Sistema Escolar                             | Sistema de concursos                          |

---

## 4. Relação entre Objetos

Um objeto `Conta` pode possuir um atributo interno `Pessoa` representando o titular.

---

## 5. Atributos de uma classe Universidade/Aluno

- Matrícula  
- Histórico  
- Curso  
- Laboratório  
- Calendário  

---

## 6. Exemplo de Classe: Jogo de Futebol

- **Atributos:** `Estadio`, `Mandante`, `Visitante`, `Placar`, `Campeonato`  
- **Métodos:** `inicio()`, `paradatecnica()`, `substituicao()`, `falta()`, `intervalo()`
