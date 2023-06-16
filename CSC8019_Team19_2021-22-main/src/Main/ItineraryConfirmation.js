import React, { useState, useEffect } from 'react';
import '../App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Card, CardContent, Typography } from '@mui/material';
import { FetchCustomerDetailsByIdUrl,FetchBookingDetailsByIdUrl } from './Url';
import axios from "axios";
import { Grid } from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MDBTable } from 'mdbreact';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    firstColumn: {
        width: '20%',
        textAlign:'left',
        paddingLeft:'5vh',
        fontWeight: 'bolder',
        fontFamily: 'Lobster',
        fontSize: '2.5vmin'
    },
    middleColumn: {
        width: '45%',
        textAlign:'left',
        paddingLeft:'5vh',
        fontFamily: 'Oswald',
        fontWeight: 'bolder',
        fontSize: '2vmin'
    },
    thirdColumn: {
        width: '35%',
        textAlign:'left',
        paddingLeft:'5vh',
        fontWeight: 'bolder',
        fontFamily: 'Oswald',
        fontSize: '2vmin'
    },
}));

function ItineraryConfirmation(props) {
    const classes = useStyles();
    const [email, setEmail] = useState(false);
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
    useEffect(() => {
        axios.get(FetchCustomerDetailsByIdUrl + props.customerId).then((response) => {
            setEmail(response.data.email);
        });
        axios.get(FetchBookingDetailsByIdUrl + props.bookingId).then((response) => {
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
    }, [])
    return (
        <div className='background background-itinerary'>
            <Container sx={{ paddingTop: '8vh', paddingBottom: '5vh' }} component="main" maxWidth="lg">
                <CssBaseline />
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', marginBottom: '2vh', backgroundColor: 'palegoldenrod' }}>
                        <CardContent>
                            <CheckCircleIcon color='success' sx={{ fontSize: '8vmax' }} />
                            <br></br>
                            <Typography variant="dark" className='itineraryHeader'>
                                This Itinerary is booked and details have been sent to the following email : {email}
                            </Typography>
                        </CardContent>
                    </Card >
                </Grid >
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', marginBottom: '2vh', backgroundColor: 'palegoldenrod' }}>
                        <CardContent>
                            <Typography variant="dark" className='itineraryHeader'>
                                Details of Booked Itinerary
                            </Typography>
                            <MDBTable striped bordered hover responsive scrollY maxHeight='40vh'>
                                <tbody>
                                    <tr>
                                        <td className={classes.firstColumn}>Visiting Castle</td>
                                        <td className={classes.middleColumn}>{castleName}</td>
                                        <td className={classes.thirdColumn}> Price of entry : {castleRate}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes.firstColumn}>Journey Details</td>
                                        <td className={classes.middleColumn}>
                                            {routeDetails}<br/>
                                            <span style={{paddingLeft:'6vw',color:'red'}}>{routeTransport}</span>
                                        </td>
                                        <td className={classes.thirdColumn}> Price of journey : {routeRate}</td>
                                    </tr>
                                    <tr>
                                        <td className={classes.firstColumn}>Return Journey Details</td>
                                        <td className={classes.middleColumn}>
                                            {returnDetails}<br/>
                                            <span style={{paddingLeft:'6vw',color:'red'}}>{returnTransport}</span>
                                        </td>
                                        <td className={classes.thirdColumn}> Price of journey : {returnRate}</td>
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
                        </CardContent>
                    </Card >
                </Grid >
            </Container>
        </div>
    );
}

export default ItineraryConfirmation;