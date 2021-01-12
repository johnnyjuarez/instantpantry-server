const xss = require('xss');

const CategoryServices = {
  getCategories(db, userId) {
    return db
      .from('instantpantry_category')
      .select('*')
      .where('instantpantry_category.user_id', userId);
  },
  insertCategory(db, newCategory) {
    return db
      .insert(newCategory)
      .into('instantpantry_category')
      .returning('*')
      .then(([category]) => category);
  },
  serializeCategory(category) {
    return {
      id: category.id,
      name: xss(category.category_title),
      user: category.user_id
    };
  },
  deleteCategory(db, categoryId) {
    return db('instantpantry_category')
      .where('instantpantry_category.id', categoryId)
      .delete();
  }
};

module.exports = CategoryServices;