import {publishConstants} from "../../constants";
import Tools from "../../utils/petPlanetTools";
import _ from "lodash";

const defaultState = {
  //用来校验用户是否拒绝了获取定位授权请求
  isRefusedModal: false,
  //用来校验用户是否授权获取定位
  isLocationAuthorize: false,
  //用于对于宠物的描述
  content: null,
  //用于上传宠物的图片
  files: [],
  //用于上传的图片
  uploadFilterFiles: [],
  //用于发布接口的图片
  images: [],
  //发布时用于提供定位
  area: "点击定位",
  //用于对于宠物的标题
  title: null,
  //用于对于宠物的价格
  cost: null,
  //是否含有视频
  includeVideo: false,
  //用于对于发起模板消息的formId
  formId: null,
  //用于卖方的联系方式
  contactInfo: null,
  //用于登录,将微信与后台服务器绑定,建立会话
  //@尹文楷
  cookie: null
};

export default function publishStore(state = defaultState, {type, payload}) {
  switch (type) {
    case publishConstants["SET_PUBLISH_ATTR_VALUE"]:
      return (function multiple(oldState, newState) {
        let stateChange = oldState;
        //用于在不按照state模板的情况下,payload添加属性和属性值的情况下使用
        stateChange = Tools.compare(stateChange, newState);
        for (let [key, value] of Object.entries(stateChange)) {
          //这里严格判断value是否是对象{},不能使用typeof,原因自己查
          if (Object.prototype.toString.call(value) === "[object Object]" && newState[key] !== undefined && newState[key] !== null) {
            stateChange[key] = multiple(value, newState[key]);
          } else {
            if (newState[key] !== undefined && newState[key] !== null) {
              stateChange[key] = newState[key];
            }
            if (newState[key] === null) {
              stateChange[key] = null;
            }
          }
        }
        return stateChange;
      })(_.cloneDeep(state), payload);
    default:
      break;
  }
  return state;
}
