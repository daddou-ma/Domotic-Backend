let mongoose = require("mongoose");
let User = require('../models/users.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index').server
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/POST user', () => {
      it('it should not POST a user without email field', (done) => {
        let user = {
            name: "Amine",
            password: 195254684
        }
            chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name').eql('ValidationError');
                
              done();
            });
      });
      it('it should POST a user ', (done) => {
        let user = {
            name: "Amine",
            email: "Amine@gmail.com",
            password: 195254684
        }
            chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User Added !');
              done();
            });
      });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
        let user = new User({
            name: "Amine",
            email: "Amine@gmail.com",
            password: 195254684
        });

        user.save((err, user) => {
            chai.request(server)
            .get('/users/' + user.id)
            .send(user)
            .end((err, res) => {
                
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('_id').eql(user.id);
              done();
            });
        });

      });
  });

   describe('/PUT/:id user', () => {
      it('it should UPDATE a user given the id', (done) => {
        let user = new User( {
            name: "Amine",
            email: "Amine@gmail.com",
            password: 195254684
        })
        user.save((err, user) => {
                chai.request(server)
                .put('/users/' + user.id)
                .send({name: "Taym", email: "test@gmail.com", password: 1950215466 })
                .end((err, res) => {
                    console.log(res.data);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User Edited !');
                  done();
                });
          });
      });
  });


  describe('/DELETE/:id user', () =>{
      it('it should DELETE a user given the id ', (done) => {
          let user = new User( {
            name: "Amine",
            email: "Amine@gmail.com",
            password: 195254684
          })
          user.save((err,user) => {
              chai.request(server)
              .del('/users/'+user._id)
              .end((err,res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('message').eql('User Deleted !');
                done();
              })
          });
      });
  });
});