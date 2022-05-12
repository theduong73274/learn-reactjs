import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import ProductSkeleton from 'features/Product/components/ProductSkeleton';
import ProductList from 'features/Product/components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from 'features/Product/components/ProductSort';

const useStyles = makeStyles((theme) => ({
	root: {},

	left: {
		width: '250px',
	},

	right: {
		flex: '1 1 0',
	},

	pagination: {
		display: 'flex',
		flexFlow: 'row no-wrap',
		justifyContent: 'center',

		marginTop: '30px',
		paddingBottom: '20px',
	}
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
		_sort: 'salePrice:ASC'
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

	const handlePageChange = (e, page) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			_page: page,
		}));
	};

	const handleSortChange = (newSortValue) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			_sort: newSortValue,
		}));
	};

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
								<ProductSort  currentSort={filters._sort} onChange={handleSortChange}/>

								{loading ? <ProductSkeleton length={9} /> : <ProductList data={productList} />}

								<Box className={classes.pagination}>
									<Pagination
										count={Math.ceil(pagination.total / pagination.limit)}
										page={pagination.page}
										color="primary"
										onChange={handlePageChange}
									/>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
}

export default ListPage;
