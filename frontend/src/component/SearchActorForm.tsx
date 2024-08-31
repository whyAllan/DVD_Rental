import { useState, useEffect } from "react";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";

function SearchActorForm({ navigate }: any) {
  const [actors, setActors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length < 3) return;
    const timeout = setTimeout(async () => {
      setIsLoading(true);
      const response = await api.get(`/search/actors?q=${searchQuery}`);
      const data = response;
      setActors(data);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  function selectActor(event: any) {
    const id = event.target.getAttribute("data-value");
    if (!id) return;
    navigate(`/filter/actor/${id}`);
    setActors([]);
  }

  return (
    <div className="form-check search-form" data-bs-theme="dark">
      <input
        type="text"
        className="form-control"
        placeholder="Search actor"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />

      {actors.length > 0 ? (
        <div className="form-select">
          {actors.map((actor: any) => (
            <div
              key={actor.actor_id}
              className="selectable-option"
              onClick={selectActor}
              data-value={actor.actor_id}
            >
              {actor.first_name} {actor.last_name}
            </div>
          ))}
        </div>
      ) : (
        isLoading && (
          <div className="form-select">
            <LoadingSpinner />
          </div>
        )
      )}
    </div>
  );
}

export default SearchActorForm;
