import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Car } from '../cars/car';

@Injectable()
export class EmailService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  sendEmail(userid: string, car: Car) {
    return this.http.post(this.taURL + `/payment/confirm/${userid}`, JSON.stringify(car), {headers: this.headers})
      .toPromise()
      .then(res => {
        if (res.status === 201) {console.log(res);} else {console.log('err');}
      })
      .catch(this.catch);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }
}
