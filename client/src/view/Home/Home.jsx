import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";

function Home() {
    // Traigo de la store
    let allDrivers = useSelector((state) => state.allDrivers);
    let filterDrivers = useSelector((state) => state.DriversCopy);

    let drivers = allDrivers.slice(0,9);
    const dispatch = useDispatch();

    useEffect(()=>{
        //Carga a "allDrivers" y "DriversCopy"
        dispatch(getDrivers());
    },[])

    return (
        <div>
            <h1>Home Page</h1>
            <Cards drivers={drivers}/>
        </div>
    )
}

export default Home;