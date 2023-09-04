import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers } from "../../redux/actions";

function Home(props) {
    let drivers = useSelector((state) => state.allDrivers);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDrivers());
    },[])

    console.log(drivers);
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default Home;