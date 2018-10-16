<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/auth">权限管理</BreadcrumbItem>
        <BreadcrumbItem>修改权限</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <p slot="title">修改权限</p>
        <div class="group-input">
          <p style="margin-bottom: 5px;">权限名称</p>
          <Input v-model="name" placeholder="请输入权限名称..." clearable style="width: 100%"/>
        </div>
        <div class="group-input">
          <p style="margin-bottom: 5px;">权限url</p>
          <Input v-model="url" placeholder="请输入url..." clearable style="width: 100%"/>
        </div>
      </Card>
      <Divider />
      <div style="padding: 0 0 15px 10px">
        <Button type="default" size="large" @click="goBack">取消</Button>
        <Button type="primary" size="large" @click="update">修改</Button>
      </div>
    </div>
  </div>

</template>

<script>
  import {getAuth, putAuth} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        /*  添加权限属性 */
        name:null,          // 权限名称
        url: null,
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
        let resp = await getAuth({id: this.id});
        let data = resp.data[0];
        this.name = data.name;
        this.url = data.url;
      },

      // 添加权限
      async update(){
        if (this.name === null){this.$Message.warning('请输入权限名称');return}
        let json_data = {
          id: this.id,
          name: this.name,
        };
          let resp = await putAuth(json_data);
          if (resp.state === 1){
            this.$Message.success('权限修改成功');
            this.$router.push('/admin/auth')
          } else if(resp.state === 2){
            this.$Message.warning('修改失败，权限已存在')
          }else{
            this.$Message.warning('权限修改失败')
          }
      },

    },
  }
</script>

<style>

</style>


