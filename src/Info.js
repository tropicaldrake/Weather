import { mdiWeatherSunny } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';

import styles from './Info.module.css';

function Info(props){

return(

    <div className={styles.info}>

        <div className={styles.container}>

            <div className={styles.header}>

                <div className={styles.header__location}>{props.location.name}</div>

            </div>

            <div className={styles.icon}>

                <Icon path={props.data.icon} size={4}/>

            </div>

            <div className={styles.list}>

                <ul>
                    <li className={styles.list__heading}>

                        <div>{props.date.format("dddd")}</div>

                    </li>
                    <li className={styles.list__title}>

                        <div>Ogólne</div>

                    </li>
                    <li>

                        <div>Wschód</div>
                        <div>{props.data.sunrise}</div>

                    </li>
                    <li>

                        <div>Zachód</div>
                        <div>{props.data.sunset}</div>

                    </li>
                    <li className={styles.list__title}>

                        <div>Temperatura</div>

                    </li>
                    <li>

                        <div>Maksymalna</div>
                        <div>{props.data.highest} {props.unit}</div>

                    </li>
                    <li>

                        <div>Minimalna</div>
                        <div>{props.data.lowest} {props.unit}</div>

                    </li>
                    <li>

                        <div>Odczuwalna w dzień</div>
                        <div>{props.data.feels_day} {props.unit}</div>

                    </li>
                    <li>

                        <div>Odczuwalna w nocy</div>
                        <div>{props.data.feels_night} {props.unit}</div>

                    </li>
                    <li className={styles.list__title}>

                        <div>Wilgotność</div>

                    </li>
                    <li>

                        <div>Całkowita</div>
                        <div>{props.data.humidity}%</div>

                    </li>

                </ul>

            </div>

        </div>

    </div>

);



}

export default Info;