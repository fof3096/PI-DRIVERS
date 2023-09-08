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
        <div>
            <h1>Corredor {id}</h1>
            <h1>Detail Page</h1>
            <h3>{forename}</h3>
            <h3>{surname}</h3>
            <p>{description}</p>
            <img src={image} alt={`corredor`} height="200px" />
            <h2>{nationality}</h2>
            <ul>
            {teams && teams.map((team, i) => <li key={i}>{team}</li>)}
            </ul>
            <h3>{birthDate}</h3>
        </div>
    )
}

export default Detail;