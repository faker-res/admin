<template>
  <div>
    <Form ref="formKey" :model="formKey" :rules="rules">
      <div class="mb20">
        <FormItem label="信息标题" prop="title">
          <Input placeholder="请输入标题(20字以内)" class="w609x ml5" v-model="formKey.title"/>
        </FormItem>
      </div>
      <div class="clearfix box">
        <FormItem prop="publish_at" class="clearfix fl">
          <span class="fl ml10">开始日期</span>
          <DatePicker
            type="date"
            placeholder="请选择日期"
            class="w165x ml20 fl"
            v-model="formKey.publish_at"
            :options="options3"
          ></DatePicker>
        </FormItem>

        <FormItem prop="offline_at" class="ml5 fl clearfix">
          <span class="fl ml10">结束日期</span>
          <DatePicker
            type="date"
            placeholder="请选择日期"
            class="w165x fl ib ml10"
            v-model="formKey.offline_at"
            :options="options3"
          ></DatePicker>
        </FormItem>
      </div>
      <FormItem label="客户端" prop="newclient_type">
        <CheckboxGroup v-model="formKey.newclient_type" @on-change="checkAllGroupChange">
          <Checkbox label="PC" class="ml20"></Checkbox>
          <Checkbox label="H5"></Checkbox>
          <Checkbox label="Android"></Checkbox>
          <Checkbox label="IOS"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="编辑内容" prop="description">
        <Input
          class="ml10"
          type="textarea"
          :rows="14"
          style="width:600px;"
          placeholder="请输入信息内容"
          v-model="formKey.description"
        />
      </FormItem>
      <FormItem label="状态" class="mt30">
        <Switch v-model="formKey.status" class="ml30" size="large"></Switch>
        <span class="ml20">{{formKey.status==false?"未启用":'已启用'}}</span>
        <Button class="ivu-btn addSave ml40" @click="save">{{$route.params.page === "edit"? "确认保存":"确认新增"}}</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Editor from "_c/editor";
import { lanternIns, lanternUpt, lanternDetail } from "@/api/system";
export default {
  name: "couseDetial",
  components: {
    Editor
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
            trigger: "change",
            pattern: /.+/
          }
        ],
        offline_at: [
          {
            required: true,
            message: "请选择日期",
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
        ],
        description: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
            pattern: /.+/
          }
        ]
      },
       options3: {
        disabledDate:date=> {
         return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      searchKey: {
        text: "text"
      },
      type: false,
      content: "12312323",
      switch1: false,
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["PC"],
      list: [
        { value: "1", name: "登录前" },
        { value: "2", name: "登录后" },
        { value: "3", name: "不限制" }
      ],
      formKey: {
        siteId: "",
        siteName: "",
        type: "lantern",
        title: "",
        publish_at: this.$root.startTime(),
        offline_at: this.$root.formatnightTimeS(),
        desc_format_type: "text",
        description: "",
        status: "",
        client_type: "",
        newclient_type: []
      }
    };
  },
  created() {
    if (this.$route.params.page === "edit") {
      const data = { id: this.$route.query.id, siteId: this.$root.nowSite.id };
      this.onDetails(data);
    }
  },
  methods: {
    onText() {},
    onImg() {},
    //新增公告成功
    save() {
      this.$refs.formKey.validate(valid => {
        if (valid) {
          if (this.$route.params.page === "add") {
            const params = { ...this.formKey };
            let Time=[params.publish_at,params.offline_at]
            if(this.$root.validatecourseTime(Time)){
              params.publish_at = this.$root.formatTimeS(params.publish_at);
              params.offline_at = this.$root.formatnightTimeS(params.offline_at); 
            }else{
               return false
            }
            params.siteId = this.$root.nowSite.id;
            params.siteName = this.$root.nowSite.siteName;
            if (params.status == true) params.status = "yes";
            else params.status = "no";
            delete params.newclient_type;
            lanternIns(params).then(res => {
              //  this.$router.go(-1);
              this.$router.push({
                name: "notice",
                params: { page: "success" }
              });
              // this.$Tip.confirm({
              //   content: "添加成功",
              //   onOk: () => {
              //     this.$router.go(-1);
              //   }
              // });
            });
          }
          if (this.$route.params.page === "edit") {
            const params = { ...this.formKey };
            let Time=[params.publish_at,params.offline_at]
            if(this.$root.validatecourseTime(Time)){
              params.publish_at = this.$root.formatTimeS(params.publish_at);
              params.offline_at = this.$root.formatnightTimeS(params.offline_at); 
            }else{
               return false
            }
            params.siteId = this.$root.nowSite.id;
            params.id = this.$route.query.id;
            params.siteName = this.$root.nowSite.siteName;
            if (params.status == true) params.status = "yes";
            else params.status = "no";
            delete params.newclient_type;
            lanternUpt(params).then(res => {
              this.$router.push({
                name: "notice",
                params: { page: "success" }
              });
            });
          }
        } else {
          // this.$Message.error("请填写正确的信息！");
        }
      });
    },
    // 改变富文本框
    handleChange(html, text) {
      this.formKey.description = text;
    },
    changeContent() {
      this.$refs.editor.setHtml("<p>powered by wangeditor</p>");
    },
    change(status) {
      //   this.$Message.info("开关状态：" + status);
    },
    // 全选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["PC", "H5", "Android", "IOS"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange() {
      let clientlist = [];
      this.showh5 = this.formKey.newclient_type.some(
        item => item == "H5" || item == "Android" || item == "IOS"
      );
      this.formKey.newclient_type.map(item => {
        clientlist.push(item);
      });
      if (clientlist.length > 1)
        this.formKey.client_type = clientlist.join(",");
      else this.formKey.client_type = clientlist[0];
    },
    onDetails(data) {
      lanternDetail(data).then(res => {
        Object.keys(this.formKey).forEach(key => {
          if (key == "status") {
            this.formKey[key] = res.data[key] == "yes" ? true : false;
          } else if (key == "newclient_type" || key == "newappears_location") {
            this.formKey[key] = this.formKey[key];
          } else if (key == "publish_at" || key == "offline_at") {
            this.formKey[key] = this.$root.unixTime(res.data[key]);
          } else {
            this.formKey[key] = res.data[key];
          }
        });
        const {
          newclient_type,
          client_type,
          publish_at,
          offline_at
        } = this.formKey;
        if (client_type.length == 1) newclient_type.push(client_type);
        else
          client_type.split(",").map(item => {
            newclient_type.push(item);
          });
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../styles/button.less";

/deep/.ivu-form-item-error-tip {
  margin-left: 80px;
}
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
// /deep/.ivu-form-item-content{
//   .ivu-form-item-error-tip{
//     margin-top:3px
//   }
// }
/deep/.box {
  .ivu-form-item-error-tip {
    margin-top: 35px;
  }
}
/deep/ .ivu-select-dropdown{
      z-index: 1000;  
  }
</style>