import { useEffect, useState } from "react";
import style from "./Pagination.module.css";

function Pagination(props) {
  const { numPage, setNumPage, maxDrivers } = props;

  const [input, setInput] = useState(1);

  function nextPage() {
    setNumPage(parseInt(numPage - 1 + 2));
  }

  function previousPage() {
    setNumPage(parseInt(numPage - 1));
  }

  function handlerKeyDown(event) {
    if (event.keyCode == 13) {
      setNumPage(parseInt(event.target.value));
      if (
        parseInt(event.target.value < 1) ||
        parseInt(event.target.value) > maxDrivers ||
        isNaN(parseInt(event.target.value))
      ) {
        setNumPage(1);
        setInput(1);
      } else {
        setNumPage(parseInt(event.target.value));
      }
    }
  }

  function handlerChange(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    setInput(numPage);
  }, [numPage]);

  return (
    <div className={style.container}>
      <button disabled={numPage === 1 || numPage < 1} onClick={previousPage}>
        ◀
      </button>
      <input
        onChange={handlerChange}
        onKeyDown={handlerKeyDown}
        type="text"
        id="pageBar"
        value={input}
      />
      <p>OF {maxDrivers}</p>
      <button
        disabled={numPage === maxDrivers || numPage > maxDrivers}
        onClick={nextPage}
      >
        ▶
      </button>
    </div>
  );
}

export default Pagination;
