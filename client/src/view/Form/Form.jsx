import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { getTeams } from "../../redux/actions";

function Form() {

    // REACT-REDUX
    const allTeams = useSelector((state) => state.allTeams);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTeams());
    },[])

    const [input, setInput] = useState({
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        birthDate: "",
        teams: []
    })
    
    const [error, setError] = useState({})

    function validation(input) {
        let errors = {};
        if (!input.forename) {
            errors.forename = "Este campo es Obligatorios";
        }
        if (!input.surname) {
            errors.surname = "Este campo es Obligatorios";
        }
        if (!input.nationality) {
            errors.nationality = "Este campo es Obligatorios";
        }
        if (!input.birthDate) {
            errors.birthDate = "Este campo es Obligatorios";
        }
        if (!input.teams[0]) {
            errors.teams = "Este campo es Obligatorios";
        }
        return errors;
    }

    function handlerSubmit(event) {
        event.preventDefault();
    }

    function handlerChange(event){
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        
        setError(validation({ /* Si le pasamos solo "input" entonces no se pasaran todos los valores actualizados del "input" */
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className={style.container} >
            <form onSubmit={handlerSubmit}>
                <label htmlFor="forename">Name</label>
                <input onChange={handlerChange} type="text" id="forename" name="forename" value={input.forename}/>
                {error.forename && <p>{error.forename}</p>}
                
                <label htmlFor="surname">Surname</label>
                <input onChange={handlerChange} type="text" id="surname" name="surname" value={input.surname}/>
                
                <label htmlFor="description">Description</label>
                <textarea onChange={handlerChange} id="description" name="description" value={input.description}/>
                
                <label htmlFor="image">Image</label>
                <input onChange={handlerChange} type="text" id="image" name="image" value={input.image}/>
                
                <label htmlFor="nationality">Nationality</label>
                <input onChange={handlerChange} type="text" id="nationality" name="nationality" value={input.nationality}/>
                
                <label htmlFor="birthDate">BirthDate</label>
                <input onChange={handlerChange} type="date" id="birthDate" name="birthDate" value={input.birthDate}/>
                
                <label htmlFor="teams">Teams</label>
                <ul>
                    {
                        allTeams.map((team, i)=> <li key={i} ><button value={i}>{team}</button></li>)
                    }
                </ul>
                <button type="submit">Enviar</button>
            </form>

        </div>
    )
}
/* 
{
    "forename": "pollunv",
    "surname":"abcde",
    "description":"Era el mejor chmabeador",
    "image":"",
    "nationality":"Chamba",
    "birthDate":"1990-05-15",
    "teams":["1","2","20","11","22"]
}
 */
export default Form;