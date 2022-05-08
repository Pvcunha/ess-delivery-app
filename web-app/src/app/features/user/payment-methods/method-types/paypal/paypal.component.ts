import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaypalService } from './paypal.service';
import { PaymentMethod } from '../../classes/payment-method';;
import { User } from '../../../../../interfaces/user';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  
  constructor(private router: Router ,private service: PaypalService) {}
  
  countcheck: number = 0;
  checou: string = "deschecado";
  user: User;
  metodo: PaymentMethod = new PaymentMethod();

  checar():void{
    if(this.countcheck%2 == 0){
      this.checou = "checado";
      console.log(this.checou);
    }
    else{
      this.checou = "deschecado";
      console.log(this.checou);
    }
    this.countcheck = this.countcheck + 1;
  }

  checkfields():boolean{
    
    var corrections = "";

    console.log(typeof this.metodo.number)
    

    if( this.user.name == undefined ){
      corrections = corrections + "* Nome do titular não pode ficar vazio\n"
    }
    if( this.metodo.email == undefined ){
      corrections = corrections + "* E-mail não pode ficar vazio\n"
    }

    if(corrections != ""){
      
      alert(corrections);
      return false;
    }

    return true;
  }

  sendPost(): void {

    //checa se os campos preenchidos estão ok
    if(!this.checkfields())return;

    //colocando os 4 últimos digitos no nome

    this.metodo.name =  "PayPal(" + this.metodo.email + ")";

    // fazer confirmaçao dps
    var confirmId = prompt("confirme seu Id");
    var confirme = prompt("para confirmar escreva: CONFIRMAR ");
    
    while(confirmId != this.user.id){
      alert("id inválido");
      confirmId = prompt("confirme seu Id");
    }
    while(confirme != "CONFIRMAR"){
      alert("digite corretamente a palavra CONFIRMAR");
      confirme = prompt("para confirmar escreva: CONFIRMAR ");
    }

    this.service.create(this.user.id, this.metodo).then(res => {

      //mudar para padrao se necessario
      if(this.checou == "checado"){
        localStorage.setItem("mainPay" , JSON.stringify(res));
      }
      
      if(res){
        console.log("deu bom 201");
        this.goToComponentB();
      }
     
    }).catch(erro => alert("Confira seus dados"));

    
  }

  goToComponentB(): void {
    this.service.getuser(this.user.id).then(user => {
      localStorage.setItem("user" , JSON.stringify(user));
      //console.log(JSON.parse(localStorage.getItem("user")));
      this.router.navigate(['/user/pay']);
    })
  
    console.log(this.user.name + " payment to addpay")
  }
  backPage(){
    this.router.navigate(['/addpayment']);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.metodo.type = "PicPay" ;
    if(this.user.paymentMethods.length == 5){
      alert("Número máximo de métodos de pagamento atingido, remova um para adicionar outro");
      this.router.navigate(['/user/pay']);
    }
    console.log(this.metodo);
    this.metodo.id = 0;
   
  }
}
