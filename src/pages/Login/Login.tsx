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
import {useRecoilState} from "recoil";
import {loginAtom} from "./loginAtom";
import {signInWithEmailAndPassword} from "./loginAPI";
import {useHistory} from "react-router-dom";
import {Close} from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';


const Login = (): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();
    const [loginState, setLoginState] = useRecoilState(loginAtom);

    const handleOnChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, email: event.target.value});
    };

    const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, password: event.target.value});
    };

    const handleOnSubmit = () => {
        signInWithEmailAndPassword(loginState.email, loginState.password)
            .then(() => {
                setLoginState({...loginState, successLogin: true});
                history.push('')
            })
            .catch(() => {
                setLoginState({...loginState, incorrectLogin: true});
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
                    control={<Checkbox value="remember" color="primary"/>}
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

            <Snackbar open={loginState.incorrectLogin} autoHideDuration={3000} data-testid={'login-loginIncorrectMessage'}>
                <Alert severity="error">
                    Email o contraseña incorrectos, por favor, inténtalo de nuevo
                </Alert>
            </Snackbar>

            <Snackbar open={loginState.successLogin} autoHideDuration={3000} data-testid={'login-loginSuccessMessage'}>
                <Alert severity="success">
                    Login correcto. Ya puedes encontrar tu vestido más apropiado!
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