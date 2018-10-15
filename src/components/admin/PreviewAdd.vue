<template>
  <div class="main">
    <div class="main-title1">
      <Breadcrumb>
        <a @click="goBack" class="back">
          <Icon type="md-return-left" size="16"/>
        </a>
        <BreadcrumbItem to="/admin/preview">预告管理</BreadcrumbItem>
        <BreadcrumbItem>添加预告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="background: #fff;
    box-shadow: 0 0 18px 1px #ccc;
    border-radius: 3px;
    margin-top: 15px;">
      <Card :bordered="false" dis-hover>
        <p slot="title" style="font-size: 18px; font-weight: normal;">添加预告</p>

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
      <Divider/>
      <div style="padding: 0 0 15px 10px">
        <Button type="default" size="large" @click="goBack">取消</Button>
        <Button type="primary" size="large" @click="add">添加</Button>
      </div>
    </div>

  </div>

</template>

<script>
  import {addPreview, upload_logo} from '../../api/index.js';

  export default {
    created() {
    },
    data() {
      return {
        /*  添加预告属性 */
        title: null,          // 预告名称
        logo: null,

        upload_image: null,

      }
    },
    computed: {},
    components: {},
    methods: {
      // 返回上一级页面
      goBack() {
        this.$router.go(-1)
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

        //每次都只会遍历一个图片数据
        // var fr = new FileReader();
        // fr.readAsDataURL(file);
        // fr.onload = () => {
        //   //div.appendChild(img);
        //   //document.getElementById('logo_image').appendChild(div);
        //   this.upload_image = fr.result
        //   //upload_image
        // };


      },
      // 添加预告
      async add() {
        if (this.title === null) {
          this.$Message.warning('请输入预告名称');
          return
        }
        let upload_log = document.getElementById('upload_logo');
        let input = upload_log.getElementsByTagName('input')[0];
        let file = input.files[0];

        let json_data = {
          title: this.title,
          logo:this.logo,
        };

        //  预告添加成功后，应当将添加成功的ID返回，然后追加到列表中，添加完成后，初始化模态框信息         // 否则为新建
        let resp = await addPreview(json_data);
        if (resp.state === 1) {
          this.$Message.success('预告添加成功');
          this.title = null;
        } else if (resp.state === 2) {
          this.$Message.warning('添加失败，预告已存在')
        } else {
          this.$Message.success('预告添加失败');
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


