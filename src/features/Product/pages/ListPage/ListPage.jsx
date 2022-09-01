import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import FilterViewer from 'features/Product/components/FilterViewer';
import ProductFilters from 'features/Product/components/ProductFilters';
import ProductList from 'features/Product/components/ProductList';
import ProductSkeleton from 'features/Product/components/ProductSkeleton';
import ProductSort from 'features/Product/components/ProductSort';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(4),
	},

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
	},
}));

ListPage.propTypes = {};

function ListPage(props) {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	// const queryParam = queryString.parse(location.search);
	const queryParam = useMemo(() => {
		const params = queryString.parse(location.search);
		// true --> "true"
		// { isPromotion: "true" }
		return {
			...params,
			_page: Number.parseInt(params._page) || 1,
			_limit: Number.parseInt(params._limit) || 9,
			_sort: params._sort || 'salePrice:ASC',
			isPromotion: params.isPromotion === 'true',
			isFreeShip: params.isFreeShip === 'true',
		};
	}, [location.search]);

	const [productList, setProductList] = useState([]);
	const [pagination, setPagination] = useState({
		limit: 9,
		total: 10,
		page: 1,
	});
	const [loading, setLoading] = useState(true);
	// const [filters, setFilters] = useState({
	// 	_page: 1,
	// 	_limit: 9,
	// 	_sort: 'salePrice:ASC',
	// });

	// const [filters, setFilters] = useState({
	// 	...queryParam,
	// 	_page: Number.parseInt(queryParam._page) || 1,
	// 	_limit: Number.parseInt(queryParam._limit) || 9,
	// 	_sort: queryParam._sort || 'salePrice:ASC',
	// });

	// Update URL
	// useEffect(() => {
	// 	// TODO: Sync filters to URL
	// 	history.push({
	// 		pathname: history.location.pathname,
	// 		search: queryString.stringify(filters),
	// 	});
	// }, [history, filters]);

	useEffect(() => {
		(async () => {
			try {
				const { data, pagination } = await productApi.getAll(queryParam);
				// filters
				console.log({ data, pagination });
				setProductList(data);
				setPagination(pagination);
			} catch (error) {
				console.log('Failed to get Product List', error);
			}

			setLoading(false);
		})();
	}, [queryParam]);
	// filters

	const handlePageChange = (e, page) => {
		// setFilters((prevFilters) => ({
		// 	...prevFilters,
		// 	_page: page,
		// }));

		// Filters sample URL Search
		const filters = {
			...queryParam,
			_page: page,
		};

		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(filters),
		});
	};

	const handleSortChange = (newSortValue) => {
		// setFilters((prevFilters) => ({
		// 	...prevFilters,
		// 	_sort: newSortValue,
		// }));

		// Filters sample URL Search
		const filters = {
			...queryParam,
			_sort: newSortValue,
		};

		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(filters),
		});
	};

	const handleFiltersChange = (newFilters) => {
		// setFilters((prevFilters) => ({
		// 	...prevFilters,
		// 	...newFilters,
		// }));

		// Filters sample URL Search
		const filters = {
			...queryParam,
			...newFilters,
		};

		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(filters),
		});
	};

	const setNewFilters = (newFilters) => {
		// setFilters(newFilters);

		// Filters sample URL Search
		history.push({
			pathname: history.location.pathname,
			search: queryString.stringify(newFilters),
		});
	};

	return (
		<div>
			<Box className={classes.root}>
				<Container>
					<Grid container spacing={1}>
						<Grid item className={classes.left}>
							<Paper elevation={0}>
								<ProductFilters filters={queryParam} onChange={handleFiltersChange} />
							</Paper>
						</Grid>

						<Grid item className={classes.right}>
							<Paper elevation={0}>
								<ProductSort currentSort={queryParam._sort} onChange={handleSortChange} />
								<FilterViewer filters={queryParam} onChange={setNewFilters} />

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
