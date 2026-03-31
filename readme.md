🚀 Desafio: Rotas Express em 1 Minuto
Este projeto demonstra como criar uma API completa utilizando Node.js e Express. Aprendemos a gerenciar uma lista de animes (JSON) e a ler dados de filmes (CSV).

🛠️ Tecnologias Utilizadas
Node.js: Ambiente de execução.

Express: Framework para criação das rotas.

FS & Path: Manipulação de arquivos e caminhos.

CSV-Parser: Para leitura dinâmica de arquivos CSV.

📌 Guia de Referência das Rotas
Abaixo estão os exemplos de como utilizar cada rota da aplicação. Você pode usar ferramentas como Postman, Insomnia ou a extensão Thunder Client do VS Code.

1. Listar Animes
Retorna todos os animes cadastrados na memória.

Método: GET

URL: http://localhost:3000/animes

2. Adicionar Anime
Adiciona um novo anime. O ID é gerado automaticamente no servidor para garantir a ordem {id, nome, votos}.

Método: POST

URL: http://localhost:3000/animes

Corpo (JSON):

JSON
{
  "nome": "Chainsaw Man",
  "votos": 0
}

----------------------------------------------------------------------------------------------
3. Buscar por ID
Filtra um anime específico através do seu identificador.

Método: GET

URL: http://localhost:3000/animes/1

4. Atualizar Dados
Atualiza as informações de um anime existente usando o Spread Operator.

Método: PUT

URL: http://localhost:3000/animes/1

Corpo (JSON):

JSON
{
  "nome": "Naruto Shippuden",
  "votos": 10
}

----------------------------------------------------------------------------------------------
5. Incrementar Voto (+1)
Rota customizada para adicionar apenas 1 voto ao contador atual.

Método: PUT

URL: http://localhost:3000/animes/votos/1

6. Deletar Anime
Remove um anime da lista através do ID.

Método: DELETE

URL: http://localhost:3000/animes/1

7. Listar Filmes (Leitura de CSV)
Lê o arquivo top100filmes.csv e o converte em JSON em tempo real.

Método: GET

URL: http://localhost:3000/filmes

💡 O que aprendemos hoje?
Manipulação de Arquivos: Como importar dados de .json e .csv.

Organização de Objetos: Garantir que o id apareça primeiro na resposta da API.

Verbos HTTP: A diferença prática entre GET, POST, PUT e DELETE.

Parâmetros de Rota: Como capturar o :id usando req.params.