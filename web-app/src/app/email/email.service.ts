import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class EmailService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  sendEmail(userid: string) {
    return this.http.get(this.taURL + `/payment/confirm/${userid}`, {headers: this.headers})
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
