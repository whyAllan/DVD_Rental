import api from "../api/api";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import FilmList from "./FilmList";

function StoreView() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState<any>({});
  const [films, setFilms] = useState<any>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const page = useRef<number | null>(null);

  if (!page.current) page.current = 1;

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get(`/store/${id}`);
        setIsLoading(false);
        setStore(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  async function fetchMore() {
    // Get next 5 films of category
    if (!hasNext || !page.current) return;

    try {
      const response = await api.get(
        `/filter/store/${id}/?page=${page.current + 1}`
      );
      console.log(response);
      setFilms(films.concat(response.films));
      setHasNext(response.has_next);
      page.current = page.current + 1;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Get first films available in store
    (async function fetchData() {
      try {
        const response = await api.get(`/filter/store/${id}/?page=1`);
        setFilms(response.films);
        setHasNext(response.has_next);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="container my-5 p-5 film-view">
        <h1>Store {store.store_id}</h1>
        <hr />
        <div className="store-details">
          <p>
            <strong>Manager:</strong> {store.manager_staff.first_name}{" "}
            {store.manager_staff.last_name}
          </p>
          <p>
            <strong>Address:</strong> {store.address.address},{" "}
            {store.address.district}
          </p>
          <p>
            <strong>City:</strong> {store.address.city}
          </p>
          <p>
            <strong>Country:</strong> {store.address.country}
          </p>
        </div>
        <br />

        <h2>Films</h2>

        {films.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <div>
            <FilmList films={films} />

            {hasNext && (
              <p className="load-more" onClick={fetchMore}>
                Load More
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreView;
