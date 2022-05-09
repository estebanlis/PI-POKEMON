/* eslint-disable import/no-extraneous-dependencies */
const {expect} = require('chai');
const {Pokemon, conn} = require('../../src/db.js');
const session = require('supertest-session');
const request = require('supertest');
const app = require('../../src/app');

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




describe('Pokemon Routes', () => {

  before(() => conn.authenticate().catch((err) => { 
    console.error('Unable to connect to the database:', err);
  
  }));

  beforeEach(() => Pokemon.sync({force: true})
    .then(()=> Pokemon.create(pokemon)));
  
  
  describe('GET /pokemon', () => {
      it('should get 200', () => {
        return agent.get('/pokemon').expect(res => {
          expect(res.status).equal(200);
        });
      });
      it('should return status 200 and object {id,name,attack,iamge}',() => {
        return agent.get('/pokemon').expect( (res) => {
          
            expect(res.status).to.be.equal(200);
            expect(res.body[0]).to.be.include({
              id: '1B',
              name: 'admin',
              attack:45,
              image: 'https://i.ibb.co/qjnm6ZQ/img-pokemon-undef.png',
              
              });

        })
      })
      
    });

    describe('Pokemon by Name', () =>{
      it('/pokemon?name=admin', () => {
        return agent.get('/pokemon?name=admin').expect(res => {
          expect(res.body).to.be.include({
            id: '1B',
            name: 'admin',
            hp: 45,
            attack:45,
            defense:45,
            speed:45,
            height:30,
            weight:30,
            image: 'https://i.ibb.co/qjnm6ZQ/img-pokemon-undef.png',
  

          })
        })
      })
    });

    describe('Pokemon by ID', () =>{
      it('/pokemon/1B', () => {
        return agent.get('/pokemon/1B').expect(res => {
          expect(res.body).to.be.include({
            id: '1B',
            name: 'admin',
            hp: 45,
            attack:45,
            defense:45,
            speed:45,
            height:30,
            weight:30,
            image: 'https://i.ibb.co/qjnm6ZQ/img-pokemon-undef.png',
  

          })
        })
      })
    });

/*     describe('POST /pokemon', () =>{
      it('should return status 500 if sent object is empty', () => {
        return agent.post('/pokemon').send({})
        .expect((err, res) => {
          if(err){
            console.log(err);
           
          }else{
            expect(res.status).to.equal(500);
        

          }
          
        })
      })
    }); */


});







