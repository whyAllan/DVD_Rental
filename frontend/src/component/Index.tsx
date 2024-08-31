import { useState, useEffect, useRef } from "react";
import CategoryMap from "./CategoryMap";
import api from "../api/api";
import LoadingSpinner from "./LoadingSpinner";

function Index() {
  const [categories, setCategories] = useState([]);
  const [paginatedCategories, setPaginatedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page = useRef<number | null>(null);

  if (!page.current) page.current = 1;

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get("/get/category");
        setCategories(response);
        setPaginatedCategories(response.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function nextCategories() {
    if (!categories || !page.current) return;
    // More 5 categories

    if (categories.length <= page.current * 5) return;
    setPaginatedCategories(categories.slice(0, page.current * 5 + 5));
    page.current = page.current + 1;
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="">
      <br />
      {paginatedCategories.map((category: any) => (
        <div key={category.category_id}>
          <CategoryMap category={category} />

          <br />
        </div>
      ))}

      {categories.length > page.current * 5 && (
        <div className="text-center">
          <p className="load-more" onClick={() => nextCategories()}>
            Load more
          </p>
        </div>
      )}
    </div>
  );
}

export default Index;
