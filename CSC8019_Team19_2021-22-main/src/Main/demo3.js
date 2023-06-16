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
    const img1 = require('../img/banner111.jpg')
    const img2 = require('../img/banner222.jpg')
    const img3 = require('../img/banner333.jpg')
    const img4 = require('../img/banner444.jpg')
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
                        <CardHeader className={classes.castleCardHeader} title="Bamburgh Castle" titleTypographyProps={{ fontSize: '5vmin', fontFamily: 'Bangers' }} />
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

                        <Grid item xs={12} md={6}>Castle fee: <CurrencyPoundIcon sx={{ fontSize: '2.2vmin' }} />16</Grid>
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
                                <p>Bamburgh Castle is a castle on the northeast coast of England, by the village of Bamburgh in Northumberland. It is a Grade I listed building.</p>
                                <p>The site was originally the location of a Celtic Brittonic fort known as Din Guarie and may have been the capital of the kingdom of Bernicia from its foundation in c. 420 to 547. After passing between the Britons and the Anglo-Saxons three times, the fort came under Anglo-Saxon control in 590. The fort was destroyed by Vikings in 993, and the Normans later built a new castle on the site, which forms the core of the present one. After a revolt in 1095 supported by the castle's owner, it became the property of the English monarch.</p>
                                <p>In the 17th century, financial difficulties led to the castle deteriorating, but it was restored by various owners during the 18th and 19th centuries. It was finally bought by the Victorian era industrialist William Armstrong, who completed its restoration. The castle still belongs to the Armstrong family and is open to the public.</p>
                            </Grid>
                        </Grid>
                    </Box>

                    < Grid container spacing={0} className="des">
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Things to do" bordered={false} >
                                <p> Scrumptious food is an important part of your visit to Bamburgh Castle. Our beautiful new Clock Tower Tearoom and Tack Room Café uses the best fresh, local ingredients to offer a delicious selection of hot and cold food for you to enjoy inside or in our magnificent grounds. From freshly made sandwiches, hearty soups and tasty bakery wares, to delectable homemade cakes made to our traditional recipes, there’s plenty of outdoor seating areas for you to relax and take in the views while enjoying something delicious to eat.</p>
                                <p> We are a cash-free site so please remember payment is by card only.</p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} className="site-card-border-less-wrapper">
                            <Card title="Accessibility" bordered={false}>
                                <p>Forward parking along with a new shuttle service is available for those with mobility issues. Depending on your level of mobility visitors can access The Armstrong and Aviation Museum, The West Ward and The Art Gallery. Wheelchair users can also access the first five rooms on the State Room Tour including the spectacular Kings Hall. There is an audio visual presentation showing the areas they are unable to reach in a wheelchair.</p>
                                <p>Takeaway refreshments are available from our Tack Room Cafe to enjoy in the castle’s courtyard and outdoor spaces.</p>
                                <p>Disabled visitors are charged at a reduced rate of £11.40 to reflect that they are not able to access all areas of the staterooms, while their carers are given access free of charge.</p>
                                <p>To download our Access Statement click button below.</p>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default Demo1;