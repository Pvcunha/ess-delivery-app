import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameNumber = ((elem, number) => elem.element(by.name('numberlist')).getText().then(text => text === number));
let sameName = ((elem, name) => elem.element(by.name('namelist')).getText().then(text => text === name));
let sameType = ((elem, type) => elem.element(by.name('typelist')).getText().then(text => text === type));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then}) {
//--------------------------------------------Scenario: Visualização de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await $("a[name='pagamento']").click();
    });

    Then(/^ele visualiza o nome "([^\"]*)" do método de pagamento padrão$/, async (name) => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        allnames.filter(elem => sameName(elem,name)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^no caso do método padrão ser o "([^\"]*)", ele visualiza os últimos quatro dígitos do número "([^\"]*)" do cartão além do nome "([^\"]*)" do método$/, async (type, number, name) => {
        if(type == "Cartão de Crédito" || type == "Cartão de Débito"){
            var allnames : ElementArrayFinder = element.all(by.name('namelist'));
            var allnumbers : ElementArrayFinder = element.all(by.name('numberlist'));
            allnames.filter(elem => pAND(sameNumber(elem,number),sameName(elem,name))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        }
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Troca de método de pagamento-------------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await $("a[name='pagamento']").click();
    });

    When(/^ele seleciona a opção "([^\"]*)"$/, async (opcao) => {
        await element(by.buttonText(<string>opcao)).click();
    });

    When(/^após os nomes "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)" dos outros métodos de pagamento, exceto o nome do método padrão, aparecerem como opções selecionáveis, ele seleciona "([^\"]*)" dos métodos"$/, async (name1, name2, name3, name4, name5) => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        allnames.filter(elem => sameName(elem,name1)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        allnames.filter(elem => sameName(elem,name2)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        allnames.filter(elem => sameName(elem,name3)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        allnames.filter(elem => sameName(elem,name4)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        if(name5 == name1){
            await element(by.buttonText(<string>name1)).click();
        }
        else{
            if(name5 == name2){
                await element(by.buttonText(<string>name2)).click();
            }
            else{
                if(name5 == name3){
                    await element(by.buttonText(<string>name3)).click();
                }
                else{
                    await element(by.buttonText(<string>name4)).click();
                }
            }
        }
    });

    Then(/^o usuário retorna para a página de pagamento com o método de pagamento "([^\"]*)" selecionado no lugar do método padrão$/, async (name) => {
        await expect(browser.getTitle()).to.eventually.equal('Pagamento');
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        allnames.filter(elem => sameName(elem,name)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Troca de método de pagamento padrão-------------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página do seu perfil$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await $("a[name='perfil']").click();
    });

    When(/^ele seleciona a opção "([^\"]*)"$/, async (opcao) => {
        await element(by.buttonText(<string>opcao)).click();
    });

    When(/^após os nomes "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)" dos outros métodos de pagamento, exceto o nome do método padrão, aparecerem como opções selecionáveis, ele seleciona "([^\"]*)" dos métodos"$/, async (name1, name2, name3, name4, name5) => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        allnames.filter(elem => sameName(elem,name1)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        allnames.filter(elem => sameName(elem,name2)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        allnames.filter(elem => sameName(elem,name3)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        allnames.filter(elem => sameName(elem,name4)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        if(name5 == name1){
            await element(by.buttonText(<string>name1)).click();
        }
        else{
            if(name5 == name2){
                await element(by.buttonText(<string>name2)).click();
            }
            else{
                if(name5 == name3){
                    await element(by.buttonText(<string>name3)).click();
                }
                else{
                    await element(by.buttonText(<string>name4)).click();
                }
            }
        }
    });

    Then(/^uma mensagem de troca de método padrão realizado com sucesso aparece na tela$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('Perfil');
        var allelementos : ElementArrayFinder = element.all('sucesso');
        allelementos.filter(elem => sameName(elem,'sucesso')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Inserção, remoção ou atualização de métodos de pagamento-----------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de inserção, remoção ou atualização de método de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await [$("a[name='Inserção']").click() || $("a[name='Remoção']").click() || $("a[name='Atualização']").click()];
    });

    When(/^ele conclui o procedimento de inserção, remoção ou atualização$/, async () => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        await expect(Promise.resolve(allnames.length)).to.eventually.not.equal(0);
        await [element(by.buttonText('Inserir')).click() || element(by.buttonText('Remover')).click() || await element(by.buttonText('Atualizar')).click()];
    });

    Then(/^a senha do usuário é solicitada$/, async () => {
        var allelementos : ElementArrayFinder = element.all('senha');
        allelementos.filter(elem => sameName(elem,'senha')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^a escrita da palavra "CONFIRMAR" é solicitada$/, async () => {
        var allelementos : ElementArrayFinder = element.all('CONFIRMAR');
        allelementos.filter(elem => sameName(elem,'CONFIRMAR')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Inserção de método de pagamento inválido-----------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de inserção de método de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await $("a[name='Inserção']").click();
    });

    When(/^ele insere um método de pagamento inválido$/, async () => {
        await element(by.buttonText('Inserir')).click();
    });

    Then(/^uma mensagem notificando método de pagamento inválido e solicitando que o procedimento seja refeito aparece na tela$/, async () => {
        var allelementos : ElementArrayFinder = element.all('inválido');
        allelementos.filter(elem => sameName(elem,'inválido')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Inserção de sexto método de pagamento-----------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de inserção de método de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await $("a[name='Inserção']").click();
    });

    Given(/^ele já possui cinco métodos de pagamento cadastrados$/, async () => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        await expect(Promise.resolve(allnames.length)).to.eventually.equal(5);
    });

    When(/^ele insere um método de pagamento$/, async () => {
        await element(by.buttonText('Inserir')).click();
    });

    Then(/^uma mensagem informando limite de métodos de pagamento aparece na tela$/, async () => {
        var allelementos : ElementArrayFinder = element.all('limite');
        allelementos.filter(elem => sameName(elem,'limite')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Atualização inválida de método de pagamento-----------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de atualização de método de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Página Principal');
        await $("a[name='Atualização']").click();
    });

    When(/^o usuário atualiza um método de pagamento com dados inválidos$/, async () => {
        await element(by.buttonText('Atualizar')).click();
    });

    Then(/^uma mensagem notificando método de pagamento inválido e solicitando que o procedimento seja refeito aparece na tela$/, async () => {
        var allelementos : ElementArrayFinder = element.all('inválido');
        allelementos.filter(elem => sameName(elem,'inválido')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

});
