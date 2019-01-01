import Taro, {Component} from '@tarojs/taro';
import {connect} from "@tarojs/redux";
import {View} from "@tarojs/components";
import {
  AtTabBar,
  AtForm,
  AtButton,
  AtIcon
} from 'taro-ui';
import CardView from "../../components/bussiness-components/CardView";
import {changeCurrent, changePageNum, changeLoadStatus, setAttrValue} from "../../actions/home";
import {homeAPI} from "../../services";
import {tabBarTabList, pageCurrentList, staticData} from "../../utils/static";
import "./iconfont/iconfont.less";
import "./index.less";
import "./card-view.less";


@connect((state) => {
  return {
    ...state,
    homeStore: state.homeStore
  }
}, (dispatch) => {
  return {
    /**
     * 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成
     * @尹文楷
     * @returns {Promise<void>}
     */
    async getLoginSessionHandler(homeInfoHandler) {
      await dispatch(homeAPI.getLoginSession.apply(this, [homeInfoHandler]));
    },
    /**
     * 通过onClick事件来更新current值变化
     * @param value
     */
    async changeCurrentHandler(value) {
      await dispatch(changeCurrent({current: value}));
      await Taro.redirectTo({
        url: pageCurrentList[`${value}`]
      });
    },
    /**
     * 获取小程序首页信息
     * @尹文楷
     */
    async homeInfoHandler(pageNum) {
      if (pageNum === 1) {
        await dispatch(changePageNum({
          petList: []
        }));
      }
      await dispatch(changePageNum({
        pageNum
      }));
      await dispatch(homeAPI.homeInfoRequest.apply(this));
    },

    /**
     * formId收集
     * @尹文楷
     * @params formId
     * @returns {Promise<void>}
     */
    async getFormIdHandler(formId) {
      await dispatch(homeAPI.getFormIdRequest.apply(this, [formId]));
    },

    /**
     * 改变滚动加载的AtLoadMore的状态
     * @尹文楷
     */
    async changeLoadStatusHandler(loadStatus) {
      await dispatch(changeLoadStatus({
        loadStatus
      }));
    },

    /**
     * 获取宠物发布之后的内容详情
     * @尹文楷
     * @param id
     * @returns {Promise<void>}
     */
    async getPetDetailInfoHandler(id) {
      await dispatch(homeAPI.getPetDetailRequest.apply(this, [id]));
    },

    /**
     * 改变redux store里面的数据状态
     * @尹文楷
     */
    async setAttrValueHandler(payload) {
      await dispatch(setAttrValue(payload));
    }
  }
})
class Index extends Component {

  static options = {
    addGlobalClass: true
  };

  config = {
    navigationBarTitleText: "首页"
  };

  async componentDidMount() {
    const {homeInfoHandler, changeLoadStatusHandler, getLoginSessionHandler} = this.props;
    const cookie = Taro.getStorageSync("petPlanet");
    if (!cookie) {
      await getLoginSessionHandler.apply(this, [homeInfoHandler]);
    } else {
      await homeInfoHandler.apply(this, [1]);
    }
    await changeLoadStatusHandler("more");
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
    Taro.showShareMenu({
      withShareTicket: true
    });
  }

  componentDidHide() {
  }

  /**
   * 监听用户点击页面内转发按钮或右上角菜单“转发”按钮的行为，并自定义转发内容。
   * @param from
   * @param target
   * @param webViewUrl
   */
  onShareAppMessage({from, target, webViewUrl}) {

  }

  /**
   * 当滚动条滚到底部的时候进行上拉加载动作
   * @尹文楷
   */
  async onScrollToLower() {
    const {homeStore, homeInfoHandler, changeLoadStatusHandler} = this.props;
    let {pageNum, currentPetList, loadStatus} = homeStore;
    if (currentPetList.length === staticData["pageSize"] && loadStatus === staticData["loadStatusConfig"]["more"]) {
      await changeLoadStatusHandler(staticData["loadStatusConfig"]["loading"]);
      await homeInfoHandler.apply(this, [++pageNum]);
    }
  }

  /**
   * 点击发起宠物交易的Submit事件
   * @尹文楷
   */
  async onSubmitHandler(event) {
    const {getFormIdHandler} = this.props;
    await getFormIdHandler.apply(this, [event.target.formId]);
  }

  /**
   * 获取详情页内容
   * @尹文楷
   **/
  async getPetDetailHandler(id) {
    const {getPetDetailInfoHandler} = this.props;
    await getPetDetailInfoHandler.apply(this, [id]);
  }

  render() {
    const {homeStore, changeCurrentHandler} = this.props;
    const {current, petList, loadStatus} = homeStore;
    return (
      <View className='pet'>
        {/*首页宠物交易列表区域*/}
        <CardView
          list={petList}
          onScrollToLower={this.onScrollToLower}
          onClick={this.getPetDetailHandler}
          loadStatus={loadStatus}
        />
        {/*按钮发布区域: 使用formId进行发起一次有formId的模板消息请求*/}
        <AtForm
          reportSubmit={true}
          style='border:none'
          onSubmit={this.onSubmitHandler}
          className='pet-business-deal'
        >
          <AtButton
            size='small'
            type='primary'
            className='pet-business-deal-add'
            formType='submit'
          >
            <AtIcon
              value='add'
              className='pet-business-deal-add-icon'
              size={26}
              color='#fff'
            />
          </AtButton>
        </AtForm>
        {/*导航区域: 分首页和我两个部分*/}
        <AtTabBar
          fixed
          current={current}
          tabList={tabBarTabList}
          onClick={changeCurrentHandler}
        />
      </View>
    )
  }
}

export default Index;
