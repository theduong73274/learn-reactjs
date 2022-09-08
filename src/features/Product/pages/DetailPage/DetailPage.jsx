import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import AddToCartForm from 'features/Product/components/AddToCartForm';
import useProductDetail from 'features/Product/components/hooks/useProductDetail';
import ProductAdditional from 'features/Product/components/ProductAdditional';
import ProductDescription from 'features/Product/components/ProductDescription';
import ProductInfo from 'features/Product/components/ProductInfo';
import ProductMenu from 'features/Product/components/ProductMenu';
import ProductReviews from 'features/Product/components/ProductReviews';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(4),
		paddingBottom: theme.spacing(3),
	},

	left: {
		width: '400px',
		padding: theme.spacing(1.5),
		borderRight: `1px solid ${theme.palette.grey[300]}`,
	},

	right: {
		flex: '1 1 0',
		padding: theme.spacing(1.5),
	},

	pagination: {
		display: 'flex',
		flexFlow: 'row no-wrap',
		justifyContent: 'center',

		marginTop: '30px',
		paddingBottom: '20px',
	},

	loading: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
	},
}));

function DetailPage() {
	const classes = useStyles();
	const {
		params: { productId },
		url,
	} = useRouteMatch();

	const { product, loading } = useProductDetail(productId);

	if (loading) {
		// TODO: Make this is beautiful
		return (
			<Box className={classes.loading}>
				<LinearProgress />
			</Box>
		);
	}

	const handleAddToCartSubmit = (formValues) => {
		console.log('Form Submit', formValues);
	};

	return (
		<Box className={classes.root}>
			<Container>
				<Paper>
					<Grid container>
						<Grid item className={classes.left}>
							<ProductThumbnail product={product} />
						</Grid>

						<Grid item className={classes.right}>
							<ProductInfo product={product} />

							<AddToCartForm onSubmit={handleAddToCartSubmit} />
						</Grid>
					</Grid>
				</Paper>

				<ProductMenu />

				<Switch>
					<Route exact path={url}>
						<ProductDescription product={product} />
					</Route>

					<Route path={`${url}/additional`} component={ProductAdditional} />

					<Route path={`${url}/reviews`} component={ProductReviews} />
				</Switch>
			</Container>
		</Box>
	);
}

export default DetailPage;
