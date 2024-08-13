import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function FilmView() {
  const { id } = useParams();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await api.get(`/film/${id}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return <div></div>;
}

export default FilmView;
