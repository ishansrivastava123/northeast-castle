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
    const img1 = require('../img/banner11.jpg')
    const img2 = require('../img/banner22.jpg')
    const img3 = require('../img/banner33.jpg')
    const img4 = require('../img/banner44.jpg')
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
                        <CardHeader className={classes.castleCardHeader} title="Auckland Castle" titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
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

                        <Grid item xs={12} md={6}>Castle fee: <CurrencyPoundIcon sx={{ fontSize: '2.2vmin' }} />14</Grid>
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
                                <p>Auckland Castle, which is also known as Auckland Palace and to people that live locally as the Bishop's Castle or Bishop's Palace, is located in the town of Bishop Auckland in County Durham, England. In 1832, this castle replaced Durham Castle as the official residence of the Bishops of Durham.[1] It is now a tourist attraction, but still houses the Bishop's offices; the Castle is a Grade I listed building.</p>

                            </Grid>
                        </Grid>
                    </Box>

                    < Grid container spacing={0} className="des">
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Things to do" bordered={false} >
                                <p>The Auckland Project is a regeneration charity working to establish Bishop Auckland as a heritage visitor destination. We provide days out that feed the minds, bodies and spirits of both our visitors and local communities. Through historic attractions, galleries, nature, food, events and stays, The Auckland Project brings the rich and surprising story of Bishop Auckland to life for tourists. And in turn, the profits and opportunities created by our historic attractions and community engagement work, will help us create a bright future for this forgotten, post-industrial town.</p>

                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Accessibility" bordered={false}>
                                <p>We want as many people as possible to experience this wonderful part of the world, so areas have been redeveloped for maximum accessibility. The Castle, Mining Art Gallery and Spanish Gallery are accessible to wheelchairs.</p>
                                <p>Unfortunately, the Walled Garden is not accessible to wheelchairs yet. We are working with the designers for the Upper Walled Garden to ensure a lift is in place, and we look forward to welcoming everyone to the Garden when that section is finished.</p>
                                <p>If you would like to talk to us about your specific requirements before visiting, please get in touch.</p>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default Demo1;