import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {addToCart} from '../store/actions/cartActions'
import Message from '../components/Message'

export const CartScreen = ({match, location, history}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const {cartItems} = useSelector(({cart}) => cart)

    useEffect(() => {
        if (productId) dispatch(addToCart(productId, qty))
    }, [dispatch, productId, qty])
    const removeFromCart = id => {
        console.log(id, 'removed')
    }
    const checkOut = () => {
        history.push(`/login?redirect=shipping`)
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(cartItem => (
                            <ListGroup.Item key={cartItem.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={cartItem.image} alt={cartItem.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${cartItem.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={cartItem.qty} onChange={e => dispatch(addToCart(cartItem.product, Number(e.target.value)))}>
                                            {[...Array(cartItem.countInStock).keys()].map(val => (
                                                <option key={val + 1} value={val + 1}>
                                                    {val + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCart(cartItem.product)}>
                                            <i className='fas fa-trash' />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((total, currItem) => total + currItem.qty, 0)}) items</h2>
                            ${cartItems.reduce((total, currItem) => total + currItem.qty * currItem.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.lenght === 0} onClick={checkOut}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}