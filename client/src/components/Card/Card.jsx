import React from 'react'

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
    return (
    <div>
        <h3>{forename}</h3>
        <h3>{surname}</h3>
        <p>{description}</p>
        <img src={image} alt={`corredor ${id}`} />
        <h2>{nationality}</h2>
        <ul>
        {
        teams.map((team, index) => {
            return <li key={index}>{team}</li>
        })
        }
        <h3>{birthDate}</h3>
        </ul>
    </div>
    )
}

export default Card;