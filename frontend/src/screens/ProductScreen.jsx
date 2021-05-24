import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import {Rating} from '../components/Rating'
import { listProductDetails, createProductReview } from '../store/actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../store/constants/productConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'

export const ProductScreen = ({match, history}) => {
    const productId = match.params.id
    const [qty, qtySet] = useState(1)
    const [rating, ratingSet] = useState(0)
    const [comment, commentSet] = useState('')

    const dispatch = useDispatch()
    const {product, loading, error} = useSelector(state => state.productDetails)
    const {userInfo} = useSelector(({userLogin}) => userLogin) 
    const {success: successProductReview, loading: loadingProductReview, error: errorProductReview} = useSelector(function({productReviewCreate}){return productReviewCreate})

    useEffect(() => {
        if (successProductReview) {
            alert('Review submitted!')
            ratingSet(0)
            commentSet('')
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            })
        }
        dispatch(listProductDetails(productId))
    } ,[dispatch, productId, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${qty}`)
    }
    const submitHandler = e => {
        e.preventDefault()
        dispatch(createProductReview(productId, {rating, comment}))

    }
    return (
        <>
            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: ${product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={e => qtySet(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map(val => (
                                                            <option key={val + 1} value={val + 1}>
                                                                {val + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            {loadingProductReview && <Loader />}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>
                                            {review.name}
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </strong>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={e => ratingSet(Number(e.target.value))}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={e => commentSet(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='primary'>Submit</Button>
                                        </Form>
                                    ) : (
                                        <Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}
