import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: {
    _id: "5cd96e05de30eff6ebcce7ec",
    dialog: "Give us that! Deagol my love",
    movie: "5cd95395de30eff6ebccde5d",
    character: "5cd99d4bde30eff6ebccfe9e",
    id: "5cd96e05de30eff6ebcce7ec",
  },
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
      return { ...state, favs: [...state.favs, action.payload] };

    case FAV_REMOVE:
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
