import AsyncHandler from 'express-async-handler'
import Products from '../model/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Products.find({})
        res.json(products)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = AsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
}