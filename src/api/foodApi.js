import axios from "axios";

const foodApi = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1/",
  params: {
    api_key: "yMH77d0GuLLWPxTOt8ZHvlePnbgGG6wdXjpRXu9d",
  },
});

export default foodApi;
