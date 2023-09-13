import React from 'react'
import Card from '../Card/Card'
import style from './Cards.module.css'

function Cards({drivers}) {

    return (
    <div className={style.container}>
        {
            drivers.map(driver =>{
                return(
                    <Card
                    key={driver.id}
                    id={driver.id}
                    forename={driver.forename}
                    surname={driver.surname}
                    description={driver.description}
                    image={driver.image}
                    nationality={driver.nationality}
                    teams={driver.teams}
                    birthDate={driver.birthDate}
                    />
                )
            })
        }
    </div>
    )
}

export default Cards;