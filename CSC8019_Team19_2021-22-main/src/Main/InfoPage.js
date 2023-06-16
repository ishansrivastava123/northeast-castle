import React, { useState, useEffect } from 'react';
import '../App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MediaCard from './Media Card';
import { FetchCastleListUrl } from './Url';
import axios from "axios";

function InfoPage() {
  const [castleList, setCastleList] = useState(null);
  useEffect(() => {
    axios.get(FetchCastleListUrl).then((response) => {
      setCastleList(response.data)
    });
  }, [])
  return (
    <div className='background background-info aaa'>
      <Container sx={{ paddingTop: '10vh', paddingBottom:'14vmin' }} component="main" maxWidth="lg">
        <CssBaseline />
        {castleList !== null && castleList.map((castleVO) => (
          <MediaCard 
            title={castleVO.castleName} 
            description={castleVO.castleDescription} 
            image={castleVO.imageUrl} 
            url={castleVO.thingsToDo}
          />
        ))}
      </Container>
    </div>
  );
}

export default InfoPage;