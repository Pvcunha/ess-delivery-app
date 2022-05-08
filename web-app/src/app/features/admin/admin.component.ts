import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../local-storage.service';
import { Admin } from '../../interfaces/admin';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',    
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  restaurant: Restaurant;
  admin: Admin;
  localStorage = new LocalStorageService();
  type: string;

  constructor(private route: Router, private serviceTitle: Title)  {}

  ngOnInit(): void {
    this.type = this.localStorage.get('type');
    this.serviceTitle.setTitle(this.type);
  }

  checkType(): void {
    if(this.type == "rest"){
      this.restaurant = this.localStorage.get('rest'); 
      this.route.navigate(["promotion/", this.type, this.restaurant.name, 'add-coupon']);
    }
    else{
      this.admin = this.localStorage.get('admin');
      this.route.navigate(["admin/add"]);
    }
  }




}

