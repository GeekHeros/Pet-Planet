import {homeConstants} from "../../constants";


const defaultState = {
  current: 0,
  tabList: [{
    title: "首页",
    iconPrefixClass: "iconfont",
    iconType: "petPlanet-planet"
  }, {
    title: "我",
    iconPrefixClass: "iconfont",
    iconType: "petPlanet-me"
  }]
};

/**
 * 页面公用的事件全都放在homeStore里面
 * @param state
 * @param type
 * @param payload
 * @returns {{current: null}}
 */
export default function homeStore(state = defaultState, {type, payload}) {
  switch (type) {
    //通过onClick事件来更新current值变化
    case homeConstants["CHANGE_CURRENT"]:
      return Object.assign({}, state, payload);
    default:
      break;
  }
  return state;
}
