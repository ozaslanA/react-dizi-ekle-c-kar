import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const DiziDetay = (props) => {
  const params = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/show-details?q=" + params.diziId)
      .then((response) => setDetails(response.data.tvShow))
      .catch((error) => console.log(error));
  }, [params.diziId]);

  function handleBack() {
    navigate("/");
  }

  return (
    <div className="diziDetay">
      <div
        className="diziDetay-content"
        style={{ overflowY: "auto", maxHeight: "400px" }}
      >
        {details ? (
          <div>
            <h1>{details.name}</h1>
            <img
              className="details-img"
              src={details.image_thumbnail_path}
              alt=""
            />
            <h2>{details.rating}/10</h2>
            <h2>{details.country}</h2>
            <h2>{details.description}</h2>
            <h2>Genres:{details.genres}</h2>
          </div>
        ) : (
          " yükleniyor"
        )}
        <button className="buton" onClick={handleBack}>
          Geri Dön
        </button>
      </div>
    </div>
  );
};

export default DiziDetay;
