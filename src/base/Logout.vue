<template>
  <div id="logout">
  <a class="logout" @click="logoutModal = true" title="logout">
    <!--<img :src="logout" style="width: 35px;height: 35px;">-->
    <Icon type="md-exit" />
  </a>
    <Modal
      v-model="logoutModal"
      title="退出系统"
      @on-ok="LogOut" ok-text="确定" class-name="delModal">
      <p style="text-align: center;font-size: 16px;">您确定退出系统吗？</p>
    </Modal>
  </div>

</template>

<script>
  import {logout} from '../api/index.js'
    export default {
      data(){
        return {
          logoutModal:false,
          logout:require('./../image/logout.png')
        }
      },
        computed: {},
        components: {},
        methods: {
          async LogOut(){
            await LogOut();
            location.reload();
          },
        },
    }
</script>

<style>
  #logout{
    float: right;
    margin-right: 10px;
  }
  .logout{
    color: rgba(255,255,255,.8);
    font-size: 25px;
  }
  .delModal .ivu-modal-content{
    border-radius: 2px;
    width: 350px;
    height: 220px;
    left: 50px;
  }
  .delModal .ivu-modal-body{
    text-align: center;
    font-size: 14px;
    height: 48%;
    line-height: 75px;
  }
  .delModal .ivu-modal-header{
    padding: 15px 20px;
    border-bottom: none;
  }
  .delModal .ivu-modal-footer{
    border-top: none;
  }
  .ivu-modal-body>p{
    font-size: 16px;
  }
</style>
