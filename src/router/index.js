import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
  // 主模块接口
  {path:'/',redirect:'/admin/tag'},
    // 标签管理
  {path:'/admin/tag',component:()=>import('../components/admin/Tag.vue')},
  {path:'/admin/tag/add',component:()=>import('../components/admin/TagAdd.vue')},
  {path:'/admin/tag/update/:bid',component:()=>import('../components/admin/TagUpdate.vue')},

    // 电影管理
  {path:'/admin/movie',component:()=>import('../components/admin/Movie.vue')},
    {path:'/admin/movie/add',component:()=>import('../components/admin/MovieAdd.vue')},
    {path:'/admin/movie/update/:bid',component:()=>import('../components/admin/MovieUpdate.vue')},

    // 预告管理
  {path:'/admin/preview',component:()=>import('../components/admin/Preview.vue')},
    {path:'/admin/preview/add',component:()=>import('../components/admin/PreviewAdd.vue')},
    {path:'/admin/preview/update/:bid',component:()=>import('../components/admin/PreviewUpdate.vue')},

    // 会员管理
  {path:'/admin/user',component:()=>import('../components/admin/User.vue')},
    {path:'/admin/user/detail/:bid',component:()=>import('../components/admin/UserDetail.vue')},

    // 评论管理
  {path:'/admin/comment',component:()=>import('../components/admin/Comment.vue')},

    // 收藏管理
    {path:'/admin/moviecol',component:()=>import('../components/admin/Moviecol.vue')},
    {path:'/admin/moviecol/update/:bid',component:()=>import('../components/admin/MoviecolUpdate.vue')},

    // 权限管理
    {path:'/admin/auth',component:()=>import('../components/admin/Auth.vue')},
    {path:'/admin/auth/add',component:()=>import('../components/admin/AuthAdd.vue')},
    {path:'/admin/auth/update/:bid',component:()=>import('../components/admin/AuthUpdate.vue')},


    // 角色管理
    {path:'/admin/role',component:()=>import('../components/admin/Role.vue')},
    {path:'/admin/role/add',component:()=>import('../components/admin/RoleAdd.vue')},
    {path:'/admin/role/update/:bid',component:()=>import('../components/admin/RoleUpdate.vue')},

    // 管理员管理
    {path:'/admin/admin',component:()=>import('../components/admin/Admin.vue')},
    {path:'/admin/admin/add',component:()=>import('../components/admin/AdminAdd.vue')},
    {path:'/admin/admin/update/:bid',component:()=>import('../components/admin/AdminUpdate.vue')},

    //{path:'/home/index', component:()=>import('../components/home/Index.vue')}
  ]
})
