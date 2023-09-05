import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAllDrivers, searchByName } from "../../redux/actions";
import style from "./SearchBar.module.css"

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
    <div>
        <label htmlFor="search" >Search</label>
        <input className={style.searchbar} onChange={handleChange} type="text" id="search" value={searchBar}/>
        <button onClick={viewAllDrivers}>View All Drivers</button>
    </div>
    )
}

export default SearchBar;