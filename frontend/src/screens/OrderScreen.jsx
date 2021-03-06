import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails, payOrder, adminOrderDeliver} from '../store/actions/orderActions'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {ORDER_PAY_RESET, ADMIN_ORDER_DELIVER_RESET} from '../store/constants/orderConstants'

export const OrderScreen = ({match, history}) => {
    const [sdkReady, sdkReadySet] = useState(false)
    const orderId = match.params.id
    const dispatch = useDispatch()

    const {userInfo} = useSelector(function(state){return state.userLogin})
    const {order, error, loading} = useSelector(state => state.orderDetails)
    const {success: successPay, loading: loadingPay} = useSelector(({orderPay}) => orderPay)
    const {success: successDelivered, loading: loadingDelivered} = useSelector(({adminMarkOrderAsDelivered}) => adminMarkOrderAsDelivered)

    if (!loading) {
         // Calculate prices
        const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
        order.itemsPrice = addDecimals(order.orderItems.reduce((total, item) => total + item.price * item.qty, 0))
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get(`/api/config/paypal`)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                sdkReadySet(true)
            }
            document.body.appendChild(script)
        }

        if (!userInfo) return history.push('/login')

        if (!order || successPay || order._id !== orderId || successDelivered) {
            dispatch({type: ADMIN_ORDER_DELIVER_RESET})
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                sdkReadySet(true)
            } 
        }
    }, [dispatch, order, orderId, successPay, successDelivered, userInfo, history])

    
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(adminOrderDeliver(order._id))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <Link to={`mailto:${order.user.email}`}>{order.user.email}</Link></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                        )}
                                    </ListGroup>
                                )}
                                {loadingDelivered && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
