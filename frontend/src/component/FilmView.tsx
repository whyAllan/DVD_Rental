import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";

function FilmView() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState<any>({});

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get(`/film/${id}`);
        setIsLoading(false);
        setFilm(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="container">
        <h1>{film.film.title}</h1>

        <br />

        <h2>Description</h2>
        <p>{film.film.description}</p>

        <br />
        <h2>Details</h2>
        <p>
          <strong>Release Year:</strong> {film.film.release_year}
        </p>

        <p>
          <strong>Length:</strong> {film.film.length} minutes
        </p>

        <p>
          <strong>Category:</strong> {film.category.category}
        </p>

        <p>
          <strong>Actors:</strong>{" "}
          {film.actors.map((actor: any) => actor.actor).join(", ")}
        </p>

        <p>
          <strong>Language:</strong> {film.film.language}
        </p>

        <p>
          <strong>Rental Duration:</strong> {film.film.rental_duration} days
        </p>

        <p>
          <strong>Rental Rate:</strong> ${film.film.rental_rate}
        </p>

        <p>
          <strong>Replacement Cost:</strong> ${film.film.replacement_cost}
        </p>

        <p>
          <strong>Rating:</strong> {film.film.rating}
        </p>

        <p>
          <strong>Special Features:</strong>{" "}
          {film.film.special_features
            .map((feature: string) => feature)
            .join(", ")}
        </p>

        <div className="availability">
          <strong>Available in:</strong>

          <ul>
            {film.cities.map((city: any) => (
              <li key={city.city_id}>
                {city.city}, {city.country}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FilmView;
