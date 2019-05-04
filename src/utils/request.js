let IP = 'http://47.102.153.243/suzhanxue/index.php/'
function $ajax(url, data, method) {
    return new Promise((resolve, rejcet) => {
        wx.request({
            url: IP + url, //开发者服务器接口地址",
            data: data, //请求的参数",
            method: method,
            success: res => {
                if (res.data.code === 1) {
                    resolve(res.data)
                }
            },
            fail: (err) => {
                wx.showToast({
                    title: '请求超时，请稍后再试',
                    icon: 'none',
                    duration: 2000
                })
                rejcet(err)
            },
            complete: () => { }
        });
    })
}
function $axios(url, data, method) {
    return new Promise((resolve, rejcet) => {
        wx.request({
            url: IP + url, //开发者服务器接口地址",
            headers:{
                'Content-Type':'application/json'
            },
            data, //请求的参数",
            method,
           
            success: res => {
                if (res.data.code === 1) {
                    resolve(res.data)
                }
            },
            fail: (err) => {
                wx.showToast({
                    title: '请求超时，请稍后再试',
                    icon: 'none',
                    duration: 2000
                })
                rejcet(err)
            },
            complete: () => { }
        });
    })
}
export {$ajax, $axios}