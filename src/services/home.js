import Taro from "@tarojs/taro";
import Tools from "../utils/petPlanetTools";
import {petPlanetPrefix, staticData} from "../utils/static";
import {getPetList, changeLoadStatus, setAttrValue, changePageNum} from "../actions/home";

/**
 * 获取卖家想要交易售卖的宠物列表
 * @returns {function(*): (never|Promise<Taro.request.Promised<any>>|Promise<TaroH5.request.Promised>|*)}
 */
function homeInfoRequest() {
  return async (dispatch) => {
    const {homeStore} = this.props;
    const {pageSize, pageNum, petList} = homeStore;
    const params = {
      pageSize,
      pageNum
    };
    return await Tools.request({
      url: `${petPlanetPrefix}/tinyHome/homeInfo`,
      method: "GET",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: params,
      success: async (data) => {
        if (data.items.length > 0) {
          let petList_new = [...petList, ...data.items];
          await dispatch(getPetList({
            petList: petList_new,
            currentPetList: data.items
          }));
        }
        await dispatch(changeLoadStatus({
          loadStatus: staticData["loadStatusConfig"]["more"]
        }));
      },
      complete: async (res) => {

      }
    });
  };
}

/**
 * formId收集
 * @尹文楷
 * @param formId
 */
function getFormIdRequest(formId) {
  return async (dispatch) => {
    return await Tools.request({
      url: `${petPlanetPrefix}/tinyHome/formId`,
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: {
        formId
      },
      success: async (data) => {
        console.log(data);
      },
      complete: async (data) => {

      }
    });
  }
}

/**
 * 发布上传图片
 * @尹文楷
 */
function publishImageUploadRequest() {
  return async (dispatch) => {
    const {homeStore} = this.props;
    const {dialogData} = homeStore;
    const {publishData} = dialogData;
    let {files, uploadFilterFiles, images} = publishData;
    for (let [key, value] of uploadFilterFiles.entries()) {
      let uploadTask = await Tools.uploadFile({
        url: `${petPlanetPrefix}/tinyStatics/uploadImg`,
        filePath: value.file.path,
        name: "file",
        success: async (data) => {
          images = [...images, data];
          files = [...files, value];
          await dispatch(setAttrValue({
            dialogData: {
              publishData: {
                files,
                images
              }
            }
          }));
        },
        complete: async (res) => {

        }
      });
    }
  }
}

/**
 * 获取用户授权设置
 * @尹文楷
 */
function getSettingRequest() {
  return async (dispatch) => {
    return await Tools.getSettingConfig({
      success: async (authSetting) => {
        if (authSetting["scope.userLocation"]) {
          await dispatch(chooseLocationRequest());
          await dispatch(setAttrValue({
            dialogData: {
              publishData: {
                isLocationAuthorize: true
              }
            }
          }));
        } else {
          await dispatch(setAttrValue({
            dialogData: {
              publishData: {
                isLocationAuthorize: false,
                area: "点击定位"
              }
            }
          }));
        }
      },
      complete: async (res) => {

      }
    });
  };
}

/**
 * 获取用户当前的位置信息
 * @尹文楷
 */
function chooseLocationRequest() {
  return async (dispatch) => {
    return await Tools.chooseLocationConfig({
      success: async (name, address) => {
        dispatch(setAttrValue({
          dialogData: {
            publishData: {
              area: address
            }
          }
        }));
      },
      fail: async (res) => {

      },
      complete: async (res) => {

      }
    });
  }
}

/**
 * 向用户发起授权请求
 * @尹文楷
 */
function authorizeRequest(scope) {
  return async (dispatch) => {
    return await Tools.authorizeConfig({
      scope,
      success: async () => {
        await dispatch(chooseLocationRequest());
        await dispatch(setAttrValue({
          dialogData: {
            publishData: {
              isLocationAuthorize: true
            }
          }
        }));
      },
      fail: async (res) => {

      },
      complete: async (res) => {

      }
    });
  }
}

/**
 * 发布宠物交易
 * @returns {function(*): (never|Promise<Taro.request.Promised<any>>|Promise<TaroH5.request.Promised>|*)}
 */
function publishItemRequest() {
  return async (dispatch) => {
    const {homeStore} = this.props;
    const {dialogData} = homeStore;
    const {publishData} = dialogData;
    const {content, images, area, title, cost, includeVideo, formId} = publishData;
    const params = {
      content,
      images,
      area,
      title,
      cost,
      includeVideo,
      formId
    };
    return await Tools.request({
      url: `${petPlanetPrefix}/tinyHome/publishItem`,
      method: "POST",
      header: {
        "content-type": "application/json"
      },
      data: params,
      success: async (data) => {
        await dispatch(setAttrValue({
          dialogShowOrHidden: {
            isPublishOpened: false
          },
          dialogData: {
            publishData: {
              content: null,
              files: [],
              uploadFilterFiles: [],
              images: [],
              title: null,
              cost: null,
              formId: null
            }
          }
        }));
        await dispatch(changePageNum({
          petList: []
        }));
        await dispatch(changePageNum({
          pageNum: 1
        }));
        await dispatch(homeInfoRequest.apply(this));
      },
      complete: async (res) => {

      }
    });
  };
}

const homeAPI = {
  homeInfoRequest,
  publishImageUploadRequest,
  getFormIdRequest,
  getSettingRequest,
  authorizeRequest,
  chooseLocationRequest,
  publishItemRequest
};

export default homeAPI;
