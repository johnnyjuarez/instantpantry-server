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
  })
  // item_name TEXT NOT NULL,
  // amount TEXT NOT NULL,
  // image TEXT,
  // barcode TEXT,
  // category_id INTEGER REFERENCES instantpantry_category(id) ON DELETE CASCADE NOT NULL
  .post(jsonBodyParser, (req, res, next) => {
    const {item_name, amount, image, barcode} = req.body;
    const {category_id} = req.params;
    const newItem = {item_name, amount, image, barcode, category_id};
    if(!item_name || !amount) {
      return res.status(400).json({
        error: 'Missing item name or amount in request body'
      });
    }
    ItemServices.insertItems(req.app.get('db'))
  });

module.exports = itemsRouter;