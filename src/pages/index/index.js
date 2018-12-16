import Taro, {Component} from '@tarojs/taro';
import {View, Image, ScrollView} from "@tarojs/components";
import {
  AtTabBar,
  AtForm,
  AtButton,
  AtIcon,
  AtCard,
  AtLoadMore,
  AtFloatLayout,
  AtTextarea,
  AtImagePicker
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
     * 改变图片选择器的内容并上传图片
     * @尹文楷
     * @returns {Promise<void>}
     */
    async publishImageUploadHandler() {
      await dispatch(homeAPI.publishImageUploadRequest.apply(this));
    },
    /**
     * 改变滚动加载的AtLoadMore的状态
     * @尹文楷
     */
    changeLoadStatusHandler(loadStatus) {
      dispatch(changeLoadStatus({
        loadStatus
      }));
    },
    /**
     * 改变redux store里面的数据状态
     * @尹文楷
     */
    setAttrValueHandler(payload) {
      dispatch(setAttrValue(payload));
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

  /**
   * 点击发布的取消按钮,关闭发布页面
   * @returns {Promise<void>}
   */
  async onPublishClose() {
    const {setAttrValueHandler} = this.props;
    await setAttrValueHandler({
      dialogShowOrHidden: {
        isPublishOpened: false
      },
      dialogData: {
        publishData: {
          content: null,
          files: [],
          filePath: []
        }
      }
    });
    await Taro.setNavigationBarTitle({
      title: "首页"
    });
  }

  /**
   * 点击发起宠物交易的Submit事件
   * @尹文楷
   */
  async onSubmitHandler(event) {
    console.log(event);
    const {setAttrValueHandler} = this.props;
    await setAttrValueHandler({
      dialogShowOrHidden: {
        isPublishOpened: true
      }
    });
    await Taro.setNavigationBarTitle({
      title: ""
    });
  }

  /**
   * 改变输入框的内容
   * @尹文楷
   * @returns {Promise<void>}
   */
  async onTextChangeHandler(event) {
    const {setAttrValueHandler} = this.props;
    await setAttrValueHandler({
      dialogData: {
        publishData: {
          content: event.target.value
        }
      }
    });
  }

  /**
   * 改变图片选择器的内容并上传图片
   * @尹文楷
   * @returns {Promise<void>}
   */
  async onImageChangeHandler(files, operationType, index) {
    const {setAttrValueHandler, publishImageUploadHandler, homeStore} = this.props;
    const {dialogData} = homeStore;
    const {publishData} = dialogData;
    const {files: fileList, images} = publishData;
    let uploadFilterFiles = [];
    switch (operationType) {
      case "add":
        for (let [key, value] of files.entries()) {
          let flag = false;
          for (let [_key, _value] of fileList.entries()) {
            if (value["url"] === _value["url"]) {
              flag = true;
            }
          }
          if (!flag) {
            uploadFilterFiles = [...uploadFilterFiles, value];
          }
        }
        await setAttrValueHandler({
          dialogData: {
            publishData: {
              uploadFilterFiles
            }
          }
        });
        await publishImageUploadHandler.apply(this);
        break;
      case "remove":
        await images.splice(index, 1);
        await setAttrValueHandler({
          dialogData: {
            publishData: {
              files,
              images
            }
          }
        });
        break;
      default:
        break;
    }
  }

  render() {
    const {homeStore, changeCurrentHandler} = this.props;
    const {current, petList, loadStatus, dialogShowOrHidden, dialogData} = homeStore;
    const {isPublishOpened} = dialogShowOrHidden;
    const {publishData} = dialogData;
    const {content, files} = publishData;
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
            petList && petList.length > 0 && petList.map((petItem) => {
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
        <AtFloatLayout
          title='发布'
          isOpened={isPublishOpened}
          onClose={this.onPublishClose}
          className='pet-business-publish'
        >
          <View className='pet-business-publish-content'>
            <View className='pet-business-publish-content-top'>
              <AtTextarea
                count={false}
                textOverflowForbidden={false}
                height={210}
                value={content}
                onChange={this.onTextChangeHandler}
                placeholder='描述一下宝贝转手的原因、入手渠道和使用感受'
                className='pet-business-publish-content-description'
              />
              <AtImagePicker
                mode='aspectFill'
                length={4}
                multiple
                className='pet-business-publish-content-images'
                files={files}
                showAddBtn
                onChange={this.onImageChangeHandler}
              />
            </View>
          </View>
        </AtFloatLayout>
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
