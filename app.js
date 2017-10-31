//app.js
App({
    onLaunch: function() {
        this.login();
        // this.checkSession();
    },
    checkSession: function(){
        var that = this;
        wx.checkSession({
            success: () => {
                console.log("session 未过期");
            },
            fail: () => {
                that.login();
            }
        });
    },
    login: function(){
        const that = this;
        wx.login({
            success: (res) => {
                if (res.code) {
                    that.getUserInfo(res.code);
                }
            }
        })
    },

    getUserInfo: function(code){
        const that = this;
        wx.getUserInfo({
            withCredentials: true,
            success: function(info) {
                that.globalData.userInfo = info.userInfo;
                wx.request({
                    url: that.globalData.domain + 'wx/userinfo/',
                    method: 'POST',
                    data: {
                      code: code,
                      encryptedData: info.encryptedData,
                      iv: info.iv
                    },
                    success: (data) => {
                        that.globalData.token = data.data.data.token;
                    },
                    fail: (err) => {
                        console.log(err);
                    }
                });
            }
        })
    },

    globalData: {
        userInfo: null,
        token: null,
        domain: 'https://******/',
    }
})
