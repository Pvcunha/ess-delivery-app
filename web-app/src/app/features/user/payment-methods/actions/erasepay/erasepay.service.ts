import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { PaymentMethod } from '../classes/payment-method';
import { User } from '../admin/user';

@Injectable({
  providedIn: 'root'
})
export class ErasepayService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  private currentURL: string;

  constructor(private http: Http) {
  }

  //     user/pay
  delete(idUser:string, idMethod:string): Promise<PaymentMethod> {
    
    return this.http.delete(this.taURL + "/user/" + idUser +"/methods/" + idMethod)
      .toPromise()
      .then(res => {console.log("staus: " + res.status)
        if (res.status === 201) {return res.json() as PaymentMethod} else {return null;}
      })
      .catch(this.catch);
  }
  getuser(id:string): Promise<User> {
    return this.http.get(this.taURL + "/users/" + id)
             .toPromise()
             .then(res => res.json() as User)
             .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }


}
