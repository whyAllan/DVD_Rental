import { useState, useEffect } from "react";
import api from "../api/api";

function Index() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/");
        setData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}

export default Index;
