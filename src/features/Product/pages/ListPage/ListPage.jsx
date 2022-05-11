import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import ProductSkeleton from 'features/Product/components/ProductSkeleton';
import ProductList from 'features/Product/components/ProductList';
import { Pagination } from '@material-ui/lab';

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
	const [pagination, setPagination] = useState({
		limit: 9,
		total: 10,
		page: 1,
	});
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		_page: 1,
		_limit: 9,
	});

	useEffect(() => {
		(async () => {
			try {
				const { data, pagination } = await productApi.getAll(filters);
				console.log({ data, pagination });
				setProductList(data);
				setPagination(pagination);
			} catch (error) {
				console.log('Failed to get Product List', error);
			}

			setLoading(false);
		})();
	}, [filters]);

	const handlePageChange = (e , page) => {
		setFilters(prevFilters => ({
			...prevFilters,
			_page: page,
		}))
	}

	return (
		<div>
			<Box>
				<Container>
					<Grid container spacing={1}>
						<Grid item className={classes.left}>
							<Paper elevation={0}>Left List</Paper>
						</Grid>

						<Grid item className={classes.right}>
							<Paper elevation={0}>
								{loading ? <ProductSkeleton length={9} /> : <ProductList data={productList} />}

								<Pagination 
								count={Math.ceil(pagination.total / pagination.limit) } 
								page={pagination.page} 
								color="primary"
								onChange={handlePageChange} />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
}

export default ListPage;
