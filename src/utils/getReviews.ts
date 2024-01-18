import axios from "axios";
import { useState, useEffect } from "react";
import { getIdFromUrl } from "./getId";

export interface reviewsType {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
}

export const getReviews = (id): reviewsType[] => {
  const [data, setData] = useState<reviewsType[]>([
    {
      author: "",
      author_details: {
        name: "",
        username: "",
        avatar_path: null,
        rating: null,
      },
      content: "",
      created_at: "",
      updated_at: "",
    },
  ]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
        params: {
          api_key: "b00086f2110ba830d10d37d8ca34daa2",
        },
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        const reviews = res.data.results.map((review) =>(
          {
            author: review.author,
            author_details: {
              name: review.author_details.name,
              username: review.author_details.username,
              avatar_path: review.author_details.avatar_path,
              rating: review.author_details.rating,
            },
            content: review.content,
            created_at: review.created_at,
            updated_at: review.updated_at,
          }
        ))
        setData([...reviews])
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return data;
};
