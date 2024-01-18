import { useState, useEffect } from "react";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDAwODZmMjExMGJhODMwZDEwZDM3ZDhjYTM0ZGFhMiIsInN1YiI6IjY0OGM4OWFhMDc2Y2U4MDBhZDcyYjlmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GBTW1UV81mVUui2vRmHF7HL31dcH_VJPtDfTaI5eBII",
  },
};
export async function getQuerySearch(endpoint: string | string[]) {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/search/multi?query=${endpoint}`, {
        params: {
          api_key: "b00086f2110ba830d10d37d8ca34daa2",
        },
        headers: { accept: "application/json" },
      })
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);
  return data;
}
