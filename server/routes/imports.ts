import * as fs from 'fs';
import { Router } from 'express';
import { PromotionService } from '../src/services/promotion-service';
import { UserService } from '../src/services/user-service';
import { readFiles, restaurants } from './readFiles';
import { Admin } from '../src/interfaces/users';

import EmailService from '../src/services/email-service';
import { PaymentMethodService } from '../src/services/payment-service';

// Inicialização dos serviços
var adminService: PromotionService = new PromotionService();
var restaurantsService: PromotionService[] = [];
var usersService: UserService = new UserService();
var emailService: EmailService = new EmailService();
var methodsService : PaymentMethodService = new PaymentMethodService();

export var admins: Admin[] = [];
// Lendo dos arquivos
fs.readFile("./data/admin.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  else {
    admins = JSON.parse(data);
    //console.log(admins);
  }
});

[adminService, usersService, restaurantsService] = readFiles(adminService, usersService, restaurantsService);

// Atualiza arquivo de restaurantes
export function updateRestaurantsFile() {
  fs.writeFile("./data/restaurants-coupons.json", JSON.stringify(restaurants), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Arquivo restaurants-coupons.json atualizado!");
    }
  })
}

export { adminService, usersService, restaurantsService, emailService, methodsService }

