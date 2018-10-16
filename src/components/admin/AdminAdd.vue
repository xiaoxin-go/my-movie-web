<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/admin">管理员管理</BreadcrumbItem>
        <BreadcrumbItem>添加管理员</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <p slot="title">添加管理员</p>
        <div class="group-input">
          <p style="margin-bottom: 5px;">管理员名称</p>
          <Input v-model="name" placeholder="请输入管理员名称..." clearable style="width: 100%"/>
        </div>
        <div class="group-input">
          <p style="margin-bottom: 5px;">管理员密码</p>
          <Input type="password" v-model="pwd" placeholder="请输入管理员密码..." clearable style="width: 100%"/>
        </div>
        <div class="group-input">
          <p style="margin-bottom: 5px;">管理员重复密码</p>
          <Input v-model="" placeholder="重复密码..." clearable style="width: 100%"/>
        </div>
        <div class="group-input">
          <p style="margin-bottom: 5px;">所属角色</p>
          <Select v-model="auth_id">
            <Option v-for="item in auth_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
      </Card>
      <Divider />
      <div style="padding: 0 0 15px 10px">
        <Button type="default" size="large" @click="goBack">取消</Button>
        <Button type="primary" size="large" @click="add">添加</Button>
      </div>
    </div>

  </div>

</template>

<script>
  import {addAdmin, getRole} from '../../api/index.js';
  export default {
    created() {
    },
    data() {
      return {
        /*  添加管理员属性 */
        name: null,          // 管理员名称
        pwd: null,          // 管理员密码
        rpwd:null,          // 重复密码
        auth_id: null,    // 角色ID
        auth_list:[],     // 角色列表

      }
    },
    computed: {},
    components: {},
    methods: {
      // 返回上一级页面
      goBack() {
        this.$router.go(-1)
      },

      async get_role(){
        let resp = await getRole({page:1, page_size:50});
        this.auth_list = resp.data;
      },

      // 添加管理员
      async add() {
        if (this.name === null) {
          this.$Message.warning('请输入管理员名称');
          return
        }
        let json_data = {
          name: this.name,
        };
        //  管理员添加成功后，应当将添加成功的ID返回，然后追加到列表中，添加完成后，初始化模态框信息         // 否则为新建
        let resp = await addAdmin(json_data);
        if (resp.state === 1) {
          this.$Message.success('管理员添加成功');
          this.name = null;
        } else if (resp.state === 2) {
          this.$Message.warning('添加失败，管理员已存在')
        } else {
          this.$Message.success('管理员添加失败');
        }
    },
    },
  }
</script>

<style>

</style>


