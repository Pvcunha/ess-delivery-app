import { Router } from 'express';
import { UserService } from './src/user-service';
import * as fs from 'fs';
import { Order } from './src/users';
import EmailService from './src/email-service'

const routes = Router();

var usersService: UserService = new UserService();
var emailService: EmailService = new EmailService();

fs.readFile("users.json", "utf-8", (err, data) => {
  if(err){
    console.log(err);
  }else{
    usersService.users = JSON.parse(data);
  }
})

// ----------------------------------------------------------------
/// ROTAS DE USUÁRIOS

routes.get('/users', (req, res) => {
  res.send(usersService.getUsers());
})

// RETORNA OS PEDIDOS DE UM USUÁRIO
routes.get('/user/:id/orders', function(req, res){
  const userId = req.params.id;
  const index = usersService.getUserIndex(userId);
  console.log(usersService.users[index]);
  res.send(JSON.stringify(usersService.users[index].orders));
});


// ADICIONAR UM PEDIDO AO ARRAY DE PEDIDOS DO USUÁRIO
routes.post('/user/:id/orders', function(req, res){
  var order: Order = <Order> req.body;
  const userId: string = req.params.id;
  const index = usersService.getUserIndex(userId);
  var result = undefined;
  try {
    if(order.amount >= order.coupon.minValue && order.coupon.status == "Ativo"){
      result = usersService.addOrder(index, order);
      if (result) {
        res.status(201).send(result);
        usersService.updateFile();
        console.log("Pedido foi finalizado com sucesso");
      }else {
        res.status(403).send({ message: "Pedido não foi finalizado"});
      }
    }else{
      result = usersService.removeCoupon(order);
      if (result) {
        res.status(403).send({ message: "Cupom inválido", result });
      }
    }
    
  } catch (err) {
    const { message } = err;
    res.status(400).send({ message })
  }
});

// Envia email
routes.get('/payment/confirm/:userid', async (req, res) => {
  let userid = req.params.userid;
  let order: Order = <Order> req.body;
  
  try {
    const user = usersService.getUserById(userid);
    if(user) {
      var msg: string = `Hi ${user.name}, your order has been confirmed`;
      
      var info = await emailService.sendMail(
        {name: user.name, email: user.email },
        {subject: 'Order confirmation', body: msg}
      );
      if(info.accepted) {
        res.status(201).send({message: '201 Order confirmed', msg});
      }
    }
  } catch (err) {
    msg = err;
    res.status(400).send( { msg });
  }
});

export default routes;
