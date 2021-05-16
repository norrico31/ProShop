import express from 'express'
const router = express.Router()
import {authUser, getUserProfile, getUsersByAdmin, registerUser, updateUserProfile} from '../controllers/userController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsersByAdmin)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile)

export default router