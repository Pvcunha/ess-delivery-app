import express = require('express');
import bodyParser = require("body-parser");

import { admin } from './routes/promotion-routes/admin';
import { rest } from './routes/promotion-routes/restaurants';
import { payment } from './routes/user-routes/payment-methods';
import { orders } from './routes/user-routes/orders';

var app = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.use(admin);
app.use(rest);
app.use(payment);
app.use(orders);

var server = app.listen(3000, function () {
  console.log('\nDelivery App listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { app, server, closeServer }
