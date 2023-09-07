import { useDispatch, useSelector } from "react-redux";
import style from "./Form.module.css";
import { useEffect, useState } from "react";
import { getTeams, createDriver } from "../../redux/actions";

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

    function handlerTeams(event) {
        let team = event.target.value;
        if(input.teams.includes(team)){
            setInput({...input, teams:input.teams.filter(t => t !== team)})
        }else{
            setInput({...input, teams: [...input.teams, team]})
        }
    }

    function handlerCreate() {
        dispatch(createDriver(input));
    }
    
    {error.forename && <p>{error.forename}</p>}
    return (
        <div className={style.container} >
            <form onSubmit={handlerSubmit}>
                <label htmlFor="forename">Name</label>
                <input onChange={handlerChange} type="text" id="forename" name="forename" value={input.forename}/>
                {error.forename && <p>{error.forename}</p>}
                
                <label htmlFor="surname">Surname</label>
                <input onChange={handlerChange} type="text" id="surname" name="surname" value={input.surname}/>
                {error.surname && <p>{error.surname}</p>}
                
                <label htmlFor="description">Description</label>
                <textarea onChange={handlerChange} id="description" name="description" value={input.description}/>
                
                <label htmlFor="image">Image</label>
                <input onChange={handlerChange} type="text" id="image" name="image" value={input.image}/>
                
                <label htmlFor="nationality">Nationality</label>
                <input onChange={handlerChange} type="text" id="nationality" name="nationality" value={input.nationality}/>
                {error.nationality && <p>{error.nationality}</p>}
                
                <label htmlFor="birthDate">BirthDate</label>
                <input onChange={handlerChange} type="date" id="birthDate" name="birthDate" value={input.birthDate}/>
                {error.birthDate && <p>{error.birthDate}</p>}
                
                <label htmlFor="teams">Teams</label>
                {error.teams && <p>{error.teams}</p>}
                <ul>
                    {input.teams.map((team, i) => <li key={i}>{team}</li>)}
                </ul>
                <ul>
                    {
                        allTeams.map((team, i)=> <li key={i} ><button onClick={handlerTeams} value={team}>{team}</button></li>)
                    }
                </ul>
                {Object.key(error) == 0 && <button onClick={handlerCreate} type="submit">Enviar</button>}
            </form>

        </div>
    )
}
export default Form;