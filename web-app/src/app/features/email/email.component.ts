import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../user/orders/order';
import { User } from '../../interfaces/user';
import { LocalStorageService } from '../../local-storage.service';
import { EmailService } from './email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {

  constructor(private emailService: EmailService, private route: Router,) { }

  localStorage = new LocalStorageService();

  first_try = true

  email_successfully_sent: boolean = false;
  email_not_successfully_sent: boolean = false;
  user_wants_to_re_send_email: boolean = false;
  email_will_be_re_sent_in_24_hours = false;

  user: User;

  order: Order;

  async sendEmail() {
    const info = await this.emailService.sendEmail(this.user, this.order);

    // set ngIf variables, se for a primeira vez tentando enviar e-mail 
    console.log("first_try: " + this.first_try)
    if (this.first_try) {
      // set ngIf variables
      if (info)
        this.email_successfully_sent = true
      else
        this.email_not_successfully_sent = true

      // set first_try to false, so it doesn't do this check on a second try
      this.first_try = false
    }


  }

  toUserProfile() {
    this.route.navigate(["user", this.user.id, "profile"]);
  }

  showNextScreen1() {
    this.email_successfully_sent = false
    this.user_wants_to_re_send_email = true
  }

  showNextScreen2() {
    this.user_wants_to_re_send_email = false
    this.email_will_be_re_sent_in_24_hours = true
  }

  sendEmail_and_showNextScreen2() {
    this.sendEmail()
    this.showNextScreen2()
  }

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
    this.order = this.localStorage.get('order');
    this.sendEmail()
  }
}
