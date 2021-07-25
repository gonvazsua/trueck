import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, Snackbar} from "@material-ui/core";
import {useRecoilState, useSetRecoilState} from "recoil";
import {loginDataAtom, loginStatusAtom} from "./loginDataAtom";
import {LoginResponse, signInWithEmailAndPassword} from "../../api/login/loginAPI";
import {useHistory} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import {getLoggedUser} from "../../api/user/userAPI";
import {User, userAtom} from "../../common/user/userAtom";
import {AxiosResponse} from "axios";
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

    const handleOnSubmit = async () => {
        try {
            const loginResponse: AxiosResponse<LoginResponse> = await signInWithEmailAndPassword(loginState.email, loginState.password);
            if(loginResponse.data) {
                setLoginStatusState(true);
                Cookies.set('XSRF-TOKEN', loginResponse.data.token);
                storeLoginDataOnLocalStorage();
                await loadLoggedUser();
                history.push('')
            } else {
                setLoginState({...loginState, incorrectLogin: true});
            }
        } catch (err) {
            setLoginState({...loginState, incorrectLogin: true});
        }
    };

    const storeLoginDataOnLocalStorage = () => {
        localStorage.setItem('trueck-email', loginState.email);
        localStorage.setItem('trueck-password', loginState.password);
    };

    const loadLoggedUser = async () => {
        const loggedUserResponse: AxiosResponse<User> = await getLoggedUser();
        setUserState(loggedUserResponse.data);
    };

    const handleOnSignUpClick = () => {
        history.push('signUp');
    };

    return (
        <Grid container spacing={3}>
            <Grid item lg={6}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" data-testid='login-title'>
                        Acceso
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
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
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputProps={{"data-testid": "login-passwordField"}}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChangePassword(event)}
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
                                    He olvidado mi contraseña
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" data-testid={'login-signUpLink'} onClick={() => handleOnSignUpClick()}>
                                    {"No tengo cuenta. Ir a registro"}
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
            </Grid>
        </Grid>
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