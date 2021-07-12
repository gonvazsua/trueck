import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core";

const HeaderUserData = () => {

    const classes = useStyles();
    const history = useHistory();

    const handleLoginClick = () => {
        history.push('login');
    };

    return (
        <FirebaseAuthConsumer>
            {({isSignedIn, user}) => {
                return isSignedIn
                    ? (
                        <Typography variant="h6" className={classes.title} data-testid='header-user-name'>
                            {user.displayName}
                        </Typography>
                    )
                    : (
                        <Button color="inherit" data-testid='header-loginButton' name="loginButton" onClick={handleLoginClick}>Login</Button>
                    )
            }}
        </FirebaseAuthConsumer>
    );

};

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
}));

export default HeaderUserData;