import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../store/actions/userActions'
import {FormContainer} from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

export const LoginScreen = ({location, history}) => {
    const [email, emailSet] = useState('')
    const [password, passwordSet] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const {userInfo, loading, error} = useSelector(state => state.userLogin)

    useEffect(() => {
        if (userInfo) history.push(redirect)
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => emailSet(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e => passwordSet(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
            </Row>
        </FormContainer>
    )
}
