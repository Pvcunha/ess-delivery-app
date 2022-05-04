import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameNumber = ((elem, number) => elem.element(by.name('numberlist')).getText().then(text => text === number));
let sameName = ((elem, name) => elem.element(by.name('namelist')).getText().then(text => text === name));
let sameType = ((elem, type) => elem.element(by.name('typelist')).getText().then(text => text === type));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))
http://localhost:4200/home
defineSupportCode(function ({ Given, When, Then}) {
//--------------------------------------------Scenario: Inserção de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de inserção de método de pagamento$/, async () => {
        await browser.get("http://localhost:4200/home");
        await expect(browser.getTitle()).to.eventually.equal('Home');
        await element(by.buttonText('Cliente')).click();
        await $("input[name='ID']").sendKeys('578dbdea');
        await element(by.buttonText('Log in')).click();
        await element(by.buttonText('Ver Métodos de Pagamento')).click();
        await element(by.buttonText('Inserir método de pagamento')).click();
    });

    When(/^ele conclui o procedimento de inserção$/, async () => {
        await element(by.buttonText('Cartão de crédito')).click();//Poderia ser qualquer um dos outros tipos
        await $("input[name='Número do Cartão (16) digitos']").sendKeys('1000200030004000');
        await $("input[name='Nome do titular']").sendKeys('Monster Z');
        await $("input[name='CVV (3 digitos)']").sendKeys('632');
        await $("input[name='Bandeira (insira: visa ou master)']").sendKeys('master');
        await $("input[name='Apelido do Cartão']").sendKeys('Zz');
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^o Id do usuário é solicitado$/, async () => {
        var allnames : ElementArrayFinder = element.all(by.name('Id'));
        allnames.filter(elem => sameName(elem,'Id')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Remoção de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
Given(/^o usuário está na página de remoção de método de pagamento$/, async () => {
    await browser.get("http://localhost:4200/home");
        await expect(browser.getTitle()).to.eventually.equal('Home');
        await element(by.buttonText('Cliente')).click();
        await $("input[name='ID']").sendKeys('578dbdea');
        await element(by.buttonText('Log in')).click();
        await element(by.buttonText('Ver Métodos de Pagamento')).click();
        await element(by.buttonText('Remover método de pagamento')).click();
});

When(/^ele conclui o procedimento de remoção$/, async () => {
    await element(by.buttonText('Remover método')).click();
});

Then(/^o Id do usuário é solicitado$/, async () => {
    var allnames : ElementArrayFinder = element.all(by.name('Id'));
    allnames.filter(elem => sameNumber(elem,'Id')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Atualização de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
Given(/^o usuário está na página de atualização de método de pagamento$/, async () => {
    await browser.get("http://localhost:4200/home");
    await expect(browser.getTitle()).to.eventually.equal('Home');
    await element(by.buttonText('Cliente')).click();
    await $("input[name='ID']").sendKeys('578dbdea');
    await element(by.buttonText('Log in')).click();
    await element(by.buttonText('Ver Métodos de Pagamento')).click();
    await element(by.buttonText('Atualizar método de pagamento')).click();
});

When(/^ele conclui o procedimento de atualização$/, async () => {
    await element(by.buttonText('nubank(  ** 5555)')).click();
    await $("a[name='PicPay(mileto@ess.com)']").click();
    await $("input[name='Insira o nome do usuário']").sendKeys('Mileto');
    await $("input[name='Insira o E-mail']").sendKeys('mm@ess.com');
    await element(by.buttonText('Editar método')).click();
});

Then(/^o Id do usuário é solicitado$/, async () => {
    var allnames : ElementArrayFinder = element.all(by.name('Id'));
    allnames.filter(elem => sameNumber(elem,'Id')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

});