# Remover nota

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api-notes/note/remove/{_id}**
2. ✅ **Remove** a nota com o id fornecido
3. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário logado
3. ✅ Retorna erro **403** se não for encontrado um dispositvo com o id fornecido
4. ✅ Retorna erro **400** se name não for fornecido pelo client
5. ✅ Retorna erro **500** se der erro ao tentar remover o cadastro da nota
