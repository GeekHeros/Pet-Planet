import {combineReducers} from "redux";
import homeStore from "./home/homeStore";
import publishStore from "./publish/publishStore";
import detailStore from "./detail/detailStore";

const rootReducer = combineReducers({
  homeStore,
  publishStore,
  detailStore
});

export default rootReducer;
