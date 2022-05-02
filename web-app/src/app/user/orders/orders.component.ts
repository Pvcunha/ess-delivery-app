import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http'; 
import { MatTable } from '@angular/material/table';               
import { User } from 'src/app/admin/user';
import { EmailService } from 'src/app/email/email.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Order } from './order';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Restaurante', 'Valor', 'Cupom', 'Comprovante via E-mail' ,'Comprovante via Download'];
  user: User;
  localStorage = new LocalStorageService();

  private taURL = 'http://localhost:3000';
  private currentURL: string;

  constructor(private http: Http, private emailService: EmailService) {
    this.currentURL = window.location.pathname;
  }

  ngOnInit(): void {  
    this.user = this.localStorage.get('user');
    var order: Order[] = this.user.orders;
    console.log(order);
  }

  @ViewChild(MatTable) table: MatTable<Order>;

  sendEmail(order: Order) {
    this.emailService.sendEmailWithOrder(order);
  }

  private catch(erro: any): Promise<any>{
    console.error('Oops, something went wrong',erro);
    return Promise.reject(erro.message || erro);
  }

}
