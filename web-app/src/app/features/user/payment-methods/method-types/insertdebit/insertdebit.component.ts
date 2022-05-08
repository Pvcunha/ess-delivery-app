import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentMethod } from '../../classes/payment-method';
import { User } from '../../../../../interfaces/user';
import { InsertdebitService } from './insertdebit.service';

@Component({
  selector: 'app-insertdebit',
  templateUrl: './insertdebit.component.html',
  styleUrls: ['./insertdebit.component.css']
})
export class InsertdebitComponent implements OnInit {


  constructor(private router: Router,private service:InsertdebitService) {
   
  
  }

  countcheck:number = 0;
  checou:string = "deschecado";
  user:User;
  metodo:PaymentMethod = new PaymentMethod()

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
    if( String(this.metodo.number).length != 16 ){
      corrections = corrections + "* Digite exatamente 16 digitos no campo: número do cartão\n"
    }
    if( String(this.metodo.cvv).length != 3 ){
      corrections = corrections + "* Digite exatamente 3 digitos\n"
    }

    if( this.metodo.name_titular == undefined ){
      corrections = corrections + "* Nome do titular não pode ficar vazio\n"
    }
    if( this.metodo.flag != "visa" && this.metodo.flag != "master"  ){
      corrections = corrections + "* Selecione visa ou master\n"
    }
    if( this.metodo.name == undefined ){
      this.metodo.name = "";
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

    // fazer confirmaçao dps
    var confirmId = prompt("confirme seu Id");
    
    
    if(confirmId != this.user.id){
      return;
    }
    var confirme = prompt("para confirmar escreva: CONFIRMAR ");
    if(confirme != "CONFIRMAR"){
      return;
    }
    this.metodo.name = this.metodo.name + "(**** **** **** " +Number(this.metodo.number)%10000 + ")";

    this.service.create(this.user.id,this.metodo).then(res => {

      //mudar para padrao se necessario
      if(this.checou == "checado"){
        localStorage.setItem("mainPay" , JSON.stringify(res));
      }
     
      if(res){
        console.log("deu bom 201");
        this.goToComponentB();
      }
      else{
        alert("confira se colocou os dados corretamente")
      }

    });

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
    this.metodo.type = "Cartao de Debito" ;
    if(this.user.paymentMethods.length == 5){
      alert("Número máximo de métodos de pagamento atingido, remova um para adicionar outro");
      this.router.navigate(['/user/pay']);
    }
   
  }
}
