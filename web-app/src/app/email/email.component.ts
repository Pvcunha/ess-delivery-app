import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';
import { EmailService } from './email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private emailService: EmailService, private route: ActivatedRoute) { }
  
  userid: string;

  sendEmail(): void {
    const info = this.emailService.sendEmail(this.userid);
    console.log(info)
  }

  ngOnInit(): void { 
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      this.userid = params.data;
      this.sendEmail();
    })
  }

}
