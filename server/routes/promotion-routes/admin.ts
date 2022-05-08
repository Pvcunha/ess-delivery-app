import { admins, adminService } from '../imports';
import { Coupon } from '../../src/classes/coupon';
import { Router } from 'express';

export const admin = Router();

// ROTAS DE ADMIN

admin.get('/admin/:id', function (req, res) {
    const id = req.params.id;
    const admin = admins.find((result) => result.id == id);
    // const coupons = adminService.get();
    console.log(admin);
    if (admin) {
      res.status(201).send(admin);
    } else {
      res.status(404).send({ message: ` Administrador ${id} não foi encontrado` });
    }
  });
  
  admin.get('/promotion/admin', (req, res) => {
    const promotions = adminService.get();
    res.status(201).send(JSON.stringify(promotions));
  });
  
  admin.get('/promotion/admin/:id', function (req, res) {
    const id = req.params.id;
    const coupon = adminService.getByName(id);
    if (coupon) {
      res.status(201).send(coupon);
    } else {
      res.status(404).send({ message: ` Coupon ${id} could not be found` });
    }
  });
  
  admin.post('/promotion/admin', function (req, res) {
    const coupon: Coupon = <Coupon>req.body;
    try {
      const result = adminService.add(coupon);
      if (result) {
        adminService.updateFile("admin-coupons.json");
        console.log(result);
        res.status(201).send(result);
      } else {
        res.status(403).send({ message: "Cupom não pode ser adicionado" });
      }
    } catch (err) {
      const { message } = err;
      res.status(400).send({ message })
    }
  });
  
  admin.put('/promotion/admin/:name', function (req, res) {
    const name = req.params.name;
    const coupon: Coupon = <Coupon>req.body;
    const result = adminService.update(name, coupon);
    //console.log(result);
    const message = `Coupon ${name} has been updated.`;
    const err = `Coupon ${name} could not be found.`;
  
    if (result) {
      adminService.updateFile("admin-coupons.json");
      console.log(message);
      res.status(201).send(result);
    } else {
      res.status(404).send({ message: err });
    }
  
  });
  
  
  admin.delete('/promotion/admin/:name', function (req, res) {
    const name = req.params.name;
    const result = adminService.delete(name);
  
    const message = `Coupon ${name} has been deleted.`;
    const err = `Coupon ${name} could not be found.`;
  
    if (result) {
      adminService.updateFile("admin-coupons.json");
      console.log(message);
      res.status(201).send({ message: message });
    } else {
      res.status(404).send({ message: err });
    }
  })
  

export default admin;