import Taro from "@tarojs/taro";
import Tools from "../utils/petPlanetTools";
import {petPlanetPrefix, staticData} from "../utils/static";
import {getPetList, changeLoadStatus, setAttrValue} from "../actions/home";

function homeInfoRequest() {
  return (dispatch) => {
    const {homeStore} = this.props;
    const {pageSize, pageNum, petList} = homeStore;
    const params = {
      pageSize,
      pageNum
    };
    return Tools.request({
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

const homeAPI = {
  homeInfoRequest,
  publishImageUploadRequest
};

export default homeAPI;
