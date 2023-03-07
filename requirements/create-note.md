# Cadastrar nota

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api-notes/note/create**
2. ✅ Valida dado obrigatório **name**
3. ✅ **Cadastra** uma nota com os dados fornecidos
4. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário logado
3. ✅ Retorna erro **400** se name não for fornecido pelo client
4. ✅ Retorna erro **500** se der erro ao tentar criar  nota
