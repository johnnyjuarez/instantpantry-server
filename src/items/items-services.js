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
  },
  serializeItem(item) {
    return {
      id: item.id,
      item_name: xss(item.item_name),
      amount: xss(item.amount),
      image: xss(item.image),
      barcode: xss(item.barcode),
      category_id: item.category_id
    };
  },
  deleteItem(db, itemId) {
    return db('instantpantry_item')
      .where('instantpantry_item.id', itemId)
      .delete();
  },
  updateItem(db, itemId, newItem) {
    return db('instantpantry_item').where('instantpantry_item.id', itemId).update(newItem);
  }
};

// item_name TEXT NOT NULL,
// amount TEXT NOT NULL,
// image TEXT,
// barcode TEXT,
// category_id INTEGER REFERENCES instantpantry_category(id) ON DELETE CASCADE NOT NULL

module.exports = ItemsServices;