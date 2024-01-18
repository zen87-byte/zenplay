import axios from "axios";
import { useState, useEffect } from "react";

export interface genreType{
  id: number;
  name: string;
}

export const getGenre = ({ endpoint }: { endpoint: string }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios
        .get(`https://api.themoviedb.org/3/${endpoint}`, {
          params: {
            api_key: "b00086f2110ba830d10d37d8ca34daa2",
          },
          headers: { accept: "application/json" },
        })
        .then((res) => {
          setData(res.data.genres);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [endpoint]);
  
    return data;
  };