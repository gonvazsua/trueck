import React from 'react';
import {AppBar, makeStyles, Toolbar} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Footer = (): JSX.Element => {

    const classes = useStyles();

    return (
        <AppBar position="static" color="default" className={classes.footer}>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        &copy; 2021 TRUECK
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer;

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: '5%'
    },
}));