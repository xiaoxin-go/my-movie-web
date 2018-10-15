import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:5500';

// 拦截器，返回对象的data
axios.interceptors.response.use((res)=>{
  return res.data;
});

/*---------   获取菜单   ----------*/
export let getMenu =() =>{
  return axios.get('/admin/menu')
};

/*---------   标签管理   ----------*/
// 获取标签列表
export let getTag =(data) =>{
  return axios.get('/admin/tag', {params:data})
};

// 添加标签
export let addTag =(data) =>{
  return axios.post('/admin/tag',data)
};

// 修改标签
export let putTag =(data) =>{
  return axios.put('/admin/tag',data)
};

// 删除标签
export let delTag =(data) =>{
  return axios.delete('/admin/tag', {params:data})
};

/*---------   电影管理   ----------*/
// 获取标除电影
export let getMovie =(data) =>{
  return axios.get('/admin/movie', {params:data})
};

// 添除电影
export let addMovie =(data) =>{
  return axios.post('/admin/movie',data)
};

// 修除电影
export let putMovie =(data) =>{
  return axios.put('/admin/movie',data)
};

// 删除电影
export let delMovie =(data) =>{
  return axios.delete('/admin/movie', {params:data})
};

/*---------   预告管理   ----------*/
// 获取预告列表
export let getPreview =(data) =>{
  return axios.get('/admin/preview', {params:data})
};

// 添加预告
export let addPreview =(data) =>{
  return axios.post('/admin/preview',data)
};

// 修改预告
export let putPreview =(data) =>{
  return axios.put('/admin/preview',data)
};

// 删除预告
export let delPreview =(data) =>{
  return axios.delete('/admin/preview', {params:data})
};

/*---------   会员管理   ----------*/
// 获取会员列表
export let getUser =(data) =>{
  return axios.get('/admin/user', {params:data})
};

// 修改会员
export let putUser =(data) =>{
  return axios.put('/admin/user',data)
};

// 删除会员
export let delUser =(data) =>{
  return axios.delete('/admin/user', {params:data})
};

/*---------   评论管理   ----------*/
// 获取评论列表
export let getComment =(data) =>{
  return axios.get('/admin/comment', {params:data})
};

// 删除评论
export let delComment =(data) =>{
  return axios.delete('/admin/comment', {params:data})
};

/*---------   收藏管理   ----------*/
// 获取收藏列表
export let getMoviecol =(data) =>{
  return axios.get('/admin/moviecol', {params:data})
};

// 修改收藏
export let putMoviecol =(data) =>{
  return axios.put('/admin/moviecol',data)
};

// 删除收藏
export let delMoviecol =(data) =>{
  return axios.delete('/admin/moviecol', {params:data})
};

/*---------   日志管理   ----------*/
/*---------   权限管理   ----------*/
// 获取权限列表
export let getAuth =(data) =>{
  return axios.get('/admin/auth', {params:data})
};

// 添加权限
export let addAuth =(data) =>{
  return axios.post('/admin/auth',data)
};

// 修改权限
export let putAuth =(data) =>{
  return axios.put('/admin/auth',data)
};

// 删除权限
export let delAuth=(data) =>{
  return axios.delete('/admin/auth', {params:data})
};

/*---------   角色管理   ----------*/
// 获取权限列表
export let getRole =(data) =>{
  return axios.get('/admin/role', {params:data})
};

// 添加权限
export let addRole =(data) =>{
  return axios.post('/admin/role',data)
};

// 修改权限
export let putRole =(data) =>{
  return axios.put('/admin/role',data)
};

// 删除权限
export let delRole =(data) =>{
  return axios.delete('/admin/role', {params:data})
};

/*---------   管理员管理   ----------*/
// 获取管理员列表
export let getAdmin =(data) =>{
  return axios.get('/admin/admin', {params:data})
};

// 添加管理员
export let addAdmin =(data) =>{
  return axios.post('/admin/admin',data)
};

// 修改管理员
export let putAdmin =(data) =>{
  return axios.put('/admin/admin',data)
};

// 删除管理员
export let delAdmin =(data) =>{
  return axios.delete('/admin/admin', {params:data})
};

/*---------   退出登录   ----------*/
export let logout =(data) =>{
  return axios.post('/admin/logout')
};

/*---------   上传图片   ---------*/
export let upload_logo = (data) => {
  return axios.post('/admin/upload_logo', data, {headers:{"Content-Type": "multipart/form-data"}})
};
