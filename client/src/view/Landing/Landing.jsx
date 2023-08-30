import style from './Landing.module.css'
import { Link } from 'react-router-dom'

function Landing() {
    
    return (
        <div className={style.container}>
            <Link className={style.buttom} to="/home">Home</Link>
        </div>
    )
}

export default Landing;