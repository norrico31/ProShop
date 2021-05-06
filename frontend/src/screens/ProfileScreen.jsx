import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getUserDetails} from '../store/actions/userActions'
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
    
    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
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
            // dispatch update profile
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
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
            </Col>
        </Row>
    )
}
