/**
 * 静态提示语
 * @尹文楷
 * @type {{}}
 */
const prompt = {
  verify: {
    home_page: {
      isEmpty: [
        "warning:宠物描述不能为空",
        "warning:图片组不能为空",
        "warning:必须获取定位",
        "warning:标题不能为空",
        "warning:价格不能为空",
        "warning:模板消息id不能为空",
        "warning:联系方式不能为空"
      ]
    }
  },
  navigationBarTitleText: {
    home_page: {
      initial: "首页",
      publish: ""
    },
    user_page: {
      initial: "我"
    }
  },
  publish: {
    home_page: {
      title: "发布",
      placeholder: {
        content: "描述一下宝贝转手的原因、入手渠道和使用感受",
        title: "请输入标题",
        cost: "请输入交易宠物的价格",
        contractInfo: "请输入您的联系方式"
      },
      label: {
        title: "标题",
        cost: "一口价",
        contractInfo: "联系方式"
      }
    }
  },
  modal: {
    home_page: {
      publish: {
        title: "温馨提示",
        content: "检测到您没打定位权限，是否去设置打开？"
      }
    }
  }
};

export default prompt;
