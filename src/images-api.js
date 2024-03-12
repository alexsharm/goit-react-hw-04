import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: searchQuery,
      per_page: 8,
      page,
    },
    headers: {
      Authorization: "Client-ID QL3kDxjI5IFZSbgbqUrmBM7ark_IREdlHeorvq260q0",
      "Accept-Version": "v1",
    },
  });
  return response.data;
};
