import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from './car';
import { CarService } from './cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  constructor(private carService: CarService, private route: Router) {}

  car: Car = new Car();
  cars: Car[] = [];
  name: string;

  createCar(c: Car): void {
     this.carService.create(c)
     .then(result => {
           if (result) {
              this.cars.push(<Car> result);
              this.car = new Car();
           }
        })
        .catch(erro => alert(erro));
  }
  
  navToEmail(): void {
    console.log(this.name);
    let ret = this.route.navigate(['/email'], {queryParams:{data:this.name}})
  }

  ngOnInit(): void {
     this.carService.getCars()
        .then(cars => this.cars = cars)
        .catch(erro => alert(erro));
  }

}