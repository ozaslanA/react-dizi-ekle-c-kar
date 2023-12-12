import React from "react";

const Diziİtem = (props) => {
  const { poster, isim, handleClick, diziVerisi } = props;
  return (
    <div className="dizi">
      <img src={poster} alt="" />

      <div>
        <button className="button" onClick={() => handleClick(diziVerisi)}>
          İncele
        </button>
        <h3>{isim}</h3>
      </div>
    </div>
  );
};

export default Diziİtem;
