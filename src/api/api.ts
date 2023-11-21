import axios, { AxiosInstance } from "axios";
import API_ROUTE, { BASE_URL } from "../utils/ApiRoute";
import store from "../states";

export default class HttpService {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      withCredentials: true,
      baseURL: BASE_URL,
    });

    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.message === "Network Error") {
          alert("Error Network");
          //   store.dispatch(
          //     setAlert({
          //       alert: {
          //         text: "Unable to reach server. Please try again later.",
          //         alert: "error",
          //         isOpen: true,
          //       },
          //     }),
          //   );
        }
        return Promise.reject(err);
      },
    );
  }
}
