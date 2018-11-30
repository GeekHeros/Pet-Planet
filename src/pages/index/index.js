import Taro, {Component} from '@tarojs/taro';
import {View, Image} from "@tarojs/components";
import {AtTabBar, AtForm, AtButton, AtIcon, AtCard} from 'taro-ui';
import {connect} from "@tarojs/redux";
import {changeCurrent} from "../../actions/home";
import {tabBarTabList, pageCurrentList, mockCardList} from "../../utils/static";
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
                <View className='at-row at-row--wrap'>
                    {
                        mockCardList && mockCardList.length > 0 && mockCardList.map((card, index) => {
                            return <View key={index} className='at-col at-col-6 at-col--wrap'>
                                <AtCard title={card["title"]} note={card["note"]} extra={card["extra"]} className='pet-business-list'>
                                    <Image mode='aspectFill' src={card['src']} className='pet-business-list-image' />
                                    <View className='pet-business-list-content'>{card['content']}</View>
                                </AtCard>
                            </View>
                        })
                    }
                </View>
                <AtForm
                    reportSubmit={true}
                    style='border:none'
                    onSubmit={onSubmitHandler}
                    className='pet-business-deal'
                >

                    <AtIcon value='add' className='pet-business-deal-add-icon' size={26} color='#fff'/>
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
