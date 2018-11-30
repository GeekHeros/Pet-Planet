import cat from "../assets/cat.jpeg";
import white_dog from "../assets/white_dog.jpeg";
import dog from "../assets/dog.jpeg";
/**
 * TabBar标签页路由标题、图标以及角标配置
 * @尹文楷
 * @type {*[]}
 */
const tabBarTabList = [{
  title: "首页",
  iconPrefixClass: "iconfont",
  iconType: "petPlanet-planet"
}, {
  title: "我",
  iconPrefixClass: "iconfont",
  iconType: "petPlanet-me"
}];

/**
 * TabBar标签页路由路径
 * @尹文楷
 * @type {string[]}
 */
const pageCurrentList = [
  "/pages/index/index",
  "/pages/user/index"
];

/**
 * Card列表Mock配置
 * todo 后台接口的数据模型和结构还没写出来,写出来之后要删掉
 * @type {*[]}
 */
const mockCardList = [{
  title: "卖一只可爱的小猫",
  extra: "500",
  note: "Mix奇迹的时代",
  content: "我家小猫很可爱,有人要吗?",
  src: cat
}, {
  title: "卖一只可爱的小白狗",
  extra: "1000",
  note: "小郭",
  content: "我家小白狗很可爱,有人要吗??",
  src: white_dog
}, {
  title: "卖一只可爱的小狗狗",
  extra: "1899",
  note: "天外肥仙",
  content: "我家小狗狗很可爱,有人要吗???",
  src: dog
}];

const staticConfig = {
  tabBarTabList,
  pageCurrentList,
  mockCardList
};

module.exports = staticConfig;
