import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	media: {
		height: '118px',
		width: '100%',
		marginBottom: theme.spacing(1),
	},

	thumbnail: {
		width:'100%',
		height:'100%',
		objectFit: 'cover'
	}
}));

ProductItem.propTypes = {
	product: PropTypes.object,
};

function ProductItem({ product }) {
	const classes = useStyles();
	const thumbnailUrl = product.thumbnail? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER

	return (
		<Box padding={1}>
			<Box className={classes.media}>
				<img className={classes.thumbnail}
				src={thumbnailUrl} 
				alt={product.name} 
				/>
			</Box>
			<Typography variant="body2">{product.name}</Typography>
			<Typography variant="body2">
				<Box component='span' fontSize='16px' fontWeight='bold' mr={1}>
					{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}
				</Box>
				{product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
			</Typography>
		</Box>
	);
}

export default ProductItem;
