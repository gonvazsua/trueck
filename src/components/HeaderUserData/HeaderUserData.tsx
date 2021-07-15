import React from 'react';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {LoginResponse, signInWithEmailAndPassword, signOut} from "../../pages/Login/loginAPI";
import {useRecoilState} from "recoil";
import {loginAtom} from "../../pages/Login/loginAtom";

const Cookies = require('js-cookie');

const HeaderUserData = (): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();
    const [loginState, setLoginState] = useRecoilState(loginAtom);

    const doLogin = () => {
        signInWithEmailAndPassword(loginState.email, loginState.password)
            .then((loginResponse: LoginResponse) => {
                Cookies.set('XSRF-TOKEN', loginResponse.token);
                history.push('')
            })
            .catch(() => {
                resetLoginState();
            });
    };

    if (loginState.rememberMe) {
        doLogin();
    }

    const handleLoginClick = () => {
        history.push('login');
    };

    const resetLoginState = () => {
        setLoginState({
            email: '',
            password: '',
            rememberMe: false,
            incorrectLogin: false,
            loggedIn: false,
        });
    };

    const handleLogoutClick = () => {
        signOut().then(r => {
            resetLoginState();
            history.push('login');
        });
    };

    const renderGoToLoginButton = () => {
        return (
            <Button color="inherit" data-testid='header-loginButton' name="loginButton"
                    onClick={handleLoginClick}>Login</Button>
        )
    };

    const getLoggedUserInformation = () => {
        return (
            <div className={classes.userInformation}>
                {/*<Typography variant="h6" className={classes.title} data-testid='header-user-name'>*/}
                {/*    {user?.displayName}*/}
                {/*</Typography>*/}
                <Button color="secondary" variant='contained' data-testid='header-logoutButton'
                        name="loginButton" onClick={() => handleLogoutClick()}>Logout</Button>
            </div>
        );
    }

    return loginState.loggedIn
        ? getLoggedUserInformation()
        : renderGoToLoginButton();

};

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
        marginRight: '2rem',
    },
    userInformation: {
        display: 'flex',
    },
}));

export default HeaderUserData;