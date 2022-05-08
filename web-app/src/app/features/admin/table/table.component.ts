import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

import { Coupon } from '../../../interfaces/coupon';
import { AdminService } from 'src/app/features/admin/admin.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Nome', 'Produto', 'Desconto', 'Valor Mínimo', 'Status', 'Editar' ,'Deletar'];
  data: any;
  coupons: Coupon[] = [];
  type: string;
  localStorage = new LocalStorageService();

  @ViewChild(MatTable) table: MatTable<Coupon>;

  constructor(private service: AdminService, private route: Router) {}
  
  ngOnInit(): void {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
    this.coupons = this.localStorage.get('coupons');
  }
  

  removeData(couponName: string) {

    if(confirm("Você tem certeza que quer excluir o cupom " + couponName + '?')){
      var index = this.coupons.findIndex(c => c.name == couponName);
      var couponCopy = this.coupons[index];
  
      this.coupons.splice(index, 1)
      this.table.renderRows();
  
      this.service.removeCoupon(couponName)
      .then(updatedCoupons => {
        this.localStorage.set('coupons', updatedCoupons);
        // alert("Cupom excluído com sucesso!");
      })
      .catch(erro => {
        alert(erro);
        this.coupons.push(couponCopy);
        this.table.renderRows();
      });
    }
    
  }

  editData(coupon: Coupon){
    this.localStorage.set('coupon', coupon);
    if(this.type == 'rest'){ 
      this.route.navigate(["promotion/rest/edit", this.data.name, coupon.name]);
    }else{
      this.route.navigate(["promotion/admin/edit", coupon.name]);
    }
  }
  
}