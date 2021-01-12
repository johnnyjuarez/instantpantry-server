const xss = require('xss');

const ItemsServices = {
  getItems(db, categoryId) {
    return db
      .from('instantpantry_item')
      .select('*')
      .where('instantpantry_item.category_id', categoryId);
  },
  insertItems(db, newItem) {
    return db
      .insert(newItem)
      .into('instantpantry_item')
      .returning('*')
      .then(([item]) => item);
  }
};

module.exports = ItemsServices;