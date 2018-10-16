<template>
  <div class="main">
    <!--   loading效果   -->
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="main-title1">
      <Breadcrumb>
        <BreadcrumbItem>管理员管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <Input search enter-button v-model="keyword" placeholder="请输入关键字" clearable style="width: 150px;margin-right:10px" @on-search="getData"></Input>
      <a title="添加管理员" class="add" @click="add">
        <Icon type="ios-add-circle-outline" />
      </a>
    </div>
    <div class="main-body">
      <Table :columns="titleList" :data="data_list" style="margin-top:15px"></Table>
    </div>
    <div class="main-bottom">
      <Page :total="total" show-sizer show-elevator show-total :current="page" @on-change="changePage" :page-size="page_size" :page-size-opts="[10,20,50,100]" @on-page-size-change="changePagesize"></Page>
    </div>
    <Modal
      v-model="delModal"
      title="删除管理员"
      @on-ok="del" :mask-closable="false" class-name="delModal">
      <p>您确定要删除此管理员吗？</p>
    </Modal>
  </div>

</template>

<script>
  import {getAdmin, delAdmin} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        keyword:null,

        /*  删除管理员属性 */
        delModal:false,     // 删除模态框
        loading:true,
        index:null,       // 管理员列表下标
        total:0,          // 总条数
        page_size:20,      // 每页条数
        page:1,            // 当前页
        data_list: [],     // 管理员列表
        titleList:                   // 列表title
          [
            {title: '名称', key: 'name',align:'center'},
            {title: '类型', key: 'type',align:'center'},
            {title: '角色', key: 'is_super',align:'center'},
            {title: '添加时间', key: 'addtime',align:'center'},
            {title: '操作', key: 'action', align: 'center',
              render: (h, params) => {
                // 两个按钮
                return h('div', [
                  h('a', [h('Button', {props: {type: 'info', size: 'small'},
                    style: {marginRight: '5px'},
                    on: {click: () => {this.put(params.index)}}}, "修改")]
                  ),
                  h('a', [h('Button', {props: {type: 'warning', size: 'small'},
                    style: {marginRight: '5px'},
                    on: {click: () => {this.index = params.index;this.delModal = true}}}, "删除")]
                  )
                ]);
              }
            }
          ],
      }
    },
    computed: {},
    components: {},
    methods: {
      async getData(){
        let jsonData = {
          page:this.page,
          page_size:this.page_size,
          keyword: this.keyword,
        };
        let resp = await getAdmin(jsonData);
        this.total = resp.total;
        if(this.total > 0){
          this.data_list = resp.data;
        }
        this.loading = false;
      },

      // 添加管理员
      add(){
        this.$router.push('/admin/admin/add')
      },

      // 添加管理员

      // 修改管理员
      put(index){
        let bid = this.data_list[index].id;
        this.$router.push(`/admin/admin/update/${bid}`)
      },

      // 删除管理员
      async del(){
        this.delModal = false;
        let jsonData = {
          id:this.data_list[this.index].id
        };
        let resp = await delAdmin(jsonData);
        if (resp.state === 1){
          this.data_list.splice(this.index, 1);    // 从原数组中移除
          this.total -= 1;
          this.$Message.success('管理员删除成功')
        }else{
          this.$Message.warning('管理员删除失败')
        }
      },
      // 改变页数
      changePage(index){
        this.page = index;
        console.log('page:',this.page);
        this.getData();
      },

      // 改变每页显示的条数
      changePagesize(index){
        this.page_size = index;
        console.log('page_size:',this.page_size);
        this.getData();
      }
    },
  }
</script>

<style>
</style>

