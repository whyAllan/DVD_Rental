import backwardsIcon from "../icons/back.png";
import { useState, useEffect } from "react";
import api from "../api/api";

function CategoryMap({ category }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [filmsDisplay, setFilmsDisplay] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Get first 5 films of category
    (async function fetchData() {
      try {
        const response = await api.get(
          `/films/category/${category.category_id}?page=1`
        );
        setFilms(response);
        setFilmsDisplay(response.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category]);

  async function fetchMore() {
    // Get next 5 films of category
    try {
      const response = await api.get(
        `/films/category/${category.category_id}?page=${page + 1}`
      );
      setFilms(films.concat(response)); // films.concat(response);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  }

  function selectToDisplay(event: any) {
    // Select films to display
    const action = event.currentTarget.getAttribute("data-action");

    if (action === "back") {
      if (page > 1) setPage(page - 1);
    }

    if (action === "next") {
      // If films are not loaded fetch more
      if (films.length <= page * 5) fetchMore();
      else setPage(page + 1);
    }
  }

  useEffect(() => {
    setFilmsDisplay(films.slice((page - 1) * 5, page * 5));
  }, [page]);

  return (
    <div className="categoryMap">
      <h1 className="categoryTitle">{category.name}</h1>
      <div className="rentDiv">
        <img
          src={backwardsIcon}
          alt="back"
          data-action="back"
          onClick={selectToDisplay}
          className="interactionButton backwardsButton"
        />
        <div className="rentList">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {isLoading && <h1>Loading...</h1>}
            {filmsDisplay &&
              filmsDisplay.map((film: any) => (
                <div className="col" key={film.film_id}>
                  <div
                    className="card text-bg-dark border-primary mb-3"
                    style={{ height: "19em" }}
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
          src={backwardsIcon}
          alt="next"
          onClick={selectToDisplay}
          data-action="next"
          className="interactionButton nexButton"
        />
      </div>
    </div>
  );
}

export default CategoryMap;
