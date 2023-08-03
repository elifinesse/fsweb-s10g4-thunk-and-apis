import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (id) => {
  return { type: FAV_REMOVE, payload: id };
};

const token = "dWc971lVwGOBKEFsVooJ";

const baseURL = "https://the-one-api.dev/v2/";

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const fetchAnother = () => (dispatch) => {
  dispatch({ type: FETCH_LOADING, payload: true });

  return api
    .get("https://the-one-api.dev/v2/quote")
    .then((res) => {
      const quotesLength = res.data.docs.length;
      const random = Math.floor(Math.random() * quotesLength);
      const quote = res.data.docs[random];
      dispatch({
        type: FETCH_SUCCESS,
        payload: quote,
      });
    })
    .catch((err) =>
      dispatch({ type: FETCH_ERROR, payload: `${err.name} : ${err.message}` })
    );
};
