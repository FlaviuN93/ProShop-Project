import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../reducers/users/user.action';
import { USER_UPDATE_RESET } from '../reducers/users/user.types';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;
	const [userCredentials, setUserCredentials] = useState({
		name: '',
		email: '',
		isAdmin: false,
	});

	const { name, email, isAdmin } = userCredentials;
	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setUserCredentials({
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				});
			}
		}
	}, [dispatch, userId, user, successUpdate, history]);

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Display Name'
								value={name}
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										name: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										email: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Set admin'
								checked={isAdmin}
								onChange={(e) =>
									setUserCredentials({
										...userCredentials,
										isAdmin: e.target.checked,
									})
								}></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
