import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {Favorite, ShoppingBasket} from "@material-ui/icons";

function Header(props) {

    const classes = useStyles();
    const history = useHistory();
    const loginComponent = props.login;

    const handleClickNavigation = (path) => {
        history.push(path);
    };

    return (
        <AppBar position="static" color='default'>
            <Toolbar>
                <Typography align='left' variant="h6" className={classes.title} data-testid='header-title'
                            onClick={() => handleClickNavigation()}>
                    Trueck
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                    <IconButton color='inherit' data-testid='header-wishes'>
                        <Favorite/>
                    </IconButton>
                </div>
                <div className={classes.sectionDesktop}>
                    <IconButton color='inherit' data-testid='header-shoppingCart'>
                        <ShoppingBasket/>
                    </IconButton>
                </div>
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
        cursor: 'pointer',
        textTransform: 'uppercase',
    },
    menuLink: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        textTransform: 'uppercase',
    },
}));

export default Header;