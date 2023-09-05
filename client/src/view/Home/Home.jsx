import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import SearchBar from "../../components/SearchBar/SearchBar";

function Home() {
    // Traigo de la store
    let actualDrivers = useSelector((state) => state.actualDrivers);

    const dispatch = useDispatch();

    useEffect(()=>{
        //Carga a "allDrivers" y "actualDrivers"
        dispatch(getDrivers());
    },[])

    return (
        <div>
            <SearchBar />
            <Cards drivers={actualDrivers.length>16 ? actualDrivers.slice(0,9) : actualDrivers}/>
        </div>
    )
}

export default Home;