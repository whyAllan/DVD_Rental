import { useState, useEffect } from "react";
import CategoryMap from "./CategoryMap";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";

function Index() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get("/get/category");
        setCategories(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isLoading) return <LoadingSpinner />;

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
