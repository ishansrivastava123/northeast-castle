import React, { useState, useEffect } from 'react';
import '../App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CardHeader from '@mui/material/CardHeader';
import { FetchCastleListUrl } from './Url';
import { makeStyles } from '@material-ui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from "axios";
import "../demo1.css"
import { Carousel } from 'antd';
import { Card } from 'antd';
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
function Demo1() {
    const classes = useStyles();
    const [castleList, setCastleList] = useState(null);
    const img1 = require('../img/banner1111.jpg')
    const img2 = require('../img/banner2222.jpg')
    const img3 = require('../img/banner3333.jpg')
    const img4 = require('../img/banner4444.jpg')
    const contentStyle = {
        width: "100%",
        height: '500px',
    };
    useEffect(() => {
        axios.get(FetchCastleListUrl).then((response) => {
            setCastleList(response.data)
        });
    }, [])
    return (
        <div className='background background-info demo-cont'>

            <CssBaseline />
            <Container component="main" maxWidth="lg">
                <div className="banner">
                    <div className="layout">
                        <CardHeader className={classes.castleCardHeader} title="Barnard Castle" titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
                        <Carousel autoplay>
                            <div>
                                <img src={img1} style={contentStyle} />
                            </div>
                            <div>
                                <img src={img2} style={contentStyle} />
                            </div>
                            <div>
                                <img src={img3} style={contentStyle} />
                            </div>
                            <div>
                                <img src={img4} style={contentStyle} />
                            </div>
                        </Carousel>


                    </div>

                </div>
            </Container>
            <div className="cont">
                <Container component="main" >
                    <Grid container spacing={0} className="cont-nav">

                        <Grid item xs={12} md={6}>Castle fee: <CurrencyPoundIcon sx={{ fontSize: '2.2vmin' }} />7</Grid>
                        <Grid item xs={12} md={6} >Opening hours: 14:00～16:00</Grid>

                    </Grid>
                    <CardHeader className={classes.castleCardHeader} title="description" titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
                    <Box className={classes.paper} sx={{
                        backgroundColor: 'PaleGoldenRod',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '4vmin 10vmin'
                    }}>
                        <Grid container >

                            <Grid item xs={12} md={12}>
                                <p>Barnard Castle (locally [ˈbɑːnəd ˈkæsəl], BAH-nəd KASS-əl) is a market town on the north bank of the River Tees, in County Durham, Northern England. The town is named after and built around a medieval castle ruin. The town's Bowes Museum's has an 18th-century Silver Swan automaton exhibit and paintings by Goya and El Greco.</p>
                                <p>It sits on the opposite bank to Startforth and is 21 miles (34 km) south-west of the county town of Durham. Nearby towns include Bishop Auckland to the north-east, Darlington to the east and Richmond in North Yorkshire to the south-east. The largest employer is GlaxoSmithKline, with a manufacturing facility on the town's outskirts.</p>
                            </Grid>
                        </Grid>
                    </Box>

                    < Grid container spacing={0} className="des">
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Things to do" bordered={false} >
                                <p> Barnard Castle is situated in County Durham in the northeast of England, in a beautiful area known as Teesdale.</p>
                                <p>
                                    The town grew up around the Norman castle of the same name, and is affectionately known to locals as "Barney".
                                </p>
                                <p> Barnard Castle lies southwest of the City and county town of Durham, and west of Darlington, which is well known for its ground-breaking railway history.</p>
                                <p>Barnard Castle is an ideal starting point for visiting the Lake District.</p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Accessibility" bordered={false}>
                                <p>You don’t need to book your visit in advance, but you will always get the best price and guaranteed entry by booking online ahead of your visit. The prices shown here include an online discount. The admission price will be higher if you choose to pay on the day you visit.</p>
                                <p>You can book your advance ticket online up to 8.45am on the day you want to visit. Then, subject to availability, there will be walk up tickets available.</p>
                                <p>You are booking a day ticket and can arrive at any time within our opening hours, and stay for as long as you like.</p>
                                <p>You are booking a day ticket and can arrive at any time within our opening hours, and stay for as long as you like.</p>
                                <p>Some of our sites can get very busy, especially on Bank Holidays. Our busiest times are between 11am and 2pm, so if you prefer to visit at a quieter time you may wish to visit outside of these hours.</p>
                                <p>Your booking is for the site/event only and does not guarantee a car parking space, which may carry an additional charge.</p>
                                <p>If you are a Member and wish to book, your ticket will still be free. Please remember to bring your English Heritage membership card with you. Members are able to book tickets for those included in the membership only. Any additional bookings made will be chargeable on site.</p>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default Demo1;