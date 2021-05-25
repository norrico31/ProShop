import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {Product} from '../components/Product'
import {listProducts} from '../store/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {ProductCarousel} from '../components/ProductCarousel'
import {Paginate} from '../components/Paginate'

export const HomeScreen = props => {
    const keyword = props.match.params.keyword
    const pageNumber = props.match.params.pageNumber || 1

    const {products, pages, page, loading, error} = useSelector(function(state) {return state.productList})

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    } ,[dispatch, keyword, pageNumber])
    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? <Loader />: error ? <h3><Message variant='danger'>{error}</Message></h3> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )} 
        </>
    )
}
