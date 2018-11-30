import {homeConstants} from "../../constants/index";
/**
 * 通过onClick事件来更新current值变化
 * @y尹文楷
 */
export function changeCurrent(payload) {
  return {
    type: homeConstants["CHANGE_CURRENT"],
    payload
  }
}
