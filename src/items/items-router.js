const express = require('express');
const requireAuth = require('../middleware/jwt-auth');
const ItemServices = require('./items-services');
const path = require('path');
const jsonBodyParser = express.json();

const itemsRouter = express.Router();

itemsRouter
  .route('/:category_id')
  .all(requireAuth)
  .get((req, res, next) => {
    const category_id = req.params.category_id;
    ItemServices.getItems(req.app.get('db'), category_id)
      .then(items => {
        res.status(200).json(items);
      });
  });

module.exports = itemsRouter;