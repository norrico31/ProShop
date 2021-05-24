import express from 'express'
const router = express.Router()
import {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllOrdersByAdmin, updateOrderToDelivered} from '../controllers/orderController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrdersByAdmin)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').patch(protect, updateOrderToPaid) // make sure all the routes put in the bottom associate with params/getting an id
router.route('/:id/deliver').patch(protect, admin, updateOrderToDelivered) // make sure all the routes put in the bottom associate with params/getting an id

export default router