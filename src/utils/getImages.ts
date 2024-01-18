import axios from "axios";
import { useState, useEffect } from "react";
import { getIdFromUrl } from "./getId";

export const getImages = async () => {
    const [data, setData] = useState<string>("");
    const id = getIdFromUrl();
    useEffect(() => {
      const fetchData = async () => {
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}/images`, {
            params: {
              api_key: "b00086f2110ba830d10d37d8ca34daa2",
            },
            headers: { accept: "application/json" },
          })
          .then((res) => {
            setData(res.data.backdrops[3].file_path);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchData();
    }, [id]);
  
    return data;
  };