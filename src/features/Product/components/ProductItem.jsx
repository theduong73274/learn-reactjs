import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	media: {
		height: '118px',
		width: '100%',
		marginBottom: theme.spacing(1),
	},
}));

ProductItem.propTypes = {
	product: PropTypes.object,
};

function ProductItem({ product }) {
	const classes = useStyles();

	return (
		<Box padding={1}>
			{/* <Skeleton variant="rect" width="100%" height={118} /> */}
			<CardMedia
				className={classes.media}
				image="https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68"
				title="Contemplative Reptile"
			/>
			<Typography variant="body2">{product.name}</Typography>
			<Typography variant="body2">
				{product.salePrice} -{product.promotionPercent}
			</Typography>
		</Box>
	);
}

export default ProductItem;
