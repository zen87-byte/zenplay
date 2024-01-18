import axios from "axios";
import { useState, useEffect } from "react";
import { genreType } from "./getGenre";

export interface detailsType{
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    genres: genreType[];
    overview: string;
    release_date: string;
    rating: number
  }
  
  export const getDetails = (id: number): detailsType => {
    const [data, setData] = useState<detailsType>({
      id: null,
      title: '',
      backdrop_path: '',
      poster_path: '',
      genres: [],
      overview: '',
      release_date: '',
      rating: null,
    });
  
    useEffect(() => {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: "b00086f2110ba830d10d37d8ca34daa2",
          },
          headers: { accept: "application/json" },
        })
        .then((res) => {
          setData({
            id: res.data.id,
            title: res.data.title,
            backdrop_path: res.data.backdrop_path,
            poster_path: res.data.poster_path,
            genres: res.data.genres,
            overview: res.data.overview,
            release_date: res.data.release_date,
            rating: res.data.vote_average,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, [id]);
  
    return data;
  };
  