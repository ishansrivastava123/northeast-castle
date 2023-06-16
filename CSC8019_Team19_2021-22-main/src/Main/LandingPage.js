import React, { useState, useEffect } from 'react';
import '../App.css';
import './Styling.css';
import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { Grid, TextField } from '@material-ui/core';
import axios from "axios";
import { FetchCastleListUrl, FetchStationListUrl, FetchItenariesUrl } from './Url';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: '20vh',
  },
  form: {
    padding: '4vh',
    backgroundColor: 'PaleGoldenRod'
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#2e0106',
  '&:hover': {
    backgroundColor: '#6c0106',
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [castleList, setCastleList] = useState(null);
  const [stationList, setStationList] = useState(null);
  const [castleId, setCastleId] = useState(null);
  const [castleNameError, setCastleNameError] = useState(false);
  const [stationId, setStationId] = useState(null);
  const [stationNameError, setStationNameError] = useState(false);
  const [passengerNo, setPassengerNo] = useState(null);
  const [passengerNoError, setPassengerNoError] = useState(false);
  const [dateOfJourney, setDateOfJourney] = useState(new Date());
  const [dateOfJourneyError, setDateOfJourneyError] = useState(false);
  const [timeOfJourney, setTimeOfJourney] = useState(new Date());
  const [timeOfJourneyError, setTimeOfJourneyError] = useState(false);
  const handleCastleNameChange = (event) => {
    setCastleId(event.target.value);
    setCastleNameError(false);
  }
  const handleStationNameChange = (event) => {
    setStationId(event.target.value);
    setStationNameError(false);
  }
  const handlePassengerNoChange = (event) => {
    setPassengerNo(event.target.value);
    setPassengerNoError(false);
  }


  const handleSubmit = () => {
    if (validate()) {
      var bodyFormData = new FormData();
      bodyFormData.append("castleId", castleId);
      bodyFormData.append("stationId", stationId);
      bodyFormData.append("passengerNo", passengerNo);
      bodyFormData.append("dateOfJourney", dateOfJourney);
      bodyFormData.append("timeOfJourney", timeOfJourney);
      sessionStorage.setItem("dateOfJourney", dateOfJourney);
      axios.post(FetchItenariesUrl, bodyFormData).then(response => {
        navigate("/itinerarydetails/" + castleId + "/" + stationId + "/" + response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
    }
  };
  function validate() {
    let flag = true;
    if (castleId === "" || castleId === null) {
      setCastleNameError(true);
      flag = false;
    } else {
      setCastleNameError(false);
    }
    if (stationId === "" || stationId===null) {
      setStationNameError(true);
      flag = false;
    } else {
      setStationNameError(false);
    }
    if (passengerNo === "" || passengerNo===null) {
      setPassengerNoError(true);
      flag = false;
    } else {
      setPassengerNoError(false);
    }
    if (dateOfJourney.toLocaleDateString("en-UK") < new Date().toLocaleDateString("en-UK")) {
      setDateOfJourneyError(true);
      flag = false;
    } else {
      setDateOfJourneyError(false);
    }
    if ((dateOfJourney.toLocaleDateString("en-UK") === new Date().toLocaleDateString("en-UK"))
        && timeOfJourney < new Date()) {
      setTimeOfJourneyError(true);
      flag = false;
    } else {
      setTimeOfJourneyError(false);
    }
    if (flag) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    axios.get(FetchCastleListUrl).then((response) => {
      setCastleList(response.data)
    });
    axios.get(FetchStationListUrl).then((response) => {
      setStationList(response.data)
    });
  }, [])
  return (
    <div className='background background-home'>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid item xs={12}>
            <p className="tagStyle">Plan a fun day trip!!!</p>
          </Grid >
          <div className={classes.form}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <FormControl variant='outlined' fullWidth>
                  <InputLabel id="castleNameLabel">Select a Castle to Visit</InputLabel>
                  <Select
                    onChange={handleCastleNameChange}
                    label="Castle"
                    value={castleId}
                    name="castleName"
                    labelId="castleNameLabel"
                    error={castleNameError}
                    className='align-left'
                  >
                    {castleList !== null && castleList.map((castleVO) => (
                      <MenuItem value={castleVO.idEncrypted}>{castleVO.castleName}</MenuItem>
                    ))}
                  </Select>
                  {castleNameError && <FormHelperText style={{color:'red'}}>Please select a castle to visit</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className='mt-3' variant='outlined' fullWidth>
                  <InputLabel id="stationNameLabel">Select Pick-up Station</InputLabel>
                  <Select
                    onChange={handleStationNameChange}
                    label="Station"
                    value={stationId}
                    name="stationName"
                    labelId="stationNameLabel"
                    error={stationNameError}
                    helperText={stationNameError && 'Invalid Entry'}
                    className='align-left'
                  >
                    {stationList !== null && stationList.map((stationVO) => (
                      <MenuItem value={stationVO.idEncrypted}>{stationVO.stationName}</MenuItem>
                    ))}
                  </Select>
                  {stationNameError && <FormHelperText style={{color:'red'}}>Please select a pick-up station</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className='mt-3' variant='outlined' fullWidth>
                  <InputLabel id="passengerNoLabel">No of Passengers</InputLabel>
                  <Select
                    onChange={handlePassengerNoChange}
                    label="No of Passengers"
                    value={passengerNo}
                    name="passengerNo"
                    labelId="passengerNoLabel"
                    className='align-left'
                    error={passengerNoError}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  {passengerNoError && <FormHelperText style={{color:'red'}}>Please select no of passengers</FormHelperText>}
                </FormControl>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} md={6}>
                  <FormControl className='mt-3' variant='outlined' fullWidth>
                    <MobileDatePicker
                      label="Date of Journey"
                      value={dateOfJourney}
                      minDate={new Date()}
                      inputFormat="dd/MM/yyyy"
                      error={dateOfJourneyError}
                      onChange={(newValue) => {
                        setDateOfJourney(newValue);
                        setDateOfJourneyError(false);
                      }}
                      renderInput={(params) =>
                        <TextField variant='outlined'
                          InputLabelProps={{ shrink: true }} {...params} />
                      }
                    />
                    {dateOfJourneyError && <FormHelperText style={{color:'red'}}>Please select a valid date</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className='mt-3' variant='outlined' fullWidth>
                    <MobileTimePicker
                      label="Start Time"
                      value={timeOfJourney}
                      error={timeOfJourneyError}
                      onChange={(newValue) => {
                        setTimeOfJourney(newValue);
                        setTimeOfJourneyError(false);
                      }}
                      renderInput={(params) =>
                        <TextField variant='outlined'
                          InputLabelProps={{ shrink: true }} {...params} />
                      }
                    />
                  </FormControl>
                  {timeOfJourneyError && <FormHelperText style={{color:'red'}}>Please select a valid date & time</FormHelperText>}
                </Grid>
              </LocalizationProvider>
              <Grid className='mt-3' item xs={12} md={12}>
                <ColorButton onClick={handleSubmit} type="submit" variant="contained" color='secondary' endIcon={<PlayArrowIcon />}>
                  Fetch Itineraries
                </ColorButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;