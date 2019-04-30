<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" :model="searchKey" :rules="rules">
        <div class="mb20">
          <FormItem label="文章标题" prop="title" >
            <Select class="w190x ml10" v-model="searchKey.title" @on-change="changeType" clearable>
              <Option
                v-for="(item,index) in artcilesList "
                :value="item.name"
                :key="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="mb20">
          <FormItem v-if="seltext" label="自定义标题" prop="newtitle">
            <Input v-model="searchKey.newtitle"/>
          </FormItem>
        </div>
        <div class="mb20">
          <FormItem v-if="seltext" label="自定义地址" prop="custom_url">
            <Input v-model="searchKey.custom_url"/>
          </FormItem>
        </div>
        <div class="mb20">
          <FormItem label="发布平台" prop="newclient_type">
            <CheckboxGroup
              v-model="searchKey.newclient_type"
              @on-change="changeplatform"
              class="ml5"
            >
              <Checkbox label="PC"></Checkbox>
              <Checkbox label="H5"></Checkbox>
              <Checkbox label="Android"></Checkbox>
              <Checkbox label="IOS"></Checkbox>
            </CheckboxGroup>
          </FormItem>
        </div>
        <div class="clearfix" v-show="showPC">
          <!-- <span class="ml40 fl">PC</span> -->
          <div>PC</div>
          <!-- <editor class="w690x fl ml30" ref="editor" :value="contentpc" @on-change="handleChangepc"/> -->
          <UE :defaultMsg=defaultMsg1 :config=config :id=ue1 ref="ue1" ></UE>
        </div>
        <div class="clearfix mt30" v-if="showh5 ">
          <div>手机端</div>
          <!-- <span class="ml20 fl">手机端</span> -->
          <!-- <editor
            class="w690x fl ml30"
            ref="editor"
            :value="contentphone"
            @on-change="handleChangephone"
          /> -->
            <UE :defaultMsg=defaultMsg2 :config=config :id=ue2 ref="ue2"></UE>
        </div>
        <div class="mt20">
          <FormItem label="状态">
            <Switch v-model="searchKey.status" class="ml30" size="large"></Switch>
            <span class="ml20">{{searchKey.status==false?"未启用":'已启用'}}</span>
            <Button class="ivu-btn addSave ml40" @click="save">{{$route.params.page === "edit"? "确认保存":"确认新增"}}</Button>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import Editor from "_c/editor";
import UE from "_c/UE";
import { articleIns, articleDetail, articleUpt } from "@/api/system";
export default {
  name: "addArtciles",
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
            trigger: "change"
          }
        ],
        custom_url: [
          {
            required: true,
            message: "请输入自定义地址",
            trigger: "blur"
            // pattern: /.+/
          }
        ],
        newtitle: [
          {
            required: true,
            message: "请输入自定义标题",
            trigger: "blur",
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
        defaultMsg2:'8888888888888',
        config: {
          initialFrameWidth: 900,
          initialFrameHeight: 350
      },
      ue1: "ue1",
      ue2: "ue2",
      seltext: false,
      otherList: false,
      showh5: false,
      showPC: true,
      searchKey: {
        siteId: "",
        siteName: "",
        type: "article",
        title: "",
        client_type: "PC",
        newclient_type: ["PC"],
        description: "",
        status: "",
        desc_mobile: "",
        custom_url: "",
        newtitle: ""
      },
      artcilesList: [
        { value: "0", name: "自定义" },
        { value: "1", name: "关于我们" },
        { value: "2", name: "公司简介" },
        { value: "3", name: "联系我们" },
        { value: "4", name: "新手指南" },
        { value: "5", name: "合作加盟" },
        { value: "6", name: "优惠活动" },
        { value: "7", name:  "合作伙伴"},
        { value: "8", name:  "存款帮助"},
        { value: "9", name:  "取款帮助"},
        { value: "9", name:  "常见问题"},
      ],
      fruit: [],
      contentpc: "",
      contentphone:""
    };
  },
  created() {
    if (this.$route.params.page === "edit") {
      const data = { id: this.$route.query.id, siteId: this.$root.nowSite.id };
      this.searchKey.newclient_type = [];
      this.searchKey.client_type = "";
      this.onDetails(data);
    }
  },
   mounted () {
   if (this.$route.params.page === "edit") {
      const data = { id: this.$route.query.id, siteId: this.$root.nowSite.id };
      this.searchKey.newclient_type = [];
      this.searchKey.client_type = "";
      this.onDetails(data);
    }
  },
  methods: {
    // 改变富文本框
    handleChangepc(html, text) {
      this.searchKey.description = html.toString();
    },
    handleChangephone(html, text) {
      this.searchKey.desc_mobile = html.toString();
    },
    changeContent() {
      this.$refs.editor.setHtml("<p>powered by wangeditor</p>");
    },
    changeplatform() {
      let platformList = [];
      this.showPC = this.searchKey.newclient_type.some(item => item == "PC");
      this.showh5 = this.searchKey.newclient_type.some(
        item => item == "H5" || item == "Android" || item == "IOS"
      );
      this.searchKey.newclient_type.forEach(item => {
        platformList.push(item);
      });
      if (platformList.length > 1)
        this.searchKey.client_type = platformList.join(",");
      else this.searchKey.client_type = platformList[0];
    },
    //自定义可以编辑
    changeType() {
      if (this.searchKey.title == "自定义") {
        this.seltext = true;
      } else {
        this.seltext = false;
      }
    },
    save() {
      this.$refs.searchKey.validate(valid => {
        if (valid) {
          if (this.$route.params.page === "create") {
            if(this.showPC && !this.showh5){
              this.searchKey.description=this.$refs.ue1.getUEContent()
            }
            if(this.showh5 && !this.showPC){
              this.searchKey.desc_mobile = this.$refs.ue2.getUEContent()
            }
            if(this.showh5 && this.showPC){
                this.searchKey.description=this.$refs.ue1.getUEContent()
                this.searchKey.desc_mobile = this.$refs.ue2.getUEContent()
            }
            console.log(this.searchKey)
            const params = { ...this.searchKey };
            params.siteId = this.$root.nowSite.id;
            params.siteName = this.$root.nowSite.siteName;
            if (params.status == true) params.status = "yes";
            else params.status = "no";
            if (params.title == "自定义") {
              params.title = params.newtitle;
            } else {
              delete params.custom_url;
            }
            if (params.client_type == "PC") {
                delete params.desc_mobile;
                params.description=this.$refs.ue1.getUEContent()
                if(!params.description){
                    this.$Message.error("请填写PC端文章内容！");
                    return false
                }
            }
            if(params.client_type.includes(",")){
              console.log(666)
              params.desc_mobile=this.$refs.ue2.getUEContent()
              if(!params.desc_mobile){
                      this.$Message.error("请填写手机端文章内容！");
                      return false
              }
            }
            delete params.newtitle;
            delete params.newclient_type;
             for (let key in params) {
               if (!params[key]) delete params[key];
             }
            articleIns(params).then(res => {
               this.$router.go(-1);
              });
          }
          if (this.$route.params.page === "edit") {
            if(this.showPC && !this.showh5){
              this.searchKey.description=this.$refs.ue1.getUEContent()
            }
            if(this.showh5 && !this.showPC){
              this.searchKey.desc_mobile = this.$refs.ue2.getUEContent()
            }
            if(this.showh5 && this.showPC){
                this.searchKey.description=this.$refs.ue1.getUEContent()
                this.searchKey.desc_mobile = this.$refs.ue2.getUEContent()
            }
            const params = { ...this.searchKey };
            params.siteId = this.$root.nowSite.id;
            params.id = this.$route.query.id;
            params.siteName = this.$root.nowSite.siteName;
            if (params.status == true) params.status = "yes";
            else params.status = "no";
            if (params.title == "自定义") {
              params.title = params.newtitle;
            } else {
              delete params.custom_url;
            }
            if (params.client_type == "PC"){
               delete params.desc_mobile;
               if(!params.description){
                    this.$Message.error("请填写PC端文章内容！");
                    return false
                }
            }
             if(params.client_type.includes(",")){
              if(!params.desc_mobile){
                      this.$Message.error("请填写手机端文章内容！");
                      return false
              }
            }
            delete params.newtitle;
            delete params.newclient_type;
            articleUpt(params).then(res => {
                 this.$router.go(-1);
              // this.$Tip.confirm({
              //   content: "修改成功",
              //   onOk: () => {
              //     this.$router.go(-1);
              //   }
              // });
            });
          }
        } else {
          this.$Message.error("请填写正确的信息！");
        }
      });
    },
    onDetails(data) {
      articleDetail(data).then(res => {
        Object.keys(this.searchKey).forEach(key => {
          if (key == "status") {
            this.searchKey[key] = res.data[key] == "yes" ? true : false;
          } else if (key == "newclient_type" || key == "newtitle") {
            this.searchKey[key] = this.searchKey[key];
          } else {
            this.searchKey[key] = res.data[key];
          }
        });
        const {
          newclient_type,
          client_type,
          title,
          newtitle,
          custom_url,
          description,
          desc_mobile
        } = this.searchKey;
        if (client_type.length == 1) newclient_type.push(client_type);
        else
          client_type.split(",").map(item => {
            newclient_type.push(item);
          });
        this.showh5 = newclient_type.some(
          item => item == "H5" || item == "Android" || item == "IOS"
        );
        this.$refs.ue1._data.editor.body.innerHTML=description
        // this.defaultMsg1=description
        this.defaultMsg2=desc_mobile
        console.log(this.defaultMsg1,this.defaultMsg2)
        if (custom_url) {
          this.seltext = true;
          this.searchKey.newtitle = this.searchKey.title;
          this.searchKey.title = "自定义";
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../styles/button.less";
/deep/.ivu-select-dropdown{
     z-index: 200000000 !important;
}
</style>
