# Busca de todos os notas

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/api-notes/note**
2. ✅ Retorna **204** se não tiver nenhuma nota
3. ✅ Retorna **200** com os dados dos dispositvos

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário logado
3. ✅ Retorna erro **500** se der erro ao tentar listar as notas
