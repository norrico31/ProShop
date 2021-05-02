import AsyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import {generateToken} from '../utils/generateToken.js'

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
export const authUser = AsyncHandler(async (req, res) => {
   const {email, password} = req.body
   const user = await User.findOne({email})
   if (user && (await user.matchPassword(password))) {
      res.json({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id)})
   } else {
      res.status(401)
      throw new Error('Invalid email or password')
   }
})