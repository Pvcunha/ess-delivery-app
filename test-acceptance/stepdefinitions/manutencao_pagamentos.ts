import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const baseURL = "http://localhost:4200/"

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameNumber = ((elem, number) => elem.element(by.name('numberlist')).getText().then(text => text === number));
let sameName = ((elem, name) => elem.element(by.name('namelist')).getText().then(text => text === name));
let sameType = ((elem, type) => elem.element(by.name('typelist')).getText().then(text => text === type));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))
/*
defineSupportCode(function ({ Given, When, Then}) {
    Given(/^o usuário está na página de inserção de método de pagamento$/, async () => {
        await browser.get("http://localhost:3000/");
        await expect(browser.getTitle()).to.eventually.equal('Inserção');
        //await $("a[name='metodos']").click();
    });

    Given(/^ele já possui cinco métodos de pagamento cadastrados$/, async () => {
        var allnames : ElementArrayFinder = element.all(by.name('namelist'));
        await expect(Promise.resolve(allnames.length)).to.eventually.equal(5);
    });

    When(/^ele insere um método de pagamento$/, async () => {
        await element(by.buttonText('Inserir')).click();
    });

    Then(/^uma mensagem informando limite de métodos de pagamento aparece na tela$/, async () => {
        var allelementos : ElementArrayFinder = element.all(by.name('namelist'));
        allelementos.filter(elem => sameName(elem,'limite')).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
})*/
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
    Given(/^O usuário está na página de pagamento$/, async() => {
        console.log("entroooouu")
        await goToPaymentPage('578dbdea');
        console.log("saiu funcao inicial")
        sleep(5000);
        console.log("comparando")
        await expect(browser.getTitle()).to.eventually.equal('Payment');
        console.log("comparado com sucesso!!")
    });

    Then(/^Ele visualiza o nome do método de pagamento padrão$/, async() => {
        sleep(5000)
        console.log("no then")
        
        let mainPay:string
        await element(by.id('mySelect')).$('option:checked').getText().then(res=>{
            console.log(res)
            mainPay = res;
        })
        console.log(typeof mainPay)
        

        await expect(mainPay).equal('nubank(** 5555)');
    });

    

    Then(/^no caso do método padrão ser o cartão de crédito ou débito, ele visualiza os últimos quatro dígitos do número do cartão além do nome do método$/, async() => {
        console.log("no then")
        
        let mainPay:string
        await element(by.id('mySelect')).$('option:checked').getText().then(res=>{
            console.log(res)
            mainPay = res;
        })
        console.log(typeof mainPay)
        
        mainPay = mainPay.match('5555')[0]

        await expect(mainPay).equal('5555');
    });


   
    When(/^ele clica no select de método de pagamento$/, async () => {
        await element(by.id('mySelect')).click();
    });

    When(/^após os nomes  dos métodos de pagamento aparecerem como opções selecionáveis, ele seleciona PicPay miletoarrobaess.com dos métodos$/, async () => {
        element(by.cssContainingText('option', 'PicPay(mileto@ess.com)')).click();
       
       
    });

    Then(/^Ele visualiza o nome do método de pagamento padrão PicPay$/, async() => {
        sleep(5000)
        console.log("no then")
        
        let mainPay:string
        await element(by.id('mySelect')).$('option:checked').getText().then(res=>{
            console.log(res)
            mainPay = res;
        })
        console.log(typeof mainPay)
        

        await expect(mainPay).equal('PicPay(mileto@ess.com)');
    });

    
})