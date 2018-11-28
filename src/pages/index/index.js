import Taro, {Component} from '@tarojs/taro';
import {View} from "@tarojs/components";
import {AtTabBar} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent} from "../../actions/home";
import {tabBarTabList, pageCurrentList} from "../../utils/static";


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
      Taro.navigateTo({
        url: pageCurrentList[`${value}`]
      });
    }
  }
})
class Index extends Component {

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
    const {homeStore, changeCurrentHandler} = this.props;
    const {current} = homeStore;
    return (
      <View>
        首页
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
