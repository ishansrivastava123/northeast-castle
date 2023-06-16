import React, { useState, useEffect } from 'react';
import '../App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ItineraryCard from './ItineraryCard';
import CardMedia from '@mui/material/CardMedia';
import { FetchItinerariesListUrl, FetchCastleDetailsByIdUrl, FetchStationDetailsByIdUrl } from './Url';
import axios from "axios";
import { Grid } from '@material-ui/core';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from "@reach/router";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#2e0106',
  '&:hover': {
    backgroundColor: '#6c0106',
  },
}));

function ItineraryDetails(props) {
  const [itineraryDetails, setItineraryDetails] = useState(null);
  const [castleName, setCastleName] = useState(null);
  const [castleImage, setCastleImage] = useState(null);
  const [stationName, setStationName] = useState(null);
  useEffect(() => {
    axios.get(FetchItinerariesListUrl + props.itineraryIds).then((response) => {
      setItineraryDetails(response.data);
    });
    axios.get(FetchCastleDetailsByIdUrl + props.castleId).then((response) => {
      setCastleName(response.data.castleName);
      setCastleImage(response.data.imageUrl);
    });
    axios.get(FetchStationDetailsByIdUrl + props.stationId).then((response) => {
      setStationName(response.data.stationName);
    });
  }, [])
  return (
    <div className='background background-itinerary'>
      <Container sx={{ paddingTop: '12vh', paddingBottom: '5vh' }} component="main" maxWidth="lg">
        <CssBaseline />
        <Grid item xs={12}>
          <p className="itineraryHeader">Day Trip Itineraries For {castleName} From {stationName}</p>
          <CardMedia
            component="img"
            sx={{ height: '30vh', objectFit: 'fill', marginTop: '0vh', paddingTop: '0vh' }}
            image={castleImage}
            alt="alnwick"
          />
        </Grid >
        <div className='overflow-scroll' style={{ overflowY: 'auto' }}>
          {itineraryDetails !== null && itineraryDetails.map((itineraryVO, index) => (
            <ItineraryCard price={itineraryVO.totalPrice}
              number={index + 1}
              idEnc={itineraryVO.idEncrypted}
              duration={itineraryVO.duration}
              noOfPeople={itineraryVO.maxPeople}
              description={itineraryVO.itineraryDetails}
              />
          ))}
          {itineraryDetails === null &&
            <Grid item xs={12}>
              <Card sx={{ width: '100%', marginBottom: '2vh', backgroundColor: 'palegoldenrod' }}>
                <CardContent>
                  <NewReleasesRoundedIcon color='danger' sx={{ fontSize: '10vmax' }} />
                  <br></br>
                  <Typography variant="dark" className='itineraryHeader'>
                    Sorry!!! There are no itineraries available based on your preferences.
                  </Typography>
                  <br></br>
                  <Link to="/home">
                    <ColorButton type="submit" variant="contained" endIcon={<BackspaceIcon />}>
                      Go Back
                    </ColorButton>
                  </Link>
                </CardContent>
              </Card >
            </Grid >
          }
        </div >
      </Container>
    </div>
  );
}

export default ItineraryDetails;