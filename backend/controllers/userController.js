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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = AsyncHandler(async (req, res) => {
   const {name, email, password} = req.body
   const userExist = await User.findOne({email})
   if (userExist) {
      res.status(400)
      throw new Error('User already exists')
   }
   const user = await User.create({
      name,
      email,
      password
   })
   if (user) {
      res.status(201).json({
         _id: user._id, 
         name: user.name, email:
         user.email, isAdmin: 
         user.isAdmin, 
         token: generateToken(user._id)
      })
   } else {
      res.status(400)
      throw new Error('Invalid user data')
   }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if (user) {
      res.json({
         _id: user._id, 
         name: user.name, 
         email: user.email, 
         isAdmin: user.isAdmin
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

// @desc    Update user profile
// @route   Patch /api/users/profile
// @access  Private
export const updateUserProfile = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
         user.password = req.body.password
      }
      const updatedUser = await user.save()
      res.json({
         _id: updatedUser._id, 
         name: updatedUser.name,
         email: updatedUser.email, 
         isAdmin: updatedUser.isAdmin, 
         token: generateToken(updatedUser._id)
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

// @desc    Get all users 
// @route   GET /api/users
// @access  Private/Admin
export const getUsersByAdmin = AsyncHandler(async (req, res) => {
   const users = await User.find({})
   res.json(users)
})

// @desc    Delete user by admin
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUserByAdmin = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id).select('-password')
   if (user) {
      res.json(user)
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})

// @desc    Update user profile by admin
// @route   Patch /api/users/:id
// @access  Private
export const updateUserByAdmin = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin
      const updatedUser = await user.save()
      res.json({
         _id: updatedUser._id, 
         name: updatedUser.name,
         email: updatedUser.email, 
         isAdmin: updatedUser.isAdmin, 
      })
   } else {
      res.status(404)
      throw new Error('User not found')
   }
})
