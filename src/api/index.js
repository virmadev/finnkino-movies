import axios from 'axios';
const xml2js = require('xml2js');

const url = 'https://www.finnkino.fi/xml'

export const fetchAreas = async() => {
  try {
    const xml = await axios.get(`${url}/TheatreAreas`);
    const parser = new xml2js.Parser();

    const modifiedData = parser.parseStringPromise(xml.data).then(function (result) {
      result.TheatreAreas.TheatreArea.shift();
      return result.TheatreAreas.TheatreArea;
    })
    .catch(function (err) {
    });
    return modifiedData;
    
  } catch (error) {
  }
}

export const fetchDates = async(areaID) => {
  try {
    const xml = await axios.get(`${url}/ScheduleDates/?area=${areaID}`);
    const parser = new xml2js.Parser();
    const modifiedData = parser.parseStringPromise(xml.data).then(function (result) {
      return result.Dates.dateTime;
    })
    .catch(function (err) {
    });
    return modifiedData;
    
  } catch (error) {
  }
}

export const fetchSchedules = async(areaID, selectedDate) => {
  try {
    const xml = await axios.get(`${url}/Schedule/?area=${areaID}&dt=${selectedDate}`);
    const parser = new xml2js.Parser();
    const modifiedData = parser.parseStringPromise(xml.data).then(function (result) {
      return result.Schedule.Shows[0].Show;
    })
    .catch(function (err) {
    });
    return modifiedData;
    
  } catch (error) {
  }
}

export const fetchSynopsis = async() => {
  try {
    const xml = await axios.get(`${url}/Events/`);
    const parser = new xml2js.Parser();
    const modifiedData = parser.parseStringPromise(xml.data).then(function (result) {
      console.log(result.Events.Event);
      
      return result.Events.Event;
    })
    .catch(function (err) {
    });
    return modifiedData;
    
  } catch (error) {
  }
}