import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

function Header(props) {

    const classes = useStyles();
    const loginComponent = props.login;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" data-testid='header-menuIcon'>
                    <MenuIcon />
                </IconButton>
                <Typography align='center' variant="h6" className={classes.title} data-testid='header-title'>
                    Trueck
                </Typography>
                {loginComponent}
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default Header;