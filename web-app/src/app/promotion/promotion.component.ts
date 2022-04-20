import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Coupon } from './coupon';
import { PromotionService } from './promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  constructor(private promotionService: PromotionService) {}

    coupon: Coupon = new Coupon();
    coupons: Coupon[] = [];

    createCoupon(c: Coupon): void {
        this.promotionService.create(c)
        .then(result => {
              if (result) {
                this.coupons.push(<Coupon> result);
                this.coupon = new Coupon();
              }
          })
          .catch(erro => alert(erro));
    }

    ngOnInit(): void {
        this.promotionService.getCoupons()
          .then(coupons => this.coupons = coupons)
          .catch(erro => alert(erro));
    }

}
