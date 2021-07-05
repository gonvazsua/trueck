import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";

function Header(props) {

    const classes = useStyles();
    const history = useHistory();

    const handleLoginClick = () => {
        history.push('login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" data-testid='header-menuIcon'>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} data-testid='header-title'>
                    Trueck
                </Typography>
                { !props.isLoggedIn &&
                    <Button color="inherit" data-testid='header-loginButton' name="loginButton" onClick={handleLoginClick}>Login</Button>
                }
                { props.isLoggedIn &&
                    <Typography variant="h6" className={classes.title} data-testid='header-user-name'>
                        {props.name}
                    </Typography>
                }
            </Toolbar>
        </AppBar>
    );
}

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
}));

export default Header;