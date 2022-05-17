import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist   白名单中存储着无需权限也可以访问的页面路径

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in    获取token
  // const hasToken = getToken();

  const hasToken = localStorage.getItem("adminToken");

  const hasGetUserInfo = store.getters.user;  //获取本地用户信息

  //要去的页面是否需要鉴权
  if (to.meta.auth) {
    //判断有没有登录信息
    if (hasGetUserInfo) {
      //有登录信息，直接next()
      next();
    } else {
      //没有登录信息
      if (hasToken) {
        //有token，验证token时效性
        try {
          //从服务器获取token信息
          await store.dispatch("user/getInfo");
          next();
        } catch (error) {
          //获取不到弹出信息
          await store.dispatch("user/resetToken");
          Message.error("登录过期，请重新登录");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        //没有token，去登录页
        next(`/login?redirect=${to.path}`)
        NProgress.done();
      }
    }
  } else {
    //不需要鉴权，再判断要去的页面是不是login
    if (to.path === "/login" && hasGetUserInfo) {
      //去的是登录页面并且已经有登录信息，导航到首页
      next({ path: "/" });
    } else {
      //去的不是login，直接next()继续
      next();
    }
    NProgress.done();
  }


  //原鉴权code
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     //有token，再判断要进的页面是不是login页，是的话就直接链接向home
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     //进的不是login页，就判断有没有用户信息
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       //没有用户信息，但又有token，就用token去服务器请求响应的用户信息
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')
  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/
  //   //如果要进的页面在白名单中，就是不需要权限（所以也不需要token）也可以进的页面，直接next()
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     //要访问的页面路径不在白名单中，就是需要权限才可以进的页面，跳转到login
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
