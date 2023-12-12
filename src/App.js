import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Diziİtem from "./components/Diziİtem";
import axios from "axios";
import "./styles.css";
import ListDizi from "./components/ListDizi";
import DiziDetay from "./components/DiziDetay";

function App() {
  const [diziler, setDiziler] = useState([]);
  const [preview, setPreview] = useState(null);
  const [myList, setMyList] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    axios
      .get("https://www.episodate.com/api/most-popular?page=" + pageNum)
      .then((response) => setDiziler(response.data.tv_shows))
      .catch((error) => console.log(error));
  }, [pageNum]);
  console.log(diziler);

  function handlePreviewClick(diziObj) {
    setPreview(diziObj);
  }

  function handleAddList(diziObj) {
    if (
      myList.filter((eklenmisDizi) => eklenmisDizi.id === diziObj.id).length > 0
    ) {
      alert("Bu dizi yada filmi zaten eklemişsin");
    } else {
      setMyList([...myList, diziObj]);
    }
  }

  function handleRemoveList(diziObj) {
    setMyList(myList.filter((dizi) => dizi.id != diziObj.id));
  }

  return (
    <div className="App">
      <Link to="/">Anasayfa</Link>

      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <div className="column">
                <h2> Dizi Listesi</h2>
                <div className="dizi-container">
                  {diziler.map((dizi) => (
                    <Diziİtem
                      key={dizi.id}
                      isim={dizi.name}
                      poster={dizi.image_thumbnail_path}
                      diziVerisi={dizi}
                      handleClick={handlePreviewClick}
                    />
                  ))}
                </div>
                {/* <button>Dizi ekle</button> */}
                <div className="page-nav">
                  <button
                    className="buton"
                    onClick={() => setPageNum(pageNum - 1)}
                    disabled={pageNum === 1}
                  >
                    Önceki
                  </button>
                  <div className="pagenav-number">{pageNum}</div>
                  <button onClick={() => setPageNum(pageNum + 1)}>
                    Sonraki
                  </button>
                </div>
              </div>
              <div className="center">
                {preview ? (
                  <div className="preview">
                    <img src={preview.image_thumbnail_path} alt="" />
                    <div className="preview-details">
                      <h1>{preview.name}</h1>
                      <Link to={"/dizi-detay/" + preview.id} className="buton">
                        Detaya git
                      </Link>
                      <button onClick={() => handleAddList(preview)}>
                        Listeme Ekle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="uyari"> lütfen seçim yapınız</div>
                )}
              </div>
              <div className="column">
                <h1>İzlemek İstediklerim</h1>
                <div className="dizi-container">
                  {myList.map((dizi) => (
                    <ListDizi
                      key={dizi.id}
                      diziVerisi={dizi}
                      handleCikar={handleRemoveList}
                    />
                  ))}
                </div>
                <Link to="/dizi-ekle" className="buton">
                  Dizi Ekle
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/dizi-ekle"></Route>
        <Route path="/dizi-detay/:diziId" element={<DiziDetay />} />
      </Routes>
    </div>
  );
}

export default App;
