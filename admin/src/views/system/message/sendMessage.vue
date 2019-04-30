<template>
  <div>
    <Form ref="sendmessg" :model="sendmessg" :rules="rules">
      <FormItem class="ml5 mt20">
        <span class="ml30">收件人</span>
        <ButtonGroup class="ml10">
          <Button
            class="w120x bg-gry"
            :class="currentBtn == item.value ? 'active' : ''"
            v-for="item in sendtoList"
            :value="item.value"
            :key="item.label"
            :label="item.label"
            :defult="item.label"
            @click="sendpersor(item.value,item.label)"
          >{{item.label}}</Button>
        </ButtonGroup>
      </FormItem>
     <FormItem :label="defult" v-if="labeltype=='member'|| labeltype=='agency'" class="ml10">
          <Select
            v-model="sendmessg.sendid"
            filterable
            multiple
            class="w600x "
            remote
            :remote-method="remoteMethod2"
            :loading="loading2">
            <Option v-for="(option, index) in options2" :value="option.id" :key="index">{{option.userName}}</Option>
          </Select>
      </FormItem>

      <FormItem :label="defult" prop="memberGroup" v-show="labeltype=='memberGroup'" class="ml10">
            <LevelSelect
              key="member"
              ref="memberLevelSelect"
              class="w260x fl"
              clearable
              levelType="member"
              :mode="selectval"
              @on-level-change="levelChange"
            />
      </FormItem>

      <FormItem label="信息标题 " prop="title" class="ml10">
        <i-input type="text" class="w600x" placeholder="请输入标题" v-model="sendmessg.title"></i-input>
      </FormItem>
      <FormItem label="信息内容" class="message ml10" prop="content">
        <Input
          type="textarea"
          :rows="14"
          placeholder="请输入信息内容"
          class="w600x"
          v-model="sendmessg.content"
        />
      </FormItem>
      <Button type="primary" class="ivu-btn send ft20 ml90" @click="send">发送</Button>
    </Form>
  </div>
</template>
<script>
import { letterSend } from "@/api/system";
import { agencyGetName } from "@/api/agency";
import LevelSelect from "@/components/level-select";
export default {
  name: "sendMessage",
  components: {
    LevelSelect
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
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ]
      },
      loading2: false,
      currentBtn:"",
      selectval: "多选",
      options2: [],
      sendtoList: [
        { value: "member", label: "指定会员" },
        { value: "agency", label: "指定代理" },
        { value: "memberGroup", label: "会员组" },
        { value: "memberAll", label: "全部会员" },
        { value: "agencyAll", label: "全部代理" }
      ],
      defult: "指定会员",
      labeltype: "member",
      sendmessg: {
        title: "",
        content: "",
        send_content: "",
        sendid: [],
        memberGroup: ""
      }
    };
  },
  methods: {
    sendpersor(value, label) {
      this.currentBtn = value;
      this.sendmessg.sendid = [];
      this.options2 = [];
      this.defult = label;
      this.labeltype = value;
      if (this.labeltype == "memberGroup") {
        this.$refs.memberLevelSelect.init(this.$root.nowSite.id);
      }
    },
    send() {
      this.$refs.sendmessg.validate(valid => {
        if (valid) {
          const params = { ...this.sendmessg };
          params.siteId = this.$root.nowSite.id;
          params.send_type = this.labeltype;
          if (params.sendid.length != 0) {
            if (params.sendid.length > 1)
              params.send_content = params.sendid.join(",");
            else params.send_content = params.sendid[0].toString();
          }
          if (
            params.send_type == "memberAll" ||
            params.send_type == "agencyAll"
          ) {
            delete params.send_content;
          }
          delete params.sendid;
          delete params.memberGroup;
          letterSend(params).then(res => {
            if (res.code == 200) this.$router.go(-1);
          });
        }
      });
    },
    remoteMethod2(query) {
      if (query !== "") {
        this.options2 = [];
        this.loading2 = true;
        let postData = {
          type: this.labeltype,
          content: query,
          siteId: this.$root.nowSite.id
        };
        agencyGetName(postData).then(res => {
          this.loading2 = false;
          this.options2 = res.data;
        });
      } else {
        this.options2 = [];
      }
    },
    levelChange(res) {
      if (res.levelLabel.length > 1)
        this.sendmessg.send_content = res.levelLabel.join(",");
      else this.sendmessg.send_content = res.levelLabel[0].toString();
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../styles/button.less";
.ml20{padding-right:15px;}
/deep/.ivu-form .ivu-form-item-label { width: 80px;}
/deep/.ivu-form-item-error-tip {
  top: 0;
  left: 690px;
}
/deep/.ivu-btn {
  color:#2D8CF0;
  outline:0;
  outline:none !important;
  box-shadow:none !important;
}
.ml10 .ivu-btn{color:#808080;}
/deep/.ml10 .active{border:1px solid #dcdcdc ;border-top:1px solid #2D8CF0 !important;outline:none !important;color:#2D8CF0 !important;}

</style>