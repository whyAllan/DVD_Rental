import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";
import HouseIcon from "../icons/house.svg";

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

  function navigate(event: any) {
    const type = event.currentTarget.getAttribute("data-type");
    const id = event.currentTarget.getAttribute("data-id");
    if (!id || !type) return console.log("No id or type");

    window.location.href = `#/filter/${type}/${id}`;
  }

  return (
    <>
      <div className="container my-5 p-5 film-view">
        <h1>{film.film.title}</h1>

        <br />

        <h2>Description</h2>
        <p>{film.film.description}</p>

        <br />
        <h2>Details</h2>

        <div className="row">
          <div className="col">
            <p>
              <strong>Release Year:</strong> {film.film.release_year}
            </p>
            <p>
              <strong>Length:</strong> {film.film.length} minutes
            </p>
            <p>
              <strong>Category:</strong>{" "}
              <span
                data-id={film.category.category_id}
                data-type="category"
                className="selectable"
                title={"See more"}
                onClick={navigate}
              >
                {film.category.category}
              </span>
            </p>

            <div>
              <strong>Actors:</strong>{" "}
              {film.actors.map((actor: any, index: number) => (
                <span key={actor.actor_id}>
                  <span
                    className="selectable"
                    data-id={actor.actor_id}
                    data-type="actor"
                    title={"See more"}
                    onClick={navigate}
                  >
                    {actor.actor}
                  </span>

                  {index < film.actors.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>

          <div className="col">
            <p>
              <strong>Language:</strong>{" "}
              <span
                className="selectable"
                title={"See more"}
                onClick={navigate}
                data-id={film.film.language_id}
                data-type="language"
              >
                {film.film.language}
              </span>
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
          </div>

          <div className="col">
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
              {film.stores.length > 0 ? (
                <>
                  <strong>Available in:</strong>
                  <ul>
                    {film.stores.map((store: any) => (
                      <p
                        key={store.store_id}
                        className="goto-store"
                        onClick={() =>
                          (window.location.href = `#/store/${store.store_id}`)
                        }
                      >
                        <li>
                          <img
                            src={HouseIcon}
                            alt="House icon"
                            className="house-icon"
                            title="go to store"
                          />
                          {store.address.city}, {store.address.country}
                        </li>
                      </p>
                    ))}
                  </ul>
                </>
              ) : (
                <strong className="text-danger">Not available</strong>
              )}
            </div>
          </div>
        </div>

        <br />

        <h1>Rental History</h1>

        {film.rentals.length > 0 ? (
          <table
            className="table table-dark table-striped"
            data-bs-theme="dark"
          >
            <thead>
              <tr>
                <th>Rental Date</th>
                <th>Customer</th>
                <th>Staff</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {film.rentals.map((rental: any) => (
                <tr key={rental.rental_id}>
                  <td> {new Date(rental.rental_date).toLocaleDateString()}</td>
                  <td>{rental.customer}</td>
                  <td>{rental.staff}</td>
                  <td>
                    {rental.return_date
                      ? new Date(rental.return_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-danger">No rental history</p>
        )}
      </div>
    </>
  );
}

export default FilmView;
