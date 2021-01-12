const xss = require('xss');

const ItemsServices = {
  getItems(db, categoryId) {
    return db
      .from('instantpantry_item')
      .select('*')
      .where('instantpantry_item.category_id', categoryId);
  }
};

module.exports = ItemsServices;