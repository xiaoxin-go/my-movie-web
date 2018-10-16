<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/user">会员管理</BreadcrumbItem>
        <BreadcrumbItem>会员详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="user-detail" style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <p slot="title" style="font-size: 18px; font-weight: normal;">会员详情</p>
        <div class="user-detail-title"><span>昵称：</span>{{data.name}}</div>
        <div class="user-detail-title"><span>昵称：</span>{{data.name}}</div>
        <div class="user-detail-title"><span>邮箱：</span>{{data.email}}</div>
        <div class="user-detail-title"><span>手机：</span>{{data.phone}}</div>
        <div class="user-detail-title"><span>头像：</span><img :src="face_image" alt=""></div>
        <div class="user-detail-title"><span>注册时间：</span>{{data.addtime}}</div>
        <div class="user-detail-title"><span>唯一标示符：</span>{{data.uuid}}</div>
        <div class="user-detail-title"><span>个性简介：</span>{{data.info}}</div>
      </Card>
    </div>
  </div>

</template>

<script>
  import {getUser, putUser} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        /*  添加会员属性 */
        data:null,
        face_image:null,
      }
    },
    computed: {
      id() {
        return this.$route.params.bid
      }
    },
    components: {},
    methods: {
      // 返回上一级页面
      goBack() {
        this.$router.go(-1)
      },

      async getData(){
        let resp = await getUser({id: this.id});
        this.data = resp.data[0];
        this.face_image = 'data:image/jpeg;base64,' + this.data.face;
      },

      // 添加会员
      async update(){
        let json_data = {
          id: this.id,
        };
          let resp = await putUser(json_data);
          if (resp.state === 1){
            this.$Message.success('修改成功');
            this.$router.push('/admin/user')
          }else{
            this.$Message.warning('修改失败')
          }
      },

    },
  }
</script>

<style>
  .user-detail .ivu-card-body{
    padding: 0;
  }
  .user-detail-title{
    border-bottom: 1px solid #f4f4f4;
    padding: 10px 0;
  }
  .user-detail-title:hover{
    background-color: #f4f4f4;
  }
  .user-detail-title span{
    display: inline-block;
    width: 20%;
    font-weight: bold;
    padding-left: 16px;
  }
</style>


