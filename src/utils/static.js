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
  price: "500",
  username: "Mix奇迹的时代",
  src: cat,
  like: 36,
  address: "北京市"
}, {
  title: "卖一只可爱的小白狗",
  price: "1000",
  username: "小郭",
  src: white_dog,
  like: 80,
  address: "山东省烟台市"
}, {
  title: "卖一只可爱的小狗狗",
  price: "1899",
  username: "天外肥仙",
  src: dog,
  like: 50,
  address: "浙江省杭州市"
}];

const staticConfig = {
  tabBarTabList,
  pageCurrentList,
  mockCardList
};

module.exports = staticConfig;
