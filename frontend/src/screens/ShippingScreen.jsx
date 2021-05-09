import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {FormContainer} from '../components/FormContainer'
import {saveShippingAddress} from '../store/actions/cartActions'

export const ShippingScreen = ({history}) => {
    const {shippingAddress} = useSelector(function({cart}){return cart})
    const dispatch = useDispatch()
    const [address, addressSet] = useState(shippingAddress.address ?? '')
    const [city, citySet] = useState(shippingAddress.city ?? '')
    const [postalCode, postalCodeSet] = useState(shippingAddress.postalCode ?? '')
    const [country, countrySet] = useState(shippingAddress.country ?? '')

    const submitHandler = e => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' required value={address} onChange={e => addressSet(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city' required value={city} onChange={e => citySet(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='postalcode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter postal code' required value={postalCode} onChange={e => postalCodeSet(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' required value={country} onChange={e => countrySet(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}
