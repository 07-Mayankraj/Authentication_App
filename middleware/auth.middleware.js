const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {

        const token = req.headers.authorization;
        let decoded = jwt.verify(token, 'auth');
        if (decoded) {
            req.body.userId = decoded.userId
            next()
        } else {
            res.status(401).send("Login again")
            
        }
    } catch (error) {
        res.status(401).send(error.message)
        
    }
}

module.exports = { auth }