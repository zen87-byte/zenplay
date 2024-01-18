import axios from "axios";
import { useState, useEffect } from "react";
import { getIdFromUrl } from "./getId";

export const fetchData = async (endpoint: string) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
    {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
      headers: { accept: "application/json" },
    }
  );
  const data = response.data;
  return data;
};


