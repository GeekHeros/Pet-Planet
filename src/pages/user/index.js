import Taro, {Component} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {AtTabBar} from "taro-ui";
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
    changeCurrentHandler(value) {
      dispatch(changeCurrent({current: value}));
      Taro.navigateTo({
        url: pageCurrentList[`${value}`]
      });
    }
  }
})
class User extends Component {
  constructor(props) {
    super(props);
  }

  config = {
    navigationBarTitleText: "我"
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const {homeStore, changeCurrentHandler} = this.props;
    const {current} = homeStore;
    return (
      <View>
        我
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

export default User;
