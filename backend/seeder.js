import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import {connectDB} from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        // delete all data in Order, Product and User model
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        
        const sampleProducts = products.map(product => ({...product, user: adminUser}))
        await Product.insertMany(sampleProducts)
        console.log('Data Import'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        // delete all data in Order, Product and User model
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log('Data Destroy'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}