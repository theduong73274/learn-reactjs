import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    // Nested Routing
    const match = useRouteMatch();

    return (
        <div>
            Product Feature
        <Switch>
            <Route path={match.url} component={ListPage} exact></Route>
        </Switch>
        </div>
    );
}

export default ProductFeature;