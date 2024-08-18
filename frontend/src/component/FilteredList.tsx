import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import api from "../api/api";
import FilmList from "./FilmList";

function FilteredList() {
  const { type, id } = useParams();
  if (!id || !type) console.log("No id or type");

  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState<any>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const page = useRef<number | null>(null);

  if (!page.current) page.current = 1;

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get(
          `/filter/${type}/${id}/?page=${page.current}`
        );
        setIsLoading(false);
        setFilms(response.films);
        setHasNext(response.has_next);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [type, id]);

  async function fetchMore() {
    // Get next 5 films of category
    if (!hasNext || !page.current) return;
    try {
      const response = await api.get(
        `/filter/${type}/${id}/?page=${page.current + 1}`
      );
      setFilms(films.concat(response.films)); // films.concat(response);
      setHasNext(response.has_next);
      page.current = page.current + 1;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="my-5">More of this {type}</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container my-5">
          <FilmList films={films} />
          {hasNext && (
            <p className="load-more" onClick={fetchMore}>
              Load More
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FilteredList;
