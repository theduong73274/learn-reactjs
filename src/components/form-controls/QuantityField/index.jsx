import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
	root: {},

	box: {
		display: 'flex',
		flexFlow: 'row nowrap',
		alignItems: 'center',
		maxWidth: '180px',
	},
}));

function QuantityField(props) {
	const classes = useStyles();
	const { form, name, label, disabled } = props;

	const {
		formState: { errors },
		setValue,
	} = form;
	const hasError = !!errors[name];

	return (
		<FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
			<Typography>{label}</Typography>

			<Controller
				name={name}
				control={form.control}
				render={({ field: { onChange, onBlur, value, name } }) => (
					<Box className={classes.box}>
						<IconButton
							onClick={() => {
								setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
							}}
						>
							<RemoveCircleOutline />
						</IconButton>

						<OutlinedInput
							id={name}
							type="number"
							disabled={disabled}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
						/>

						<IconButton
							onClick={() => {
								setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1);
							}}
						>
							<AddCircleOutline />
						</IconButton>
					</Box>
				)}
			/>
			<FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
		</FormControl>
	);
}

export default QuantityField;
