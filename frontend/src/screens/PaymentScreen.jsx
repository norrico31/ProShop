import {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {FormContainer} from '../components/FormContainer'
import {savePaymentMethod} from '../store/actions/cartActions'
import {CheckoutSteps} from '../components/CheckoutSteps'

export const PaymentScreen = ({history}) => {
    const {shippingAddress} = useSelector(function({cart}){return cart})
    const dispatch = useDispatch()

    if (!shippingAddress) history.push('/shipping')
    const [paymentMethod, paymentMethodSet] = useState('Paypal')
    
    const submitHandler = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio' label='Paypal or Credit Card' id='Paypal' name='paymentmethod' value='Paypal' checked onChange={e => paymentMethodSet(e.target.value)}></Form.Check>
                        {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentmethod' value='Stripe' onChange={e => paymentMethodSet(e.target.value)}></Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}
