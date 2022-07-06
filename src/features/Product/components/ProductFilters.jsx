import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
	filters: PropTypes.object.isRequired,
	onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
	const handleCategoryChange = (newCategoryId) => {
		console.log(newCategoryId);
		if (!onChange) return;
		const newFilters = {
			...filters,
			'category.id': newCategoryId,
		};

		onChange(newFilters);
	};

	const handleChange = (values) => {
		if (onChange) onChange(values);
	};

	return (
		<Box>
			<FilterByCategory onChange={handleCategoryChange} />
			<FilterByPrice onChange={handleChange} />
			<FilterByService filters={filters} onChange={handleChange} />
		</Box>
	);
}

export default ProductFilters;
