import { mdiCloudQuestion, mdiPacMan, mdiWeatherCloudy, mdiWeatherFog, mdiWeatherLightning, mdiWeatherPartlyCloudy, mdiWeatherPartlyRainy, mdiWeatherRainy, mdiWeatherSnowy, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import styles from './WeatherItem.module.css';


function WeatherItem(props){


    function clickHandler(){

        props.changeSelected(props.index);

    }

    return(

        <div className={styles.body} onClick={clickHandler}>

            <div className={styles.head}>{props.data.name}</div>
            <div className={`${styles.icon} ${props.selected ? styles.selected : null}`}><Icon path={props.data.icon} size={2}/></div>
            <div className={styles.temp}><span className={styles.dark}>{props.data.highest}{ props.unit }</span> / {props.data.lowest}{ props.unit }</div>
            <div className={styles.humid}>{props.data.humidity}%</div>

        </div>

    );

}

export default WeatherItem;