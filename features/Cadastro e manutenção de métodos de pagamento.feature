Feature: Cadastro e manutenção de métodos de pagamento
    quando o usuário deseja cadastrar ou gerenciar
    suas formas de pagamento

Scenario: Visualização de métodos de pagamento
Given o usuário está na página de pagamento
Then ele visualiza o nome "" do método de pagamento padrão
Then no caso do método padrão ser o "cartão(crédito/débito)", ele visualiza os últimos quatro dígitos do número "" do cartão além do nome "" do método

Scenario: Troca de método de pagamento
Given o usuário está na página de pagamento
When ele seleciona a opção "mudar método de pagamento"
When após os nomes "", "", "", "" dos outros métodos de pagamento, exceto o nome do método padrão, aparecerem como opções selecionáveis, ele seleciona "" dos métodos
Then o usuário retorna para a página de pagamento com o método de pagamento "" selecionado no lugar do método padrão ""

Scenario: Troca de método de pagamento padrão
Given o usuário está na página do seu perfil
When ele seleciona a opção "mudar método de pagamento padrão"
When após os nomes "", "", "", "" dos outros métodos de pagamento, exceto o nome do método padrão, aparecerem como opções selecionáveis, ele seleciona "" dos métodos
Then uma mensagem de troca de método padrão realizada com sucesso aparece na tela

Scenario: Inserção, remoção ou atualização de métodos de pagamento
Given o usuário está na página de inserção, remoção ou atualização de método de pagamento
When ele conclui o procedimento de inserção, remoção ou atualização
Then a senha do usuário é solicitada
Then a escrita da palavra "CONFIRMAR" é solicitada

Scenario: Inserção de método de pagamento inválido
Given o usuário está na página de inserção de método de pagamento
When ele insere um método de pagamento inválido
Then uma mensagem notificando método de pagamento inválido e solicitando que o procedimento seja refeito aparece na tela

Scenario: Inserção de sexto método de pagamento
Given o usuário está na página de inserção de método de pagamento
Given ele já possui cinco métodos de pagamento cadastrados
When ele insere um método de pagamento
Then uma mensagem informando limite de métodos de pagamento aparece na tela

Scenario: Atualização inválida de método de pagamento
Given o usuário está na página de atualização de método de pagamento
When o usuário atualiza um método de pagamento com dados inválidos
Then uma mensagem notificando método de pagamento inválido e solicitando que o procedimento seja refeito aparece na tela

------------------------------------------------------------------------------------------------------------------------------
