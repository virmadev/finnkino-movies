import React, { useState, useEffect }  from 'react';
import {Card, CardContent, Typography, Grid, CardMedia, Button} from '@material-ui/core';
import styles from './Cards.module.css';
import { fetchSynopsis } from '../../api';

const Cards = ( { schedules }) => {
  const [synopsis, setSynopsis] = useState([]);

  useEffect(() => {
      const fetchAPI = async () => {
          setSynopsis(await fetchSynopsis());
      }
      
      fetchAPI();
  }, [])
  console.log(synopsis);
  

  

  return (
    
    <div className={styles.container}>
      
      {schedules ? schedules.map((schedule, i) => 

          <Grid item mb={2} component={Card} xs={12} className={styles.card} key={i}>
              {schedule.Images[0].EventLargeImageLandscape ?
              <CardMedia
                className={styles.media}
                image={schedule.Images[0].EventLargeImageLandscape.toString()}
              />
              : ""}
            <CardContent>
              
              <Typography style={{ marginBottom: 15 }} variant="h5">{schedule.Title} ({schedule.ProductionYear}) </Typography>
              <Typography style={{ marginBottom: 15 }}>{(synopsis.filter(obj => { return obj.ID.toString() === schedule.EventID.toString()}))[0].ShortSynopsis}</Typography>
              <Typography>{schedule.LengthInMinutes} min, {schedule.PresentationMethodAndLanguage}</Typography>
              <Typography>{schedule.TheatreAndAuditorium}</Typography>
              <Typography style={{ marginBottom: 15 }}>Alkaa klo {(new Date(schedule.dttmShowStart)).toLocaleTimeString('fi-FI', {hour: '2-digit', minute:'2-digit'})}</Typography>
              <Button mt={4} variant="contained" href={schedule.ShowURL.toString()} target="_blank" >Osta liput</Button>

            </CardContent>
          </Grid>
      
      ) : ""}
    

    </div>
  )
}

export default Cards;