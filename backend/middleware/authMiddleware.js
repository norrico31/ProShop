import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password') // not include the password from the model(database)
            next()
        } catch (error) {
            return res.status(401).json({message: error.message})
        }
    }
    if (!token) {
        res.status(401).json({message: 'Not authorized, no token'})
        return
    }   
}

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        res.json({message: 'Not authorized as an admin'})
    }
}

export {
    protect,
    admin
}