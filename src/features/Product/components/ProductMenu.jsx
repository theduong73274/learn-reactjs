import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexFlow: 'row nowrap',

		padding: '0',
		listStyle: 'none',

		'& > li': {
			padding: theme.spacing(2, 4),
		},

		'& > li > a': {
			color: theme.palette.grey[700],
		},

		'& > li > a.active': {
			color: theme.palette.primary.main,
			textDecoration: 'underline',
			fontWeight: '500',
		},
	},
}));

function ProductMenu(props) {
	const { url } = useRouteMatch();
	const classes = useStyles();

	return (
		<Box component="ul" className={classes.root}>
			<li>
				<Link component={NavLink} to={url} exact>
					Description
				</Link>
			</li>

			<li>
				<Link component={NavLink} to={`${url}/additional`} exact>
					Additional information
				</Link>
			</li>

			<li>
				<Link component={NavLink} to={`${url}/reviews`} exact>
					Reviews
				</Link>
			</li>
		</Box>
	);
}

export default ProductMenu;
