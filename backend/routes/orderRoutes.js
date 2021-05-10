import express from 'express'
const router = express.Router()
import {addOrderItems, getOrderById, updateOrderToPaid} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').patch(protect, updateOrderToPaid) // make sure all the routes put in the bottom associate with params/getting an id

export default router