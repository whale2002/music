// app.js
import { getLoginCode, sendCodeToServer, checkToken, checkSession } from './api/login'

App({
  onLaunch: async function() {
    const info = wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusBarHeight = res.statusBarHeight
      }
    })

    const token = wx.getStorageSync('token')
    // token 有没有过期
    const checkResult = await checkToken(token)
    // console.log(checkResult)
    const isSessionExpire = await checkSession()

    if(!token || checkResult.errorCode || !isSessionExpire) 
    this.loginAction()
  },

  async loginAction() {
    const code = await getLoginCode()
    const res = await sendCodeToServer(code)
    const token = res.token
    wx.setStorageSync('token', token)
  },

  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
    deviceRadio: 0
  }
})
