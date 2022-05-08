import { User , Order} from "../interfaces/users";
import { Coupon } from "../classes/coupon";
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
  addOrder(userIndex: number, order: Order): [User, Order] {
    const idOrder = crypto.randomBytes(4).toString('HEX'); 
    console.log(idOrder)
    order.id = idOrder;
    const newOrder = order//<Order> { id: idOrder , ...order};
    
    console.log(newOrder);
    
    this.users[userIndex].orders.push(newOrder);
    
    //console.log(this.users[userIndex].orders);
    
    return [this.users[userIndex], newOrder];
  }
  
  couponCanBeApplied(userId: string, order: Order, coupon: Coupon) : string{
    // ver se o amount do pedido é >= valor minimo do cupom
    var userIndex = this.getUserIndex(userId);
    // verificar se o cupom já foi utilizado pelo usuário anteriormente
    var couponIndex = this.users[userIndex].orders
                          .findIndex(o => {if(o.coupon){ o.coupon.id == coupon.id }});  

    if (order.amount < coupon.minValue) {
      return "O valor mínimo não foi atingido";
    }
    if (coupon.status != "Ativo" ) {
      return "O cupom não está ativo no momento";
    }
    if (couponIndex != -1) {
      return "Este cupom já foi utilizado";
    }
    // return order.amount >= coupon.minValue && order.coupon == undefined && coupon.status == "Ativo" && couponIndex == -1;
    if (order.coupon.id != '') {
      return "Já existe um cupom aplicado ao pedido";
    }
    return "OK"
  }

  // atualiza o valor do pedido (após aplicar o cupom)
  applyCouponInOrder(userId: string, order: Order, coupon: Coupon) : [Order, string] {
    var msg = this.couponCanBeApplied(userId, order, coupon); 
    if(msg == "OK"){
      // se tudo der certo => aplica o cupom
      order.coupon = coupon; 
      order.amount = order.amount * (1 - coupon.discount); // por enquanto, é apenas porcentagem
    }
    return [order, msg];
  }

  // remove o cupom do pedido
  removeCoupon(order: Order) : Order {
    var discount = order.coupon.discount;
    order.amount = order.amount / (1 - discount); // por enquanto, é apenas porcentagem
    order.coupon = undefined; 
    
    return order;
  }
  //aqui colocar add coupon

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

