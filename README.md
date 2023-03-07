## [**Link para a documentação da API (estar rodando localmente)**](http://localhost:5051/api-notes/docs)

> ## Rotas

1. [Cadastrar nota](./requirements/create-note.md)
2. [Atualizar nota](./requirements/update-note.md)
3. [Listar notas](./requirements/get-all-note.md)
4. [Listar um nota através do Id](./requirements/get-by-id-note.md)
5. [Remover nota](./requirements/remove-note.md)

# Iniciar Projeto Localmente

Rodar ```npm install``` para adicionar as dependências do projeto

Rodar ```npm run dev``` para rodar o projeto o localmente em modo de desenvolvimento

Projeto rodarar em ```http://localhost:5051/api-notes/```

MongoDB rodarar em ```mongodb://localhost:27017```

# Iniciar Projeto Docker

Ter Docker instalado [(link para download aqui)](https://www.docker.com/products/docker-desktop/)

Caso esteja rodando no Windows e tiver problemas com WSL2 seguir esse passo a passo: https://gist.github.com/luizomf/8bc93474de107bff6ee09b1ceee481df

Rodar ```npm run up``` para iniciar

Rodar ```npm run down``` para finalizar

Projeto rodarar em ```http://localhost:5051/api-notes/```

MongoDB rodarar em ```mongodb://localhost:27020```

# Build do Projeto

Rodar ```npm install``` para adicionar as dependências do projeto

Rodar ```npm run build```

Rodar ```npm start```

Projeto rodarar em ```http://localhost:5051/api-notes/```

MongoDB rodarar em ```mongodb://localhost:27017```

# Testes

Rodar ```npm test``` para rodar todos os testes

Rodar ```npm run test:integration``` para testes de integração

Rodar ```npm run test:unit``` para testes unitários

Rodar ```npm run test:coveralls``` para saber a porcentagem de cobertura dos testes
