import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, User } from '../admin/user';
import { LocalStorageService } from '../local-storage.service';
import { EmailService } from './email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }
  
  user: User;
  order: Order;
  localStorage = new LocalStorageService();

  async sendEmail() {
    const info = await this.emailService.sendEmail(this.user, this.order);
    console.log(info);
  }

  ngOnInit(): void { 
    this.user = this.localStorage.get('user');
    this.order = this.localStorage.get('order')
    this.sendEmail()
  }
}
