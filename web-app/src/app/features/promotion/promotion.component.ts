import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from '../../interfaces/coupon';
import { LocalStorageService } from '../../local-storage.service';
import { PromotionService } from './promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  coupon: Coupon = new Coupon();
  status: string;
  type: string;
  data: any;
  productname: string;
  localStorage = new LocalStorageService();
  
  constructor(private promotionService: PromotionService, private route: Router) {
    this.status = "Inativo";
  }
  
  ngOnInit(): void {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
  }

  activate(): void {
    if(this.status == "Inativo"){
      this.status = "Ativo";
    }else{
      this.status = "Inativo";
    }
  }

  createCoupon(newCoupon: Coupon): void {

    newCoupon.product = this.productname;
    
    newCoupon.status = this.status;

    this.promotionService.createCoupon(newCoupon)
    .then(couponCreated => {
      if (couponCreated) {
        var currentCoupons: Coupon[] = this.localStorage.get('coupons');
        
        if(currentCoupons.length > 0) {
          currentCoupons.push(couponCreated);
        } else {
          currentCoupons = [couponCreated];
        }
        this.localStorage.set('coupons', currentCoupons);
        this.coupon = new Coupon();
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

