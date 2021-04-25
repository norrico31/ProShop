import {useState, useEffect} from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import {Product} from '../components/Product'

export const HomeScreen = () => {
    const [products, productsSet] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products')
            productsSet(res.data)
        }
        fetchProducts()
    } ,[])
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
