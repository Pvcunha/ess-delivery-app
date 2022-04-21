import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Coupon } from './coupon';

@Injectable()
export class PromotionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

    create(coupon: Coupon): Promise<Coupon> {
    return this.http.post(this.taURL + "/promotion",JSON.stringify(coupon), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {return coupon;} else {return null;}
      })
      .catch(this.catch);
  }
  // ! o erro do JSON não formatado corretamente é aqui !!!!!!!!
  getCoupons(): Promise<Coupon[]> {
    return this.http.get(this.taURL + "/promotion")
             .toPromise()
             .then(res => res.json() as Coupon[])
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}