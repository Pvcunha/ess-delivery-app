import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Order, User } from '../admin/user';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class EmailService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }
  
  async sendEmailWithOrder(order: Order) {
    let localStorage = new LocalStorageService();
    const user: User = localStorage.get('user');

    const info = await this.sendEmail(user, order);
    if(info)
      alert('order sent ' + JSON.stringify(info));
    else
      alert('problem sending');
  }
  
  sendEmail(user: User, order: Order) {
    return this.http.post(this.taURL + `/payment/confirm/${user.id}`, JSON.stringify(order), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {return res} else {return undefined;}
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
