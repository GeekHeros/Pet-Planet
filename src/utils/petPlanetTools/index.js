import Taro from "@tarojs/taro";
import multipleToNull from "./multipleToNull";
import compareAdd from "./compareAdd";
import requests from "./requests";
import uploadFile from "./uploadFile";
import {getSetting, chooseLocation, authorize, openSetting} from "./getSetting";
import loginCode from "./loginCode";

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

    /**
     * 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成
     * @尹文楷
     * @param params
     */
    login(params) {
      return loginCode.apply(this.wx, [params]);
    }

    /**
     * 获取用户当前的设置
     * @尹文楷
     * @param params
     */
    getSettingConfig(params) {
      return getSetting.apply(this.wx, [params]);
    }

    /**
     * 调起客户端小程序设置界面，返回用户设置的操作结果
     * @尹文楷
     * @param params
     */
    openSettingConfig(params) {
      return openSetting.apply(this.wx, [params]);
    }

    /**
     * 向用户发起授权请求
     * @尹文楷
     * @param params
     */
    authorizeConfig(params) {
      return authorize.apply(this.wx, [params]);
    }

    /**
     * 获取用户当前的位置信息
     * @尹文楷
     * @param params
     */
    chooseLocationConfig(params) {
      return chooseLocation.apply(this.wx, [params]);
    }
  }

  return new PetPlanetTools();
})();

export default PetPlanetTools;
