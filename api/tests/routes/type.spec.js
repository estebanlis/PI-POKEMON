/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'admind',
  hp: 45,
  attack:45,
  defense:45,
  speed:45,
  height:30,
  weight:30,
};

/* xdescribe('Pokemon routes Type', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(async () => await Pokemon.sync({ force: true })
    .then(async() => await Pokemon.create(pokemon)));
  describe('GET /type', () => {
    it('should get 200', () =>
      agent.get('/type').expect(200)
    );
  });
}); */
