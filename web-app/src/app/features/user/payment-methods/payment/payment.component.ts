import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from '../classes/payment-method';
import { User } from '../admin/user';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  clientId:string;
  
  user:User ;

  sizePayments:number;

  mainPay:PaymentMethod;

  metodo:PaymentMethod;

  mainName:string;

  constructor(private router:Router,private service: PaymentService) {
   
  }

  findmain():void{
    
    for (var pagamento of this.user.paymentMethods){

      if(this.mainName == pagamento.name){
        this.mainPay = pagamento;
        localStorage.setItem("mainPay" , JSON.stringify(pagamento));
      }

    }
  }

  changePay() {
    if(this.mainPay.name != this.mainName) {
      alert('Voce alterou seu metodo de pagamento padrao')
      this.findmain();
    }
  }

  goToErase(){

    this.findmain();
    this.router.navigate(['/erasepayment']);

  }
  goToEdit(){

    this.findmain();
    this.router.navigate(['/editpayment']);

  }
  goToComponentB(): void {

    this.findmain();
    
    this.router.navigate(['/addpayment']);
    //console.log(this.user.name + " payment to addpay")
  }

  backPage(){
    this.router.navigate(['/user/'+ this.user.id+'/profile']);
  }
  
  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem("user"));
    this.mainPay = JSON.parse(localStorage.getItem("mainPay"));
  
    if(this.mainPay == null){
      this.mainPay = this.user.paymentMethods[0];
      localStorage.setItem("mainPay" , JSON.stringify(this.mainPay));
    }
    
    this.mainName = this.mainPay.name;

    //console.log(this.mainName);
    //console.log("localstorage deu bom " + this.user.name);
   

  }

}
