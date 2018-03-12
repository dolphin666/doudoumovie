// pages/douban/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'in_theaters',
    page:1,
    size:20,
    total:1,
    movies:[]
  },
  retrieve(){
    let app=getApp()
    let start=(this.data.page-1)*this.data.size
    wx.showLoading({
      title:"加载中"
    })
    return app.request(`http://t.yushu.im/v2/movie/${this.data.type}?start=${start}&count=${this.data.size}`)
    .then(res=>{
      if(res.subjects.length){
        let movies=this.data.movies.concat(res.subjects)
        this.setData({movies:movies,total:res.total,page:this.data.page})
        wx.setNavigationBarTitle({
          title: "正在上映的电影-北京"
        })
        console.log(res)
      }
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      wx.hideLoading()
    })
  },
  loadMorePage(){
    if(this.data.page>this.data.total) return
    this.data.page++
    this.retrieve()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 有三种类型： in_theaters  coming_soon  us_box
    this.data.type = options.type || this.data.type
    this.retrieve()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})