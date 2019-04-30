<template>
  <div>
    <div class="v2-button">
      <Button @click="addLevel"
        v-if="(adminType == 'super') || (authInPage.indexOf('refundLevelCreate') != -1)"
      >添加返水等级</Button>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :page="false"
        @on-details="onDetails"
        @on-change-status="onChangeStatus"
        @on-edit="onEdit"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { getUserType } from '@/libs/util';
// import tableMixins from "@/mixins/table";
import {
  getMemberRefundLevelData,
  refundLevelModifyStatus
} from "@/api/member";
export default {
  name: "memberRefund",
  components: { Tables },
  // mixins: [tableMixins],
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      table: {
        loading: true,
        total: 0,
        pageSizeOpts: [20, 30, 40, 50],
        columns: [
          {
            title: "返水等级",
            key: "levelName",
            align: "center"
          },
          {
            title: "返水等级别称",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "最低下注",
            key: "lessBetAmount",
            align: "center"
          },
          {
            title: "最大返水",
            key: "maxBonusAmonut",
            align: "center"
          },
          {
            title: "创建日期",
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span class="pl20 pr20">{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "默认等级",
            key: "default",
            align: "center",
            render: (h, params) => (
              <span
                style={{
                  color: params.row.default === "yes" ? "#515a6e" : "#ff2626"
                }}
              >
                {params.row.default === "yes" ? "是" : "否"}
              </span>
            )
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return (
                <span
                  style={{
                    color:
                      params.row.status === "yes" ? " #515a6e " : "#FF2626 "
                  }}
                >
                  {params.row.status === "yes" ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h,params) => {
              return (
                <div>
                  <a class='ib mr10'
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('refundLevelUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      this.onEdit(params)
                    }}
                  >编辑</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('refundLevelModifyStatus') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onChangeStatus(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                </div>
              )
            }
          }
        ],
        data: []
      }
    };
  },
  watch: {
    "$root.nowSite": {
      handler(newVal, oldVal) {
        this.getData({siteId: newVal.id});
      },
      deep: true
    }
  },
  mounted() {
    this.getData({ siteId: this.$root.nowSite.id })
  },
   methods: {
    getData(data) {
      this.$root.startTableLoading();
      getMemberRefundLevelData(data).then(res => {
        this.table.data = res.data;
        this.table.total = res.data.length;
      });
    },
    addLevel() {
      this.$router.push({
        name: "memberRefundEdit",
        params: { page: "create" },
        query: { siteId: 0, id: 0 }
      });
    },
    onDetails(params) {
      this.$router.push({
        name: "memberRefundDetails",
        query: {
          siteId: this.$root.nowSite.id,
          id: params.row.id
        }
      });
    },
    onPageSizeChange() {},
    onEdit(params) {
      this.$router.push({
        name: "memberRefundEdit",
        params: { page: "edit" },
        query: { siteId: this.$root.nowSite.id, id: params.row.id }
      });
    },
    onPageChange(page) {
      let data = { siteId: this.$root.nowSite.id, page }
      this.getData(data)
    },
    onChangeStatus(params) {
      let text, msg;
      const { status, levelName, id } = params.row;
      if (status === "yes") {
        text = `您确定停用${levelName}吗？`;
        msg = `停用${levelName}成功`;
      }
      if (status === "no") {
        text = `您确定启用${levelName}吗？`;
        msg = `启用${levelName}成功`;
      }
      const data = {
        siteId: this.$root.nowSite.id,
        id: id,
        statusKey: "status",
        statusVal: status === "yes" ? 0 : 1
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          refundLevelModifyStatus(data).then(res => {
            if(res.code == 200) {
              this.$Tip.hide()
              this.$Message.success(msg)
              params.row.status = status === "yes" ? "no" : "yes";
            }
          });
        }
      });
    }
  }
};
</script>

