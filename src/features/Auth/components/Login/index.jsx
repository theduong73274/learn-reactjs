import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
	const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();
	

	const handleLogin = async (values) => {
		try {

			const action = login(values);
			const user = await dispatch(action).unwrap();

            const {closeDialog} = props;
            if(closeDialog){
                closeDialog();
            }

			// Do something here on register successfully
            enqueueSnackbar('Login successfully!', { variant: 'success' });

			console.log('New user', user);
		} catch (err) {
			console.log('Error Failed Login: ', err.message);
            enqueueSnackbar(err.message, { variant: 'error'});
		}
	};

	return (
		<div>
			<LoginForm onSubmit={handleLogin} />
		</div>
	);
}

export default Login;
