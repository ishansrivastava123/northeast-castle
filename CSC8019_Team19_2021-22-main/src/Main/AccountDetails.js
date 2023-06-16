import React, { useState, useEffect } from 'react';
import '../App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Card, CardContent, Typography } from '@mui/material';
import { FetchCustomerDetailsByIdUrl, GetBookedItinerariesListByCustomerIdUrl, FetchBookingDetailsByIdUrl, SaveCustomerDetailsUrl } from './Url';
import axios from "axios";
import { Grid, Button, TextField } from '@material-ui/core';
import { MDBTable } from 'mdbreact';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Row, Col } from 'react-bootstrap';
import validator from 'validator';

const useStyles = makeStyles(() => ({
    firstColumn: {
        width: '30%',
        textAlign: 'left',
        paddingLeft: '10vh !important',
        fontWeight: 'bolder',
        fontFamily: 'Lobster',
        fontSize: '2.5vmin'
    },
    middleColumn: {
        width: '70%',
        textAlign: 'left',
        paddingLeft: '5vh',
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: '2vmin'
    },
    secondCol: {
        width: '60%',
        textAlign: 'left',
        paddingLeft: '5vh',
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: '2vmin'
    },
    thirdCol: {
        width: '20%',
        textAlign: 'left',
        paddingLeft: '5vh',
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: '2vmin'
    },
    headRow: {
        width: '25%',
        textAlign: 'left',
        paddingLeft: '5vh',
        fontFamily: 'Lobster',
        fontWeight: 'bolder',
        fontSize: '2.5vmin'
    },
    bodyRow: {
        width: '29%',
        textAlign: 'left',
        paddingLeft: '5vh',
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: '2vmin'
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#2e0106',
    '&:hover': {
        backgroundColor: '#6c0106',
    },
    padding: '0.5vmin 1vmin'
}));

function hasNumber(myString) {
    return (/\d/.test(myString) || /^\s*$/.test(myString));
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '60vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AccountDetails(props) {
    const classes = useStyles();
    const [email, setEmail] = useState(null);
    const [customerName, setCustomerName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [surName, setSurName] = useState(null);
    const [mobileNo, setMobileNo] = useState(null);
    const [bookedItinerariesList, setBookedItinerariesList] = useState(null);
    const [open, setOpen] = useState(false);
    const [castleName, setCastleName] = useState(false);
    const [castleRate, setCastleRate] = useState(false);
    const [routeDetails, setRouteDetails] = useState(false);
    const [routeRate, setRouteRate] = useState(false);
    const [routeTransport, setRouteTransport] = useState(false);
    const [returnDetails, setReturnDetails] = useState(false);
    const [returnRate, setReturnRate] = useState(false);
    const [returnTransport, setReturnTransport] = useState(false);
    const [dateOfTravel, setDateOfTravel] = useState(false);
    const [itineraryDetails, setItineraryDetails] = useState(false);
    const [editState, setEditState] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [surNameError, setSurNameError] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [saveMessage, setSaveMessage] = useState(false);
    const handleOpen = (idEncrypted) => {
        if (idEncrypted !== null) {
            axios.get(FetchBookingDetailsByIdUrl + idEncrypted).then((response) => {
                setCastleName(response.data.castleName);
                setCastleRate(response.data.castleRate);
                setRouteDetails(response.data.routeDetails);
                setRouteRate(response.data.routeRate);
                setRouteTransport(response.data.routeTransport);
                setReturnDetails(response.data.returnDetails);
                setReturnRate(response.data.returnRate);
                setReturnTransport(response.data.returnTransport);
                setDateOfTravel(response.data.dateOfTravel);
                setItineraryDetails(response.data.itineraryDetails);
            });
            setOpen(true);
        }
    };
    const handleClose = () => setOpen(false);
    const editCustomerDetails = () => {
        if (!editState) {
            setEditState(true);
        } else {
            setEditState(false);
        }
    }
    const saveCustomerDetails = () => {
        var bodyFormData = new FormData();
        bodyFormData.append("idEncrypted", props.customerId);
        bodyFormData.append("firstName", firstName);
        bodyFormData.append("surName", surName);
        bodyFormData.append("email", email);
        bodyFormData.append("mobileNo", mobileNo);
        bodyFormData.append("id", customerId);
        if (validate(bodyFormData)) {
            axios.post(SaveCustomerDetailsUrl, bodyFormData).then(response => {
                if (response.data === null || response.data === "") {
                } else {
                    setSaveMessage(true);
                    setEmail(response.data.email);
                    setCustomerName(response.data.firstName + " " + response.data.surName);
                    setSurName(response.data.surName);
                    setFirstName(response.data.firstName);
                    setMobileNo(response.data.mobileNo);
                    setCustomerId(response.data.id);
                    setEditState(false);
                }
            }).catch(error => {
                setSaveMessage(false);
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
        if (!validator.isEmail(data.get('email'))) {
            setEmailError(true);
            flag = false;
        } else {
            setEmailError(false);
        }
        if (!validator.isMobilePhone(data.get('mobileNo'),'en-GB')) {
            setMobileError(true);
            flag = false;
        } else {
            setMobileError(false);
        }
        if (flag) {
            return true;
        } else {
            setSaveMessage(false);
            return false;
        }
    }
    useEffect(() => {
        axios.get(FetchCustomerDetailsByIdUrl + props.customerId).then((response) => {
            setEmail(response.data.email);
            setCustomerName(response.data.firstName + " " + response.data.surName);
            setSurName(response.data.surName);
            setFirstName(response.data.firstName);
            setMobileNo(response.data.mobileNo);
            setCustomerId(response.data.id);
        });
        axios.get(GetBookedItinerariesListByCustomerIdUrl + props.customerId).then((response) => {
            setBookedItinerariesList(response.data);
        });
    }, [])
    return (
        <div className='background background-itinerary'>
            <Container sx={{ paddingTop: '8vh', paddingBottom: '5vh' }} component="main" maxWidth="lg">
                <CssBaseline />
                <Grid item xs={12} style={{ marginTop: '3vh' }}>
                    <Card sx={{ width: '100%', marginBottom: '2vh', backgroundColor: 'palegoldenrod' }}>
                        <CardContent>
                            <Row>
                                <Col xs={9} md={11}>
                                    <Typography variant="dark" className='itineraryHeader'>
                                        Profile Details
                                    </Typography>
                                </Col>
                                <Col xs={3} md={1}>
                                    {!editState && <a style={{ color: 'blue' }} onClick={() => { editCustomerDetails(); }}>[Edit]</a>}
                                    {editState && <a style={{ color: 'red' }} onClick={() => { editCustomerDetails(); }}>[Close]</a>}
                                </Col>
                            </Row>
                            <MDBTable striped bordered hover responsive scrollY maxHeight='30vh'>
                                <tbody>
                                    <tr>
                                        <td className={classes.firstColumn}>Full Name</td>
                                        {!editState && <td className={classes.middleColumn}>{customerName}</td>}
                                        {editState && <td className={classes.middleColumn}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                name="firstName"
                                                autoComplete="firstName"
                                                value={firstName}
                                                variant='outlined'
                                                style={{ width: '40%', marginTop: '0vh' }}
                                                onChange={(event) => { setFirstName(event.target.value); }}
                                                error={firstNameError}
                                                helperText={firstNameError && 'Enter a valid Name!!'}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="surName"
                                                label="Sur Name"
                                                name="surName"
                                                autoComplete="surName"
                                                value={surName}
                                                variant='outlined'
                                                style={{ width: '40%', marginTop: '0vh' }}
                                                onChange={(event) => { setSurName(event.target.value); }}
                                                error={surNameError}
                                                helperText={surNameError && 'Enter a valid Name!!'}
                                            />
                                        </td>}
                                    </tr>
                                    <tr>
                                        <td className={classes.firstColumn}>Email Id</td>
                                        {!editState && <td className={classes.middleColumn}>{email}</td>}
                                        {editState && <td className={classes.middleColumn}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="emailId"
                                                label="Email Id"
                                                name="emailId"
                                                autoComplete="emailId"
                                                value={email}
                                                onChange={(event) => { setEmail(event.target.value); }}
                                                variant='outlined'
                                                style={{ width: '40%', marginTop: '0vh' }}
                                                error={emailError}
                                                helperText={emailError && 'Enter a valid Email!!'}
                                            />
                                        </td>}
                                    </tr>
                                    <tr>
                                        <td className={classes.firstColumn}>Mobile Number</td>
                                        {!editState && <td className={classes.middleColumn}>{mobileNo}</td>}
                                        {editState && <td className={classes.middleColumn}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="mobileNo"
                                                label="Mobile Number"
                                                name="mobileNo"
                                                autoComplete="mobileNo"
                                                value={mobileNo}
                                                onChange={(event) => { setMobileNo(event.target.value); }}
                                                autoFocus
                                                variant='outlined'
                                                style={{ width: '40%', marginTop: '0vh' }}
                                                error={mobileError}
                                                helperText={mobileError && 'Enter a valid Mobile No!!'}
                                            />
                                        </td>}
                                    </tr>
                                    {editState &&
                                        <tr>
                                            <td colSpan={2} className="text-center">
                                                <Button onClick={() => saveCustomerDetails()}
                                                    variant="contained" color='primary'>Save</Button>
                                                {saveError && <Typography style={{ color: 'red' }}>Unexpected Error Occurred While Saving!!!</Typography>}
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </MDBTable>
                            {saveMessage && <Typography style={{ color: 'green' }}>Saved Successfully</Typography>}
                        </CardContent>
                    </Card >
                </Grid >
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', marginBottom: '2vh', backgroundColor: 'palegoldenrod' }}>
                        <CardContent>
                            <Typography variant="dark" className='itineraryHeader'>
                                Details of Previous Bookings
                            </Typography>
                            <MDBTable striped bordered hover responsive scrollY maxHeight='25vh'>
                                <thead>
                                    <tr>
                                        <td className={classes.headRow}>Castle Visited</td>
                                        <td className={classes.headRow}>Starting Station</td>
                                        <td className={classes.headRow}>Date of Journey</td>
                                        <td className={classes.headRow}></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookedItinerariesList !== null && bookedItinerariesList.map((bookedItinerariesVO) => (
                                        <tr>
                                            <td className={classes.bodyRow}>{bookedItinerariesVO.castleName}</td>
                                            <td className={classes.bodyRow}>{bookedItinerariesVO.startingStation}</td>
                                            <td className={classes.bodyRow}>{bookedItinerariesVO.dateOfTravelStr}</td>
                                            <td>
                                                <ColorButton onClick={() => handleOpen(bookedItinerariesVO.idEncrypted)}
                                                    variant="contained" color='secondary'>More Details</ColorButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </MDBTable>
                        </CardContent>
                    </Card >
                </Grid >
            </Container>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="accountDetailsModalHeader"
                aria-describedby="accountDetailsModalBody"
            >
                <Box sx={style}>
                    <Typography id="accountDetailsModalHeader" className='tagStyle' variant="h5" component="h2">
                        Booked Itineraries Details
                    </Typography>
                    <Typography id="accountDetailsModalBody" sx={{ mt: 2 }}>
                        <MDBTable striped bordered hover responsive scrollY maxHeight='60vh'>
                            <tbody>
                                <tr>
                                    <td className={classes.firstColumn}>Visiting Castle</td>
                                    <td className={classes.secondCol}>{castleName}</td>
                                    <td className={classes.thirdCol}> Price of entry : {castleRate}</td>
                                </tr>
                                <tr>
                                    <td className={classes.firstColumn}>Journey Details</td>
                                    <td className={classes.secondCol}>
                                        {routeDetails}<br />
                                        <span style={{ paddingLeft: '6vw', color: 'red' }}>{routeTransport}</span>
                                    </td>
                                    <td className={classes.thirdCol}> Price of journey : {routeRate}</td>
                                </tr>
                                <tr>
                                    <td className={classes.firstColumn}>Return Journey Details</td>
                                    <td className={classes.secondCol}>
                                        {returnDetails}<br />
                                        <span style={{ paddingLeft: '6vw', color: 'red' }}>{returnTransport}</span>
                                    </td>
                                    <td className={classes.thirdCol}> Price of journey : {returnRate}</td>
                                </tr>
                                <tr>
                                    <td className={classes.firstColumn}>Date of Travel</td>
                                    <td className={classes.middleColumn} colSpan={2}>{dateOfTravel}</td>
                                </tr>
                                <tr>
                                    <td className={classes.firstColumn}>Itinerary Details</td>
                                    <td className={classes.middleColumn} colSpan={2}>{itineraryDetails}</td>
                                </tr>
                            </tbody>
                        </MDBTable>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AccountDetails;