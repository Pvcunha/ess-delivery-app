Feature: Cadastro e manutenção de métodos de pagamento
    quando o usuário deseja cadastrar ou gerenciar
    suas formas de pagamento

Scenario: Inserção de métodos de pagamento
Given o usuário está na página de inserção de método de pagamento
When ele conclui o procedimento de inserção
Then o Id do usuário é solicitado

Scenario: Remoção de métodos de pagamento
Given o usuário está na página de remoção de método de pagamento
When ele conclui o procedimento de remoção
Then o Id do usuário é solicitado

Scenario: Atualização de métodos de pagamento
Given o usuário está na página de atualização de método de pagamento
When ele conclui o procedimento de atualização
Then o Id do usuário é solicitado