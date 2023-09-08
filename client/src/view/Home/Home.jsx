// ESTILOS
import style from "./Home.module.css";

// LIBRERÍAS
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// ACTIONS
import { 
    getDrivers, 
    getTeams, 
    showAllDrivers, 
    filterByTeam,
    orderByNameAsc,
    orderByNameDsc,
    orderByBirthDateAsc,
    orderByBirthDateDsc,
    deleteFilters
} from "../../redux/actions";

// COMPONENTES
import Cards from "../../components/Cards/Cards";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

function Home() {
    // Traigo de la store
    let actualDrivers = useSelector((state) => state.actualDrivers);
    let allTeams = useSelector((state) => state.allTeams);

    // PAGINADO
    const [numPage, setNumPage] = useState(1);
    const [limitDriver, setLimitDriver] = useState(9);

    const maxDrivers = Math.ceil(actualDrivers.length / limitDriver);

    const dispatch = useDispatch();

    useEffect(()=>{
        //Carga a "allDrivers" y "actualDrivers"
        dispatch(getDrivers());
        dispatch(getTeams());

        return ()=> dispatch(getDrivers());
    },[])

    //  HANDLER
    function handleChange(event) {
        setNumPage(1);
        dispatch(filterByTeam(event.target.value));
    }

    // DISPATCHS
    function orderByNameAscending(){
        setNumPage(1);
        dispatch(orderByNameAsc(actualDrivers))
    }
    
    function orderByNameDescending(){
        setNumPage(1);
        dispatch(orderByNameDsc(actualDrivers))
    }
    
    function orderByBirthDateAscending(){
        setNumPage(1);
        dispatch(orderByBirthDateAsc(actualDrivers))
    }

    function orderByBirthDateDescending(){
        setNumPage(1);
        dispatch(orderByBirthDateDsc(actualDrivers))
    }

    function resetFilters() {
        setNumPage(1);
        dispatch(deleteFilters());
    }

    return (
        <div>
            <SearchBar />
            <select  onChange={handleChange} className={style.select} >
            <option value="None">None</option>
            {
                allTeams.map((team, i)=>{
                return (
                    <option className={style.select__option} value={team} id={i} key={i} >{team}</option>)
                }) 
            }
            </select>
            <span>Name: </span>
            <button onClick={orderByNameAscending} className={style.button}>ASC</button>
            <button onClick={orderByNameDescending} className={style.button}>DSC</button>
            
            <span>Birth Date: </span>
            <button onClick={orderByBirthDateAscending} className={style.button}>ASC</button>
            <button onClick={orderByBirthDateDescending} className={style.button}>DSC</button>

            <button onClick={resetFilters} className={style.button}>Reset filters</button>
            
            <Pagination numPage={numPage} setNumPage={setNumPage} maxDrivers={maxDrivers}/>

            <Cards drivers={actualDrivers.slice((numPage - 1) * limitDriver,(numPage - 1) * limitDriver + limitDriver)}/>
        </div>
    )
}

export default Home;