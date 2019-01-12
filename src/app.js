import '@tarojs/async-await';
import Taro, {Component} from '@tarojs/taro';
import {Provider} from '@tarojs/redux';

import Index from './pages/index';
import User from './pages/user';
import Publish from './pages/publish';
import Detail from './pages/detail';
import Collection from './pages/collection';
import PublishMine from './pages/publishMine';

import store from './store';

import 'taro-ui/dist/weapp/css/index.css';

import './stylesheets/index.less';


class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/user/index',
      'pages/publish/index',
      'pages/detail/index',
      'pages/collection/index',
      'pages/publishMine/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  };

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
        <User />
        <Publish />
        <Detail />
        <Collection />
        <PublishMine />
      </Provider>
    )
  }
}

Taro.render(<App/>, document.querySelector("#app"));
