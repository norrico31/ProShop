import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {adminUserLists} from '../store/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

export const UserListScreen = () => {
    const dispatch = useDispatch()
    const {users, loading, error} = useSelector(state => state.adminUserList)

    useEffect(() => {
        dispatch(adminUserLists())
    }, [dispatch])

    const deleteUserHandler = userId => {
        console.log(userId)
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><Link to={`mailto:${user.email}`}>{user.email}</Link></td>
                                <td>{user.isAdmin ? (<i className='fas fa-check'  style={{color: 'green'}}/>) : (<i className='fas fa-times' style={{color:'red'}} />)}</td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(user._id)}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}   
        </>
    )
}
