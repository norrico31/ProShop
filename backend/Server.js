import express from 'express'
import path from 'path'
import colors from 'colors'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import productRouters from './routes/productRoutes.js'
import userController from './routes/userRoutes.js'
import orderController from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use('/api/products', productRouters)
app.use('/api/users', userController)
app.use('/api/orders', orderController)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}

// Middleware function
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold))