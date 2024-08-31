import NextIcon from "../icons/next.svg";
import { useState, useEffect } from "react";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";
import FilmList from "./FilmList";

function CategoryMap({ category }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [filmsDisplay, setFilmsDisplay] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Get first 5 films of category
    (async function fetchData() {
      try {
        const response = await api.get(
          `/films/category/${category.category_id}?page=1`
        );
        let response_films = response.films;
        let has_next = response.has_next;
        setFilms(response_films);
        setHasNext(has_next);
        setFilmsDisplay(response_films.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category]);

  async function fetchMore() {
    // Get next 5 films of category
    try {
      setIsLoading(true);
      const response = await api.get(
        `/films/category/${category.category_id}?page=${page + 1}`
      );
      setFilms(films.concat(response.films)); // films.concat(response);
      setHasNext(response.has_next);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  }

  function selectToDisplay(event: any) {
    // Select films to display
    const action = event.currentTarget.getAttribute("data-action");

    if (action === "back") {
      if (page > 1) {
        setPage(page - 1);
        setHasNext(true);
      }
    }

    if (action === "next") {
      // If films are not loaded fetch more
      if (films.length <= page * 5) fetchMore();
      else setPage(page + 1);
    }
  }

  useEffect(() => {
    setFilmsDisplay(films.slice((page - 1) * 5, page * 5));
    setHasPrevious(page > 1);
    setIsLoading(false);
  }, [page, films]);

  return (
    <div className="categoryMap">
      <h1 className="categoryTitle">{category.name}</h1>
      <div className="rentDiv">
        {hasPrevious && (
          <img
            src={NextIcon}
            alt="back"
            data-action="back"
            onClick={selectToDisplay}
            className="interactionButton backwardsButton"
          />
        )}
        <div className="rentList">
          {isLoading ? <LoadingSpinner /> : <FilmList films={filmsDisplay} />}
        </div>
        {hasNext && (
          <img
            src={NextIcon}
            alt="next"
            onClick={selectToDisplay}
            data-action="next"
            className="interactionButton nexButton"
          />
        )}
      </div>
    </div>
  );
}

export default CategoryMap;
