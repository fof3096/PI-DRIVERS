// ESTILOS
import style from "./Home.module.css";

// LIBRERÍAS
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// ACTIONS
import { getDrivers, getTeams } from "../../redux/actions";

// COMPONENTES
import Cards from "../../components/Cards/Cards";

function Home() {
    // Traigo de la store
    let actualDrivers = useSelector((state) => state.actualDrivers);
    let allTeams = useSelector((state) => state.allTeams);

    const dispatch = useDispatch();

    useEffect(()=>{
        //Carga a "allDrivers" y "actualDrivers"
        dispatch(getDrivers());
        dispatch(getTeams());
    },[])

    function handleChange(event) {
        console.log(event.target.value);
    }

    function viewAllDrivers() {
        dispatch(showAllDrivers());
    }

    return (
        <div>
            <select  onChange={handleChange} className={style.select} >
            {
                allTeams.map((team, i)=>{
                return (
                    <option className={style.select__option} value={team} key={i} >{team}</option>)
            }) 
            }
            </select>
            <button onClick={viewAllDrivers} className={style.button}>Reset filters</button>
            <Cards drivers={actualDrivers.length>16 ? actualDrivers.slice(0,9) : actualDrivers}/>
        </div>
    )
}

export default Home;