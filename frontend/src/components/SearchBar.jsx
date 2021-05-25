import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

export const SearchBar = props => {
    const [keyword, keywordSet] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        if (keyword.trim()) return props.history.push(`/search/${keyword}`)
        return props.history.push('/')
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control type='text'  name='q' onChange={e => keywordSet(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5' />
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}
