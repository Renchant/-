//index.js
//获取应用实例
var app = getApp()
import formatWxAvater from '../../utils/formatWxAvater.js'
Page({
    data: {
        userInfo: {},
        avatarUrl: '',
        coustomImg: '../../images/coustom.png',
        showDialog: false,
        flow: 62000,
        phone: null,
        service: '广东移动'
    },
    bindPhone: function(e) {
        console.log("绑定手机号");
        const that = this;
        that.setData({
            showDialog: true
        });
    },
    linkCoustom: function(e){
        const that = this;
        console.log(e);
    },
    onLoad: function() {
        const that = this;
        console.log(app.globalData.userInfo);
        that.setData({
            userInfo: app.globalData.userInfo
        });
        if (that.data.userInfo.avatarUrl) {
            that.setData({
                avatarUrl: formatWxAvater(that.data.userInfo.avatarUrl, 96),
            });
            // console.log(that.avatarUrl);
        }
    }
})
