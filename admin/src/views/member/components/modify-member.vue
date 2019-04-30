<template>
  <div>
    <Modals ref="modifyMemberModal" title="修改会员等级" width="1500" @modalVisible="clearBeforeData">
      <div slot="content" class="pt10 pr30 pb20 pl30">
        <div class="v2-search">
          <Form ref="searchKey" inline v-if="(adminType == 'super') || (authInPage.indexOf('soonModifyMemberList') != -1)">
            <FormItem>
              <Checkbox v-model="searchKey.isLike">
                <span>模糊</span>
              </Checkbox>
            </FormItem>
            <FormItem>
              <Select v-model="searchKey.typeTag" class="s-100">
                <Option value="userName">会员账号</Option>
                <Option value="agencyName">上级代理</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input :placeholder="searchKey.typeTag == 'userName' ? '请输入会员账号' : '请输入上级代理'" class="s-140" v-model="searchKey.content"/>
            </FormItem>
            <FormItem>
              <Poptip
                trigger="hover"
                class="ml14f"
                content="多个请以,逗号隔开,仅支持同类型多个输入"
                placement="bottom-end"
              >
                <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
              </Poptip>
            </FormItem>
            <FormItem>
              <Button type="primary" class="search" :loading="btnLoading" @click="searchSubmit">查询</Button>
            </FormItem>
            <FormItem label="修改等级">
              <LevelSelect
                ref="LevelSelect"
                :width="140"
                clearable
                :levelType="'member'"
                @on-level-change="levelChange"
                :disabled="levelDisabled"
                :choiceShow = "true"
              />
            </FormItem>
            <FormItem>
              <RadioGroup v-model="formKey.status" size="large">
                <Radio :disabled="lockRadioDisabled" :label="1">锁定</Radio>
                <Radio :disabled="unlockRadioDisabled" :label="0">解锁</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem>
              <Poptip trigger="hover" class="ml14f" content="自动晋级，但可手动调节等级" placement="right-end">
                <Icons type="bangzhutishi" color="#E4E4E4" :size="26" class="ml0 mr8"/>
              </Poptip>
            </FormItem>
          </Form>
        </div>

        <div class="v2-table modal-overflow">
          <Tables
            :columns="table.columns"
            :loading="table.loading"
            :value="table.data"
            :page="table.page"
            :total="table.total"
            :more="table.more"
            :showSizer="false"
            @on-page-change="onPageChange"
            @on-page-size-change="onPageSizeChange"
            @on-selection-change="onSelectionChange"
          >
            <div class="clearfix" slot="more">已选会员{{total}}人</div>
          </Tables>
        </div>
        <div class="mt10">
          <Button type="primary" class="ivu-btn submit bg" :disabled="submitDisabled"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberLevelModifyBatch') != -1)"
           @click="submit">确认保存</Button>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Modals from "@/components/modals";
import Icons from "@/components/icons";
import Tables from "@/components/tables";
import LevelSelect from "@/components/level-select";
import { getUserType } from '@/libs/util';
import {
  getMemberTableData,
  memberLevelModifyBatch,
  searchmemberList
} from "@/api/member";
export default {
  components: { Modals, Icons, Tables, LevelSelect },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      total: 0,
      btnLoading: false,
      levelDisabled: true,
      lockRadioDisabled: true,
      unlockRadioDisabled: true,
      submitDisabled: true,
      searchKey: {
        typeTag: "userName",
        siteId: this.$root.nowSite.id
      },
      // 批量等级
      formKey: {},
      table: {
        // pageSizeOpts: [20, 30, 40, 50],
        total: 0,
        more: true,
        page: true,
        loading: false,
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "等级",
            key: "levelName",
            align: "center"
          },
          {
            title: "上级代理",
            key: "agencyName",
            align: "center"
          },
          {
            title: "公司入款次数",
            key: "offline_deposit_count",
            align: "center"
          },
          {
            title: "公司入款总额",
            key: "offline_deposit_amount",
            align: "center"
          },
          {
            title: "线上支付次数",
            key: "online_deposit_count",
            align: "center"
          },
          {
            title: "线上支付总额",
            key: "online_deposit_amount",
            align: "center"
          },
          {
            title: "取款次数",
            key: "withdrawals_count",
            align: "center"
          },
          {
            title: "取款总额",
            key: "withdrawals_amount",
            align: "center"
          },
          {
            title: "总输赢",
            key: "net_amount",
            align: "center"
          },
          {
            title: "锁定",
            key: "lock",
            align: "center",
            render: (h, params) => {
              let className = params.row.lock == "yes" ? "redText" : "";
              let text = params.row.lock == "yes" ? "已锁定" : "未锁定";
              return <span class={className}>{text}</span>;
            }
          },
          {
            title: "操作时间",
            key: "updated_at",
            align: "center",
            width: 150,
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.updated_at)}</span>
            )
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(data) {
      this.btnLoading = true
      let {isLike } = data.params
      if(isLike) data.params.isLike = Number(isLike)
      this.table.loading = true
      searchmemberList(data).then(res => {
        this.table.loading = false
        this.btnLoading = false
        let { data, total } = res.data
        this.table.data = data
        this.table.total = total
      });
    },
    LevelSelectInit() {
      this.$refs.LevelSelect.init(this.$root.nowSite.id);
    },
    onSelectionChange(res) {
      this.levelDisabled = res.length ? false : true;
      this.submitDisabled = res.length ? false : true;
      this.total = res.length;

      let hasLock = res.some(item => item.lock === "yes");
      let hasUnlock = res.some(item => item.lock === "no");
      if (hasLock && !hasUnlock) {
        this.unlockRadioDisabled = false;
      } else if (hasUnlock && !hasLock) {
        this.lockRadioDisabled = false;
      } else if (hasLock && hasUnlock) {
        this.unlockRadioDisabled = false;
        this.lockRadioDisabled = false;
      } else {
        this.unlockRadioDisabled = true;
        this.lockRadioDisabled = true;
      }

      let ids = [];
      res.forEach(item => {
        ids.push(item.uid);
      });
      if (ids.length > 1) ids = ids.join(",");
      else ids = ids[0];
      this.formKey.uid = ids;
    },
    show() {
      this.$refs.modifyMemberModal.show();
    },
    levelChange(res) {
      this.formKey.levelLabel = res.levelLabel;
      this.formKey.levelName = res.levelName;
    },
    submit() {
      let params = { ...this.formKey };
      params.siteId = this.$root.nowSite.id;
      this.$refs.modifyMemberModal.spinShow();
      memberLevelModifyBatch(params,true)
        .then(res => {
         if(res.code == 200) {
          this.$Message.success("修改会员等级成功");
          this.$refs.modifyMemberModal.spinHide();
          //重置lock状态
          this.resetLock()
          this.searchSubmit();
          this.resetField()
         }
        })
        .catch(err => {
          this.$refs.modifyMemberModal.spinHide();
        });
      return;
    },
    searchSubmit() {
      let params = { ...this.searchKey };
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      if (!params.content) {
        this.$Tip.error({ content: '请输入会员账号' })
        delete params.typeTag;
        return
      }
      this.getData({params});
    },
    clearBeforeData (flag) {
      if (!flag) {
        this.table.data = []
        this.table.total = 0
        this.searchKey.isLike = false
        this.searchKey.content = ''
        this.total = 0
      }
    },
    onPageChange(page){
      this.total = 0
      let data = { ...this.searchKey }
      this.getData({ params: data, query: { page}})
    },
    onPageSizeChange(pageSize){
      this.searchKey.limit = pageSize
      this.getData({ params: this.searchKey})
    },
    resetLock () {
      this.levelDisabled = this.lockRadioDisabled = this.unlockRadioDisabled = this.submitDisabled = true
    },
    resetField () {
      this.total = 0
    }
  }
};
</script>

<style  lang="less" scoped>
@import "../../../styles/button.less";
.ml0 {
  margin-left: 0;
}

.mr8 {
  margin-right: 8px;
}

.submit {
  display: block;
  margin: 0 auto;
  text-align: center;
}

/deep/.ivu-modal-wrap {
  .ivu-modal {
    width: 1400px !important;
  }
}
</style>
