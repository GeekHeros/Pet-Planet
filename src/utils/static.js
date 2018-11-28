/**
 * TabBar标签页路由标题、图标以及角标配置
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

const pageCurrentList = [
  "/pages/index/index",
  "/pages/user/index"
];

const staticConfig = {
  tabBarTabList,
  pageCurrentList
};

module.exports = staticConfig;
