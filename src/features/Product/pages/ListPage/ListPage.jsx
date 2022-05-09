import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import ProductSkeleton from 'features/Product/components/ProductSkeleton';
import ProductList from 'features/Product/components/ProductList';

const useStyles = makeStyles((theme) => ({
	root: {},

	left: {
		width: '250px',
	},

	right: {
		flex: '1 1 0',
	},
}));

ListPage.propTypes = {};

function ListPage(props) {
	const classes = useStyles();
	const [productList, setProductList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await productApi.getAll({
					_page: 1,
					_limit: 10,
				});
				// console.log({ data });
				setProductList(data);
			} catch (error) {
				console.log('Failed to get Product List', error);
			}

			setLoading(false);
		})();
	}, []);

	return (
		<div>
			<Box>
				<Container>
					<Grid container spacing={1}>
						<Grid item className={classes.left}>
							<Paper elevation={0}>Left List</Paper>
						</Grid>

						<Grid item className={classes.right}>
							<Paper elevation={0}>{loading ? <ProductSkeleton /> : <ProductList data={productList} />}</Paper>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
}

export default ListPage;
