const express = require('express');
const requireAuth = require('../middleware/jwt-auth');
const ItemServices = require('./items-services');
const path = require('path');
const ItemsServices = require('./items-services');
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
  .post(jsonBodyParser, (req, res, next) => {

    const { item_name, amount, image, barcode } = req.body;
    const { category_id } = req.params;
    const category_id_join = category_id.replace(/[, ]+/g, '').trim();
    const newItem = { item_name, amount, image, barcode, category_id: category_id_join };
    console.log(newItem);
    if (!item_name || !amount) {
      return res.status(400).json({
        error: 'Missing item name or amount in request body'
      });
    }
    ItemServices.insertItems(req.app.get('db'), newItem)
      .then((item) => {
        res.status(201).location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(ItemServices.serializeItem(item));
      });
  });

itemsRouter
  .route('/:category_id/:item_id')
  .all(requireAuth)
  .delete((req, res, next) => {
    const { item_id } = req.params;
    ItemsServices.deleteItem(req.app.get('db'), item_id)
      .then(() => {
        res.status(204).end();
      });
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { item_name, amount } = req.body;
    const updatedItem = { item_name, amount };
    const { item_id } = req.params;
    ItemsServices.updateItem(req.app.get('db'), item_id, updatedItem)
      .then(() => {
        return res.status(204).end();
      })
      .catch(next);
  });

module.exports = itemsRouter;