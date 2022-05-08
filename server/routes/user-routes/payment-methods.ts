import { Router } from "express";
import { PaymentMethod } from "../../src/classes/payment-method";
import { usersService, methodsService } from "../imports";

export const payment = Router();

// ROTAS DE METODOS DE PAGAMENTO

payment.get('/user/:id/methods', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    console.log(index);
    const methods = usersService.users[index].paymentMethods;
    console.log(methods)
    res.send(JSON.stringify(methods));
});

payment.get('/user/:id/metodos/:ident', function(req, res){
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    const id = req.params.ident;
    const metodo = usersService.users[index].paymentMethods.find(e => e.id == id);
    if (metodo) {
        res.send(metodo);
    } else {
        res.status(404).send({ message: `Method ${id} could not be found`});
    }
});

payment.post('/user/:id/methods', function(req, res){
    console.log("entrou no poste");
    const userId = req.params.id;
    console.log(usersService.users)
    const index = usersService.getUserIndex(userId);

    const newMethod: PaymentMethod = <PaymentMethod> req.body;
    console.log(newMethod);

    try {
        console.log("antes result")

        methodsService.set(usersService.users[index].paymentMethods);
        const result = methodsService.add(newMethod);
        console.log("post", usersService.users[index].paymentMethods);
        console.log(result)

        //const result = usersService.users[index].metodos_de_pagamento.add(metodo);
        console.log("resulta aqui:")
        console.log(result);
        if (result) {
        console.log("de bom 201")
        res.status(201).send(result);
        } else {
        res.status(403).send({ message: "Method list is full, method name is already exist or method type is invalid."});
        }
    } catch (err) {
        const {message} = err;
        res.status(400).send({ message })
    }
});


payment.put('/user/:id/methods/', function(req, res){
    console.log("editar método \n antes:");
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);

    const method: PaymentMethod = <PaymentMethod> req.body;

    console.log("antes")
    console.log(method.id)
    console.log(usersService.users[index].paymentMethods)

    methodsService.set(usersService.users[index].paymentMethods)
    const result = methodsService.update(method);

    if (result) {
        console.log("depois:")
        console.log(result);
        res.status(201).send(result);
    } else {
        res.status(404).send({ message: `Inconsistents datas.`});
    }
});

payment.delete('/user/:idUser/methods/:idPay', function(req, res){
    console.log("entroou deleetee")
    const userId = req.params.idUser;
    const methodId = req.params.idPay;
    const index = usersService.getUserIndex(userId);
    console.log("Method ID: " + methodId);
    console.log("Service:");

    methodsService.set(usersService.users[index].paymentMethods);

    const eraseMethod: PaymentMethod = usersService.users[index].paymentMethods.find( e => e.id == methodId);
    try {    
        console.log("Method:")

        const result = methodsService.remove(eraseMethod);
        
        console.log(usersService.users[index].paymentMethods);
        if (result) {
        res.status(201).send(result);
        } else {
        res.status(403).send({ message: "Method list is void or method does not exist."});
        }
    } catch (err) {
        const {message} = err;
        res.status(400).send({ message })
    }
});


export default payment;