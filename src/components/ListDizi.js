import React from "react";

const ListDizi = (props) => {
  const { diziVerisi, handleCikar } = props;
  return (
    <div>
      <img src={diziVerisi.image_thumbnail_path} alt="" />
      <div>
        <h3>{diziVerisi.name}</h3>
        <button onClick={() => handleCikar(diziVerisi)}>Çıkar</button>
      </div>
    </div>
  );
};

export default ListDizi;
