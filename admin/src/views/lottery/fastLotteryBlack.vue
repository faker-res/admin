<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem>
          <Button
            @click="onBlackName"
            class="w160x cardNutton"
            v-if="(adminType == 'super') || (authInPage.indexOf('fastLotteryBlackListAdd') != -1)"
          >添加黑名单</Button>
        </FormItem>
        <FormItem label="会员账号">
          <Input
            placeholder="请输入账号名"
            v-model="username"
            clearable
            @keyup.enter.native="searchSubmit"
          />
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
          <Button
            type="primary"
            class="ivu-btn search"
            @click="searchSubmit"
            :loading="$root.searchBtnLoading"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :total="table.total"
        :showSizer="false"
        :value="table.data"
        @on-remove="onRemove"
        :page-size-opts="table.pageSizeOpts"
        @on-page-change="onPageChange"
      ></Tables>
    </div>
    <Modals ref="addBlackName" title="添加黑名单" :width="560">
      <div slot="content" class="v2-form-wrapper h160">
        <Form
          ref="addBlack"
          :label-width="130"
          :rules="rules"
          :model="addBlack"
          style="width:560px;"
        >
          <FormItem label="会员账号" prop="username">
            <AutoSearch
              @sendSuperior="getUsername"
              ref="autoSearch"
              class="w260x"
              :placeholder="'会员账号，默认查询'"
              :stage="'all'"
            ></AutoSearch>
          </FormItem>
          <FormItem>
            <Button class="ivu-btn submit bg tjhmd ft20 mt30" @click="save" type="primary">确认添加</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import AutoSearch from "_c/auto-search";
import { getUserType } from "@/libs/util";
import {
  fastLotteryBlackList,
  fastLotteryBlackListAdd,
  fastLotteryBlackListDel
} from "@/api/lottery";
export default {
  name: "fastLotteryBlack",
  components: {
    Tables,
    Modals,
    Icons,
    AutoSearch
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      username: "",
      table: {
        loading: true,
        title: "快速彩票黑名单",
        data: [],
        pageSizeOpts: [30],
        total: 0,
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "姓名",
            key: "realName",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.realName)}</span>
            )
          },
          {
            title: "创建时间",
            key: "addTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.addTime)}</span>
            )
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <a
                  class="ib mr10"
                  onClick={() => {
                    this.onRemove(params);
                  }}
                  style={{
                    display:
                      this.adminType == "super" ||
                      this.authInPage.indexOf("fastLotteryBlackListDel") != -1
                        ? "inline-block"
                        : "none"
                  }}
                >
                  移出黑名单
                </a>
              );
            }
          }
        ]
      },
      addBlack: { username: "" },
      rules: {
        username: [
          {
            required: true,
            message: "请输入会员账号"
          }
        ]
      }
    };
  },
  mounted() {
    let data = { siteId: this.$root.nowSite.id };
    this.getData({ params: data });
  },
  methods: {
    resetForm() {
      for (let key in this.addBlack) {
        delete this.addBlack[key];
      }
    },
    save() {
      this.$refs.addBlack.validate(valid => {
        if (valid) {
          this.$refs.addBlackName.spinShow();
          let data = {
            siteId: this.$root.nowSite.id,
            userName: this.addBlack.username
          };
          fastLotteryBlackListAdd(data)
            .then(res => {
              this.$refs.addBlackName.spinHide();
              if (res.code == 200) {
                let postData = {
                  siteId: this.$root.nowSite.id,
                  userName: this.username
                };
                if (!this.username) delete postData.userName;
                this.getData({ params: postData });
                this.resetForm();
                this.$refs.addBlackName.hide();
              }
            })
            .catch(error => {
              this.$refs.addBlackName.spinHide();
            });
        }
      });
    },
    // 添加至黑名单列表
    onBlackName(params) {
      // this.$refs.addBlack.resetFields();

      this.$refs.autoSearch.removeDefault();
      this.$refs.addBlackName.show();
    },
    // 查询
    searchSubmit() {
      let data = {
        userName: this.username,
        siteId: this.$root.nowSite.id
      };
      if (!this.username) {
        delete data.userName;
      } else {
        if (this.username.length < 5) {
          this.$Tip.info({ content: "会员账号必须大于5位" });
          return false;
        }
      }

      this.getData({ params: data });
    },
    onPageChange(page) {
      this.getData({
        params: { siteId: this.$root.nowSite.id },
        query: { page }
      });
    },
    getData(data) {
      this.$root.startTableLoading(this);
      fastLotteryBlackList(data).then(res => {
        this.table.data = res.data.data;
        this.table.total = res.data.total;
      });
    },
    //  移除黑名单
    onRemove(params) {
      const { id } = params.row;
      this.$Tip.confirm({
        content: "你确定将此会员移出黑名单吗?",
        onOk: () => {
          let data = {
            siteId: this.$root.nowSite.id,
            id
          };
          fastLotteryBlackListDel(data).then(res => {
            if (res.code == 200)
              if (typeof res.data === "string") {
                this.$Tip.hide();
                this.$Message.config({
                  top: 150
                });
                this.$Message.success("会员移出黑名单成功！");
                this.table.data.splice(params.index, 1);
                this.table.total--;
              }
          });
        }
      });
    },
    //通过自动查询，获取会员账号
    getUsername(value) {
      this.addBlack.username = value;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../styles/button.less";
.tjhmd {
  width: 260px;
  height: 50px;
}
.w260x {
  width: 260px;
  height: 30px;
}
/deep/.ivu-form-item {
  &:nth-child(2) {
    margin-top: 1px !important;
  }
}
/deep/.ivu-form-item-error-tip {
  top: 8px;
  left: 260px;
}
</style>

