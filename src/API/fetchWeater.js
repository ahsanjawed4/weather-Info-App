import axios from "axios";
export const baseURL = "https://api.openweathermap.org";
export const API__KEY = "f33a484cf794d08d0148764789aaba32";

export async function fetchWeather(url) {
  const { data } = await axios.get(url);
  return data;
}
