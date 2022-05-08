import { restaurantsService, updateRestaurantsFile } from '../imports';
import { Coupon } from '../../src/classes/coupon';
import { restaurants } from '../readFiles';
import { Router } from 'express';

export const rest = Router();

/// ROTAS DE RESTAURANTES

// Retorna o restaurante pelo nome
rest.get('/restaurant/:restName', (req, res) => {
    const restName = req.params.restName;
    const rest = restaurants.find((e) => e.name == restName);
  
    const msg = `Restaurant ${restName} found`;
    const err = `Restaurant ${restName} not found`;
    if (rest) {
      console.log(msg)
      res.status(201).send(rest);
    } else {
      console.log(err);
      res.status(404).send({ message: err });
    }
  });
  
  rest.get('/promotion/restaurants', (req, res) => {
    res.send(JSON.stringify(restaurants));
  });
  
  // retorna todos os cupons de um restaurante
  rest.get('/promotion/restaurants/:rest', (req, res) => {
    const restName = req.params.rest;
    const index = restaurants.findIndex((result) => result.name == restName)
    res.status(201).send(JSON.stringify(restaurants[index].coupons));
  });
  
  rest.get('/promotion/restaurants/:rest/:id', function (req, res) {
    const { rest, id } = req.params;
    const coupon = restaurantsService[rest].getByName(id);
    if (coupon) {
      res.status(201).send(coupon);
    } else {
      res.status(404).send({ message: ` Coupon ${id} could not be found` });
    }
  });
  
  rest.post('/promotion/restaurants/:rest', function (req, res) {
    const coupon: Coupon = <Coupon>req.body;
    const restName: string = req.params.rest;
    const index = restaurants.findIndex((result) => result.name == restName)
    try {
      const result = restaurantsService[restName].add(coupon);
      console.log(restaurantsService[restName].coupons);
  
      restaurants[index].coupons = restaurantsService[restName].coupons;
  
      if (result) {
        updateRestaurantsFile();
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
  
  
  rest.put('/promotion/restaurants/:rest/:id', function (req, res) {
    const { rest, id } = req.params;
    const coupon: Coupon = <Coupon>req.body;
    const result = restaurantsService[rest].update(id, coupon);
    //console.log(result);
    const index = restaurants.findIndex((result) => result.name == rest)
    restaurants[index].coupons = restaurantsService[rest].coupons;
    const err = `Coupon ${id} could not be found.`;
    const message = `Coupon ${id} has been updated.`;
  
    if (result) {
      res.status(201).send(restaurants[index].coupons);
      updateRestaurantsFile();
      console.log(message);
    } else {
      if (result == undefined) {
        res.status(404).send({ message: "Valor de desconto inválido" });
      } else {
        res.status(404).send({ message: err });
      }
    }
  
  });
  
  rest.delete('/promotion/restaurants/:rest/:id', function (req, res) {
    const { rest, id } = req.params;
    const result = restaurantsService[rest].delete(id);
  
    const index = restaurants.findIndex((result) => result.name == rest)
    restaurants[index].coupons = restaurantsService[rest].coupons;
  
    const err = `Coupon ${id} could not be found.`;
    const message = `Coupon ${id} has been deleted.`;
  
    if (result) {
      updateRestaurantsFile();
      console.log(message);
      res.status(201).send(restaurants[index].coupons);
    } else {
      res.status(404).send({ message: err });
    }
  });
  

export default rest;