import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Order } from './order';

@Injectable()
export class OrdersService {

  private taURL = 'http://localhost:3000';
  private currentURL: string;

  constructor(private http: Http) {
    this.currentURL = window.location.pathname;
  }
  
  getOrders(): Promise<Order[]> {
    return this.http.get(this.taURL + this.currentURL)
             .toPromise()
             .then(res => res.json() as Order[])
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}