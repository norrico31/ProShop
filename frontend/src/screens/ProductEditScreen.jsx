import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {listProductDetails, updateProductByAdmin} from '../store/actions/productActions'
import {FormContainer} from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ADMIN_PRODUCT_UPDATE_RESET } from '../store/constants/productConstants'

export const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id
    const [name, nameSet] = useState('')
    const [price, priceSet] = useState(0)
    const [image, imageSet] = useState('')
    const [brand, brandSet] = useState('')
    const [category, categorySet] = useState('')
    const [countInStock, countInStockSet] = useState(0)
    const [description, descriptionSet] = useState(0)

    const dispatch = useDispatch()
    const {product, loading, error} = useSelector(state => state.productDetails)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = useSelector(({adminUpdateProduct}) => adminUpdateProduct)

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: ADMIN_PRODUCT_UPDATE_RESET
            })
            history.push('/admin/productlist')
        } else {
            if (!product || !product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                nameSet(product.name)
                priceSet(product.price)
                imageSet(product.image)
                brandSet(product.brand)
                categorySet(product.category)
                countInStockSet(product.countInStock)
                descriptionSet(product.description)
            }
        }
    }, [dispatch, product, productId, history, successUpdate])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateProductByAdmin({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock, 
            description,
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate ? <Loader /> : errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => nameSet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' value={price} onChange={e => priceSet(Number(e.target.value))} />
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url' value={image} onChange={e => imageSet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={e => brandSet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={e => countInStockSet(Number(e.target.value))} />
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category} onChange={e => categorySet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter description' value={description} onChange={e => descriptionSet(e.target.value)} />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )} 
            </FormContainer>
        </>
    )
}
