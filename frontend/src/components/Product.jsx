import { Card } from "react-bootstrap"
import { Rating } from "./Rating"


export const Product = props => {
    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <a href={`/product/${props.product._id}`}>
                    <Card.Img src={props.product.image} variant='top' />
                </a>
                <Card.Body>
                    <a href={`/product/${props.product._id}`}>
                        <Card.Title as='div'><strong>{props.product.name}</strong></Card.Title>
                    </a>
                    <Card.Text as='div'>
                        <Rating value={props.product.rating} text={`${props.product.numReviews} reviews`}/>
                    </Card.Text>
                    <Card.Text as='h3'>${props.product.price}</Card.Text>
                </Card.Body>
            </Card>
            {props.text && <span>{props.text}</span>}
        </>
    )
}
