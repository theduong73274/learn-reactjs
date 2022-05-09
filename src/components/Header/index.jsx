import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Resgister';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

	menuButton: {
		marginRight: theme.spacing(2),
	},

	title: {
		flexGrow: 1,
	},

	link: {
		color: '#fff',
		textDecoration: 'none',
	},

	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
}));

const MODE = {
	LOGIN: 'login',
	REGISTER: 'register',
};

export default function Header() {
	const classes = useStyles();

	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.user.current);
	const isLoggedIn = !!loggedInUser.id;

	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState(MODE.LOGIN);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUserClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleLogOut = () => {
		dispatch(logout());
		setAnchorEl(null);
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<CodeIcon className={classes.menuButton} />

					<Typography variant="h6" className={classes.title}>
						<Link className={classes.link} to="/">
							GMarket
						</Link>
					</Typography>
					<NavLink className={classes.link} to="/todos">
						<Button color="inherit">Todos</Button>
					</NavLink>

					<NavLink className={classes.link} to="/albums">
						<Button color="inherit">Albums</Button>
					</NavLink>

					{!isLoggedIn && (
						<Button color="inherit" onClick={handleClickOpen}>
							Login
						</Button>
					)}

					{isLoggedIn && (
						<IconButton color="inherit" onClick={handleUserClick}>
							<AccountCircle />
						</IconButton>
					)}

					<Dialog
						disableEscapeKeyDown
						open={open}
						onClose={(_, reason) => {
							if (reason !== 'backdropClick') {
								handleClose();
							}
						}}
						aria-labelledby="form-dialog-title"
					>
						<IconButton className={classes.closeButton} onClick={handleClose}>
							<Close />
						</IconButton>

						<DialogContent>
							{mode === MODE.REGISTER && (
								<>
									<Register closeDialog={handleClose} />

									<Box textAlign="center">
										<Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
											Already have an account. Login here
										</Button>
									</Box>
								</>
							)}

							{mode === MODE.LOGIN && (
								<>
									<Login closeDialog={handleClose} />

									<Box textAlign="center">
										<Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
											Don't have an account. Register here
										</Button>
									</Box>
								</>
							)}
						</DialogContent>
					</Dialog>
				</Toolbar>
			</AppBar>

			<Menu
				keepMounted
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				getContentAnchorEl={null}
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}
			>
				<MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
				<MenuItem onClick={handleCloseMenu}>My account</MenuItem>
				<MenuItem onClick={handleLogOut}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
