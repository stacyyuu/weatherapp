import axios from "axios";

const URL = process.env.REACT_APP_API;
const API_KEY = process.env.REACT_APP_KEY

export const getWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "imperial",
      APPID: API_KEY,
    },
  });
  
  return data;
};

