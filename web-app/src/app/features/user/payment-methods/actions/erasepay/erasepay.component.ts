import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from '../classes/payment-method';
import { User } from '../admin/user';
import { ErasepayService } from './erasepay.service';

@Component({
  selector: 'app-erasepay',
  templateUrl: './erasepay.component.html',
  styleUrls: ['./erasepay.component.css']
})
export class ErasepayComponent implements OnInit {

  clientId:string;
  
  user: User ;

  sizePayments:number;

  mainPay: PaymentMethod;

  mainName:string;

  constructor(private router:Router,private service: ErasepayService) {
   
  }

  findmain():void{

    for (var pagamento of this.user.paymentMethods){

      if(this.mainName == pagamento.name){
        this.mainPay = pagamento;
        localStorage.setItem("mainPay" , JSON.stringify(pagamento));
      }

    }

  }

  backPage(){
    this.router.navigate(['/user/pay']);
  }

  deletePay(): void {
    console.log(this.user.paymentMethods);
    if(this.user.paymentMethods.length < 2){
      alert("Adicione outro método antes de excluir este!");
      
      this.router.navigate(['/user/pay']);
      return;
    }

    var confirmId = prompt("confirme seu Id");
    
    
    if(confirmId != this.user.id){
      return;
    }
    var confirme = prompt("para confirmar escreva: CONFIRMAR ");
    if(confirme != "CONFIRMAR"){
      return;
    }

    //encontrar metodo que está no select
    this.findmain();

    this.service.delete(this.user.id,String(this.mainPay.id)).then(res => {
      //mudar para padrao se necessario
      console.log(res)
      this.service.getuser(this.user.id).then(user => {
        localStorage.setItem("user" , JSON.stringify(user));
        localStorage.removeItem("mainPay")
        //console.log(JSON.parse(localStorage.getItem("user")));
        this.router.navigate(['/user/pay']);
      })
    });
    
  }
  
  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.mainPay = JSON.parse(localStorage.getItem("mainPay"));
    this.mainName = this.mainPay.name;

    console.log(this.mainPay.type);

  }


}
