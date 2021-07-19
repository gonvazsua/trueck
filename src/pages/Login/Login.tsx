import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, Snackbar} from "@material-ui/core";
import {useRecoilState, useSetRecoilState} from "recoil";
import {loginDataAtom, loginStatusAtom} from "./loginDataAtom";
import {LoginResponse, signInWithEmailAndPassword} from "./loginAPI";
import {useHistory} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import {getLoggedUser} from "../../api/user/userAPI";
import {User, userAtom} from "../../common/user/userAtom";
const Cookies = require('js-cookie');

const Login = (): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();
    const [loginState, setLoginState] = useRecoilState(loginDataAtom);
    const setLoginStatusState = useSetRecoilState(loginStatusAtom);
    const setUserState = useSetRecoilState(userAtom);

    const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, email: event.target.value});
    };

    const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, password: event.target.value});
    };

    const handleOnSubmit = () => {
        signInWithEmailAndPassword(loginState.email, loginState.password)
            .then((loginResponse: LoginResponse) => {
                setLoginStatusState(true);
                Cookies.set('XSRF-TOKEN', loginResponse.token);
                storeLoginDataOnLocalStorage();
                loadLoggedUser();
                history.push('')
            })
            .catch(() => {
                setLoginState({...loginState, incorrectLogin: true});
            });
    };

    const storeLoginDataOnLocalStorage = () => {
        if(loginState.rememberMe) {
            localStorage.setItem('trueck-email', loginState.email);
            localStorage.setItem('trueck-password', loginState.password);
            localStorage.setItem('trueck-rememberMe', String(loginState.rememberMe));
        }
    };

    const handleOnChangeRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, rememberMe: event.target.checked});
    };

    const loadLoggedUser = () => {
        getLoggedUser()
            .then((user: User) => {
                setUserState(user);
            });
    };

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5" data-testid='login-title'>
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    inputProps={{"data-testid": "login-emailField"}}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeEmail(event)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputProps={{"data-testid": "login-passwordField"}}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangePassword(event)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            data-testid={'login-rememberMe'}
                            value="remember"
                            color="primary"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangeRememberMe(event)}
                        />
                    }
                    label="Remember me"
                />
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    data-testid='login-submitButton'
                    className={classes.submit}
                    disabled={!loginState.email && !loginState.password}
                    id="login-submit-button"
                    onClick={() => handleOnSubmit()}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>

            <Snackbar open={loginState.incorrectLogin} autoHideDuration={3000}
                      data-testid={'login-loginIncorrectMessage'}>
                <Alert severity="error">
                    Email o contraseña incorrectos, por favor, inténtalo de nuevo
                </Alert>
            </Snackbar>

        </div>
    );

};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default Login;