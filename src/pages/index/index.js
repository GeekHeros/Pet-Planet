import Taro, {Component} from '@tarojs/taro';
import {View, Image, ScrollView} from "@tarojs/components";
import {AtTabBar, AtForm, AtButton, AtIcon, AtCard, AtLoadMore} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent, changePageNum, changeLoadStatus} from "../../actions/home";
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
     * 通过onClick事件来更新current值变化
     * @param value
     */
    changeCurrentHandler(value) {
      dispatch(changeCurrent({current: value}));
      Taro.redirectTo({
        url: pageCurrentList[`${value}`]
      });
    },
    /**
     * 点击发起宠物交易的Submit事件
     */
    onSubmitHandler(event) {
      console.log(event);
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
     * 改变滚动加载的AtLoadMore的状态
     * @尹文楷
     */
    changeLoadStatusHandler(loadStatus) {
      dispatch(changeLoadStatus({
        loadStatus
      }));
    }
  }
})
class Index extends Component {

  static options = {
    addGlobalClass: true
  };

  config = {
    navigationBarTitleText: '首页',
    //距离页面底部的距离
    onReachBottomDistance: 30
  };

  async componentDidMount() {
    const {homeInfoHandler, changeLoadStatusHandler} = this.props;
    await changeLoadStatusHandler("more");
    await homeInfoHandler.apply(this, [1]);
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onReachBottom() {

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

  render() {
    const {homeStore, changeCurrentHandler, onSubmitHandler} = this.props;
    const {current, petList, loadStatus} = homeStore;
    return (
      <ScrollView
        scrollY
        className='pet-business'
        scrollTop={0}
        lowerThreshold={86}
        onScrollToLower={this.onScrollToLower}
      >
        <View className='at-row at-row--wrap pet-business-container'>
          {
            petList && petList.length > 0 && petList.map((petItem, index) => {
              let id = petItem["id"];
              return <View key={id} className='at-col at-col-6 at-col--wrap'>
                <AtCard title={null} extra={null} className='pet-business-list'>
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
        <AtLoadMore
          status={loadStatus}
          moreText=''
          className='pet-business-load-more'
        />
        <AtForm reportSubmit={true}
                style='border:none'
                onSubmit={onSubmitHandler}
                className='pet-business-deal'
        >
          <AtIcon
            value='add'
            className='pet-business-deal-add-icon'
            size={26}
            color='#fff'
          />
          <AtButton size='small' type='primary' className='pet-business-deal-add' formType='submit'>
          </AtButton>
        </AtForm>
        <AtTabBar
          fixed
          current={current}
          tabList={tabBarTabList}
          onClick={changeCurrentHandler}
        />
      </ScrollView>
    )
  }
}

export default Index;
