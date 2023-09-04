import React from 'react'
import { Link } from 'react-router-dom';

function Card(props) {
    const { 
        id,
        forename,
        surname,
        description,
        image,
        nationality,
        teams,
        birthDate
    } = props;

    console.log(props);
    return (
    <div>
        <h3>{forename}</h3>
        <h3>{surname}</h3>
        <p>{description}</p>
        <img src={image} alt={`corredor ${id}`} height="200px" />
        <h2>Nationality: {nationality}</h2>
        <ul>
        {
        teams.map((team, index) => {
            return <li key={index}>{team}</li>
        })
        }
        </ul>
        <h3>{birthDate}</h3>
        <Link to={`/detail/${id}`}>Conocer más</Link>
    </div>
    )
}

export default Card;