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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = AsyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProductByAdmin = AsyncHandler(async (req, res) => {
    const product = new Products({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProductByAdmin = AsyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Products.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Craete new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = AsyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Products.findById(req.params.id)

    if (product) {
       const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())
       if (alreadyReviewed) {
           res.status(400)
           throw new Error('Product already reviewed')
       }

       const review = {
           user: req.user._id,
           name: req.user.name,
           rating: Number(rating),
           comment
       }
       
       product.reviews.push(review);
       product.numReviews = product.reviews.length;
       product.rating = product.reviews.reduce((total, item) => item.rating + total, 0) / product.reviews.length;
       await product.save();
       res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProductByAdmin,
    updateProductByAdmin,
    createProductReview,
}