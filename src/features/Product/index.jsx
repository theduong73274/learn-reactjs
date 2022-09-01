import { Box } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage/DetailPage';
import ListPage from './pages/ListPage/ListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
	// Nested Routing
	const match = useRouteMatch();

	return (
		<Box pt={4}>
			<Switch>
				<Route path={match.url} component={ListPage} exact />
				<Route path={`${match.url}/:productId`} component={DetailPage} />
			</Switch>
		</Box>
	);
}

export default ProductFeature;
