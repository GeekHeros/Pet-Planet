import Taro from "@tarojs/taro";
import multipleToNull from "./multipleToNull";
import compareAdd from "./compareAdd";
import requests from "./requests";
import uploadFile from "./uploadFile";

const PetPlanetTools = (function () {
  class PetPlanetTools {
    constructor() {
      this.wx = Taro;
    }

    /**
     * 定义多层处理对象属性值为null的函数
     * 在设置为父级底下多层属性值为null的情况下使用
     * @param state
     */
    toNullAll(state) {
      return multipleToNull(state);
    }

    /**
     * 定义多层处理对象属性值在不按照state模板的情况下,payload添加属性和属性值的情况下使用
     * 概括起来就是用于添加state属性使用
     * @param state
     * @param payload
     * @returns {*}
     */
    compare(state, payload) {
      return compareAdd(state, payload);
    }

    /**
     * wx请求方法封装
     */
    request(params) {
      return requests.apply(this.wx, [params]);
    }

    /**
     * wx上传文件方法封装
     * @param params
     */
    uploadFile(params) {
      return uploadFile.apply(this.wx, [params]);
    }
  }

  return new PetPlanetTools();
})();

export default PetPlanetTools;
