import { Button } from '@material-ui/core';
import Header from 'components/Header';
import ProductFeature from 'features/Product';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.css';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
	return (
		<div className="App">
			<Header />

			<Switch>
				<Redirect from="/home" to="/" exact></Redirect>
				<Redirect from="/post-list/:postId" to="/posts/:postId" exact></Redirect>

				<Route path="/" component={CounterFeature} exact />
				<Route path="/todos" component={TodoFeature} />
				<Route path="/albums" component={AlbumFeature} />
				<Route path="/products" component={ProductFeature} />

				<Route component={NotFound} />
			</Switch>
		</div>
	);
}

export default App;
