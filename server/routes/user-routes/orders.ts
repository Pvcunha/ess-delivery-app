import { Router } from "express";
import generateOrderReceipt from "../../../utils/generate_order_receipt";
import { Coupon } from "../../src/classes/coupon";
import { Order } from "../../src/interfaces/users";
import { adminService, emailService, restaurantsService, usersService } from "../imports";


export const orders = Router();
/// ROTAS DE USUÁRIOS

// Retorna o usuário pelo ID
orders.get('/users/:id', (req, res) => {
    let id = req.params.id;
    const user = usersService.getUserById(id);

    const msg = `user found ${user.id}`;
    const err = `user not found`;
    if (user) {
    console.log(msg);
    res.status(201).send(user);
    } else {
    console.log(err);
    res.status(404).send({ message: err });
    }
});
  
// Retorna os pedidos de um usuário
orders.get('/user/:id/orders', function (req, res) {
    const userId = req.params.id;
    const index = usersService.getUserIndex(userId);
    console.log(usersService.users[index]);
    var orders = usersService.users[index].orders;
    if (orders) {
        res.status(201).send(orders);
    } else {
        res.status(404).send(orders);
    }
});

// Adiciona cupom ao pedido
orders.post('/user/:id/order', function (req, res) {
    var couponName: string = <string>req.body.couponName; // isso daqui pode mudar, order.coupon pode virar string
    var order: Order = <Order>req.body.order;
    var userId = req.params.id;
    var err = "Não foi possível aplicar o cupom";

    // se o cupom é de restaurante
    var coupon: Coupon = restaurantsService[order.restaurant].getByName(couponName);

    if (coupon) {
        applyCoupon();
    } else {
        // se não for, é de adm
        coupon = adminService.getByName(couponName);

        if (coupon) {
        applyCoupon();
        } else {
        res.status(403).send("O cupom não existe");
        }
    }

    function applyCoupon() {
        [order, err] = usersService.applyCouponInOrder(userId, order, coupon);

        if (order.coupon.id == '') {
            console.log(err);
            res.status(403).send(err);
        } else {
            console.log(order);
            res.status(201).send(order);
        }
    }
});

// ADICIONAR UM PEDIDO AO ARRAY DE PEDIDOS DO USUÁRIO
orders.post('/user/:id/orders', function (req, res) {
    var order: Order = <Order>req.body;
    const userId: string = req.params.id;
    const index = usersService.getUserIndex(userId);
    var result = undefined;
    try {
        result = usersService.addOrder(index, order);
        if (result) {
        res.status(201).send(result);
        usersService.updateFile();
        console.log("Pedido foi finalizado com sucesso");
        } else {
        res.status(403).send({ message: "Pedido não foi finalizado" });
        }

    } catch (err) {
        const { message } = err;
        res.status(400).send({ message })
    }
});

// ENVIA EMAIL
orders.post('/payment/confirm/:userid', async (req, res) => {
    let userid = req.params.userid;
    let order: Order = <Order>req.body;

    try {
        const user = usersService.getUserById(userid);
        //DEBUG: console.log(user);
        if (user) {
        var msg: string = generateOrderReceipt(user, order)


        var info = await emailService.sendMail(
            {
            to: { name: user.name, email: user.email },
            message: { subject: 'Order confirmation', body: msg }
            }
        );
        if (info.accepted) {
            res.status(201).send({ message: '201 Order confirmed', msg });
        }
        } else {
        throw "User not found"
        }
    } catch (err) {
        msg = err;
        res.status(400).send({ msg });
    }
});
  

export default orders;