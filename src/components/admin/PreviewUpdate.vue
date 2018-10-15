<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/preview">预告管理</BreadcrumbItem>
        <BreadcrumbItem>修改预告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <div class="group-input">
          <p style="margin-bottom: 5px;">预告名称</p>
          <Input v-model="title" placeholder="请输入预告名称..." clearable style="width: 100%"/>
        </div>

        <div class="group-input logo">
          <p style="margin-bottom: 5px;">封面</p>
          <Input v-model="logo" id="upload_logo" type="file" placeholder="请选择图片..." @on-change="upload_logo" clearable
                 style="border: none;"/>
          <div id="logo_image"></div>
          <img :src="upload_image" alt="">

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
  import {getPreview, putPreview, upload_logo} from '../../api/index.js';
  export default {
    created(){
      this.getData()
    },
    data() {
      return {
        /*  修改预告属性 */
        title:null,          // 预告名称
        logo: null,
        upload_image:null,
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
        let resp = await getPreview({id: this.id});
        let data = resp.data[0];
        this.title = data.title;
        this.upload_image = 'data:image/jpeg;base64,' + data.logo;
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

      // 添加预告
      async update(){
        if (this.title === null){this.$Message.warning('请输入预告名称');return}

        let upload_log = document.getElementById('upload_logo');
        let input = upload_log.getElementsByTagName('input')[0];
        let file = input.files[0];

        let json_data = {
          id: this.id,
          title: this.title,
          logo: this.logo,
        };
        let resp = await putPreview(json_data);
        if (resp.state === 1){
          this.$Message.success('预告修改成功');
          this.$router.push('/admin/preview')
        } else if(resp.state === 2){
          this.$Message.warning('修改失败，预告已存在')
        }else{
          this.$Message.warning('预告修改失败')
        }
      },

    },
  }
</script>

<style>

</style>


