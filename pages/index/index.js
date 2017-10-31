import checkPhone from '../../utils/checkPhone.js'
//获取应用实例
var app = getApp()
Page({
    data: {
        phone: null,
        userInfo: {},
        service: null,
        flowList: [],
        showFakeFlow: true,
        chun: '清楚',
        fakeFlowList: [
            {
                id: 1,
                name: '10M',
                amount: '售价0.82元',
            },
            {
                id: 2,
                name: '100M',
                amount: '售价8.10元',
            },
            {
                id: 3,
                name: '500M',
                amount: '售价24.90元',
            },
            {
                id: 4,
                name: '1G',
                amount: '售价46.80元',
            },
            {
                id: 5,
                name: '2G',
                amount: '售价88.20元',
            }
        ],
        showErrText: false,
        errText: null
    },
    //跳转获取免费流量
    getFreeFlow: function(e){
        wx.switchTab({
            url: '/pages/discovery/index'
        })
    },
    //充值接口
    chargeFlow: function(e){
        const that = this;
        let id = e.currentTarget.dataset.id;
        wx.request({
            url: app.globalData.domain + 'present/pay/',
            header: {
                Authorization: app.globalData.token
            },
            data: {
                phone: that.data.phone,
                id: id 
            },
            success: (res) => {
                // return
                wx.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success: (info) => {
                        console.log(info);
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                });
            }
        });
    },
    //处理input事件
    handleInput: function(e){
        const that = this;
        let value = e.detail.value;
        let length = Array.from(value).length;
        that.setData({
            phone: value
        });
        if( value && length === 11){
            that.getFlowList();
        }
    },
    //获取焦点
    getFocus: function(e){
        const that = this;
        that.setData({
            showFakeFlow: true,
            showErrText: false,
            service: '',
        });
    },
    handleInputDone: function(e){
        const that = this;
        that.getFlowList();
    },
    getFlowList: function(){
        const that = this;
        let phone = that.data.phone;
        if(that.data.phone){
            if (!checkPhone(phone)) {
                that.setData({
                    showErrText: true,
                    errText: '请输入正确的手机号码',
                });
            }else{

                wx.request({
                    url: app.globalData.domain + 'present/datapackagelist/',
                    data: {
                        phone: that.data.phone
                    },
                    success: (res) => {
                        const data = res.data.data;
                        if( data.package_list.length > 0){
                            data.package_list = data.package_list.map( item => {
                                item.amount = (item.amount / 100.00).toFixed(2);
                                return item;
                            })
                            that.setData({
                                service: data.destination,
                                flowList: data.package_list,
                                showErrText: false,
                                showFakeFlow: false
                            });
                        }else{
                            that.setData({
                                showErrText: true,
                                errText: '该手机号暂不支持充值',
                            });
                        }
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                });
            }
        }
    },
    onLoad: function () {
        const that = this;
        that.getFlowList();
        //方便开发
        // wx.redirectTo({
        //     url: '/pages/charge-records/index'
        // })
    },

})
