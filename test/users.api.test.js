let mongoose = require("mongoose")
let User = require('../models/users.model')
let session = require('../helpers/sessions.helper')
let server  = require('../index').server
let lang    = require('../commons/lang')

let chai    = require('chai');
let chaiHttp = require('chai-http');
let should  = chai.should()

chai.use(chaiHttp);

let _token = ""

describe('Users API', () => {
    
    beforeEach((done) => {
        
        User.remove({})
        .then((docs) => { 
            let userObj = {
                name: "user",
                email: "email@test.com",
                password: "password"
            }
            let user = new User(userObj)

            user.save()
            .then((user) => {
                session.auth(user.email, user.password)
                .then(function(token) {
                    _token = token
                    done()
                })
                .catch()
            })
            .catch()
        })
        .catch()
    })
    
    describe('/GET All user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/users')
            .send({token: _token})
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(1)
                done()
            })
        })
    })

    describe('/POST user', () => {
        it('it should not POST a user without name field', (done) => {
            
            let user = {
                email: "Amine@gmail.com",
                password: "password",
                token   : _token
            }
            
            chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('errors')
                res.body.errors.should.have.property('name').eql('ValidationError')
                done()
            })
        })
        it('it should not POST a user without email field', (done) => {
            
            let user = {
                name    : "Amine",
                password: "password",
                token   : _token
            }
            
            chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('errors')
                res.body.errors.should.have.property('name').eql('ValidationError')
                done()
            })
        })
        it('it should not POST a user without password field', (done) => {
            
            let user = {
                name    : "Amine",
                email: "Amine@gmail.com",
                token   : _token
            }
            
            chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('errors')
                res.body.errors.should.have.property('name').eql('ValidationError')
                done()
            })
        })
      
        it('it should POST a user ', (done) => {
            
            let user = {
                name: "Amine",
                email: "Amine@gmail.com",
                password: "password",
                token   : _token
            }
            
            chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql(lang.__('user.created'))
                done()
            })
        })
    })
    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            
            let user = new User({
                name: "Amine",
                email: "Amine@gmail.com",
                password: "password",
                token   : _token
            });

            user.save()
            .then((user) => {
                chai.request(server)
                .get('/users/' + user.id)
                .send(user)
                .end((err, res) => {

                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('name')
                    res.body.should.have.property('email')
                    res.body.should.have.property('_id').eql(user.id)
                    done()
                })
            })
            .catch()
        })
    })

    describe('/PUT/:id user', () => {
        it('it should UPDATE a user given the id', (done) => {
            
            let user = new User( {
                name: "Amine",
                email: "Amine@gmail.com",
                password: "password",
                token   : _token
            })
            
            user.save()
            .then((user) => {
                chai.request(server)
                .put('/users/' + user.id)
                .send({name: "Taym", email: "test@gmail.com", password: 1950215466, token: _token})
                .end((err, res) => {
                    console.log(res.data)
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql(lang.__('user.updated'))
                    done()
                })
            })
            .catch()
        })
    })


    describe('/DELETE/:id user', () =>{
        it('it should DELETE a user given the id ', (done) => {
            
            let user = new User( {
                name: "Amine",
                email: "Amine@gmail.com",
                password: 195254684,
                token   : _token
            })
            
            user.save()
            .then((user) => {
                chai.request(server)
                .del('/users/'+user._id)
                .send({token: _token})
                .end((err,res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql(lang.__('user.deleted'))
                    done()
                })
            })
            .catch()
        })
    })
    
    describe('/:id/RESTORE user', () =>{
        it('it should RESTORE a user given the id ', (done) => {
            
            let user = new User( {
                name: "Amine",
                email: "Amine@gmail.com",
                password: 195254684,
                token   : _token
            })
            
            user.save()
            .then((user) => {
                chai.request(server)
                .get('/users/' + user._id + '/restore')
                .send({token: _token})
                .end((err,res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql(lang.__('user.restored'))
                    done()
                })
            })
            .catch()
        })
    })
})