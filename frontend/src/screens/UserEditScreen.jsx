import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getUserDetails} from '../store/actions/userActions'
import {FormContainer} from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

export const UserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const [name, nameSet] = useState('')
    const [email, emailSet] = useState('')
    const [isAdmin, isAdminSet] = useState(false)

    const dispatch = useDispatch()
    const {user, loading, error} = useSelector(state => state.userDetails)
    
    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            nameSet(user.name)
            emailSet(user.email)
            isAdminSet(user.isAdmin)
        }
    }, [dispatch, user, userId])

    const submitHandler = e => {
        e.preventDefault()
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} onChange={e => nameSet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => emailSet(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox'label='Is Admin' checked={isAdmin} onChange={e => isAdminSet(e.target.checked)} />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )} 
            </FormContainer>
        </>
    )
}
