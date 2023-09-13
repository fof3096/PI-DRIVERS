// ESTILOS
import style from "./Home.module.css";

// LIBRERÍAS
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// ACTIONS
import { 
    getDrivers, 
    getTeams,  
    filterByTeam,
    orderByNameAsc,
    orderByNameDsc,
    orderByBirthDateAsc,
    orderByBirthDateDsc,
    orderByOriginDB,
    orderByOriginAPI,
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
    let driversCopy = useSelector((state) => state.driversCopy);

    // PAGINADO
    const [numPage, setNumPage] = useState(1);
    const [limitDriver, setLimitDriver] = useState(9);
    
    // SELECT
    const [selectedOption, setSelectedOption] = useState("None");


    const maxDrivers = Math.ceil(actualDrivers.length / limitDriver);

    const dispatch = useDispatch();

    useEffect(()=>{
        //Carga a "allDrivers" y "actualDrivers"
        if (actualDrivers.length < 1) {
            dispatch(getDrivers());
            dispatch(getTeams());
        }

        return ()=> dispatch(getDrivers());
    },[])

    //  HANDLER
    function handlerTeam(event) {
        setNumPage(1);
        if (event.target.value !== "None") {
            dispatch(filterByTeam(event.target.value, driversCopy));
        }else{
            dispatch(deleteFilters());
        }
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

    function orderByOriginDataBase() {
        setNumPage(1);
        dispatch(orderByOriginDB(driversCopy))
    }
    
    function orderByOriginApi() {
        setNumPage(1);
        dispatch(orderByOriginAPI(driversCopy))
    }

    function resetFilters() {
        setNumPage(1);
        dispatch(deleteFilters());
        setSelectedOption("None");
    }

    return (
        <div >
            <div className={style.barContainer}>
                <SearchBar setNumPage={setNumPage} setSelectedOption={setSelectedOption}/>

                <div className={style.filtersContainer}>

                    <div className={style.filterContainer__filter}>
                        <span>Team</span>
                        <select onChange={(event) => {
                            setSelectedOption(event.target.value);
                            handlerTeam(event);
                        }} value={selectedOption} className={style.select} >
                        <option className={style.select__option} value="None">None</option>
                        {
                            allTeams.map((team, i)=>{
                            return (
                                <option className={style.select__option} value={team} id={i} key={i} >{team}</option>)
                            }) 
                        }
                        </select>
                    </div>

                    <div className={style.filterContainer__filter}>
                        <span>Name</span>
                        <button onClick={orderByNameAscending} className={style.button}>ASC</button>
                        <button onClick={orderByNameDescending} className={style.button}>DSC</button>
                    </div>
                    
                    <div className={style.filterContainer__filter}>
                        <span>Birth Date</span>
                        <button onClick={orderByBirthDateAscending} className={style.button}>New</button>
                        <button onClick={orderByBirthDateDescending} className={style.button}>Old</button>
                    </div>
                    
                    <div className={style.filterContainer__filter}>
                        <span>Origin</span>
                        <button onClick={orderByOriginDataBase} className={style.button}>Data Base</button>
                        <button onClick={orderByOriginApi} className={style.button}>API</button>
                    </div>

                    <button onClick={resetFilters} className={style.button}>Reset filters</button>
                </div>
            </div>
    
            <Pagination numPage={numPage} setNumPage={setNumPage} maxDrivers={maxDrivers}/>
                
            <div className={style.cardsContainer}>
                <Cards drivers={actualDrivers.slice((numPage - 1) * limitDriver,(numPage - 1) * limitDriver + limitDriver)}/>
            </div>
        </div>
    )
}

export default Home;