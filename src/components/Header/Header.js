import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../common/user/userAtom";

function Header() {

    const classes = useStyles();
    const history = useHistory();
    const userState = useRecoilValue(userAtom);

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
                { !userState.isLogged &&
                    <Button color="inherit" data-testid='header-loginButton' name="loginButton" onClick={handleLoginClick}>Login</Button>
                }
                { userState.isLogged &&
                    <Typography variant="h6" className={classes.title} data-testid='header-user-name'>
                        {userState.displayName}
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