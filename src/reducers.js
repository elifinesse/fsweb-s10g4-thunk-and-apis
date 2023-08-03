import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";
import { toast } from "react-toastify";
import { fetchAnother } from "./actions";

const initial = {
  favs: readFavsFromLocalStorage() === null ? [] : readFavsFromLocalStorage(),
  current: {},
  error: "",
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      toast.success("🧝‍♀️Successfully added to favorites, precious!💍", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const newState = { ...state, favs: [...state.favs, action.payload] };
      writeFavsToLocalStorage(newState);
      return newState;

    case FAV_REMOVE:
      writeFavsToLocalStorage({
        ...state,
        favs: state.favs.filter((quote) => quote.id !== action.payload),
      });
      return {
        ...state,
        favs: state.favs.filter((quote) => quote.id !== action.payload),
      };

    case FETCH_SUCCESS:
      return { ...state, loading: false, current: action.payload };

    case FETCH_LOADING:
      return { ...state, loading: action.payload, current: {} };

    case FETCH_ERROR:
      return { ...state, error: action.payload, current: {}, loading: false };

    case GET_FAVS_FROM_LS:
      return state;

    default:
      return state;
  }
}
