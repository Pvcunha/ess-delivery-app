import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {User} from '../admin/user'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  private currentURL: string;

  constructor(private http: Http) {
  }

  
  //     user/pay
  getuser(id: string): Promise<User[]> {
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
