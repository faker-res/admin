<template>
  <div>
    <div v-if="$route.query.stage == 'single'">
      <Form ref="singleForm" :label-width="90" :model="singleForm" :rules="singleFormRules">
        <FormItem label="域名类型">
          <Input value="代理域名" disabled class="w260x"/>
        </FormItem>
        <FormItem label="账户名称">
          <AutoSearch :placeholder="'请输入账户名称，可搜索'" :clearable="false" @changeShow='changeShow' @sendSuperior="getSuperior"></AutoSearch>
        </FormItem>
        <FormItem label="域名" prop="domain">
          <Input
            v-model="singleForm.domain"
            class="w260x"
            placeholder="请输入域名，不加http,如www.a.com"
          />
        </FormItem>
        <FormItem label="状态">
          <Select v-model="singleForm.status" class="w260x">
            <Option value="yes">开启</Option>
            <Option value="no">关闭</Option>
          </Select>
        </FormItem>
        <div v-if="rebateShow">
          <rebateSelect ref="rebateSelect" :data="rebate" @on-rebate-change="onRebateChange"></rebateSelect>
          <refundSelect ref="refundSelect" :data="refund" @on-refund-change="onRefundChange"></refundSelect>
        </div>
        <FormItem>
          <Button type="primary" class="ivu-btn submit bg mt15" @click="submit('single')">确认添加</Button>
        </FormItem>
      </Form>
    </div>
    <div v-else>
      <Form ref="batchForm" :label-width="120" :model="batchForm" :rules="batchFormRules">
        <FormItem label='域名类型'>
          <Input value="大股东域名" disabled class="w260x"/>
        </FormItem>
        <FormItem label="大股东账号" prop="uname">
          <!-- <Input v-model="batchForm.uname" class="w260x" placeholder="请输入大股东账号"/> -->
          <Select v-model="batchForm.uname" class="w260x" placeholdeer="请选择大股东账号">
            <Option v-for="(t,i) in batchList" :key="i" :value="t.userName">{{t.userName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="域名名称" prop="urlstr">
          <Input
            type="textarea"
            class="w260x"
            v-model="batchForm.urlstr"
            :rows="4"
            placeholder="可批量添加，用英文;分开,单个添加请带上英文;，如www.x.com;www.y.com"
          />
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn submit bg mt15" @click="submit('batch')" :loading="$root.editBtnLoading">确认添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import rebateSelect from "@/components/rebate-select";
import refundSelect from "@/components/refund-select";
import AutoSearch from "@/components/auto-search";
import { agencyGetName } from '@/api/agency';
import {
  agencyRebatePlatform,
  agencyDomainAddBatch,
  agencyDomainAdd
} from "@/api/agency";
export default {
  name: "addDomain",
  components: {
    rebateSelect,
    refundSelect,
    AutoSearch
  },
  data() {
    return {
      batchList: [],
      singleForm: {
        status: "yes",
        uname: ''
      },
      singleFormRules: {
        domain: [{ required: true, message: "请输入域名", trigger: "blur" }]
      },
      batchForm: {},
      batchFormRules: {
        uname: [
          {
            required: true,
            message: "请输入大股东账号",
            trigger: "blur"
          }
        ],
        urlstr: [
          {
            required: true,
            message: "请输入域名",
            trigger: "blur"
          },
          {
            message: '请输入正确的域名格式',
            pattern: /^(([a-zA-Z\d][a-zA-Z\d-_]{1,15}\.)+([a-zA-Z\d-_][^ ]{1,5}\;))*$/,
            trigger: 'blur'
          }
        ]
      },
      rebateShow: false,
      rebate: [],
      refund: {}
    };
  },
  mounted () {
    // 批量添加大股东
    if(this.$route.query.stage != 'single') {
      let data = {
        type: 'shareholder',
        content: this.$root.nowSite.id,
        siteId: this.$root.nowSite.id
      }
      agencyGetName(data).then(res => {
        this.batchList = res.data
      })
    }
  },
  methods: {
    changeShow(flag) {
      this.rebateShow = flag
    },
    // input搜索框
    getSuperior(value) {
      this.singleForm.uname = value;
      this.rebateShow = true;
      let postData = {
        uname: value,
        siteId: this.$root.nowSite.id
      };
      this.getRebateSetting(postData);
    },
    // 获取返点/返水数据
    getRebateSetting(data) {
      agencyRebatePlatform(data).then(res => {
        let { rebate, platform } = res.data;
        rebate.forEach(item => {
          item.parent_rebate = item.rebate;
        });
        this.rebate = rebate;
        for (let i in platform) {
          platform[i].list.forEach(item => {
            item.parent_refund = item.value;
            item.name_cn = item.name;
            item.name_en = item.key;
            item.refund = item.value;
          });
        }
        this.refund = platform;
        this.rebateShow = true;
      });
    },
    onRebateChange(res) {
      this.singleForm.rebate = res;
    },
    onRefundChange(res) {
      this.singleForm.platform = res;
    },
    // 表单提交  single单个添加  batch批量
    submit(stage) {
      if (stage == "single") {
        this.$refs.singleForm.validate(valid => {
          if (valid) {
            if(!this.singleForm.uname) {
              this.$Tip.info({content: '请输入账户名称'})
              return false
            }
            if (!this.singleForm.rebate) {
              this.singleForm.rebate = this.$refs.rebateSelect.createData();
            }
            if (!this.singleForm.platform) {
              this.singleForm.platform = this.$refs.refundSelect.createData();
            }
            let postData = {
              ...this.singleForm,
              siteId: this.$root.nowSite.id
            };
            agencyDomainAdd(postData).then(res => {
              if(res.code == 200) this.goAgencyDomain()
            });
          }
        });
      } else {
        this.$refs.batchForm.validate(valid => {
          if (valid) {
            let postData = { ...this.batchForm, siteId: this.$root.nowSite.id };
            agencyDomainAddBatch(postData).then(res => {
              if(res.code == 200) this.goAgencyDomain()
            });
          }
        });
      }
    },
    // 新增成功返回域名列表页
    goAgencyDomain() {
      this.$router.push({ name: "agencyDomain" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
/deep/.ivu-form-item-error-tip {
  top: 5px;
  left: 260px;
}
</style>


