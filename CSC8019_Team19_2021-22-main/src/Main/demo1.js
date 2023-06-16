/**
  * @author: Guo You And Tianyang Chen
  * @desc: The component used in castle info for displaying specific details of a castle
*/
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

/**
  * @desc: Inline styling used for card component
*/
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
    const img1 = require('../img/banner1.jpg')
    const img2 = require('../img/banner2.jpg')
    const img3 = require('../img/banner3.jpg')
    const img4 = require('../img/banner4.jpg')
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
                    <CardHeader className={classes.castleCardHeader} title="Alnwick Castle" titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
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
            <div className="cont mb-0">
                <Container component="main" >
                    <Grid container spacing={0} className="cont-nav">

                        <Grid item xs={12} md={6}>Castle fee: <CurrencyPoundIcon sx={{fontSize:'2.2vmin'}} />19.5</Grid>
                        <Grid item xs={12} md={6} >Opening hours: 14:00～16:00</Grid>

                    </Grid>
                    <CardHeader className={classes.castleCardHeader} title="description" titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
                    <Box className={classes.paper}  sx={{
                            backgroundColor: 'PaleGoldenRod',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '4vmin 10vmin'
                        }}>
                        <Grid container >

                            <Grid item xs={12} md={12}>
                                <p>Alnwick Castle has over 950 years of history to discover, and the origins of the Castle date back to the Norman period. Since 1309, its story has been intertwined with that of the Percy family, a family with a history as illustrious as the castle’s own.</p>
                          <p>The second largest inhabited castle in the UK, Alnwick has served as a military outpost, a teaching college, a refuge for evacuees, a film set, and not least as a family home. Delve deeper into this extraordinary history and travel through the centuries of this living, evolving castle.</p>
                            </Grid>
                        </Grid>
                    </Box>

                    < Grid container spacing={0} className="des">
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Things to do" bordered={false} >
                                <p> As well as special events and performances, there are many exciting things to do at Alnwick Castle daily.</p>
                                <p>  Take a guided tour and learn about the history of Alnwick Castle or its use as a filming location, have a go at archery and test your abilities with a bow, or learn to fly a broomstick in the spot where Harry Potter first took flight.</p>
                                <p> With so much to see and do, there is something for everyone at Alnwick Castle. Times for daily events may vary.</p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Accessibility" bordered={false}>
                                <p>ALNWICK CASTLE IS A LARGE VISITOR ATTRACTION, COMPRISING A RANGE OF HISTORICAL BUILDINGS AND SWEEPING GROUNDS, INCLUDING AN INNER AND OUTER BAILEY AND ‘CAPABILITY’ BROWN LANDSCAPES.</p>
                                <p>UNFORTUNATELY, DUE TO THE HISTORIC NATURE OF THE CASTLE AND ITS GROUNDS, DISABLED ACCESS IS LIMITED IN SOME AREAS.</p>
                                <p>The grounds of the castle include a variety of surfaces including cobblestones, flagstones, grass, gravel and wood. These can be uneven and steep in places with a number of steps on The Gun Terrace.</p>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default Demo1;