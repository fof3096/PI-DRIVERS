import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";

function Home() {
    let drivers = useSelector((state) => state.allDrivers);

    const dispatch = useDispatch();

    useEffect(()=>{
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