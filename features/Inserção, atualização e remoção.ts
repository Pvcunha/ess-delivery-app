import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const baseURL = "http://localhost:4200/"

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

//let sameNumber = ((elem, number) => elem.element(by.name('numberlist')).getText().then(text => text === number));
let sameName = ((elem, name) => elem.element(by.name('namelist')).getText().then(text => text === name));
//let sameType = ((elem, type) => elem.element(by.name('typelist')).getText().then(text => text === type));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

const goToPaymentPage = async(user_id) =>{
    // vai para a o profile de cliente
    // (vai apra /home)
    console.log("\nEntrando na página /home...");
    await browser.get(baseURL + "home");
    sleep(5000)
    console.log("...Done\n");
    // (clica no login de cliente)
    console.log(`\nClicando no botão de loging (user)...`);
    await $("a[name='user']").click();
    sleep(5000)
    console.log("...Done\n");

    // realiza o login 
    // (preenche o id)
    console.log("\nPreenchendo o input login...");
    await $("input[id='id']").sendKeys(<string>user_id); // preenche o input login
    sleep(5000)
    console.log("...Done\n")
    // (clica no botão de login)
    console.log("\nClicando no botão login...")
    await $("a[class='pink-link']").click(); // clica no botão login
    sleep(5000)
    console.log("...Done\n")

    // (clica no botão ver métodos de pagamento)
    console.log("\nClicando no botão 'ver métodos de pagamento'...")
    await $("a[name='payment methods']").click(); // clica no botão login
    sleep(5000)
    console.log("...Done\n")
}

defineSupportCode(function ({ Given, When, Then}) {
//--------------------------------------------Scenario: Inserção de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
    Given(/^o usuário está na página de inserção de método de pagamento$/, async () => {
        await goToPaymentPage('578dbdea');
        sleep(5000);
        await $("a[class='pink-link']").click();
        sleep(5000);
    });

    When(/^ele conclui o procedimento de inserção$/, async () => {
        await $("a[class='dark-link']").click();
        sleep(5000);
        await $("input[placeholder='Número do Cartão (16) digitos']").sendKeys('1000200030004000');
        sleep(5000);
        await $("input[placeholder='Nome do titular']").sendKeys('Monster Z');
        sleep(5000);
        await $("input[placeholder='CVV (3 digitos)']").sendKeys('632');
        sleep(5000);
        await $("input[placeholder='Bandeira (insira: visa ou master)']").sendKeys('master');
        sleep(5000);
        await $("input[placeholder='Apelido do Cartão']").sendKeys('Zz');
        sleep(5000);
        await $("a[class='confirm-link']").click();
        sleep(5000);
    });

    /*Then(/^o Id do usuário é solicitado$/, async () => {
        var allnames : ElementArrayFinder = element.all(by.name('Id'));
        sleep(5000);
        allnames.filter(elem => sameName(elem,'Id')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        sleep(5000);
    });*/
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Remoção de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
Given(/^o usuário está na página de remoção de método de pagamento$/, async () => {
    await goToPaymentPage('578dbdea');
    sleep(5000);
    await $("a[class='leaked-link']").click();
    sleep(5000);
});

When(/^ele conclui o procedimento de remoção$/, async () => {
    await $("a[class='pink-link']").click();
    sleep(5000);
});

/*Then(/^o Id do usuário é solicitado$/, async () => {
    var allnames : ElementArrayFinder = element.all(by.name('Id'));
    sleep(5000);
    allnames.filter(elem => sameName(elem,'Id')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    sleep(5000);
});*/
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------Scenario: Atualização de métodos de pagamento-------------------------------------------------------------------------------------------------------------------------------
Given(/^o usuário está na página de atualização de método de pagamento$/, async () => {
    await goToPaymentPage('578dbdea');
    sleep(5000);
    await $("a[class='dark-link']").click();
    sleep(5000);
});

When(/^ele conclui o procedimento de atualização$/, async () => {
    await $("a[class='pink-link']").click();
    sleep(5000);
    await $("select[id='mySelect']").click();
    sleep(5000);
    await $("option[value='PicPay(mileto@ess.com)']").click();
    sleep(5000);
    await $("input[placeholder='Insira o nome do usuário']").sendKeys('Mileto');
    sleep(5000);
    await $("input[placeholder='Insira o E-mail']").sendKeys('mm@ess.com');
    sleep(5000);
    await $("a[class='confirm-link']").click();
    sleep(5000);
});

Then(/^o Id do usuário é solicitado$/, async () => {
    var allnames : ElementArrayFinder = element.all(by.name('Id'));
    sleep(5000);
    allnames.filter(elem => sameName(elem,'Id')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    sleep(5000);
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

});
