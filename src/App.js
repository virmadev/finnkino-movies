import React from 'react';
import { AreaPicker, DatePicker, Cards } from './components';
import styles from './App.module.css';
import { fetchDates, fetchSchedules } from './api';
import { Grid, CardContent, Typography, Card } from '@material-ui/core';
var formatDate = require('./utils.js').formatDate;

class App extends React.Component {
  state = {
    areaID: '1029',
    dates: [],
    selectedDate: '',
    schedules: []
  }

  async componentDidMount() {
    const { areaID } = this.state;
    const fetchedDates = await fetchDates(areaID);
    this.setState({ dates: fetchedDates })
    this.setState({ selectedDate: formatDate(fetchedDates[0]) })
    const fetchedSchedules = await fetchSchedules(areaID, formatDate(fetchedDates[0]));
    this.setState({ schedules: fetchedSchedules });
  }

  handleAreaChange = async (newareaID) => {
    this.setState({ areaID: newareaID })
    const fetchedDates = await fetchDates(newareaID);
    this.setState({ dates: fetchedDates })

    if (fetchedDates) {

      this.setState({ selectedDate: formatDate(fetchedDates[0]) })
      const schedules = await fetchSchedules(newareaID, formatDate(fetchedDates[0]));
      this.setState({ schedules: schedules });
      console.log(this.state);
    }
    else {
      this.setState({ selectedDate: '' })
      this.setState({ schedules: [] });
    }

  }
  handleDateChange = async (newDate) => {
    this.setState({ selectedDate: newDate })
    const { areaID } = this.state;
    const schedules = await fetchSchedules(areaID, newDate);
    this.setState({ schedules: schedules });
  }

  render() {
    const { dates, schedules } = this.state;

    return (
      <div className={styles.container}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Grid item component={Card} xs={12}>
              <CardContent>
                <Typography variant="h2" className={styles.padding} >Finnkinon ohjelmisto</Typography>
              </CardContent>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <AreaPicker handleAreaChange={this.handleAreaChange} />
          </Grid>
          <Grid item xs={6}>
            <DatePicker dates={dates} handleDateChange={this.handleDateChange} />
          </Grid>
          <Grid item xs={12}>
            <Cards schedules={schedules} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default App;