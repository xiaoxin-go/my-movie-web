<template>
  <div class="main">
    <!--   loading效果   -->
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="main-title1">
      <Breadcrumb>
        <BreadcrumbItem>标签管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <Input search enter-button v-model="keyword" placeholder="请输入关键字" clearable style="width: 150px;margin-right:10px" @on-search="getData"></Input>
      <a title="添加标签" class="add" @click="add">
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
      title="删除标签"
      @on-ok="del" :mask-closable="false" class-name="delModal">
      <p>您确定要删除此标签吗？</p>
    </Modal>
  </div>

</template>

<script>
  import {getTag, delTag} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        keyword:null,
        
        /*  删除标签属性 */
        delModal:false,     // 删除模态框
        loading:true,
        index:null,       // 标签列表下标
        total:0,          // 总条数
        page_size:20,      // 每页条数
        page:1,            // 当前页
        data_list: [],     // 标签列表
        titleList:                   // 列表title
          [
            {title: '编号', key: 'id',align:'center'},
            {title: '名称', key: 'name',align:'center'},
            {title: '添加时间', key: 'addtime',align:'center'},
            {title: '操作', key: 'action', align: 'center',
              render: (h, params) => {
                // 两个按钮
                return h('div', [
                  h('a', [h('Icon', {props: {type: 'ios-build-outline', size: '18'},
                    style: {marginRight: '5px'},
                    domProps:{title:'修改'},
                    on: {click: () => {this.put(params.index)}}}, "")]
                  ),
                  h('a', [h('Icon', {props: {type: 'ios-trash-outline', size: '18'},
                    style: {marginRight: '5px'},
                    domProps:{title:'删除'},
                    on: {click: () => {this.index = params.index;this.delModal = true}}}, "")]
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
        let resp = await getTag(jsonData);
        this.total = resp.total;
        if(this.total > 0){
          this.data_list = resp.data;
        }
        this.loading = false;
      },
      
      // 添加标签
      add(){
        this.$router.push('/admin/tag/add')
      },
      
      // 添加标签

      // 修改标签
      put(index){
        let bid = this.data_list[index].id;
        this.$router.push(`/admin/tag/update/${bid}`)
      },

      // 删除标签
      async del(){
        this.delModal = false;
        let jsonData = {
          id:this.data_list[this.index].id
        };
        let resp = await delTag(jsonData);
        if (resp.state === 1){
          this.data_list.splice(this.index, 1);    // 从原数组中移除
          this.total -= 1;
          this.$Message.success('标签删除成功')
        }else{
          this.$Message.warning('标签删除失败')
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

