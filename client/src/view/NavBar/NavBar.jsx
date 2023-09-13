import { Link } from "react-router-dom";
import style from "./NavBar.module.css";


function NavBar() {
    return (
        <div className={style.container}>
            <div className={style.container__img}></div>
            
            <div className={style.containerButtons}>
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