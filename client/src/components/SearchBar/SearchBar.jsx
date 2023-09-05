import { useState } from "react";
import { useDispatch } from "react-redux";
import { showAllDrivers } from "../../redux/actions";
import style from "./SearchBar.module.css"

function SearchBar() {
    const [searchBar, setSearchBar] = useState("");
    const dispatch = useDispatch();

    function handleChange (event){
        setSearchBar(event.target.value);
    }

    return (
    <div>
        <label htmlFor="search" >Search</label>
        <input className={style.searchbar} onChange={handleChange} type="text" id="search" value={searchBar}/>
        <button onClick={() => dispatch(showAllDrivers())}>View All Drivers</button>
    </div>
    )
}

export default SearchBar;