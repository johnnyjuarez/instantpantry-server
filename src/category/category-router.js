const express = require('express');
const requireAuth = require('../middleware/jwt-auth');
const CategoryServices = require('./category-services');
const path = require('path');
const jsonBodyParser = express.json();

const categoryRouter = express.Router();

categoryRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
    const userId = req.params.user_id;
    CategoryServices.getCategories(req.app.get('db'), userId)
      .then(categories => {
        res.status(200).json(categories);
      });
  })
  .post(jsonBodyParser, (req, res, next) => {
    const {name} = req.body;

    const userId = req.params.user_id;
    if(!name) {
      return res.status(400).json({
        error: 'Missing name in request body'
      });
    }
    const newCategory = {category_title:name, user_id: userId};
    CategoryServices.insertCategory(req.app.get('db'), newCategory)
      .then(category => {
        res.status(201)
          .location(path.posix.join(req.originalUrl, `/${category.id}`))
          .json(CategoryServices.serializeCategory(category));
      });
  });

categoryRouter
  .route('/:user_id/:category_id')
  .all(requireAuth)
  .delete((req, res, next)=> {
    const {category_id} = req.params;
    CategoryServices.deleteCategory(req.app.get('db'), category_id)
      .then(() => {
        res.status(204).end();
      });
  });

module.exports = categoryRouter;