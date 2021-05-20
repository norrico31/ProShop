import express from 'express'
const router = express.Router()
import {getProducts, getProductById, deleteProduct, createProductByAdmin, updateProductByAdmin} from '../controllers/productController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProductByAdmin)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).patch(protect, admin, updateProductByAdmin)

export default router