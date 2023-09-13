import style from "./Detail.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Detail() {
    const { idDriver } = useParams();
    const [driver, setDriver] = useState({
        id: "",
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        teams: "",
        birthDate: ""
    });

    useEffect(()=>{
        axios.get(`http://localhost:3001/drivers/${idDriver}`)
        .then(({data}) => setDriver(data))
        .catch((error) => console.log(error.message))

        return()=> setDriver({
            id: "",
            forename: "",
            surname: "",
            description: "",
            image: "",
            nationality: "",
            teams: "",
            birthDate: ""
        })
    },[])

    const {
        id,
        forename,
        surname,
        description,
        image,
        nationality,
        teams,
        birthDate
    } = driver;

    return (
        <div className={style.container}>
            <div className={style.container__card}>
                
                <div className={style.containerDriver}>
                    <img src={image} alt={`corredor`} className={style.containerDriver__img}/>
                    <div className={style.personalInfo}>
                        <div className={style.data}>
                            <span>Name: </span>
                            <span>{forename} {surname}</span>
                        </div>
                        <div className={style.data}>
                            <span>Nationality: </span>
                            <span>{nationality}</span>
                        </div>
                        
                        <div className={style.data}>
                            <span>BirthDate: </span>
                            <span>{birthDate}</span>
                        </div>
                    </div>
                    
                    <span className={style.id}>{id}</span>
                </div>

                <div className={style.otherInfo} >
                    <div className={style.teams}>
                        <span>TEAM</span>
                        <ul>
                            {teams && teams.map((team, i) => <li key={i}>{team}</li>)}
                        </ul>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Detail;