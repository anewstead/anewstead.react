import axios from "axios";

import { MAIN_DATA_URL } from "../const";

// note. we return axios to a createAsyncThunk which handles success/fail
export const loadMainData = async () => {
  const url = MAIN_DATA_URL;
  return axios.get(url).then((res) => {
    return res.data;
  });
};
