import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';


const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(4),
	},

	left: {
		width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`
	},

	right: {
		flex: '1 1 0',
        padding: theme.spacing(1.5),
	},

	pagination: {
		display: 'flex',
		flexFlow: 'row no-wrap',
		justifyContent: 'center',

		marginTop: '30px',
		paddingBottom: '20px',
	},
}));

function DetailPage(props) {
    const classes = useStyles();

    return (
       <Box className={classes.root}>
            <Container>
                <Paper>
                    <Grid container>
                        <Grid item className={classes.left}>
                            Thumbnail
                            <ProductThumbnail product={{}}/>
                        </Grid>

                        <Grid item className={classes.right}>
                            Product Info
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
       </Box>
    );
}

export default DetailPage;