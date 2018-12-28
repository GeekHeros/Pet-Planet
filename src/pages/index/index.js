import Taro, {Component} from '@tarojs/taro';
import {View, Image, ScrollView} from "@tarojs/components";
import {
  AtTabBar,
  AtForm,
  AtButton,
  AtIcon,
  AtCard,
  AtLoadMore
} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent, changePageNum, changeLoadStatus, setAttrValue} from "../../actions/home";
import {homeAPI} from "../../services";
import {tabBarTabList, pageCurrentList, staticData} from "../../utils/static";
import "./iconfont/iconfont.less";
import "./index.less";


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
    await getLoginSessionHandler.apply(this, [homeInfoHandler]);
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
    if (currentPetList.length < staticData["pageSize"] && loadStatus === staticData["loadStatusConfig"]["more"]) {
      await changeLoadStatusHandler(staticData["loadStatusConfig"]["noMore"]);
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
        <ScrollView
          scrollY
          className='pet-business'
          scrollTop={0}
          lowerThreshold={86}
          onScrollToLower={this.onScrollToLower}
        >
          {/*首页列表区域:卖家想要交易售卖的宠物列表*/}
          <View className='at-row at-row--wrap pet-business-container'>
            {
              petList && petList.length > 0 && petList.map((petItem) => {
                let id = petItem["id"];
                return <View key={id} className='at-col at-col-6 at-col--wrap'>
                  <AtCard
                    title={null}
                    extra={null}
                    className='pet-business-list'
                    onClick={this.getPetDetailHandler.bind(this, id)}
                  >
                    <Image mode='aspectFill'
                           src={petItem['cover']}
                           className='pet-business-list-image'
                    />
                    <View className='pet-business-list-title'>{petItem['title']}</View>
                    <View className='pet-business-list-price'>
                      <text class='pet-business-list-price-symbol'>
                        &#165;
                      </text>
                      {petItem['cost']}
                      <text class='pet-business-list-price-like'>
                        {petItem['wantCount']}人想要
                      </text>
                    </View>
                    <View className='pet-business-list-username'>
                      {petItem['userId']}
                    </View>
                    <View className='pet-business-list-address'>
                      <AtIcon prefixClass='iconfont'
                              value='petPlanet-gps'
                              className='pet-business-list-address-icon'
                              size={12} color='#ec544c'
                      />
                      {petItem['area']}
                    </View>
                  </AtCard>
                </View>
              })
            }
          </View>
          {/*上拉加载更多区域*/}
          <AtLoadMore
            status={loadStatus}
            moreText=''
            className='pet-business-load-more'
          />
        </ScrollView>
        {/*按钮发布区域: 使用formId进行发起一次有formId的模板消息请求*/}
        <AtForm reportSubmit={true}
                style='border:none'
                onSubmit={this.onSubmitHandler}
                className='pet-business-deal'
        >
          <AtButton size='small' type='primary' className='pet-business-deal-add' formType='submit'>
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
