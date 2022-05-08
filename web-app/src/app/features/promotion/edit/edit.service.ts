import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Coupon } from '../../../interfaces/coupon';

@Injectable()
export class EditService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';
  private _currentURL: string;
  
  public get currentURL(): string {
    return this._currentURL;
  }

  public set currentURL(value: string) {
    this._currentURL = value;
  }

  constructor(private http: Http) {
    this.init();
  }

  init(){
    var path = window.location.pathname;
    this.currentURL = path.replace("/edit", "");
    this.currentURL = this.currentURL.replace("rest", "restaurants");
    // alert(this.currentURL);
  }

  editCoupon(couponNew: Coupon): Promise<Coupon[]> {
    this.init();
    return this.http.put(this.taURL + this.currentURL, JSON.stringify(couponNew), { headers: this.headers })
             .toPromise()
             .then(res => res.json() as Coupon[])
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any> {
    return Promise.reject(erro.message || erro);
  }
}