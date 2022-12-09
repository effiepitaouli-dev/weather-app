import { useContext } from "react";
import { CoordsContext } from "../pages";
import axios from "axios";
// https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
// Why axios over fetch() api

export function useFetch(queries: string) {
  const [lat, lng] = useContext(CoordsContext).coords;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}${queries}`;
  const fetch = async () => {
    return await axios.get(url, { timeout: 4000 })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(`${e.code} - ${e.message}`);
      });
  };
  return fetch;
};