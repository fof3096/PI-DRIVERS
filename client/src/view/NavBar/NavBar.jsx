import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./NavBar.module.css";


function NavBar() {
    return (
        <div className={style.container}>
            <SearchBar />

            <button className={style.container__buttom} >
                <Link className={style.container__buttom__link} to={"/"}>Inicio</Link>
            </button>
            
            <button className={style.container__buttom} >
                <Link className={style.container__buttom__link} to={"/home"}>Home</Link>
            </button>
            
            <button className={style.container__buttom} >
                <Link className={style.container__buttom__link} to={"/form"}>New Driver</Link>
            </button>
        </div>

    )
}

export default NavBar;