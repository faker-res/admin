<template>
  <div class="v2-search">
    <Form ref="formKey" :model="formKey" :rules="rules">
      <div class="mb25">
        <FormItem label="公告标题" prop="title" style="margin-bottom:20px">
          <Input placeholder="请输入标题(20字以内)" class="w609x ml5" v-model="formKey.title"/>
        </FormItem>
      </div>
      <div label="起止时间" class="clearfix mb20 ">
        <FormItem label="开始日期" prop="publish_at" class="fl ">
          <DatePicker type="date" placeholder="请选择日期" class="w165x ml5" v-model="formKey.publish_at" :options="options3"></DatePicker>
        </FormItem>
        <!-- <span class=" fl  ib">——</span> -->
        <FormItem label="结束日期" prop="offline_at" class="fl ml5">
          <DatePicker type="date" placeholder="请选择日期" class="w165x" v-model="formKey.offline_at" :options="options3"></DatePicker>
        </FormItem>
      </div>
      <div class="mb20">
        <FormItem >
          <span class="ml10">弹跳位置</span>
          <Select class="w110x ml20" v-model="formKey.bounce_location">
            <Option v-for="(item,index) in  list" :key="index" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="mb20">
        <FormItem label="出现位置" prop="newappears_location">
          <CheckboxGroup
            class="ml5"
            v-model="formKey.newappears_location"
            @on-change="Checkappears"
          >
            <Checkbox label="首页"></Checkbox>
            <Checkbox label="游戏页"></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </div>
      <div class="mb20 ml15">
        <FormItem label="客户端" prop="newclient_type">
          <CheckboxGroup class="ml5" v-model="formKey.newclient_type" @on-change="checkAllGroupChange">
            <Checkbox label="PC"></Checkbox>
            <Checkbox label="H5"></Checkbox>
            <Checkbox label="Android"></Checkbox>
            <Checkbox label="IOS"></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </div>
      <div class="mb  mb20 ml10">
        <FormItem label="编辑内容" prop="desc_format_type">
          <div class="v2-button ml5">
            <Button class="w148x fl mt10 mb20" :class="this.seltext==true?'active':''" @click="onText">文本</Button>
            <Button class="w148x fl mt10 mb20" :class="this.selimg==true?'active':''" @click="onImg">使用图片</Button>
          </div>
        </FormItem>
      </div>
      <!-- 使用图片显示的内容 -->
      <!-- 选择pc和手机 -->
      <div class="mt30 clearfix ml20" v-if="selimg && showh5">
        <div class="upLoad fl">
          <div style="text-align:center" v-if="showimg">
          <p class="ft18 txt-a mt20">PC端</p>
            <Upload
              :default-file-list="uploadForm.defaultList"
              :headers="uploadForm.headers"
              :action="uploadForm.action"
              :data="uploadForm.data"
              :name="uploadForm.name"
              :on-success="(res)=>{ onUploadSuccess(res,'pc') }"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
            >
              <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </div>
           <div class="demo-upload-list" v-if="!showimg">
                <img :src="formKey.pc_pic">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView('pc')" size="60"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove('pc')" size="60"></Icon>
                </div>
           </div>
            <!-- <Modal title="图片预览" v-model="visible">
                     <img :src="formKey.pc_pic" v-if="visible" style="width: 100%">
           </Modal> -->
        </div>

        <div class="upLoad fl ml20">
          <!-- 上传 -->
          <div style="text-align:center" v-if="showimgphone">
          <p class="ft18 txt-a mt20">手机端</p>
            <Upload
              :default-file-list="uploadForm.defaultList"
              :headers="uploadForm.headers"
              :action="uploadForm.action"
              :data="uploadForm.data"
              :name="uploadForm.name"
              :on-success="(res)=>{ onUploadSuccess(res,'phone') }"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"

            >
              <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </div>
           <div class="demo-upload-list" v-if="!showimgphone">
                <img :src="formKey.mob_pic">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView('phone')" size="60"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove('phone')" size="60"></Icon>
                </div>
           </div>
           <!-- 上传结束 -->
           <!-- <Modal title="图片预览" v-model="visible">
                     <img :src="formKey.mob_pic" v-if="visible" style="width: 100%">
           </Modal> -->
        </div>
      </div>
      <!-- 只选择pc -->
      <div class="mt30 clearfix ml20" v-if="selimg && !showh5">
        <div class="upLoadPC fl">
          <div style="text-align:center" v-if="showimg2">
            <p class="ft18 txt-a mt20" >{{pc? "PC端":"手机端"}}</p>
            <Upload
              :default-file-list="uploadForm.defaultList"
              :headers="uploadForm.headers"
              :action="uploadForm.action"
              :data="uploadForm.data"
              :name="uploadForm.name"
              :on-success="(res)=>{ onUploadSuccess(res,pc) }"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
            >
            <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
          </div>
           <div class="demo-upload-list" v-if="!showimg2">
                <img :src="pc?formKey.pc_pic:formKey.mob_pic">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(pc)" size="60"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(pc)" size="60"></Icon>
                </div>
           </div>

        </div>
      </div>

      <div class="ml10  mb20" v-if="seltext">
        <!-- <editor class="w690x ml90" ref="editor" :value="content" @on-change="handleChange"/> -->
           <UE :defaultMsg=defaultMsg1 :config=config :id=ue1 ref="ue1"></UE>
      </div>

      <FormItem label="状态" class="mt10">
        <Switch v-model="formKey.status" class="ml30" size="large"></Switch>
        <span class="ml20">{{formKey.status==false?"未启用":'已启用'}}</span>
        <Button class="ivu-btn addSave ml40" @click="save">{{$route.params.page === "edit"? "确认保存":"确认新增"}}</Button>
      </FormItem>
    </Form>
     <Modal title="图片预览" v-model="visible" class-name="vertical-center-modal">
            <img :src="url" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import Editor from "_c/editor";
import UE from "_c/UE";
import { popupsIns, popupsDetail, popupsUpt } from "@/api/system";
import { uploadImg } from "@/api/common";
import { getUserName } from "@/libs/util";
import { getToken } from "@/libs/util";
import { mapState } from "vuex";
import { constants } from "fs";
export default {
  name: "noticeDetial",
  components: {
    Editor,
    UE
  },
  data() {
    return {
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        publish_at: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        offline_at: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        newappears_location: [
          {
            required: true,
            message: "请选择出现位置",
            trigger: "change",
            pattern: /.+/
          }
        ],
        newclient_type: [
          {
            required: true,
            message: "请选择客户端",
            trigger: "change",
            pattern: /.+/
          }
        ]
      },
        defaultMsg1: '',
        config: {
          initialFrameWidth: 900,
          initialFrameHeight: 350
         },
      ue1: "ue1",
      uploadForm: {
        headers: { Authorization: getToken() },
        action: "/api/v2/uploadImg",
        data: { siteId: "" },
        name: "img",
        defaultList: [],
        path: "",
        src: ""
      },
       options3: {
        disabledDate:date=> {
         return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      showimg: true,
      showimg2: true,
      showimgphone: true,
      showpc: false,
      searchKey: {
        text: "text"
      },
      type: false,
      visible: false,
      content: "",
      switch1: false,
      indeterminate: true,
      checkAll: false,
      pc: true,
      h5: false,
      phone: false,
      checkAllGroup: ["PC"],
      formKey: {
        siteId: "",
        siteName: "",
        type: "popups",
        title: "",
        publish_at: "",
        offline_at: "",
        bounce_location: "",
        desc_format_type: "text",
        description: "",
        status: "",
        appears_location: "",
        client_type: "",
        newappears_location: [],
        newclient_type: [],
        pc_pic: "",
        mob_pic: "",
        url: "",
        pcpath: "",
        phonepath: "",
      },
      // Time: [formKey.publish_at, formKey.offline_at],
      seltext: true,
      selimg: false,
      showh5: false,
      list: [
        { value: "1", name: "登录前" },
        { value: "2", name: "登录后" },
        { value: "4", name: "不限制" }
      ]
    };
  },
  created() {
    // if (this.$route.params.page === "edit") {
    //   const data = { id: this.$route.query.id, siteId: this.$root.nowSite.id };
    //   this.onDetails(data);
    // }
    this.uploadForm.data.siteId = this.$root.nowSite.id;
  },
  mounted() {
      if (this.$route.params.page === "edit") {
      const data = { id: this.$route.query.id, siteId: this.$root.nowSite.id };
      this.onDetails(data);
    }
  },
  methods: {
    onText() {
      this.seltext = true;
      this.selimg = false;
      this.formKey.desc_format_type = "text";
    },
    onImg() {
      this.selimg = true;
      this.seltext = false;
      this.formKey.desc_format_type = "pic";
    },
    //新增公告成功
    save() {
      this.$refs.formKey.validate(valid => {
        if (valid) {
          if (this.$route.params.page === "create") {
            const params = { ...this.formKey };
            let Time = [params.publish_at, params.offline_at];
            if (this.$root.validatecourseTime(Time)) {
              params.publish_at = this.$root.formatTimeS(params.publish_at);
              params.offline_at = this.$root.formatnightTimeS(params.offline_at);
            } else {
              return false;
            }
            params.siteId = this.$root.nowSite.id;
            params.siteName = this.$root.nowSite.siteName;
           
            if (params.status == true) params.status = "yes";
            else params.status = "no";

            params.pc_pic = params.pcpath;
            params.mob_pic = params.phonepath;

            delete params.pcpath;
            delete params.phonepath;

            delete params.newappears_location;
            delete params.newclient_type;

            if (params.desc_format_type == "text") {
              params.description=this.$refs.ue1.getUEContent()
              delete params.pc_pic;
              delete params.mob_pic;
            } else {
              delete params.description;
              if (this.pc && !this.h5) {
                delete params.mob_pic;
                if (!params.pc_pic) {
                  this.$Message.error("请上传图片");
                  return false;
                }
              }
              if (!this.pc && this.h5) {
                delete params.pc_pic;
                if (!params.mob_pic) {
                  this.$Message.error("请上传图片");
                  return false;
                }
              }
              if (this.pc && this.h5) {
                if (!params.pc_pic) {
                  this.$Message.error("请上传pc端图片");
                  return false;
                }
                if (!params.mob_pic) {
                  this.$Message.error("请上传手机端图片");
                  return false;
                }
              }
            }
            delete params.url;
             for (let key in params) {
              if (!params[key]) delete params[key];
            }
            popupsIns(params).then(res => {
              this.$router.go(-1);
            });
          }
          if (this.$route.params.page === "edit") {
            const params = { ...this.formKey };
            let Time = [params.publish_at, params.offline_at];
            if (this.$root.validatecourseTime(Time)) {
              params.publish_at = this.$root.formatTimeS(params.publish_at);
              params.offline_at = this.$root.formatnightTimeS(params.offline_at);
            } else {
              return false;
            }
            params.siteId = this.$root.nowSite.id;
            params.siteName = this.$root.nowSite.siteName;
            params.id = this.$route.query.id;
            for (let key in params) {
              if (!params[key]) delete params[key];
            }
            if (params.status == true) params.status = "yes";
            else params.status = "no";

            if (params.pcpath) {
              params.pc_pic = params.pcpath;
            }
            if (params.phonepath) {
              params.mob_pic = params.phonepath;
            }
            delete params.pcpath;
            delete params.phonepath;

            delete params.newappears_location;
            delete params.newclient_type;

            if (params.desc_format_type == "text") {
              params.description=this.$refs.ue1.getUEContent()
              delete params.pc_pic;
              delete params.mob_pic;
            } else {
              delete params.description;
              if (this.pc && !this.h5) {
                delete params.mob_pic;
                if (!params.pc_pic) {
                  this.$Message.error("请上传图片");
                  return false;
                }
              }
              if (!this.pc && this.h5) {
                delete params.pc_pic;
                if (!params.mob_pic) {
                  this.$Message.error("请上传图片");
                  return false;
                }
              }
              if (this.pc && this.h5) {
                if (!params.pc_pic) {
                  this.$Message.error("请上传pc端图片");
                  return false;
                }
                if (!params.mob_pic) {
                  this.$Message.error("请上传手机端图片");
                  return false;
                }
              }
            }

            delete params.url;
            popupsUpt(params).then(res => {
              if (res.code == 200) this.$router.go(-1);
            });
          }
        }
      });
    },
    // 改变富文本框
    handleChange(html, text) {
      this.formKey.description = html.toString();
    },
    handleFormatError(file) {
      this.$Tip.info({ content: "请上传图片" });
    },
    change(status) {
      //   this.$Message.info("开关状态：" + status);
    },
    checkAllGroupChange() {
      let clientlist = [];
      this.h5 = this.formKey.newclient_type.some(
        item => item == "H5" || item == "Android" || item == "IOS"
      );
      this.pc = this.formKey.newclient_type.some(item => item == "PC");
      if (this.pc && this.h5) this.showh5 = true;
      else this.showh5 = false;
      this.formKey.newclient_type.map(item => {
        clientlist.push(item);
      });

      if (clientlist.length > 1)
        this.formKey.client_type = clientlist.join(",");
      else this.formKey.client_type = clientlist[0];
    },
    //出现位置
    Checkappears() {
      let appears = [];
      this.formKey.newappears_location.map(item => {
        if (item == "首页") {
          appears.push("1");
        } else {
          appears.push("2");
        }
      });
      if (appears.length > 1) this.formKey.appears_location = appears.join(",");
      else this.formKey.appears_location = appears[0];
    },
    handleView(val) {
      if (val == "pc" || val == true) this.url = this.formKey.pc_pic;
      else this.url = this.formKey.mob_pic;
      this.visible = true;
    },
    handleRemove(val) {
      if (val == "pc" || val == true) {
        this.formKey.pc_pic = "";
        this.formKey.pcpath = " ";
        this.showimg = true;
        this.showimg2 = true;
      } else {
        if (!val) {
          this.showimg = true;
          this.showimgphone = true;
          this.showimg2 = true;
        }
        this.formKey.mob_pic = "";
        this.formKey.phonepath = "";
        this.showimgphone = true;
      }
    },
    onUploadSuccess(res, val) {
      const { path, src, host } = res.data;
      if (val == "pc" || val == true) {
        this.formKey.pc_pic = `${host}/${src}`;
        this.formKey.pcpath = path;
        this.showimg = false;
        this.showimg2 = false;
      } else {
        if (!val) {
          this.showimg = false;
          this.showimg2 = false;
        }
        this.showimgphone = false;
        this.formKey.mob_pic = `${host}/${src}`;
        this.formKey.phonepath = path;
      }
    },
    onDetails(data) {
      popupsDetail(data).then(res => {
        Object.keys(this.formKey).forEach(key => {
          if (key == "status") {
            this.formKey[key] = res.data[key] == "yes" ? true : false;
          } else if (key == "newclient_type" || key == "newappears_location") {
            this.formKey[key] = this.formKey[key];
          } else if (key == "bounce_location") {
            this.formKey[key] = res.data[key].toString();
          } else if (key == "publish_at" || key == "offline_at") {
            this.formKey[key] = this.$root.unixTime(res.data[key]);
          } else {
            this.formKey[key] = res.data[key];
          }
        });
        const {
          newclient_type,
          client_type,
          appears_location,
          newappears_location,
          publish_at,
          offline_at,
          desc_format_type,
          bounce_location,
          description,
        } = this.formKey;
        if (client_type.length == 1) newclient_type.push(client_type);
        else
          client_type.split(",").map(item => {
            newclient_type.push(item);
          });
        if (appears_location.length == 1)
            if(appears_location=="1")   newappears_location.push("首页")
            else  newappears_location.push("游戏页")
        else
          appears_location.split(",").map(item => {
            if (item == "1") {
              item = "首页";
            } else {
              item = "游戏页";
            }
            newappears_location.push(item);
          });
        if (description) {
             this.$refs.ue1._data.editor.body.innerHTML=description
        }
        this.h5 = this.formKey.newclient_type.some(
          item => item == "H5" || item == "Android" || item == "IOS"
        );
        this.pc = this.formKey.newclient_type.some(item => item == "PC");
        if (this.pc && this.h5) this.showh5 = true;
        else this.showh5 = false;
        if (this.pc && this.h5) {
          this.showimg = false;
          this.showimgphone = false;
        } else if (this.pc && !this.h5) {
          this.showimg2 = false;
        } else if (this.h5 && !this.pc) {
          this.showimg2 = false;
        }

        if (desc_format_type == "pic") {
          this.selimg = true;
          this.seltext = false;
        }
      });
    }
  },
  computed: {
    username() {
      return getUserName();
    },
    ...mapState({
      token: state => state.user.token
    })
  },
  watch: {
    "$root.nowSite": {
      handler(val) {
        this.uploadForm.data.siteId = val.id;
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../styles/button.less";
.v2-button .ivu-btn{
  border-color:#dcdcdc;
  color:#C5C5C5;
}
/deep/.v2-button .active{border-color: #62B1FD; color: #62B1FD;box-shadow:none !important;}
.upLoad {
  width: 345px;
  height: 140px;
  border: 1px solid #e4e4e4;
}
.upLoad :nth-child(1) {
  border-left: 0;
}
.upLoadPC {
  width: 690px;
  height: 140px;
  border: 1px solid #e4e4e4;
}
/deep/.ivu-form-item-error-tip {
  top: 33px;
}
.demo-upload-list {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 140px;
  // border: 1px solid transparent;
  // border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  // margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  /deep/.ivu-modal {
    top: 0;
  }
}
</style>
