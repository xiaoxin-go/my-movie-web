<template>
  <div class="main">
    <!--   loading效果   -->
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="main-title1">
      <Breadcrumb>
        <BreadcrumbItem>电影管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="search">
      <Input search enter-button v-model="keyword" placeholder="请输入关键字" clearable style="width: 150px;margin-right:10px" @on-search="getData"></Input>
      <a title="添加电影" class="add" @click="add">
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
      title="删除电影"
      @on-ok="del" :mask-closable="false" class-name="delModal">
      <p>您确定要删除此电影吗？</p>
    </Modal>
  </div>

</template>

<script>
  import {getMovie, delMovie} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        keyword:null,

        /*  删除电影属性 */
        delModal:false,     // 删除模态框
        loading:true,
        index:null,       // 电影列表下标
        total:0,          // 总条数
        page_size:20,      // 每页条数
        page:1,            // 当前页
        data_list: [],     // 电影列表
        titleList:                   // 列表title
          [
            {title: '名称', key: 'title',align:'center'},
            {title: '标签', key: 'tag_id',align:'center'},
            {title: '地区', key: 'area',align:'center'},
            {title: '星级', key: 'star',align:'center'},
            {title: '播放数量', key: 'playnum',align:'center'},
            {title: '评论数量', key: 'commentnum',align:'center'},
            {title: '上映时间', key: 'release_time',align:'center'},
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
        let resp = await getMovie(jsonData);
        this.total = resp.total;
        if(this.total > 0){
          this.data_list = resp.data;
        }
        this.loading = false;
      },

      // 添加电影
      add(){
        this.$router.push('/admin/movie/add')
      },

      // 添加电影

      // 修改电影
      put(index){
        let bid = this.data_list[index].id;
        this.$router.push(`/admin/movie/update/${bid}`)
      },

      // 删除电影
      async del(){
        this.delModal = false;
        let jsonData = {
          id:this.data_list[this.index].id
        };
        let resp = await delMovie(jsonData);
        if (resp.state === 1){
          this.data_list.splice(this.index, 1);    // 从原数组中移除
          this.total -= 1;
          this.$Message.success('电影删除成功')
        }else{
          this.$Message.warning('电影删除失败')
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

