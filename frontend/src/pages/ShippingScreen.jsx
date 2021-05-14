import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../reducers/cart/cart.action';
import { shippingAddressFromCart } from '../reducers/cart/cart.selector';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
	const shippingAddress = useSelector(shippingAddressFromCart);
	const dispatch = useDispatch();

	const [shippingInfo, setShippingInfo] = useState({
		address: shippingAddress.address,
		city: shippingAddress.city,
		postalCode: shippingAddress.postalCode,
		country: shippingAddress.country,
	});
	const { address, city, postalCode, country } = shippingInfo;
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						required
						onChange={(e) =>
							setShippingInfo({ ...shippingInfo, address: e.target.value })
						}></Form.Control>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						required
						onChange={(e) =>
							setShippingInfo({ ...shippingInfo, city: e.target.value })
						}></Form.Control>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						required
						onChange={(e) =>
							setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
						}></Form.Control>
				</Form.Group>
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						required
						onChange={(e) =>
							setShippingInfo({ ...shippingInfo, country: e.target.value })
						}></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
