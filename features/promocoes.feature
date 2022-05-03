Feature: Cadastro e manutenção de promoções 

    Restaurantes e administradores poderão cadastrar, remover ou atualizar promoções (cupons), 
    e usuários (clientes) poderão inserir e remover cupons de seus pedidos.

Scenario: inserção de cupom em pedido bem-sucedida
Given o usuário "Maria Luísa" está na página de inserção de cupom no pedido "1237" com o valor "R$40,00"
And o cupom "10%off" está ativo e possui um valor mínimo de "R$20,00"
And o pedido "1237" não tem cupons aplicados
When o usuário "Maria Luísa" tenta inserir o cupom "10%off" no pedido "1237"
Then o cupom "10%off" é aplicado com sucesso
And o valor do pedido "1237" é atualizado para "R$36,00"

Scenario: inserção de múltiplos cupons em um pedido
Given o usuário "Acrucha" está na página de inserção de cupom no pedido "3456" com o valor "R$100,00"
And o cupom "PRIMEIRACOMPRA20" já está aplicado ao pedido "3456"
When o usuário "Acrucha" tenta inserir o cupom "PIZZAEMDOBRO" no pedido "3456"
Then o cupom "PIZZAEMDOBRO" é recusado
And uma mensagem de erro é exibida indicando que já existe um cupom aplicado ao pedido "3456"
And o valor do pedido "3456" se mantém "R$100,00"

Scenario: inserção de cupom em pedido que não atingiu o valor mínimo
Given o usuário "Tales" está na página de inserção de cupom no pedido "2345" com o valor "R$10,00"
And o cupom "10%off" está ativo possui um valor mínimo de "R$20,00"
And o pedido "2345" não tem cupons aplicados
When o usuário "Tales" tenta inserir o cupom "10%off" no pedido "2345"
Then o cupom "10%off" é recusado
And uma mensagem de erro é exibida indicando que o valor do pedido "2345" não atingiu o mínimo para aplicação do cupom "10%off"
And o valor do pedido "2345" se mantém "R$10,00"

Scenario: inserção de cupom expirado em um pedido
Given o usuário "Pedro" está na página de inserção de cupom no pedido "9856" com o valor "R$100,00"
And o cupom "PIZZAEMDOBRO" está expirado
When o usuário "Pedro" tenta inserir o cupom "PIZZAEMDOBRO" no pedido "9856"
Then o cupom "PIZZAEMDOBRO" é recusado
And uma mensagem de erro é exibida indicando que o cupom "PIZZAEMDOBRO" se encontra expirado
And o valor do pedido "9856" se mantém "R$100,00"

Scenario: remoção de promoção bem sucedida por restaurante
Given o restaurante "Méqui" está na página de atualização de promoções
And o cupom de código "2BIGMEQUIPOR1" está cadastrado
When o restaurante "Méqui" tenta excluir o cupom "2BIGMEQUIPOR1" 
Then o cupom "2BIGMEQUIPOR1" é removido das promoções com sucesso
And o cupom "2BIGMEQUIPOR1" não aparece mais na página de atualização de promoções

Scenario: atualização de promoção de um produto que já tem uma promoção ativa pelo restaurante
Given o restaurante "Méqui" está na página de atualização de promoção
And o cupom "2BIGMEQUIPOR1" associado ao produto "Big Méqui" está cadastrado mas inativo
And o produto "Big Méqui" já tem uma promoção associada ele
When o restaurante "Méqui" tenta atualizar o cupom "2BIGMEQUIPOR1" para ser ativo
Then a atualização do cupom "2BIGMEQUIPOR1" é negada
And uma mensagem de erro é exibida indicando que o produto "Big Méqui" já tem uma promoção ativa associada a ele

Scenario: inserção de cupom de primeira compra já utilizado
Given o usuário "Maria Luísa" está na página de inserção de cupom no pedido "1234" com o valor "R$40,00"
And o usuário "Maria Luísa" já utilizou o cupom "PRIMEIRACOMPRA"
And o pedido "1234" não tem cupons aplicados
When o usuário "Maria Luísa" tenta inserir o cupom "PRIMEIRACOMPRA" no pedido "1234"
Then o cupom "PRIMEIRACOMPRA" é recusado
And uma mensagem de erro é exibida indicando que o cupom "PRIMEIRACOMPRA" já foi utilizado

Scenario: atualização de promoção bem sucedida pelo restaurante
Given o restaurante "Méqui" está na página de atualização de promoção
And o cupom "2BIGMEQUIPOR1" está cadastrado mas expirado
When o restaurante "Méqui" tenta atualizar o cupom "2BIGMEQUIPOR1" para ser ativo na hora "21:00" do dia "05/04/2022" até "23:59" do "06/04/2022"
Then o cupom "2BIGMEQUIPOR1" é atualizado

Scenario: cadastro de promoção bem-sucedido por administrador
Given o administrador "Malu" está na página de cadastro de promoção
And o cupom de código "PRIMEIRACOMPRA" não está cadastrado
When o administrador "Malu" tenta cadastrar o cupom "PRIMEIRACOMPRA" de valor "20% do valor do pedido" com valor mínimo de "R$30,00" sem prazo de validade
Then o cupom "PRIMEIRACOMPRA" é cadastrado com sucesso

Scenario: cadastro de promoção malsucedido pelo restaurante
Given o restaurante "Méqui" está na página de cadastro de promoção
And o cupom de código "2BIGMEQUIPOR1" não está cadastrado
And o produto "Big Méqui" de valor "R$10,00" não possui promoções associadas a ele
When o restaurante "Méqui" tenta cadastrar o cupom "2BIGMEQUIPOR1" de valor "R$20,00" com valor mínimo "R$20,00", associado ao produto "Big Méqui", para ser ativo na hora "21:00" do dia "05/04/2022" até "23:59" do "06/04/2022"
Then o cupom "2BIGMEQUIPOR1" não é cadastrado

Scenario: cadastro de promoção bem-sucedido pelo restaurante
Given o restaurante "Méqui" está na página de cadastro de promoção
And o cupom de código "2BIGMEQUIPOR1" não está cadastrado
And o produto "Big Méqui" de valor "R$10,00" não possui promoções associadas a ele
When o restaurante "Méqui" tenta cadastrar o cupom "2BIGMEQUIPOR1" de valor "R$10,00" com valor mínimo "R$20,00", associado ao produto "Big Méqui", para ser ativo na hora "21:00" do dia "05/04/2022" até "23:59" do "06/04/2022"
Then o cupom "2BIGMEQUIPOR1" é cadastrado

Scenario: inserção de cupom inexistente em um pedido
Given o usuário "Gabriel" está na página de inserção de cupom no pedido "9316" com o valor "R$100,00"
And o cupom "PIZZA20" não está cadastrado
When o usuário "Gabriel" tenta inserir o cupom "PIZZA20" no pedido "9316"
Then o cupom "PIZZA20" é recusado
And uma mensagem de erro é exibida indicando que o cupom "PIZZA20" não existe
And o valor do pedido "9316" se mantém "R$100,00"
