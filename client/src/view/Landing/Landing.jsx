// ESTILOS
import style from './Landing.module.css'

// LIBRERÍAS
import { Link } from 'react-router-dom'

function Landing() {
    
    return (
        <div className={style.container}>
            <Link className={style.buttom} to="/home">HOME</Link>
        </div>
    )
}

export default Landing;