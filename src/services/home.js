import Tools from "../utils/petPlanetTools";
import {petPlanetPrefix, staticData} from "../utils/static";
import {getPetList, changeLoadStatus} from "../actions/home";

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
      }
    });
  };
}

const homeAPI = {
  homeInfoRequest
};

export default homeAPI;
