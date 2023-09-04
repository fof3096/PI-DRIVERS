import React from 'react'
import { Link } from 'react-router-dom';
import style from './Card.module.css'

function Card(props) {
    const { 
        id,
        forename,
        surname,
        image,
        teams,
    } = props;

    return (
    <div className={style.container}>
        <h3>{forename} {surname}</h3>
        <img className={style.container__img} src={image} alt={`corredor ${id}`} height="200px" />
        Teams
        <ul className={style.container__teams}>
        {
        teams.map((team, index) => {
            return <li key={index}>{team}</li>
        })
        }
        </ul>
        <button className={style.container__button}><Link className={style.container__button__link} to={`/detail/${id}`}>Conocer más</Link></button>
    </div>
    )
}

export default Card;