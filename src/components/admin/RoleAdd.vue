<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/role">角色管理</BreadcrumbItem>
        <BreadcrumbItem>添加角色</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <p slot="title">添加角色</p>
        <p style="margin-bottom: 5px;">角色名称</p>
        <Input v-model="name" placeholder="请输入角色名称..." clearable style="width: 100%" />
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
  import {addRole} from '../../api/index.js';
  export default {
    created() {
    },
    data() {
      return {
        /*  添加角色属性 */
        name: null,          // 机房名称

      }
    },
    computed: {},
    components: {},
    methods: {
      // 返回上一级页面
      goBack() {
        this.$router.go(-1)
      },

      // 添加角色
      async add() {
        if (this.name === null) {
          this.$Message.warning('请输入角色名称');
          return
        }
        let json_data = {
          name: this.name,
        };
        //  角色添加成功后，应当将添加成功的ID返回，然后追加到列表中，添加完成后，初始化模态框信息         // 否则为新建
        let resp = await addRole(json_data);
        if (resp.state === 1) {
          this.$Message.success('角色添加成功');
          this.name = null;
        } else if (resp.state === 2) {
          this.$Message.warning('添加失败，角色已存在')
        } else {
          this.$Message.success('角色添加失败');
        }
    },
    },
  }
</script>

<style>

</style>


