import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/admin/user';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  id: string;
  localStorage = new LocalStorageService();

  profileSrc: string = "/assets/images/user-profile.png";

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.user = this.localStorage.get('user');
  }

  toOrders() {
    this.route.navigate(["user", this.user.id, "orders"]);
  }

  toPayment() {
    this.route.navigate(["user/pay"]);
  }

  toCurrentOrder(){
    this.route.navigate(["user", this.user.id, "order"]);
  }

  toSimulateFinishedOrder(orderId: string) {
    // set localstorage user.id and order.id so the email page can read them
    //this.localStorage.set("user_id", this.user.id)
    //this.localStorage.set("order_id", orderId)

    // navigate to email page 
    // this.route.navigate(["user", this.user.id, "finished-order", orderId]);
    this.route.navigate(["finished-order"]);
  }

}
