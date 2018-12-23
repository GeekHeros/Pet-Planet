import {combineReducers} from "redux";
import homeStore from "./home/homeStore";
import detailStore from "./detail/detailStore";

const rootReducer = combineReducers({
  homeStore,
  detailStore
});

export default rootReducer;
