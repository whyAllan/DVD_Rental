import { useState, useEffect } from "react";
import backwordsIcon from "../icons/back.png";
import api from "../api/api";

function Index() {
  const [pickFilms, setPickFilms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/");
        setPickFilms(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="">
      <br />
      <h1>Top picks</h1>
      <br />

      {/* Pick films */}
      {pickFilms && (
        <div className="rentDiv">
          <img
            src={backwordsIcon}
            alt=""
            className="interactionButton backwordsButton"
          />
          <div className="rentList">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {pickFilms.map((film: any) => (
                <div className="col" key={film.film_id}>
                  <div
                    className="card text-bg-dark border-primary mb-3"
                    style={{ height: "18rem" }}
                    data-bs-theme="dark"
                  >
                    <div className="card-body">
                      <h4 className="card-title">{film.title}</h4>
                      <hr />
                      <h6 className="card-subtitle mb-2 text-muted">
                        {film.length} minutes
                      </h6>
                      <h6 className="card-text rentalDuration">
                        ${film.rental_rate} / {film.rental_duration} days
                      </h6>
                      <br />
                      <p className="card-text">{film.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img
            src={backwordsIcon}
            alt=""
            className="interactionButton nexButton"
          />
        </div>
      )}
    </div>
  );
}

export default Index;
