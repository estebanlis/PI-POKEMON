/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { request } = require('../../src/app.js');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'admin',
  hp: 45,
  attack:45,
  defense:45,
  speed:45,
  height:30,
  weight:30,
};

describe('Pokemon routes', () => {
      before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      }));
      beforeEach(() => Pokemon.sync({ force: true })
        .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemon', () => {
    it('should get 200', () =>
       agent.get('/pokemon').expect(200)
       
    );
  });

  describe('POST /pokemon',() => {
    it('should return status 500 and corresponding text if any of mandatory parameters is not send',  () => {
      agent.post('/pokemon')
      .send({})
      .end(function(err,res){
         expect(res).to.have.status(500);
         done();
       })
      
    })
  })


});



