const app = require('../src/app');
const knex = require('knex');
const AuthService = require('../src/auth/auth-services');
const { hashPassword } = require('../src/user/user-services');
const { expect } = require('chai');

describe('App', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () =>
    db.raw(
      'TRUNCATE instantpantry_user, instantpantry_category, instantpantry_item RESTART IDENTITY CASCADE'
    )
  );

  afterEach('cleanup', () =>
    db.raw(
      'TRUNCATE instantpantry_user, instantpantry_category, instantpantry_item RESTART IDENTITY CASCADE'
    )
  );
  context('Given there is data in the database', () => {
    beforeEach('insert data', () => {
      return db
        .into('instantpantry_user')
        .insert({
          id: 1,
          username: 'test',
          name: 'test account',
          password:
            '$2a$04$QLem4thNGYMoQ2cVsUKUqOuXrdeElKblSRgVYuXcuydATdMAKkxFG',
        })
        .then(() => {
          return db.into('instantpantry_category').insert({
            id: 1,
            category_title: 'test category',
            user_id: 1,
          });
        })
        .then(() => {
          return db.into('instantpantry_item').insert({
            item_name: 'test item',
            amount: '3 grams',
            image: 'image.url',
            barcode: 'testbarcode',
            category_id: 1,
          });
        });
    });
    it('responds with 200 and all of the categories associated with user', () => {
      return supertest(app)
        .get('/api/category/1')
        .set(
          'Authorization',
          `bearer ${AuthService.createJWT('test', {
            username: 'test',
          })}`
        )
        .expect(200, [
          {
            id: 1,
            category_title: 'test category',
            user_id: 1,
          },
        ]);
    });
    it('responds with 200 and all of the items associated with the category id', () => {
      const testObj = {
        id: 1,
        item_name: 'test item',
        amount: '3 grams',
        image: 'image.url',
        barcode: 'testbarcode',
        category_id: 1,
      };
      return supertest(app)
        .get('/api/items/1')
        .set(
          'Authorization',
          `bearer ${AuthService.createJWT('test', {
            username: 'test',
          })}`
        )
        .expect((res) => {
          expect(res.body[0].id).to.eql(testObj.id);
          expect(res.body[0].item_name).to.eql(testObj.item_name);
          expect(res.body[0].amount).to.eql(testObj.amount);
          expect(res.body[0].image).to.eql(testObj.image);
          expect(res.body[0].barcode).to.eql(testObj.barcode);
          expect(res.body[0].category_id).to.eql(testObj.category_id);
        });
    });
  });
});