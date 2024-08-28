function FilmList({ films }: any) {
  return (
    <div className="filmCardList">
      <div className="row row-cols-5 row-cols-md-5 g-4">
        {films.map((film: any) => (
          <div className="col" key={film.film_id}>
            <div
              className="card text-bg-dark border-primary mb-3"
              onClick={() => (window.location.href = `/films/${film.film_id}`)}
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
  );
}

export default FilmList;
