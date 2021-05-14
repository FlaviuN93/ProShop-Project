import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../reducers/users/user.action';
import FormContainer from '../components/FormContainer';
import { selectUserRegister } from '../reducers/users/user.selector';

const RegisterScreen = ({ location, history }) => {
	const [userCredentials, setUserCredentials] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [message, setMessage] = useState(null);

	const { name, email, password, confirmPassword } = userCredentials;
	const dispatch = useDispatch();
	const { loading, error, userInfo } = useSelector(selectUserRegister);

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	// const handleChange = (event) => {
	// 	const { name, value } = event.target;
	// 	console.log(name);
	// 	setUserCredentials({ ...userCredentials, [name]: value });
	// };

	const submitHandler = (event) => {
		event.preventDefault();
		// Dispatch Register
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Display Name'
						value={name}
						onChange={(e) =>
							setUserCredentials({ ...userCredentials, name: e.target.value })
						}></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) =>
							setUserCredentials({ ...userCredentials, email: e.target.value })
						}></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) =>
							setUserCredentials({
								...userCredentials,
								password: e.target.value,
							})
						}></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) =>
							setUserCredentials({
								...userCredentials,
								confirmPassword: e.target.value,
							})
						}></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Register
				</Button>
			</Form>
			<Row className='py-3'>
				<Col>
					Have an Account? <Link to={'/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
