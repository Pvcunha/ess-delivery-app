import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
// import { User } from 'src/app/admin/user';
import { User } from '../../../../../../server/src/interfaces/users';
import { EmailService } from '../../../features/email/email.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Order } from './order';
import generateOrderReceipt from '../../../../../../utils/generate_order_receipt'


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Restaurante', 'Valor', 'Endereço', 'Comprovante via E-mail', 'Comprovante via Download'];

  user: User;
  localStorage = new LocalStorageService();

  constructor(private http: Http, private route: Router, private emailService: EmailService) { }

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
  }

  toCurrentOrder() {
    this.route.navigate(['user', this.user.id, 'order']);
  }

  @ViewChild(MatTable) table: MatTable<Order>;


  sendEmail(order: Order) {
    this.emailService.sendEmailWithOrder(order).then((response) => {
      if (response)
        alert("Email send successfuly")
      else
        alert('Email will be sent whithin 24 hours');
    })
  }

  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  dowloadReceipt(order: Order) {
    const receipt = generateOrderReceipt(this.user, order)
    this.download("Comprovante de Pedido.txt", receipt)
  }

  private catch(erro: any): Promise<any> {
    console.error('Oops, something went wrong', erro);
    return Promise.reject(erro.message || erro);
  }

}
