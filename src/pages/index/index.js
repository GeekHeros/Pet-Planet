import Taro, {Component} from '@tarojs/taro';
import {View, Image} from "@tarojs/components";
import {AtTabBar, AtForm, AtButton, AtIcon, AtCard} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent} from "../../actions/home";
import {tabBarTabList, pageCurrentList, mockCardList} from "../../utils/static";
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
    }
  }
})
class Index extends Component {

  static options = {
    addGlobalClass: true
  };

  config = {
    navigationBarTitleText: '首页'
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    const {homeStore, changeCurrentHandler, onSubmitHandler} = this.props;
    const {current} = homeStore;
    return (
      <View className='pet-business'>
        <View className='at-row at-row--wrap pet-business-container'>
          {
            mockCardList && mockCardList.length > 0 && mockCardList.map((card, index) => {
              return <View key={index} className='at-col at-col-6 at-col--wrap'>
                <AtCard title={null} extra={null} className='pet-business-list'>
                  <Image mode='aspectFill' src={card['src']} className='pet-business-list-image'/>
                  <View className='pet-business-list-title'>{card['title']}</View>
                  <View className='pet-business-list-price'>
                    <text class='pet-business-list-price-symbol'>
                      &#165;
                    </text>
                    {card['price']}
                    <text class='pet-business-list-price-like'>
                      {card['like']}人想要
                    </text>
                  </View>
                  <View className='pet-business-list-username'>
                    {card['username']}
                  </View>
                  <View className='pet-business-list-address'>
                    <AtIcon prefixClass='iconfont' value='petPlanet-gps' className='pet-business-list-address-icon' size={12} color='#ec544c' />
                    {card['address']}
                  </View>
                </AtCard>
              </View>
            })
          }
        </View>
        <AtForm reportSubmit={true}
                style='border:none'
                onSubmit={onSubmitHandler}
                className='pet-business-deal'
        >
          <AtIcon value='add' className='pet-business-deal-add-icon' size={26} color='#fff' />
          <AtButton size='small' type='primary' className='pet-business-deal-add' formType='submit'>
          </AtButton>
        </AtForm>
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
