import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	listProductDetail,
	updateProduct,
} from '../reducers/products/products.action';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../reducers/products/products.types';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;
	const [productData, setProductData] = useState({
		name: '',
		price: 0,
		image: '',
		brand: '',
		category: '',
		countInStock: 0,
		description: '',
	});
	const { name, price, image, brand, category, countInStock, description } =
		productData;
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const productDetail = useSelector((state) => state.productDetail);
	const { loading, error, product } = productDetail;
	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

	useEffect(() => {
		if (success) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetail(productId));
			} else {
				setProductData({
					name: product.name,
					price: product.price,
					image: product.image,
					brand: product.brand,
					category: product.category,
					description: product.description,
					countInStock: product.countInStock,
				});
			}
		}
	}, [dispatch, productId, product, success, history]);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			const { data } = await axios.post('/api/upload', formData, config);
			setProductData({ ...productData, image: data });
			setUploading(false);
		} catch (err) {
			console.log(err);
			setUploading(false);
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				brand,
				image,
				category,
				description,
				countInStock,
			})
		);
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
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
									setProductData({
										...productData,
										name: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) =>
									setProductData({
										...productData,
										price: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(e) =>
									setProductData({
										...productData,
										image: e.target.value,
									})
								}></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={uploadFileHandler}></Form.File>
							{uploading && <Loader />}
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) =>
									setProductData({
										...productData,
										brand: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(e) =>
									setProductData({
										...productData,
										countInStock: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) =>
									setProductData({
										...productData,
										category: e.target.value,
									})
								}></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) =>
									setProductData({
										...productData,
										description: e.target.value,
									})
								}></Form.Control>
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

export default ProductEditScreen;
