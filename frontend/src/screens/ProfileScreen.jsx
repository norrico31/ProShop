import {useState, useEffect} from 'react'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getUserDetails, updateUserProfile} from '../store/actions/userActions'
import {listMyOrders} from '../store/actions/orderActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

export const ProfileScreen = ({location, history}) => {
    const [name, nameSet] = useState('')
    const [email, emailSet] = useState('')
    const [password, passwordSet] = useState('')
    const [confirmPassword, confirmPasswordSet] = useState('')
    const [message, messageSet] = useState(null)

    const dispatch = useDispatch()
    const {user, loading, error} = useSelector(state => state.userDetails)
    const {userInfo} = useSelector(({userLogin}) => userLogin)
    const {success} = useSelector(state => state.userUpdateProfile)
    const {orders, loading: loadingOrders, error: errorOrders} = useSelector(({orderListMy}) => orderListMy)
    
    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                nameSet(user.name)
                emailSet(user.email)
            }
        }
        
    }, [history, userInfo, dispatch, user])

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            messageSet('Passwords do not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                {success && <Message variant="success">Profile Updated</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => nameSet(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => emailSet(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => passwordSet(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={e => confirmPasswordSet(e.target.value)} />
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}} />)}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' style={{color: 'red'}} />)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                )}
            </Col>
        </Row>
    )
}
