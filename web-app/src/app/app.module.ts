import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { NgxCurrencyModule } from "ngx-currency";
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PromotionComponent } from './features/promotion/promotion.component';
import { PromotionService } from './features/promotion/promotion.service';
import { TableComponent } from './features/admin/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './features/admin/admin.component';
import { AdminService } from './features/admin/admin.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { BarComponent } from './views/bar/bar.component';
import { OrdersComponent } from './features/user/orders/orders.component';
import { LoginService } from './login/login.service';
import { EditComponent } from './features/promotion/edit/edit.component';
import { EditService } from './features/promotion/edit/edit.service';
import { LocalStorageService } from './local-storage.service';

import { CurrentOrderComponent } from './features/user/current-order/current-order.component';
import { OrdersService } from './features/user/orders/orders.service';
import { CurrentOrderService } from './features/user/current-order/current-order.service';
import { LogoutComponent } from './views/logout/logout.component';

import { EmailComponent } from './features/email/email.component';
import { EmailService } from './features/email/email.service';

import { PaymentComponent } from './features/user/payment-methods/payment/payment.component';
import { AddpaymentComponent } from './features/user/payment-methods/actions/addpayment/addpayment.component';
import { InsertcreditComponent } from './features/user/payment-methods/method-types/insertcredit/insertcredit.component';
import { InsertdebitComponent } from './features/user/payment-methods/method-types/insertdebit/insertdebit.component';
import { PaymentService } from './features/user/payment-methods/payment/payment.service';
import { InsertcreditService } from './features/user/payment-methods/method-types/insertcredit/insertcredit.service';
import { InsertdebitService } from './features/user/payment-methods/method-types/insertdebit/insertdebit.service';
import { PaypalComponent } from './features/user/payment-methods/method-types/paypal/paypal.component';
import { ErasepayComponent } from './features/user/payment-methods/actions/erasepay/erasepay.component';
import { PaypalService } from './features/user/payment-methods/method-types/paypal/paypal.service';
import { PicpayService } from './features/user/payment-methods/method-types/picpay/picpay.service';
import { ErasepayService } from './features/user/payment-methods/actions/erasepay/erasepay.service';
import { PicpayComponent } from './features/user/payment-methods/method-types/picpay/picpay.component';
import { EditpayComponent } from './features/user/payment-methods/actions/editpay/editpay.component';
import { EditpayService } from './features/user/payment-methods/actions/editpay/editpay.service';
import { LogoComponent } from './views/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PromotionComponent,
    TableComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    BarComponent,
    OrdersComponent,
    EditComponent,
    CurrentOrderComponent,
    LogoutComponent,
    EmailComponent,
    PaymentComponent,
    AddpaymentComponent,
    InsertcreditComponent,
    InsertdebitComponent,
    PaypalComponent,
    PicpayComponent,
    ErasepayComponent,
    EditpayComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MatTableModule,
    MatDialogModule,
    NgxCurrencyModule,
    MatSelectModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'promotion/:type/:id',
        component: AdminComponent
      },
      {
        path: 'promotion/admin',
        component: AdminComponent
      },
      {
        path: 'admin/add',
        component: PromotionComponent
      },
      {
        path: 'promotion/admin/edit/:id',
        component: EditComponent
      },
      {
        path: 'promotion/rest/edit/:name/:id',
        component: EditComponent
      },
      {
        path: 'promotion/:type/:id/:action',
        component: PromotionComponent
      },
      {
        path: 'login/:type',
        component: LoginComponent
      },
      {
        path: 'user/:id/profile',
        component: ProfileComponent
      },
      {
        path: 'user/:id/order',
        component: CurrentOrderComponent
      },
      {
        path: 'user/:id/orders',
        component: OrdersComponent
      },
      {
        path: 'finished-order',
        component: EmailComponent
  
      },
      {
        path: 'user/pay',
        component: PaymentComponent
      },
      {
        path: 'addpayment',
        component: AddpaymentComponent
      },
      {
        path: 'addpayment/insertcredit',
        component: InsertcreditComponent
      },
      {
        path: 'addpayment/insertdebit',
        component: InsertdebitComponent
      },
      {
        path: 'addpayment/paypal',
        component: PaypalComponent
      },
      {
        path: 'addpayment/picpay',
        component: PicpayComponent
      },
      {
        path: 'erasepayment',
        component:ErasepayComponent
      },
      {
        path: 'editpayment',
        component:EditpayComponent
      }   

    ]),
    BrowserAnimationsModule
  ],

  providers: [
    PromotionService, 
    AdminService, 
    LoginService, 
    EditService, 
    LocalStorageService, 
    CurrentOrderService, 
    EmailService,  
    PaymentService, 
    InsertcreditService, 
    InsertdebitService, 
    EditpayService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
