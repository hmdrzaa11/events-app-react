import axios from "axios";

let eventsApi = axios.create({
  baseURL: "http://localhost:8000",
});

export default eventsApi;
