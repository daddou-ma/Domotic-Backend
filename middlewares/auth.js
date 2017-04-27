let sessionHelper   = require('../helpers/sessions.helper')
let responseHelper  = require('../helpers/responses.helper')

let auth = function(req, res, next) {

    // check header or url parameters or post parameters for token
    let  token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['_token']
    
    if (!token) {
        responseHelper.errorHandler(res, __('session.noSession')) 
    }
    
    // verifies secret and checks exp
    sessionHelper.checkAuth(token)
    .then(function(doc) {
        /** if air authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

}

module.exports = {
	auth
}