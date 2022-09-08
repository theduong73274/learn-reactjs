import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
};

function InputField(props) {
	const { form, name, label, disabled } = props;

	// , formState
	// const { errors } = form;
	const {
		formState: { errors },
	} = form;
	// formState.touched[name]
	const hasError = errors[name];
	// console.log(errors[name], formState.touched[name]);

	return (
		<Controller
			name={name}
			control={form.control}
			// as={TextField}
			render={({ onChange, onBlur, value, name }) => (
				<TextField
					// set Text Field
					margin="normal"
					variant="outlined"
					fullWidth
					label={label}
					disabled={disabled}
					error={!!hasError}
					helperText={errors[name]?.message}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}

export default InputField;
