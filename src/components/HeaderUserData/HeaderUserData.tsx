import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {LoginResponse, signInWithEmailAndPassword, signOut} from "../../api/login/loginAPI";
import {useRecoilState} from "recoil";
import {loginDataAtom, loginStatusAtom} from "../../pages/Login/loginDataAtom";
import {User, userAtom} from "../../common/user/userAtom";
import Typography from "@material-ui/core/Typography";
import {getLoggedUser} from "../../api/user/userAPI";
import {AxiosResponse} from "axios";

const Cookies = require('js-cookie');

const HeaderUserData = (): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();
    const [loginState, setLoginState] = useRecoilState(loginDataAtom);
    const [loginStatusState, setLoginStatusState] = useRecoilState(loginStatusAtom);
    const [userState, setUserState] = useRecoilState(userAtom);

    useEffect(() => {

        const loadLoggedUser = async () => {
            const loggedUserResponse: AxiosResponse<User> = await getLoggedUser();
            setUserState(loggedUserResponse.data);
        };

        const doLogin = async () => {
            try {
                const loginResponse: AxiosResponse<LoginResponse> = await signInWithEmailAndPassword(loginState.email, loginState.password);
                if(loginResponse.data) {
                    setLoginStatusState(true);
                    Cookies.set('XSRF-TOKEN', loginResponse.data.token);
                    await loadLoggedUser();
                    history.push('')
                } else {
                    resetLoginState();
                }
            } catch (err) {
                resetLoginState();
            }
        };

        if (!userState.id) {
            doLogin();
        }
    }, [])

    const handleLoginClick = () => {
        history.push('login');
    };

    const resetLoginState = () => {
        setLoginState({
            email: '',
            password: '',
            incorrectLogin: false,
        });
        setLoginStatusState(false);
        localStorage.clear();
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
                <Typography variant="subtitle1" className={classes.title} data-testid='header-user-name'>
                    {userState.fullName}
                </Typography>
                <Button color="secondary" variant='contained' data-testid='header-logoutButton'
                        name="loginButton" onClick={() => handleLogoutClick()}>Logout</Button>
            </div>
        );
    }

    return loginStatusState
        ? getLoggedUserInformation()
        : renderGoToLoginButton();

};

const useStyles = makeStyles(() => ({
    title: {
        marginTop: '0.3rem',
        marginRight: '2rem',
    },
    userInformation: {
        display: 'flex',
    },
}));

export default HeaderUserData;