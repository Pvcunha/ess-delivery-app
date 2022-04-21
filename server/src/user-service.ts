import { User , Order} from "./users";
import { Coupon } from "./coupon";
import crypto = require('crypto');
import * as fs from 'fs';

export class UserService {
  users: User[] = [];
  
  // retorna indice do usuario
  getUserIndex(userId: string){
    var result = this.users.findIndex(({ id }) => id == userId);
    return result;
  }
  
  // retorna usuario
  getUserById(userId: string) : User {
    return this.users.find(({ id }) => id == userId);
  }

  getOrderById(userId: string, orderId: string) : Order {
    var index = this.getUserIndex(userId);
    return this.users[index].orders.find(({ id }) => orderId == id);
  }

  // retorna todos os usuarios
  getUsers() : User[] {
    return this.users;
  }

  // retorna todos os pedidos de um determiando usuario
  getOrders(user: User) : Order[] {
    var index = this.getUserIndex(user.id);
    return this.users[index].orders;
  }

  // ------------------------------------------------------------------
  
  // adiciona um pedido ao usuário (após a finalização)
  addOrder(userIndex: number, order: Order): User {
    const idOrder = crypto.randomBytes(4).toString('HEX'); 

    const newOrder = <Order> { id: idOrder , ...order};
   
    this.users[userIndex].orders.push(newOrder);
 
    console.log(this.users[userIndex].orders);

    return this.users[userIndex];
  }

  // atualiza o valor do pedido (após aplicar o cupom)
  applyCouponInOrder(order: Order, coupon: Coupon) : Order {
    // ** vo ver se o carinha ja usou esse cupom outra vez (pqp) => tem que salvar os cupons (FUTURO!!!!)
    // ver se o amount do pedido é >= valor minimo do cupom
    if(order.amount >= coupon.minValue && order.coupon==undefined && coupon.status=="Ativo"){
      // se tudo der certo => aplica o cupom
      order.coupon = coupon; 
      order.amount = order.amount * (1 - coupon.discount); // por enquanto, é apenas porcentagem
    }
    
    return order;
  }

  // remove o cupom do pedido
  removeCoupon(order: Order) : Order {
    var discount = order.coupon.discount;
    order.amount = order.amount / (1 - discount); // por enquanto, é apenas porcentagem
    order.coupon = undefined; 
    
    return order;
  }

  // ------------------------------------------------------------------
  
  updateFile(){
    var fileName = "users.json";
    fs.writeFile(fileName, JSON.stringify(this.users), (err) => {
      if(err){
        console.log(err);
      }else{
        console.log(`Arquivo ${fileName} atualizado!`);
      }
    })
  }
}
