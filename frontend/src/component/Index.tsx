import { useState, useEffect } from "react";
import CategoryMap from "./CategoryMap";
import api from "../api/api";

function Index() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get("/categories");
        setCategories(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="">
      <br />
      {categories.map((category: any) => (
        <div key={category.category_id}>
          <CategoryMap category={category} />

          <br />
        </div>
      ))}
    </div>
  );
}

export default Index;
