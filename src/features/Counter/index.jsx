import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 34,
		padding: '0 30px',
		margin: '10px 0 0 10px',
	},
});

CounterFeature.propTypes = {};

function CounterFeature(props) {
	const classes = useStyles();
	const count = useSelector((state) => state.count);
	const dispatch = useDispatch();

	const handleIncreaseClick = () => {
		// Action creator
		const action = increase('123');
		// console.log(action);
		dispatch(action);
	};

	const handleDecreaseClick = () => {
		// Action creator
		const action = decrease('456');
		// console.log(action);
		dispatch(action);
	};

	return (
		<div>
			Counter: {count}
			<div>
				<Button className={classes.root} onClick={handleIncreaseClick}>
					Increase
				</Button>
				<Button className={classes.root} onClick={handleDecreaseClick}>
					Decrease
				</Button>
			</div>
		</div>
	);
}

export default CounterFeature;
