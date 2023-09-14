import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteDriver, getDrivers } from "../../redux/actions";

function Card(props) {
  const { id, forename, surname, image, teams } = props;

  const dispatch = useDispatch();

  async function deleteCard() {
    await dispatch(deleteDriver(id));
    dispatch(getDrivers());
  }

  return (
    <div className={style.container}>
      <span>
        {forename} {surname}
      </span>
      <div>
        <img
          className={style.image}
          src={image ? image : "https://wallpapercave.com/wp/wp8757558.png"}
          alt={`corredor ${id}`}
        />
      </div>
      <span>Teams</span>
      <ul className={style.container__teams}>
        {teams.map((team, index) => {
          return <li key={index}>{team}</li>;
        })}
      </ul>
      <button className={style.container__button}>
        <Link className={style.container__button__link} to={`/detail/${id}`}>
          More info
        </Link>
      </button>
      {id.length > 5 && (
        <button onClick={deleteCard} className={style.container__button}>
          Delete Driver
        </button>
      )}
    </div>
  );
}

export default Card;
