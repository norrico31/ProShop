import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {Product} from '../components/Product'
import {listProducts} from '../store/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

export const HomeScreen = () => {
    const productList = useSelector(function(state) {return state.productList})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
    } ,[dispatch])
    console.log(productList.products)
    return (
        <>
            <h1>Latest Products</h1>
            {productList.loading ? <Loader />: productList.error ? <h3><Message variant='danger'>{productList.error}</Message></h3> : <Row>
                {productList.products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                        <Product product={product} />
                    </Col>
                ))}
            </Row>} 
        </>
    )
}
