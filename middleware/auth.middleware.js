const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Invalid token'})
        }
        req.user = jwt.verify(token, process.env.JWT_ACCESS_KEY)

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: 'Unknown error'})
    }
}

module.exports = authMiddleware