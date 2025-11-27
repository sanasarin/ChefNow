import axios from "axios";
import useToken from "./useToken";

export default function useAuthToken() {
  const { token } = useToken();

  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
}
