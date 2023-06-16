import * as React from 'react';
import Card from '@mui/material/Card';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CardContent from '@mui/material/CardContent';
import { Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import './Styling.css';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { navigate } from "@reach/router";
import axios from "axios";
import { BookItineraryUrl } from './Url';

const useStyles = makeStyles((theme) => ({
    castleCardHeader: {
        backgroundColor: 'PaleGoldenRod',
        textAlign: 'left',
    },
    castleCardActions: {
        backgroundColor: 'PaleGoldenRod',
        display: 'inline',
        textAlign: 'right',
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#2e0106',
    '&:hover': {
        backgroundColor: '#6c0106',
    },
}));

export default function ItineraryCard(props) {
    const bookItinerary = (event) => {
        if(localStorage.getItem("isLogin")) {
            var bodyFormData = new FormData();
            bodyFormData.append("itineraryId", props.idEnc);
            bodyFormData.append("customerId", localStorage.getItem("customerId"));
            bodyFormData.append("dateOfJourney", sessionStorage.getItem("dateOfJourney"));
            axios.post(BookItineraryUrl, bodyFormData).then(response => {
                navigate("/itineraryConfirmation/"+response.data.idEncrypted+"/"+localStorage.getItem("customerId"));
            })
        } else {
            navigate("/signin");
        }
    };
    const classes = useStyles();
    return (
        <Card sx={{ width: '100%', marginBottom: '2vh' }}>
            <CardContent className={classes.castleCardHeader}>
                <Row>
                    <Col style={{position: 'relative'}} xs="1" lg="1" className="align-left">
                        <p className='vertical-center'>#{props.number}</p>
                    </Col>
                    <Col xs="11" lg="11" className="align-left">
                        <Row className="itineraryCardHeader">
                            <Col xs="6" lg="4" className="align-left">
                                <p>Duration of the Trip : <span style={{ color: '#292865' }}>{props.duration}</span></p>
                            </Col>
                            <Col xs="6" lg="4" className="align-center">
                                <p>No of People : <span style={{ color: '#292865' }}>{props.noOfPeople}</span></p>
                            </Col>
                            <Col xs="12" lg="4" className="align-right">
                                <p>Total Estimated Price : <span style={{ color: '#292865' }}><CurrencyPoundIcon fontSize="small" />{props.price}</span></p>
                            </Col>
                        </Row>
                        <Row className="itineraryCardHeader">
                            <Col xs="12" lg="9" className="align-left">
                                <Typography variant="body2" color="text.dark">
                                    {props.description}
                                </Typography>
                            </Col>
                            <Col xs="12" lg="3" className="align-right">
                                <ColorButton type="submit" onClick={bookItinerary} variant="contained" color='secondary' endIcon={<PlayArrowIcon />}>
                                    Book this itinerary
                                </ColorButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardContent>
        </Card >
    );
}