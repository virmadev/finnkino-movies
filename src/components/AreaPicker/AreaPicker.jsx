import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './AreaPicker.module.css';
import { fetchAreas } from '../../api';

const AreaPicker = ({ handleAreaChange }) => {
  const [fetchedAreas, setFetchedAreas] = useState([]);
  useEffect(()=> {
    const fetchAPI = async () => {
      setFetchedAreas(await fetchAreas());
    }
    fetchAPI();
  }, [setFetchedAreas])
  
  return (
      <FormControl className={styles.formControl}>
        <NativeSelect defaultValue="" classes={{root: styles.formPadding}} onChange={(e) => handleAreaChange(e.target.value)}>
            {fetchedAreas.map((area) => <option key={area.ID} value={area.ID}> {area.Name}</option>)}
        </NativeSelect>
      </FormControl>
  )
}

export default AreaPicker;