import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Alert } from 'selenium-webdriver';
import { Restaurant } from 'src/app/admin/restaurant';
import { Order } from '../orders/order';
import { User } from '../../admin/user'

@Injectable()
export class CurrentOrderService {

  private taURL = 'http://localhost:3000';
  private currentURL: string;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    this.currentURL = window.location.pathname; 
  }
  
  getRestaurant(restName: string): Promise<Restaurant> {
    return this.http.get(this.taURL + "/restaurant/" + restName)
             .toPromise()
             .then(res => {
                // alert("entrei no GET -> " + res.json().name)
                return res.json() as Restaurant;
              })
             .catch(this.catch);
  }

  insertCoupon(couponName: string, order: Order) {
    // alert(JSON.stringify({'couponName': couponName, 'order': order}))
    return this.http.post(this.taURL + this.currentURL, JSON.stringify({'couponName': couponName, 'order': order}),  {headers: this.headers})
    .toPromise()
    .then(res => {
      if(res.status == 201) {
        return res.json() as Order;
      } else {
        return null;
      }
    })
    .catch(this.catch);
  }

  createOrder(order:Order, userid:string): Promise<[Order, User]>{
    return this.http.post(this.taURL + '/user/'+ userid + '/orders', JSON.stringify(order), {headers: this.headers})
    .toPromise()
    .then(res => {
      if(res.status == 201) {
        return res.json() as [Order, User];
      } else {
        throw "Erro na finalizacao do pedido";
      }
    })
    .catch(this.catch)
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}