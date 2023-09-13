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
        <span>{forename} {surname}</span>
        <div >
            <img className={style.image} src={image} alt={`corredor ${id}`}/>
        </div>
        <span>Teams</span>
        <ul className={style.container__teams}>
        {
        teams.map((team, index) => {
            return <li key={index}>{team}</li>
        })
        }
        </ul>
        <button className={style.container__button}><Link className={style.container__button__link} to={`/detail/${id}`}>More info</Link></button>
    </div>
    )
}

export default Card;