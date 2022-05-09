import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
	const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();
	

	const handleRegister = async (values) => {
		try {
            // set auto useName = Email
            values.username = values.email;

			const action = register(values);
			const user = await dispatch(action).unwrap();

            const {closeDialog} = props;
            if(closeDialog){
                closeDialog();
            }

			// Do something here on register successfully
            enqueueSnackbar('Register successfully!', { variant: 'success' });

			console.log('New user', user);
		} catch (err) {
			// console.log('Error Failed: ', err.message);
            enqueueSnackbar(err.message, { variant: 'error'});
		}
	};

	return (
		<div>
			<RegisterForm onSubmit={handleRegister} />
		</div>
	);
}

export default Register;
