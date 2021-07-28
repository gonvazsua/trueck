import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles, Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {findByUsername, UserResponse} from "../../api/user/userAPI";
import {AxiosResponse} from "axios";
import {signUp} from "../../api/login/loginAPI";

const SignUp = (): JSX.Element => {

    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [usernameNotAvailable, setUsernameNotAvailable] = useState(false);
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleOnChangeFullName = (inputValue: string) => {
        setFullName(inputValue);
    };

    const handleOnChangeUsername = (inputValue: string) => {
        setUsername(inputValue);
    };

    const handleOnChangeEmail = (inputValue: string) => {
        setEmail(inputValue);
    };

    const handleOnChangePassword1 = (inputValue: string) => {
        setPassword(inputValue);
    };

    const handleOnChangePassword2 = (inputValue: string) => {
        setRepeatPassword(inputValue);
    };

    const handleOnClickSubmit = async () => {
        if (password !== repeatPassword) {
            setPasswordMismatch(true);
            return;
        }
        const usernameResponse: AxiosResponse<UserResponse> = await findByUsername(username);
        if (usernameResponse.status === 200 && usernameResponse.data.users.length > 0) {
            setUsernameNotAvailable(true);
            return;
        }
        const signUpResponse: AxiosResponse<void> = await signUp(fullName, username, email, password);
        if (signUpResponse.status === 200) {
            setSignUpSuccess(true);
            return;
        }
        setSignUpError(true);
    };

    return (
        <Grid container spacing={3} data-testid={'SignUp'}>
            <Grid item lg={6}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" data-testid='login-title'>
                        Registro
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Nombre completo"
                            name="fullName"
                            autoComplete="fullName"
                            autoFocus
                            inputProps={{"data-testid": "signup-fullNameField"}}
                            onChange={(event) => handleOnChangeFullName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Nombre de usuario"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            inputProps={{"data-testid": "signup-usernameField"}}
                            onChange={(event) => handleOnChangeUsername(event.target.value)}
                        />
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
                            inputProps={{"data-testid": "signup-emailField"}}
                            onChange={(event) => handleOnChangeEmail(event.target.value)}
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
                            inputProps={{"data-testid": "signup-passwordField"}}
                            onChange={(event) => handleOnChangePassword1(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Confirmar Contraseña"
                            type="password"
                            id="repeatPassword"
                            autoComplete="current-password"
                            inputProps={{"data-testid": "signup-repeatPasswordField"}}
                            onChange={(event) => handleOnChangePassword2(event.target.value)}
                        />
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            data-testid='signup-submitButton'
                            className={classes.submit}
                            id="login-submit-button"
                            disabled={!fullName && !email && !username && !password && !repeatPassword}
                            onClick={() => handleOnClickSubmit()}
                        >
                            CREAR CUENTA
                        </Button>
                    </form>

                    <Snackbar open={passwordMismatch} autoHideDuration={3000}
                              data-testid={'signup-passwordMismatch'}>
                        <Alert severity="error">
                            Las contraseñas introducidas no coinciden
                        </Alert>
                    </Snackbar>

                    <Snackbar open={usernameNotAvailable} autoHideDuration={3000}
                              data-testid={'signup-usernameNotAvailable'}>
                        <Alert severity="error">
                            El nombre de usuario seleccionado ya está en uso
                        </Alert>
                    </Snackbar>

                    <Snackbar open={signUpError} autoHideDuration={3000}
                              data-testid={'signup-error'}>
                        <Alert severity="error">
                            Ha ocurrido un problema durante el proceso de registro. Por favor, inténtalo de nuevo
                        </Alert>
                    </Snackbar>

                    <Snackbar open={signUpSuccess}
                              data-testid={'signup-success'}>
                        <Alert severity="success">
                            Se ha registrado correctamente. Ya puedes acceder desde la pantalla de Login
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

export default SignUp;