import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import productRouters from './routes/productRoutes.js'
import userController from './routes/userRoutes.js'
import orderController from './routes/orderRoutes.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRouters)
app.use('/api/users', userController)
app.use('/api/orders', orderController)


// Middleware function
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold))