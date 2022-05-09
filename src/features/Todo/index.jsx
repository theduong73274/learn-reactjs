import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
	// Nested Routing
	const match = useRouteMatch();
 
	return (
		<div>
			<h3>Todo Share UI</h3>

			<Switch>
				<Route path={match.path} component={ListPage} exact></Route>
				<Route path={`${match.path}/:postId`} component={DetailPage} exact></Route>

				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default TodoFeature;
