import { Component, Injectable, Inject }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Admin } from '../interfaces/admin';
import { Coupon } from '../interfaces/coupon';
import { Restaurant } from '../interfaces/restaurant';
import { User } from '../interfaces/user';

@Injectable()
export class LoginService {
  constructor(private http:Http){}
  private taURL = 'http://localhost:3000/';
  
  getAdmin(url:string): Promise<Admin> {
    return this.http.get(this.taURL + url)
             .toPromise()
             .then(res => res.json() as Admin)
             .catch(this.catch);
  }

  getUser(url:string): Promise<User> {
    return this.http.get(this.taURL + url)
             .toPromise()
             .then(res => res.json() as User)
             .catch(this.catch);
  }

  getRestaurant(url:string): Promise<Restaurant> {
    return this.http.get(this.taURL + url)
             .toPromise()
             .then(res => res.json() as Restaurant)
             .catch(this.catch);
  }

  getAdminCoupons(url:string): Promise<Coupon[]> {
      return this.http.get(this.taURL + url)
               .toPromise()
               .then(res => {
                  return res.json() as Coupon[];
                })
               .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    alert("ID não existe");
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}