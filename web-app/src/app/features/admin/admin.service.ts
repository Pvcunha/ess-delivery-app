import { Component, Injectable, Inject }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from '../../local-storage.service';

import { Coupon } from '../../interfaces/coupon';

@Injectable()
export class AdminService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';
  private currentURL: string;
  private type: string;
  localStorage = new LocalStorageService();

  private _coupon: Coupon = new Coupon();
  
  public get coupon(): Coupon {
    return this._coupon;
  }
  public set coupon(value: Coupon) {
    this._coupon = value;
  }

  constructor(private http: Http) {
    this.currentURL = window.location.pathname;
    this.type = this.localStorage.get('type');
  }

  init(){
    var path = window.location.pathname;
    var act = path.includes("add");

    if(act){
      this.currentURL = path.replace("/add-coupon", "");  
    }else{
      this.currentURL = path.replace("/edit-coupon", "");
    }
  }
  
  removeCoupon(couponName: string): Promise<Coupon[]> {
    this.init();
    if(this.type == "rest"){
      this.currentURL = this.currentURL.replace("rest", "restaurants");
    }

    return this.http.delete(this.taURL + this.currentURL + "/" + couponName)
             .toPromise()
             .then(res => res.json() as Coupon[])
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}