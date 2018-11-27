import Taro, {Component} from '@tarojs/taro';
import {View} from "@tarojs/components";
import {AtTabBar} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent} from "../../actions/home";


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
    }
  }
})
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    const {homeStore, changeCurrentHandler} = this.props;
    const {current, tabList} = homeStore;
    return (
      <View>
        <AtTabBar
          fixed
          current={current}
          tabList={tabList}
          onClick={changeCurrentHandler}
        />
      </View>
    )
  }
}

export default Index;
