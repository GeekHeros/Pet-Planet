import Taro from "@tarojs/taro";
import requests from "./requests";

const PetPlanetTools = (function () {
  class PetPlanetTools {
    constructor() {
      this.wx = Taro;
    }

    /**
     * wx请求方法封装
     */
    request(params) {
      return requests.apply(this.wx, [params]);
    }
  }

  return new PetPlanetTools();
})();

export default PetPlanetTools;
