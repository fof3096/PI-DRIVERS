import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./NavBar.module.css";


function NavBar() {
    return (
        <div className={style.container}>
            <SearchBar />
            <div className={style.container__containerButtons}>
                <button className={style.containerButtons__button} >
                    <Link className={style.containerButtons__link} to={"/"}>Inicio</Link>
                </button>

                <button className={style.containerButtons__button} >
                    <Link className={style.containerButtons__link} to={"/home"}>Home</Link>
                </button>

                <button className={style.containerButtons__button} >
                    <Link className={style.containerButtons__link} to={"/form"}>New Driver</Link>
                </button>
            </div>
        </div>

    )
}

export default NavBar;