import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "@reach/router";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Styling.css';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import validator from 'validator';
import axios from "axios";
import { FetchLoginFormUrl } from './Url';
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
    paper: {
      paddingTop: '10vh',
    },
}));

function LoginPage() {
    const classes = useStyles();
    const [loginError, setLoginError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailLoginError, setEmailLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (!validator.isEmail(data.get('email'))) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
        }
        axios.post(FetchLoginFormUrl, data).then(response => {
            if(response.data.errorFlag === "N") {
                localStorage.setItem("isLogin",true);
                localStorage.setItem("customerId",response.data.idEncrypted);
                localStorage.setItem("customerName",response.data.firstName);
                navigate("/home");
            } else if(response.data.errorFlag === "E") {
                setEmailLoginError(true);
            } else if(response.data.errorFlag === "P") {
                setPasswordError(true);
            }
        })
        .catch(error => {
            localStorage.setItem("isLogin",false);
            setLoginError(true);
        });
    };

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
                            padding: '10vmin 30vmin'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '8vmin', height: '8vmin' }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={emailError}
                                helperText={emailError && 'Enter a valid Email!!'}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            {loginError && <Typography className='mb-3' style={{textAlign:'left', color:'red'}}>Invalid Login Attempt. Please Try Again!!!</Typography>}
                            {emailLoginError && <Typography className='mb-3' style={{textAlign:'left', color:'red'}}>An Account with this Email Id does not exist. Please Try Again!!!</Typography>}
                            {passwordError && <Typography className='mb-3' style={{textAlign:'left', color:'red'}}>Password does not match. Please Try Again!!!</Typography>}
                            <Grid container>
                                <Grid item>
                                    <Link to="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            </Container>
        </div>
    );
}

export default LoginPage;