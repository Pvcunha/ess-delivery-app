Feature: 1
    

Scenario: Visualização de métodos de pagamento
Given O usuário está na página de pagamento
Then Ele visualiza o nome do método de pagamento padrão
Then no caso do método padrão ser o cartão de crédito ou débito, ele visualiza os últimos quatro dígitos do número do cartão além do nome do método


Scenario: Troca de método de pagamento
#esse given ja existe no anterior
Given O usuário está na página de pagamento
When ele clica no select de método de pagamento
When após os nomes  dos métodos de pagamento aparecerem como opções selecionáveis, ele seleciona PicPay miletoarrobaess.com dos métodos
Then Ele visualiza o nome do método de pagamento padrão PicPay
