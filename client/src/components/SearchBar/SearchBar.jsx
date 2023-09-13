// ESTILOS
import style from "./SearchBar.module.css";

// LIBRERÍAS
import { useState } from "react";
import { useDispatch } from "react-redux";

// ACTIONS
import { showAllDrivers, searchByName } from "../../redux/actions";

function SearchBar(props) {
    const { setNumPage, setSelectedOption } = props;
    const [searchBar, setSearchBar] = useState("");
    const dispatch = useDispatch();


    function handleChange (event){
        setNumPage(1);
        setSearchBar(event.target.value);
        dispatch(searchByName(event.target.value));
        setSelectedOption("None");
    }

    function viewAllDrivers() {
        setNumPage(1);
        setSearchBar("");
        dispatch(showAllDrivers());
        setSelectedOption("None");
    }

    return (
    <div className={style.container}>
        <div>
            <label htmlFor="search" >Search</label>
            <input className={style.searchbar} onChange={handleChange} type="text" id="search" value={searchBar} placeholder="Name or Surname"/>
        </div>
        <button className={style.buttom} onClick={viewAllDrivers ? viewAllDrivers : null}>CLEAN</button>
    </div>
    )
}

export default SearchBar;