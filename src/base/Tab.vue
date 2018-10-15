<template>
  <div class="left">
    <div class="left-title">
      <div class="info">
        <span>电影管理系统</span>
      </div>

    </div>
    <div class="left-biside">
      <div class="left-user">
        <div class="image">
          <img :src="user_img" />
        </div>
        <div class="info">
          <a title="修改用户密码" @click="edit_pass_modal = true">{{user}}</a>
        </div>
        <Logout></Logout>
      </div>

      <Menu theme="light" ref="contactMenu" :active-name="active" :open-names="open_names" width="100%" height="100%" @on-select="toNext">
        <template v-for="menu in menu_list" v-if="menu.type === 1">
            <MenuItem :name="menu.url">
              <Icon :type="menu.image"></Icon>
              {{menu.name}}
            </MenuItem>
        </template>
      </Menu>
    </div>
    <Modal
      v-model="edit_pass_modal"
      @on-cancel="modalCancel"
      title="修改密码" :mask-closable="false" class-name="reset_pass" width="300px">
      <input v-model="password" type="password" placeholder="请输入原密码"/>
      <input v-model="new_password" type="password" placeholder="请输入新密码"/>
      <input v-model="confirm_password" type="password" placeholder="重复新密码"/>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="primary" size="large" @click="edit_pass">确定</Button>
      </div>
    </Modal>
  </div>

</template>
<script>
    import {getMenu} from '../api/index.js';
    import Logout from './Logout.vue';
  export default {
    data() {
      return {
        active:null,
        index:null,
        menu_list: [],
        user_img:require('./../image/user.png'),
        logo:require('./../image/networks.png'),
        user:'',
        open_names:[],

        // 修改用户密码属性
        edit_pass_modal:false,

        password:'',
        new_password:'',
        confirm_password:'',

      }
    },
    methods: {

      // 获取用户菜单信息
      async getData() {
        let resp = await getMenu();
        console.log(resp);
        this.user = resp.user || 'admin';
        this.menu_list = resp;

        // 解决菜单获取报错问题，主要原因在于，异步请求慢
        this.$nextTick(function() {
          this.$refs.contactMenu.updateOpened();
          this.$refs.contactMenu.updateActiveName();
        });
        //this.active = this.menu_list[0].url
      },

      // 切换页面
      toNext(name){
        console.log(name);
        this.$router.push(name)
      },

      // 通过url改变当前选中项
      changeIndex(path){
        console.log(path);
        this.active = path.split('/').slice(0,3).join('/');
      },

      // 取消添加用户模态框
      modalCancel(){
        this.edit_pass_modal = false;
        this.reset_data()
      },
      reset_data(){
        this.password = '';
        this.new_password = '';
        this.confirm_password = '';
      },

      // 修改用户密码
      async edit_pass(){
        let password = this.password.trim();
        let new_password = this.new_password.trim();
        let confirm_password = this.confirm_password.trim();
        if(!password){this.$Message.info('请输入用户密码');return}
        if(!new_password){this.$Message.info('请输入新密码');return}
        if(!confirm_password || confirm_password !== new_password){this.$Message.info('密码输入不一致，请重新输入');return}

        let json_data = {
          username:this.user,
          password:password,
          new_password:new_password
        };
        let resp = await EditPass(json_data);
        if(resp.state===1){
          this.modalCancel();
          this.$Message.success('密码修改成功')
        }else if(resp.state===0){
          this.$Message.warning('原密码错误')
        }else{
          this.$Message.warning('发生未知错误，密码修改失败')
        }
      },

    },
    created() {
      this.getData();
    },
    components:{
      Logout
    },

    filters:{
      // 转换为字符串
      goString(data){
        return String(data)
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
    },
    watch:{
      // 监听URL状态改变
      "$route"(){
        let path = this.$route.path;
        console.log('path:',path);
        // 做URL校验，阻止加载
        if(!path.startsWith('/home')){
          let filter_list = this.menu_list.filter(item=>path.startsWith(item.url));
          if(filter_list.length===0){
            console.log('阻止后面的加载');
            this.$router.push('/')
          }
        }


        // 做URL校验，阻止加载
        console.log(this.menu_list.length);
        if(this.menu_list.length>0){
          console.log('切换菜单：',path);
          this.changeIndex(path);
        }
      }
    }

  }
</script>
<style>
  .reset_pass .ivu-modal-footer{
    border-top: none;
  }
  .reset_pass input:not(:first-child){
    margin-top: 10px;
  }
  .pause-start{
    position: relative;
    left: 10px;
    top: 5px;
    width: 35px;
    height: 35px;
    border: none;
    border-radius:50%;
    outline: none;
  }
  .pause-start:hover{
    cursor:pointer;
    background: #3981FB;
  }
  .pause-start:active{
    background: red;
    outline: none;
  }

</style>
