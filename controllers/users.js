let User = require('../models/users')


/**
 * Get All Users
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    User.find({}, function(err, users) {
        res.send(users)
    })
}

/**
 * Get User by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    res.send("Get a Only user !" + req.params.id)
}

/**
 * Create a User
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    
    let user = new User({name: '', email: '', password: 'password'});
    
    user.save(function (err) {
      if (err) {
          res.send({statusCode: 403, err})
      }
      res.send("User Created")
    })
}

/**
 * Update a User
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    res.send("Update a User !" + req.params.id)
}

/**
 * Delete User by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    res.send("Delete a User !" + req.params.id)
}

/**
 * Restore a deleted User by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    res.send("Restore a User !" + req.params.id)
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    restore
}