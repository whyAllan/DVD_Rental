import { useState } from "react";
import api from "../api/api";

function Filter() {
  const filterTypes = {
    // Filter types and class names
    categories: ".categories-filter",
    actor: ".actor-filter",
    language: ".language-filter",
    store: ".store-filter",
  };

  const [categories, setCategories] = useState<any>([]);
  const languages = [{ language_id: 1, name: "English" }]; // Hardcoded Cause English is the only language
  const [stores, setStores] = useState<any>([]);

  function selectFilter(event: any) {
    const type = event.target.value;
    if (!type) return console.log("No type");

    Object.keys(filterTypes).forEach((filterType) => {
      const filterElement = document.querySelector(
        filterTypes[filterType as keyof typeof filterTypes]
      );
      if (filterType === type) {
        filterElement?.classList.remove("d-none");
      } else {
        filterElement?.classList.add("d-none");
      }
    });

    // Get data
    (async function fetchfilterData() {
      try {
        const response = await api.get(`/get/${type}`);
        if (type === "categories") setCategories(response);
        // if (type === "language") setLanguages(response);
        if (type === "store") setStores(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  return (
    <div className="container my-5">
      <h1>Filter</h1>
      <select
        name="type"
        id="type"
        className="form-select"
        data-bs-theme="dark"
        onChange={selectFilter}
        defaultValue=""
      >
        <option value="" disabled>
          Select
        </option>
        <option value="categories">Category</option>
        <option value="actor">Actor</option>
        <option value="language">Language</option>
        <option value="store">Store</option>
      </select>

      <hr />

      <div className="categories-filter w-100 d-none">
        <h3>Category</h3>

        <div className="form-check">
          <select
            className="form-select"
            data-bs-theme="dark"
            defaultValue={""}
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
  );
}

export default Filter;
