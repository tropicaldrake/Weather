import Axios from 'axios';
import moment from 'moment';
import 'moment/locale/pl';

import React, { useEffect, useState } from 'react';
import Info from './Info';

import styles from './Weather.module.css';
import WeatherItem from './WeatherItem';

import { mdiCloudQuestion, mdiWeatherCloudy, mdiWeatherFog, mdiWeatherLightning, mdiWeatherPartlyCloudy, mdiWeatherPartlyRainy, mdiWeatherRainy, mdiWeatherSnowy, mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';

function Weather(props){

    const[selected,setSelected] = useState(null);

    const[locations,setLocations] = useState([

        {
            name:"kraków",
            lat:50.061947,
            lon:19.936856
        },
        {
            name:"berlin",
            lat:52.517037,
            lon:13.38886
        },
        {
            name:"tokio",
            lat:35.682839,
            lon:139.759455
        },



    ]);

    const[units,setUnits] = useState("metric");
    const[location,setLocation] = useState(locations[0]);
    const[date,setDate] = useState(new Date());

    const[loading,setLoading] = useState(true);


    const[data,setData] = useState([]);

    useEffect(()=>{

        fetchData();

    },[units,location,date]);

    function changeSelected(index){

        if(selected && selected.index == index){

            setSelected(null);

        }else{

            setSelected({

                index: index,
                data: data[index],
                location: location
    
            });

        }

    }


    function getWeatherIcon(iconName){

        switch(iconName){

            case '01d': return mdiWeatherSunny;
            case '02d': return mdiWeatherPartlyCloudy;
            case '03d': return mdiWeatherCloudy;
            case '04d': return mdiWeatherCloudy;
            case '09d': return mdiWeatherPartlyRainy;
            case '10d': return mdiWeatherRainy;
            case '11d': return mdiWeatherLightning;
            case '13d': return mdiWeatherSnowy;
            case '50d': return mdiWeatherFog;
            default: return mdiCloudQuestion;



        }

    }


    function fetchData(){

        setLoading(true);

        setSelected(null);

        Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=${units}&exclude=minutely,hourly,current&appid=1293796ea4b824ef3db932ae4314908f`).then((response)=>{

            let newData = [];

            response.data.daily.forEach((item,index)=>{


                let now = moment(date).add(index,"day");
                now.locale("pl");
                
                newData.push({ 

                    name:now.format("dd")+".",
                    lowest: Math.floor(item.temp.min),
                    highest: Math.floor(item.temp.max),
                    feels_day: Math.floor(item.feels_like.day),
                    feels_night: Math.floor(item.feels_like.night),
                    humidity: item.humidity,
                    sunrise: moment(new Date(item.sunrise*1000)).format("LT"),
                    sunset: moment(new Date(item.sunset*1000)).format("LT"),
                    icon: getWeatherIcon(item.weather[0].icon)


                });

            });

            setData(newData);

            setLoading(false);

        });

    }

    function getUnitSymbol(){

        switch(units){

            case "metric":

                return "°C";

            break;

            case "imperial":

                return "°F";

            break;

            case "standard":

                return "K";

            break;

            default:

                return "?";

            break;
        

        }


    }

    function changeLocation(){

        let currentIndex = locations.findIndex((item)=>{ return item === location });

        currentIndex < locations.length-1 ? currentIndex++ : currentIndex = 0;

        setLocation(locations[currentIndex]);

    }

    return(
    
        <div className={styles.wrapper}>

            <div className={styles.header}>

                <div className={styles.place}><span className={styles.link} onClick={changeLocation}>{location.name}</span></div>
                <div className={styles.time}>
                    <span className={styles.link}>{ moment(date).format("DD.MM") }</span>
                </div>
                <div className={styles.switch}>
                    <span className={`${styles.link} ${ units === "metric" ? styles.link__active : null}`} onClick={ ()=>setUnits("metric") }>°C</span>
                    <span className={`${styles.link} ${ units === "imperial" ? styles.link__active : null}`} onClick={ ()=>setUnits("imperial") }>°F</span>
                    <span className={`${styles.link} ${ units === "standard" ? styles.link__active : null}`} onClick={ ()=>setUnits("standard") }>K</span>
                </div>

            </div>

            <div className={styles.grid}>

                {data.map((item,index)=>{return(

                    <WeatherItem key={index} data={item} changeSelected={changeSelected} index={index} unit={getUnitSymbol()} selected={ selected ? ( selected.index === index ) : false }/>

                )})}

            </div>

            {selected !== null ? (

                <div className={styles.info}>

                    <Info date={moment(date).add(selected.index,"day")} data={selected.data} location={location} unit={getUnitSymbol()}/>

                </div>

            ): null}


            { loading ? (
            <div className={styles.loader}></div>
            ) : null}

        </div>
        
    );

}

export default Weather;