import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import api from "../api/api";
import FilmList from "./FilmList";
import { useNavigate } from "react-router-dom";

function FilteredList() {
  const navigate = useNavigate();
  // Filter stuff
  const [categories, setCategories] = useState<any>([]);
  const languages = [{ language_id: 1, name: "English" }]; // Hardcoded Cause English is the only language
  const [stores, setStores] = useState<any>([]);

  // Films stuff
  const { type, id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState<any>([]);

  // Pagination stuff
  const [hasNext, setHasNext] = useState<boolean>(true);
  const page = useRef<number | null>(null);
  if (!page.current) page.current = 1;

  /////////////////// FILTER STUFF ///////////////////

  const filterTypes = {
    // Filter types and class names
    category: ".category-filter",
    actor: ".actor-filter",
    language: ".language-filter",
    store: ".store-filter",
  };

  async function fetchfilterData(filter: string) {
    // Make sure selected filter is visible
    Object.keys(filterTypes).forEach((filterType) => {
      const filterElement = document.querySelector(
        filterTypes[filterType as keyof typeof filterTypes]
      );
      if (filterType === filter) {
        filterElement?.classList.remove("d-none");
      } else {
        filterElement?.classList.add("d-none");
      }
    });
    // Get data

    try {
      const response = await api.get(`/get/${filter}`);
      if (filter === "category") setCategories(response);
      // if (filter === "language") setLanguages(response);
      if (filter === "store") setStores(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Make sure selected filter is visible
  useEffect(() => {
    if (type && id) {
      fetchfilterData(type);
    }
  }, [type, id]);

  function selectFilter(event: any) {
    const value = event.target.value;
    if (!value) return console.log("No value");
    fetchfilterData(value);
  }

  function ApplyFilter(event: any) {
    event.preventDefault();

    const type = event.currentTarget.getAttribute("data-type");
    const id = event.target.value;
    if (!type || !id) return console.log("No type or id");

    navigate(`/filter/${type}/${id}`);
  }

  //////////////////// FILMS & PAGINATION STUFF ///////////////////

  useEffect(() => {
    if (!type || !id) return; // No type or id

    // Get films
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

  /////////////////// RETURN STUFF ///////////////////
  return (
    <div>
      <div className="container my-5">
        <h1>Filter</h1>
        <select
          name="type"
          id="SelectFilter"
          className="form-select"
          data-bs-theme="dark"
          onChange={selectFilter}
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          <option value="category">Category</option>
          <option value="actor">Actor</option>
          <option value="language">Language</option>
          <option value="store">Store</option>
        </select>

        <hr />

        <div className="category-filter w-100 d-none">
          <h3>Category</h3>

          <div className="form-check">
            <select
              className="form-select"
              data-bs-theme="dark"
              defaultValue={""}
              onChange={ApplyFilter}
              data-type="category"
            >
              <option value="" disabled>
                Select
              </option>
              {categories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="actor-filter d-none">
          <h3>Actor</h3>

          <div className="form-check search-form" data-bs-theme="dark">
            <input
              type="search"
              className="form-control"
              placeholder="Search actor"
            />
            <button className="btn btn-outline-primary">Search</button>
          </div>
        </div>

        <div className="language-filter d-none">
          <h3>Language</h3>

          <div className="form-check">
            <ul className="list-group" data-bs-theme="dark">
              {languages.map((language: any) => (
                <li className="list-group-item" key={language.language_id}>
                  {language.name} (only English available)
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="store-filter d-none">
          <h3>Store</h3>

          <div className="form-check">
            <select
              className="form-select"
              data-bs-theme="dark"
              defaultValue={""}
            >
              <option value="" disabled>
                Select
              </option>
              {stores.map((store: any) => (
                <option className="list-group-item" key={store.store_id}>
                  {store.store_id}: {store.address.address},{" "}
                  {store.address.district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        films.length > 0 && (
          <div className="container my-5">
            <h1>
              Results for {type}: {id}
            </h1>
            <FilmList films={films} />
            {hasNext && (
              <p className="load-more" onClick={fetchMore}>
                Load More
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default FilteredList;
