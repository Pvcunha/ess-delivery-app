import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { Coupon } from '../../../interfaces/coupon';
import { LocalStorageService } from 'src/app/local-storage.service';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', '../promotion.component.css']
})
export class EditComponent implements OnInit {

  couponName: string;
  coupon: Coupon = new Coupon();
  newCoupon: Coupon = new Coupon();
  data: any;
  status: string;
  type: string;
  localStorage = new LocalStorageService();

  constructor(private service: EditService, private route: Router) {}
  
  ngOnInit(){
    this.coupon = this.localStorage.get('coupon');
    this.setStatus();
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
    this.newCoupon.product=this.coupon.product;
  }

  setStatus(){
    if(this.coupon.status == "Ativo"){
      this.status = "Ativo";
      document.getElementById("status").click();
    }
    this.activate();
  }

  activate(): void {
    if(this.status == "Inativo"){
      this.status = "Ativo";
    }else{
      this.status = "Inativo";
    }
  }

  editCoupon(){
    this.newCoupon.status = this.status;
    this.service.editCoupon(this.newCoupon)
      .then(result => {
        if (result) {
          this.localStorage.set('coupons', result);
          this.newCoupon = new Coupon();
          alert("Cupom atualizado com sucesso!")
          this.back();
        }
      })
      .catch(erro => alert("Dados inválidos"));
  }

  back(){
    if(this.type == 'rest'){
      this.route.navigate(["promotion", this.type, this.data.name]);
    }else{
      this.route.navigate(["promotion", this.type]);
    }
  }

}