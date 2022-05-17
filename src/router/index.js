import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard', auth: true }
    }]
  },
  //首页
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Home",
        component: () => import("@/views/Banners/index.vue"),
        meta: { title: "首页", icon: "el-icon-s-home", auth: true }
      }
    ]
  },
  //文章管理
  {
    path: "/blog",
    component: Layout,
    redirect: "/blog",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-notebook-1" },
    children: [
      {
        path: "/blogList",
        name: "BlogList",
        component: () => import("@/views/BlogList/index.vue"),
        meta: { title: "文章列表", icon: "el-icon-notebook-2", auth: true }
      },
      {
        path: "/blogType",
        name: "BlogType",
        component: () => import("@/views/BlogType/index.vue"),
        meta: { title: "文章分类", icon: "el-icon-files", auth: true }
      },
      {
        path: "/addBlog",
        name: "AddBlog",
        component: () => import("@/views/AddBlog/index.vue"),
        meta: { title: "添加文章", icon: "el-icon-document-add", auth: true }
      },
      {
        path: "/editBlog/:id",
        name: "EditBlog",
        component: () => import("@/views/editBlog/index.vue"),
        meta: { title: "修改文章", icon: "el-icon-document-add", auth: true },
        hidden: true
      }
    ]
  },
  //项目管理
  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "/projectList",
        name: "ProjectList",
        component: () => import("@/views/Project/index.vue"),
        meta: { title: "项目列表", icon: "el-icon-coin", auth: true }
      },
      {
        path: "/addProject",
        name: "AddProject",
        component: () => import("@/views/AddProject/index.vue"),
        meta: { title: "添加项目", icon: "el-icon-folder-add", auth: true }
      }
    ]
  },
  //评论管理
  {
    path: "/comment",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Comment",
        component: () => import("@/views/Comment/index.vue"),
        meta: { title: "评论管理", icon: "el-icon-s-comment", auth: true }
      }
    ]
  },
  //留言
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Message',
        component: () => import('@/views/message/index'),
        meta: { title: "留言板", icon: 'el-icon-chat-dot-round', auth: true },

      }
    ]
  },
  //关于
  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "index",
        name: "About",
        component: () => import("@/views/About/index.vue"),
        meta: { title: "关于", icon: "el-icon-s-custom", auth: true }
      }
    ]
  },
  //设置
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Setting",
        component: () => import("@/views/Setting/index.vue"),
        meta: { title: "设置", icon: "el-icon-setting", auth: true }
      }
    ]
  },


  {
    path: "/personalSetting",
    component: Layout,
    children: [
      {
        path: "index",
        name: "personalStting",
        component: () => import("@/views/personal/index.vue"),
        // component: () => import("@/views/personal/index.vue"),
        meta: { title: "个人中心", icon: "el-icon-setting", auth: true },
        hidden: true,
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
