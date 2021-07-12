import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {signOut} from "../Login/loginAPI";

const HeaderUserData = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const isLoggedInManually = props.isLoggedInManually;

    const handleLoginClick = () => {
        history.push('login');
    };

    const handleLogoutClick = () => {
        signOut().then(r => {
            history.push('login');
        });
    };

    const getLoggedUserInformation = (user) => {
        return (
            <div className={classes.userInformation}>
                <Typography variant="h6" className={classes.title} data-testid='header-user-name'>
                    {user?.displayName}
                </Typography>
                <Button color="secondary" data-testid='header-logoutButton'
                        name="loginButton" onClick={handleLogoutClick}>Logout</Button>
            </div>
        );
    }

    const getLoginButton = () => {
        return (
            <Button color="inherit" data-testid='header-loginButton' name="loginButton"
                    onClick={handleLoginClick}>Login</Button>
        );
    };

    return (
        <FirebaseAuthConsumer>
            {({isSignedIn, user}) => {
                return (isSignedIn || isLoggedInManually)
                    ? getLoggedUserInformation(user)
                    : getLoginButton();
            }}
        </FirebaseAuthConsumer>
    );

};

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
    userInformation: {
        display: 'flex',
    },
}));

export default HeaderUserData;