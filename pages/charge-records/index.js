import formatWxAvater from '../../utils/formatWxAvater.js'
import {servicesImgMap, servicesNameMap} from '../../utils/services-img.js'
import {parseDate} from '../../utils/formatDate.js'
//获取应用实例
var app = getApp()
Page({
    data: {
        avatarUrl: null,
        recordsList: [],
        allPage: null,
        pullFlag: true,
        page: 1,
        size: 6,
    },
    pullUpLoad: function(e){
        const that = this;
        if(that.data.pullFlag){
            that.data.pullFlag = false;
            that.data.page += 1;
            wx.showLoading({
                title: '加载中'
            });
            if(that.data.page > that.data.allPage){
                that.data.pullFlag = true;
                wx.hideLoading();
                return
            }else{
                that.getRecordList();
            }
        }
    },
    getRecordList: function(){
        const that = this;
        wx.request({
            url: app.globalData.domain + 'present/rechargelist/',
            header: {
                Authorization: app.globalData.token
            },
            data: {
                page: that.data.page,
                size: that.data.size,
            },
            success: (res) => {
                let data = res.data.data;
                that.data.allPage = data.all_page;
                that.data.pullFlag = true;
                wx.hideLoading();
                if (data.recharge_list.length > 0) {
                    data.recharge_list = data.recharge_list.map(item => {
                        let obj = {};
                        obj.serviceImg = servicesImgMap[item.operator];
                        obj.serviceName = servicesNameMap[item.operator];
                        item.create_time = parseDate(item.create_time, 'YYYY-MM-DD hh:mm');
                        item.amount = (item.amount / 100.00).toFixed(2);
                        return Object.assign(item, obj);
                    });
                }
                that.setData({
                    recordsList: that.data.recordsList.concat(data.recharge_list)
                });
            },
        })
    },
    onLoad: function () {
        const that = this;
        const userInfo = app.globalData.userInfo;
        if (userInfo.avatarUrl) {
            that.setData({
                avatarUrl: formatWxAvater(userInfo.avatarUrl, 96),
            });
        }
        that.getRecordList();        
    }
})
