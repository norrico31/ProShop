import express from 'express'
import AsyncHandler from 'express-async-handler'
import Products from '../model/productModel.js'
const router = express.Router()


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Products.find({})
        res.json(products)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', AsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
}))

export default router