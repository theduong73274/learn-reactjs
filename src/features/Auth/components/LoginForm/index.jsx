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

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles()

    const schema = yup.object().shape({ 
        identifier: yup.string().required("Please enter your email.").email("Please enter a valid email address."),
        password: yup.string().required("Please enter your password.")
    });

    const form = useForm({
        defaultValues : {
            identifier: '',
            password: '',
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
                Sign In
           </Typography>

           <form onSubmit={form.handleSubmit(handleOnSubmit)}>
               <InputField name="identifier" label="Identifier" form={form}/>
               <PasswordField name="password" label="Password" form={form}/>

               <Button disabled={isSubmitting} type="submit" variant="contained" className={classes.submit} color="primary" fullWidth>
                   Sign in
                </Button>
           </form>

       </div>
    );
}

export default LoginForm;