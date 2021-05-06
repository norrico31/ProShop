import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../store/actions/userActions'
import {FormContainer} from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

export const RegisterScreen = ({location, history}) => {
    const [name, nameSet] = useState('')
    const [email, emailSet] = useState('')
    const [password, passwordSet] = useState('')
    const [confirmPassword, confirmPasswordSet] = useState('')
    const [message, messageSet] = useState(null)

    const dispatch = useDispatch()
    const {userInfo, loading, error} = useSelector(state => state.userRegister)
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    useEffect(() => {
        if (userInfo) history.push(redirect)
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            messageSet('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
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
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link></Col>
            </Row>
        </FormContainer>
    )
}
