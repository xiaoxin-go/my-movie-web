<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/user">会员管理</BreadcrumbItem>
        <BreadcrumbItem>修改会员</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <p slot="title">修改会员</p>
        <p style="margin-bottom: 5px;">会员名称</p>
        <Input v-model="name" placeholder="请输入会员名称..." clearable style="width: 100%" />
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
  import {getUser, putUser} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        /*  添加会员属性 */
        name:null,          // 机房名称
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
        this.name = resp.data[0].name
      },

      // 添加会员
      async update(){
        if (this.name === null){this.$Message.warning('请输入会员名称');return}
        let json_data = {
          id: this.id,
          name: this.name,
        };
          let resp = await putUser(json_data);
          if (resp.state === 1){
            this.$Message.success('会员修改成功');
            this.$router.push('/admin/user')
          } else if(resp.state === 2){
            this.$Message.warning('修改失败，会员已存在')
          }else{
            this.$Message.warning('会员修改失败')
          }
      },

    },
  }
</script>

<style>

</style>


