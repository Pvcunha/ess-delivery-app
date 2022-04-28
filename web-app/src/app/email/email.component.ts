import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';
import { EmailService } from './email.service';
import { Car } from '../cars/car';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }
  
  userid: string;
  car: Car;

  async sendEmail() {
    const info = await this.emailService.sendEmail(this.userid, this.car);
    console.log(info);
  }

  ngOnInit(): void { 
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.userid = params.data;
      this.car = JSON.parse(params.car);
      this.sendEmail();
    })
  }

}
