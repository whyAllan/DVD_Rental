import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";
import FilmList from "./FilmList";

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") as string;

  const [films, setFilms] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get(`/search?q=${query}`);
        setFilms(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query]);

  if (!query) return <div>No query</div>;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container my-5">
      <h1>Search Results</h1>
      {films.length === 0 ? (
        <p>No films found</p>
      ) : (
        <div>
          <FilmList films={films} />
        </div>
      )}
    </div>
  );
}

export default SearchResults;
