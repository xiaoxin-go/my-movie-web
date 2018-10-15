<template>
    <div id="app">
      <div v-for="data in data_list">
        <img :src="'data:image/jpeg;base64,' + data.logo" :alt="data.title">
        <p>{{data.title}}/{{data.release_time}}</p>
      </div>

      <div class="main-bottom">
        <Page :total="total" show-sizer show-elevator show-total :current="page" @on-change="changePage" :page-size="page_size" :page-size-opts="[10,20,50,100]" @on-page-size-change="changePagesize"></Page>
      </div>
    </div>
</template>

<script>
  import {getMovie} from '../../api/index.js';
    export default {
      data(){
        return{
        total:0,          // 总条数
          page_size:20,      // 每页条数
          page:1,            // 当前页
          keyword: null,
          data_list: [],     // 标签列表
      }
    },
      created(){
        this.getData()
      },
      methods: {
        async getData() {
          let jsonData = {
            page: this.page,
            page_size: this.page_size,
            keyword: this.keyword,
          };
          let resp = await getMovie(jsonData);
          this.total = resp.total;
          if (this.total > 0) {
            this.data_list = resp.data;
          }
          this.loading = false;
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
      }
    }
</script>

<style>


</style>
