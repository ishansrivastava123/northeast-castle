/**
  * @author: Joel George Panicker
  * @desc: The component which specifies the sign up page
*/
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@material-ui/core/Snackbar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Styling.css';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import validator from 'validator';
import axios from "axios";
import { SaveCustomerDetailsUrl } from './Url';
import { navigate } from "@reach/router";
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@mui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: '10vh',
    },
}));

function hasNumber(myString) {
    return (/\d/.test(myString) || /^\s*$/.test(myString));
}

function GrowTransition(props) {
    return <Grow {...props} />;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginPage() {
    const classes = useStyles();
    const [passwordError, setPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [surNameError, setSurNameError] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [emailSaveError, setEmailSaveError] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    /**
        * @author: Joel George Panicker
        * @desc: For Closing the Alert Dialog
    */
    const handleSnackClose = () => {
        setSnackOpen(false);
    };

     /**
        * @author: Joel George Panicker
        * @desc: For calling the method in backend for saving the details of customer
    */
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (validate(data)) {
            axios.post(SaveCustomerDetailsUrl, data).then(response => {
                if (response.data === null || response.data === "") {
                    setEmailSaveError(true);
                } else {
                    setSnackOpen(true);
                    setTimeout(() => {
                        localStorage.setItem("isLogin", true);
                        localStorage.setItem("customerId", response.data.idEncrypted);
                        localStorage.setItem("customerName", response.data.firstName);
                        navigate("/home");
                    }, 2000);
                }
            })
                .catch(error => {
                    localStorage.setItem("isLogin", false);
                    setSaveError(true);
                });
        }
    };

    function validate(data) {
        let flag = true;
        if (validator.isEmpty(data.get('firstName')) || hasNumber(data.get('firstName'))) {
            setFirstNameError(true);
            flag = false;
        } else {
            setFirstNameError(false);
        }
        if (validator.isEmpty(data.get('surName')) || hasNumber(data.get('surName'))) {
            setSurNameError(true);
            flag = false;
        } else {
            setSurNameError(false);
        }
        if (!validator.isStrongPassword(data.get('password')) || (data.get('password').length>15)) {
            setPasswordError(true);
            flag = false;
        } else {
            if (data.get('password') !== data.get('newpassword')) {
                alert(data.get('password').length)
                setNewPasswordError(true);
                flag = false;
            } else {
                setNewPasswordError(false);
            }
            setPasswordError(false);
        }
        if (!validator.isEmail(data.get('email'))) {
            setEmailError(true);
            flag = false;
        } else {
            setEmailError(false);
        }
        if (!validator.isMobilePhone(data.get('mobileNo'), 'en-GB')) {
            setMobileError(true);
            flag = false;
        } else {
            setMobileError(false);
        }
        if (flag) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className='background background-login'>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Box
                        sx={{
                            backgroundColor: 'PaleGoldenRod',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '2vmin 10vmin'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '8vmin', height: '8vmin' }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="firstName"
                                        autoFocus
                                        error={firstNameError}
                                        helperText={firstNameError && 'Enter a valid Name!!'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="surName"
                                        label="Sur Name"
                                        name="surName"
                                        autoComplete="surName"
                                        autoFocus
                                        error={surNameError}
                                        helperText={surNameError && 'Enter a valid Name!!'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Enter a valid Email!!'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mobileNo"
                                        label="Mobile Number"
                                        name="mobileNo"
                                        autoComplete="mobileNo"
                                        autoFocus
                                        error={mobileError}
                                        helperText={mobileError && 'Enter a valid Mobile No!!'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="New Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        error={passwordError}
                                        helperText={passwordError && 'Enter a valid Password!!'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="newpassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="newpassword"
                                        autoComplete="current-password"
                                        error={newPasswordError}
                                        helperText={newPasswordError && 'Passwords does not match!!'}
                                    />
                                </Grid>
                                <Grid item xs={12} className="align-left">
                                    <b><u>Password Requirements</u></b><ul>
                                        <li>Length must be between 8 and 15 characters</li>
                                        <li>Must contain at least one uppercase letter, lowercase letter, a number and a character</li>
                                    </ul>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 0, mb: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                    {saveError && <Typography style={{ color: 'red' }}>Unexpected Error Occurred While Saving!!!</Typography>}
                                    {emailSaveError && <Typography style={{ color: 'red' }}>Account with same Email Id already exists!!</Typography>}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            </Container >
            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} TransitionComponent={GrowTransition}>
                <Alert onClose={handleSnackClose} severity="success">
                    Registration Completed Successfully!!!
                </Alert>
            </Snackbar>
        </div >
    );
}

export default LoginPage;