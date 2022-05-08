import * as fs from 'fs';

import { PromotionService } from '../src/services/promotion-service';
import { UserService } from '../src/services/user-service';
import { restaurant } from '../src/interfaces/restaurants';
export var restaurants: restaurant[] = [];

export function readFiles(adminService: PromotionService, usersService: UserService, restaurantsService: PromotionService[]) : [PromotionService, UserService, PromotionService[]] {

    fs.readFile("./data/admin-coupons.json", "utf-8", (err, data) => {
        if(err){
            console.log(err);
        }else{
            adminService.coupons = JSON.parse(data);
        }
    })
  
    fs.readFile("./data/users.json", "utf-8", (err, data) => {
        if(err){
            console.log(err);
        }else{
            usersService.users = JSON.parse(data);
        }
    })
  
    fs.readFile("./data/restaurants-coupons.json", "utf-8", (err, data) => {
        if(err){
            console.log(err);
        }else{
            var json = JSON.parse(data);
            restaurants = json;
            for(var r of restaurants){
                restaurantsService[r.name] = new PromotionService();
                restaurantsService[r.name].coupons = r.coupons;
            }
        }
    })
    return [adminService, usersService, restaurantsService];
}