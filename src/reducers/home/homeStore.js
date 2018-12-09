import {homeConstants} from "../../constants";
import {staticData} from "../../utils/static";


const defaultState = {
  current: 0,
  pageNum: 1,
  pageSize: staticData["pageSize"],
  //宠物交易列表
  //@尹文楷
  petList: [],
  //当前页的宠物交易列表的数量
  //@尹文楷
  currentPetList: [],
  //组件状态，more 状态显示查看更多按钮，loading 状态显示加载状态，noMore 显示无更多数据
  //@尹文楷
  loadStatus: 'more'
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
    //改变分页码
    case homeConstants["CHANGE_PAGE_NUM"]:
    //获取宠物交易列表
    case homeConstants["GET_PET_LIST"]:
    //改变滚动加载的AtLoadMore的状态
    case homeConstants["CHANGE_LOAD_STATUS"]:
      return Object.assign({}, state, payload);
    default:
      break;
  }
  return state;
}
