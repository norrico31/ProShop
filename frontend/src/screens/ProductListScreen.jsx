import {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {listProducts, deleteProductByAdmin, createProductByAdmin} from '../store/actions/productActions'
import {ADMIN_PRODUCT_CREATE_RESET} from '../store/constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Paginate} from '../components/Paginate'

export const ProductListScreen = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()
    const {error, loading, products, pages, page} = useSelector(state => state.productList)
    const {success: successDelete, loading: loadingDelete, error: errorDelete} = useSelector(function(state){return state.adminDeleteProduct})
    const {success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct} = useSelector(state => state.adminCreateProduct)
    const {userInfo} = useSelector(({userLogin}) => userLogin)

    useEffect(() => {
        dispatch({
            type: ADMIN_PRODUCT_CREATE_RESET
        })
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, createdProduct, pageNumber])

    const createProductHandler = () => {
        dispatch(createProductByAdmin())
    }

    const deleteUserHandler = userId => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProductByAdmin(userId))
        }
    }
    return (
        <>
            <Row className='aligh-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}><i className='fas fa-plus'/> Create Product</Button>
                </Col>
            </Row>
            {loadingCreate ? <Loader /> : errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit' />
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(product._id)}>
                                            <i className='fas fa-trash' />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}   
        </>
    )
}
