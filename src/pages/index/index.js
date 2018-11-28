import Taro, {Component} from '@tarojs/taro';
import {View} from "@tarojs/components";
import {AtTabBar, AtForm, AtButton} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent} from "../../actions/home";
import {tabBarTabList, pageCurrentList} from "../../utils/static";
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
      <View>
        首页
        <AtForm
          reportSubmit={true}
          style='border:none'
          onSubmit={onSubmitHandler}
          className='pet-business-deal'
        >
          <AtButton size='small' type='primary' className='pet-business-deal-add' formType='submit'>
            +
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
