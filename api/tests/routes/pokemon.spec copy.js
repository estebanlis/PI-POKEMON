/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
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
      beforeEach(async () => await conn.sync({ force: true })
       .then(async () => await Pokemon.create(pokemon)))

  describe('GET /pokemon', () => {
    it('should get 200', () =>
       agent.get('/pokemon').expect(200)
       
    )
  });



  
});

describe('Pokemon routes2', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(async () => await conn.sync({ force: true })
    );

    describe('POST hh /pokemon',() => {
      it('should return status 500 and corresponding text if any of mandatory parameters is not send',  () => {
        agent.post('/pokemon')
        .send({})
        .end(function(err,res){
          console.log(res.body)
           expect(res).to.have.status(500);
          
         })
        
      })
    });    

 describe('POST LL /pokemon',() => {
it('should return status 200 when create pokemon',  () => {
  agent.post('/pokemon')
  .send({
    name: 'henry',
    hp: 45,
    attack:45,
    defense:45,
    speed:45,
    height:30,
    weight:30,
  })
  .end(function(err,res){
    console.log(res.body)
     expect(res).to.have.status(200);
     
   })
  
})
}); 


});




