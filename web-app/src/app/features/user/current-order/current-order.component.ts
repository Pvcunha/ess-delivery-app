import { Component, OnInit } from '@angular/core';
import { Order, order } from '../orders/order';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Restaurant } from '../../../interfaces/restaurant';
import { CurrentOrderService } from './current-order.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  localStorage = new LocalStorageService();

  data: any;
  type: string;
  rest: Restaurant;
  curOrder: Order;
  couponName: string;
  discount: number;
  free: string = '';
  totalDiscount: number = 0.0;
  mainPay: any;
  mainName: any;

  constructor(private service: CurrentOrderService, private route: Router) {
    this.curOrder = order;
  }
  
  ngOnInit() {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
    this.curOrder.address = this.data.address;

    this.service.getRestaurant("BK").then(res => {
      this.rest = res;
      this.curOrder.products = this.rest.products;
      this.setZeroQuantity();
      this.curOrder.amount = 0;
      this.couponName = '';
    });
    
    this.discount = 0;

    this.mainPay = JSON.parse(localStorage.getItem("mainPay"));
  
    if(this.mainPay == null){
      this.mainPay = this.data.paymentMethods[0];
      localStorage.setItem("mainPay" , JSON.stringify(this.mainPay));
    }
    
    this.mainName = this.mainPay.name;
  }
  
  setZeroQuantity(){
    this.curOrder.products.forEach(product => product.quantity = 0);
  }
  
  updateFree(){
    let f = this.curOrder.amount * (this.discount/100);
    this.free = f.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // só depois que eu percebi que não precisava fazer requisição no backend, era só atualizar aqui
  // até porque nada muda no back
  insertCoupon() {
    if(this.couponName == undefined || this.couponName == '') {
      return alert("Campo de cupom não preenchido");
    }
    
    this.service.insertCoupon(this.couponName, this.curOrder)
      .then(res => {
      
        if(res.coupon.id != '') {
          this.discount = res.coupon.discount*100;
          this.updateFree();
          this.curOrder = res;
          alert("Cupom aplicado com sucesso!");
        } else {
          alert("Cupom não pode ser aplicado!");
        }
      }).catch(err => alert("Dados inválidos"));
  }

  back() {
    this.route.navigate(["user", this.data.id, "profile"]);
  }

  formatedAmount(){
    return this.curOrder.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  updateAmount(){
    this.curOrder.amount = 0;
    this.curOrder.products.forEach(product => {
      this.curOrder.amount += (product.price * product.quantity);
    })
    this.updateFree();
    this.curOrder.amount *= (1-(this.discount/100));
  }

  // não precisa fazer requisição no backend
  removeCoupon() {
    this.curOrder.coupon = order.coupon;
    this.discount = 0;
    this.updateAmount();
    alert("Cupom removido com sucesso");
  }


  confirmOrder(){
    let order, user;
    this.curOrder.products = this.curOrder.products.filter(p => p.quantity != 0);
    
    this.service.createOrder(this.curOrder, this.data.id)
    .then(res => {
      user = res[0];
      order = res[1];
      console.log(order);
      this.localStorage.set('user', user);
      this.localStorage.set('order', order);
      this.route.navigate(["finished-order"]);
    })
    .catch(err=> console.log(err));
    
  }

  // e as de metodos de pagamento
  

}

// - [ ]  fazer a tela de finalizar pedido: produtos e quantidades (caixa de seleção), restaurante e endereço de entrega, linkar com método de pagamento (essa rota já tem em tese)
// - [ ]  produtos e quantidades: é uma tabelinha normal no front
//     1. cria pedido no back (é o arquivo)
//     2. enquanto o carinha estiver logado eu to mandando esse pedido entre as páginas
//     3. Fazer botão de salvar alterações ⇒ put pra curr-order // menor prioridade da vida
