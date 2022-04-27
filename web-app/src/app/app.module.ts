import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './cars/cars.component';
import { CarService } from './cars/cars.service';
import { PromotionComponent } from './promotion/promotion.component';
import { PromotionService } from './promotion/promotion.service';
import { EmailComponent } from './email/email.component';
import { EmailService } from './email/email.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarsComponent,
    PromotionComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'cars',
        component: CarsComponent
      },
      {
        path: 'promotion',
        component: PromotionComponent
      },
      {
        path: 'email',
        component: EmailComponent
      }
    ])
  ],
  providers: [CarService, PromotionService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
