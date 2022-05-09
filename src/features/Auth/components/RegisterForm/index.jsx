import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const useStyles = makeStyles ((theme) => ({

    root: {
        position: "relative",
        padding: theme.spacing(4, 0, 1),
    },

    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },

    title: {
        textAlign: 'center',
        margin: theme.spacing(1, 0, 3, 0)
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    progress: {
        position: "absolute",
        top: theme.spacing(1),
        left: '0',
        right: '0'
    }
}));

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles()

    const schema = yup.object().shape({ 
        fullName: yup.string().required("Please enter your full name")
        .test('should has at least two words', "Please enter at least two words.", (value) => {
            return value.trim().split(' ').length >= 2;
        }),
        email: yup.string().required("Please enter your email.").email("Please enter a valid email address."),
        password: yup.string().required("Please enter your password.").min(6, 'Please enter at least 6 characters.'),
        retypePassword: yup.string().required("Please enter retype your Password.").oneOf([yup.ref('password')], ('Password does not match')),
    });

    const form = useForm({
        defaultValues : {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleOnSubmit = async (values) => {
        // console.log("Todo Form" , values);
        const {onSubmit} = props;
        if(onSubmit){
           await onSubmit(values);
        }

        // Reset Form
        // form.reset();
    }

    const {isSubmitting} = form.formState;

    return (
       <div className={classes.root}>
           {isSubmitting && <LinearProgress className={classes.progress} />}

           <Avatar className={classes.avatar}>
                <LockOutlined>
                </LockOutlined>
           </Avatar>

           <Typography component="h3" variant="h5" className={classes.title}>
                Create new account
           </Typography>

           <form onSubmit={form.handleSubmit(handleOnSubmit)}>
               <InputField name="fullName" label="Full name" form={form}/>
               <InputField name="email" label="Email" form={form}/>
               <PasswordField name="password" label="Password" form={form}/>
               <PasswordField name="retypePassword" label="Retype Password" form={form}/>

               <Button disabled={isSubmitting} type="submit" variant="contained" className={classes.submit} color="primary" fullWidth>
                   Create an account
                </Button>
           </form>

       </div>
    );
}

export default RegisterForm;