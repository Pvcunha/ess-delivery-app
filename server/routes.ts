import { Router } from 'express';
import { UserService } from './src/user-service';
import * as fs from 'fs';
import { Order } from './src/users';
const routes = Router();

var usersService: UserService = new UserService();

fs.readFile("users.json", "utf-8", (err, data) => {
  if(err){
    console.log(err);
  }else{
    usersService.users = JSON.parse(data);
  }
})

// ----------------------------------------------------------------
/// ROTAS DE USUÁRIOS

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

export default routes;
