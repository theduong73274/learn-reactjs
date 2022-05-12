import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
	currentSort: PropTypes.string.isRequired,
	onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
	const handleSortChange = (event, newValue) => {
		if (onChange) onChange(newValue);
	};

	return (
		<Tabs
			value={currentSort}
			onChange={handleSortChange}
			indicatorColor="primary"
			textColor="primary"
			aria-label="disabled tabs example"
		>
			<Tab label="Giá thấp" value="salePrice:ASC" />
			<Tab label="Giá cao" value="salePrice:DESC" />
		</Tabs>
	);
}

export default ProductSort;
