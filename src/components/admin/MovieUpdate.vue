<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/movie">电影管理</BreadcrumbItem>
        <BreadcrumbItem>修改电影</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <div class="group-input">
          <p style="margin-bottom: 5px;">电影名称</p>
          <Input v-model="title" placeholder="请输入电影名称..." clearable style="width: 100%"/>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">url</p>
          <Input v-model="url" placeholder="请输入电影url..." clearable style="width: 100%"/>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">介绍</p>
          <Input v-model="info" type="textarea" :rows="6" placeholder="请输入电影简介..." clearable style="width: 100%"/>
        </div>

        <div class="group-input logo">
          <p style="margin-bottom: 5px;">封面</p>
          <Input v-model="logo" id="upload_logo" type="file" placeholder="请选择图片..." @on-change="upload_logo" clearable
                 style="border: none;"/>
          <div id="logo_image"></div>
          <img :src="upload_image" alt="">

        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">星级</p>
          <Select v-model="star">
            <Option v-for="item in star_list" :value="item.label" :key="item.label">{{ item.value }}</Option>
          </Select>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">标签</p>
          <Select v-model="tag_id">
            <Option v-for="item in tag_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">地区</p>
          <Input v-model="area" placeholder="请输入电影地区..." clearable style="width: 100%"/>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">片长</p>
          <Input v-model="length" placeholder="请输入电影长度..." clearable style="width: 100%"/>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">上映时间</p>
          <DatePicker type="date"  :value='release_time' placeholder="请选择上映时间" @on-change="changeReleaseTime"></DatePicker>
        </div>

        <div class="group-input">
          <p style="margin-bottom: 5px;">演员表</p>
          <Input v-model="performer" placeholder="请输入电影演员..." clearable style="width: 100%"/>
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
  import {getMovie, putMovie, upload_logo, getTag} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        /*  修改电影属性 */
        title: null,          // 电影名称
        url: null,
        info: null,
        logo: null,
        star: 1,
        tag_id: null,
        area: null,
        length: null,
        release_time: null,
        performer: null,

        star_list:[{'label':1,'value':'1星'},{'label':2,'value':'2星'},
          {'label':3,'value':'3星'},{'label':4,'value':'4星'},
          {'label':5,'value':'5星'},],

        tag_list:[],

        upload_image: null,
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

        let tag = await getTag({
                                 page:1,
                                 page_size: 50,
                               });
        this.tag_list = tag.data;

        let resp = await getMovie({id: this.id});
        console.log(resp);
        let data = resp.data[0];
        this.title = data.title;
        this.info = data.info;
        this.upload_image = 'data:;base64,' + data.logo;
        this.length = data.length;
        this.release_time = this.$format(data.release_time);
        this.url = data.url;
        this.area = data.area;
        this.performer = data.performer;
        this.star = data.star;
        this.tag_id = data.tag_id;
      },

      async upload_logo() {
        this.upload_image = '';
        console.log('upload...', this.logo);

        let upload_log = document.getElementById('upload_logo');
        let input = upload_log.getElementsByTagName('input')[0];
        let file = input.files[0];
        let formData = new FormData();
        formData.append('file', file);
        let resp = await upload_logo(formData);
        console.log(resp);
        this.upload_image = 'data:image/jpeg;base64,' + resp;

        let upload_image = document.getElementById(('upload_image'));
      },

      // 修改电影
      async update(){
        if (this.title === null) {
          this.$Message.warning('请输入电影名称');
          return
        }

        let json_data = {
          id: this.id,
          title: this.title,
          tag_id: this.tag_id,
          star: this.star,
          area: this.area,
          info: this.info,
          length: this.length,
          release_time: this.release_time,
          logo:this.logo,
          performer: this.performer
        };
          let resp = await putMovie(json_data);
          if (resp.state === 1){
            this.$Message.success('电影修改成功');
            this.$router.push('/admin/movie')
          } else if(resp.state === 2){
            this.$Message.warning('修改失败，电影已存在')
          }else{
            this.$Message.warning('电影修改失败')
          }
      },
      // 自定义定时任务开始时间选择框触发
      changeReleaseTime(date,current){
        this.release_time = date;
      },

    },
  }
</script>

<style>

</style>


