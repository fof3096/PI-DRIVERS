// ESTILOS
import style from "./Home.module.css";

// LIBRERÍAS
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// ACTIONS
import { 
    getDrivers, 
    getTeams, 
    showAllDrivers, 
    filterByTeam,
    orderByNameAsc,
    orderByNameDsc
} from "../../redux/actions";

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
        dispatch(filterByTeam(event.target.value));
    }

    function orderByNameAscending(){
        dispatch(orderByNameAsc(actualDrivers))
        console.log("hola");
    }
    
    function orderByNameDescending(){
        dispatch(orderByNameDsc(actualDrivers))
    }

    function resetFilters() {
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
            <span>Name</span>
            <button onClick={orderByNameAscending} className={style.button}>ASC</button>
            <button onClick={orderByNameDescending} className={style.button}>DSC</button>
            <button onClick={resetFilters} className={style.button}>Reset filters</button>
            <Cards drivers={actualDrivers.length>16 ? actualDrivers.slice(0,9) : actualDrivers}/>
        </div>
    )
}

/* if (action.payload == "ATK(+)") {
    orderedByPokedex = state.allPokemons.sort((a, b)=> (b.atack > a.atack ? 1 : -1));
} */
export default Home;