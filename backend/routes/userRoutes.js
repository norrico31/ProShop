import express from 'express'
const router = express.Router()
import {authUser, deleteUserByAdmin, getUserById, getUserProfile, getUsersByAdmin, registerUser, updateUserByAdmin, updateUserProfile} from '../controllers/userController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsersByAdmin)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).patch(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUserByAdmin).get(protect, admin, getUserById).patch(protect, admin, updateUserByAdmin)

export default router