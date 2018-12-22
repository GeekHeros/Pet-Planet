import Taro, {Component} from "@tarojs/taro";
import {View, ScrollView} from "@tarojs/components";
import {connect} from "@tarojs/redux";

@connect((state)=> {
  return {
    homeStore: state.homeStore
  };
}, (dispatch)=>{
  return {

  };
})
class Detail extends Component {
  static options = {
    addGlobalClass: true
  };
  config = {
    navigationBarTitleText: "内容详情"
  };

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView
        scrollY={true}
        scrollTop={0}
      >

      </ScrollView>
    )
  }
}

export default Detail;
