// ESTILOS
import style from "./SearchBar.module.css";

// LIBRERÍAS
import { useState } from "react";
import { useDispatch } from "react-redux";

// ACTIONS
import { showAllDrivers, searchByName } from "../../redux/actions";

function SearchBar() {
    const [searchBar, setSearchBar] = useState("");
    const dispatch = useDispatch();


    function handleChange (event){
        setSearchBar(event.target.value);
        dispatch(searchByName(event.target.value));
    }

    function viewAllDrivers() {
        setSearchBar("");
        dispatch(showAllDrivers());
    }

    return (
    <>
        <label htmlFor="search" >Search:</label>
        <input className={style.searchbar} onChange={handleChange} type="text" id="search" value={searchBar} placeholder="Name or Surname"/>
        <button className={style.buttom} onClick={viewAllDrivers}>ALL DRIVERS</button>
    </>
    )
}

export default SearchBar;