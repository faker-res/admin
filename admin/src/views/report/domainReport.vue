<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem v-for="(t,i) in btnList" :key="i">
          <Button :class="btnName == t ? 'bd-bg' : 'bg-or'" @click="changeBtn(t)">{{t}}</Button>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker placeholder="请选择开始日期" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker placeholder="请选择开始日期" class="s-140" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="域名">
          <Input placeholder="请输入域名" class="s-140" v-model="searchKey.domain"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.searchBtnLoading"
            class="ivu-btn search"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.exportBtnLoading" class="ivu-btn export">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :columns="table.columns"
        :value="table.data"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-sort-change="sortChange"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { domainReports } from "@/api/report";
export default {
  name: "domainReport",
  components: { Tables },
  data() {
    return {
      Time: [this.$root.newstartTime(), new Date()],
      searchKey: {
        siteId: this.$root.nowSite.id,
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS()
      },
      btnList: ["今天", "昨天", "本月", "上月", "总数据"],
      btnName: "今天",
      table: {
        total: 0,
        data: [],
        pageSizeOpts: [20, 30, 40, 50],
        loading: true,
        columns: [
          {
            title: "域名",
            key: "domain",
            align: "center",
            render: (h, params) => {
              const { domain } = params.row;
              if (domain == "本页统计") {
                return <span>{domain}</span>;
              } else {
                return (
                  <span
                    class="blue-font"
                    onClick={() => {
                      if (this.btnName == "本月" || this.btnName == "上月") {
                        this.$router.push({
                          name: "domainReportsDetailByDomain",
                          query: { domain, btnName: this.btnName }
                        });
                      } else {
                        this.$router.push({
                          name: "domainReportsDetailByDomain",
                          query: { domain }
                        });
                      }
                    }}
                  >
                    {params.row.domain}
                  </span>
                );
              }
            }
          },
          {
            title: "访问人数",
            key: "accessIpNum",
            align: "center",
            sortable: "custom"
          },
          {
            title: "注册人数",
            key: "registerNum",
            align: "center",
            sortable: "custom",
            render: (h, params) => {
              const { registerNum, domain } = params.row;
              if (domain == "本页统计") {
                return <span>{params.row.registerNum}</span>;
              } else {
                return (
                  <span
                    class="blue-font"
                    onClick={() => {
                      this.$router.push({
                        name: "domainReportsDetailByUser",
                        params: { page: "register" },
                        query: {
                          domain,
                          page: "register",
                          btnName: this.btnName
                        }
                      });
                    }}
                  >
                    {params.row.registerNum}
                  </span>
                );
              }
            }
          },
          {
            title: "登录人数",
            key: "loginIpNum",
            align: "center",
            sortable: "custom",
            render: (h, params) => {
              const { domain, loginIpNum } = params.row;
              if (domain == "本页统计") {
                return <span>{params.row.loginIpNum}</span>;
              } else {
                return (
                  <span
                    class="blue-font"
                    onClick={() => {
                      this.$router.push({
                        name: "domainReportsDetailByUser",
                        params: { page: "login" },
                        query: { domain, page: "login", btnName: this.btnName }
                      });
                    }}
                  >
                    {params.row.loginIpNum}
                  </span>
                );
              }
            }
          },
          {
            title: "是否证书",
            align: "center"
          },
          {
            title: "正常访问",
            align: "center"
          },
          {
            title: "是否被墙",
            align: "center"
          }
        ]
      }
    };
  },
  mounted() {
    this.getData({ params: this.searchKey });
  },
  methods: {
    // 改变选中的按钮
    changeBtn(name) {
      this.btnName = name;
      switch (name) {
        case "今天":
          this.searchKey.startTime = this.$moment()
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          this.searchKey.endTime = this.$moment()
            .endOf("day")
            .set("hours", 23)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "昨天":
          this.searchKey.startTime = this.$moment()
            .day(this.$moment().day() - 1)
            .startOf("day")
            .set("hours", 0)
            .set("minutes", 0)
            .set("seconds", 0)
            .format("YYYY-MM-DD HH:mm:ss");
          this.searchKey.endTime = this.$moment()
            .day(this.$moment().day() - 1)
            .startOf("day")
            .set("hours", 23)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "本月":
          this.searchKey.startTime = this.$moment()
            .month(this.$moment().month())
            .startOf("month")
            .set("hours", 0)
            .set("minutes", 0)
            .set("seconds", 0)
            .format("YYYY-MM-DD HH:mm:ss");
          this.searchKey.endTime = this.$moment()
            .endOf("day")
            .set("hours", 23)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        case "上月":
          this.searchKey.startTime = this.$moment()
            .month(this.$moment().month() - 1)
            .startOf("month")
            .set("hours", 0)
            .set("minutes", 0)
            .set("seconds", 0)
            .format("YYYY-MM-DD HH:mm:ss");
          this.searchKey.endTime = this.$moment()
            .month(this.$moment().month() - 1)
            .endOf("month")
            .set("hours", 23)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
          break;
        default:
          this.searchKey.startTime = this.$moment()
            .month(this.$moment().month() - 3)
            .set("hours", 0)
            .set("minutes", 0)
            .set("seconds", 0)
            .format("YYYY-MM-DD HH:mm:ss");
          this.searchKey.endTime = this.$moment()
            .endOf("day")
            .set("hours", 23)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
          break;
      }
      this.Time[0] = this.searchKey.startTime;
      this.Time[1] = this.searchKey.endTime;
      this.getData({ params: this.searchKey });
    },
    getData(data) {
      this.$root.startTableLoading();
      domainReports(data).then(res => {
        if (res.data.data) {
          const { list, total } = res.data.data;
          list.length && list.push(this.createTotalData(total));
          this.table.data = list;
          this.table.total = res.data.total;
        } else {
          this.tabla.data = [];
          this.table.total = 0;
        }
      });
    },
    // 本页统计数据
    createTotalData(total) {
      const { domain, registerNum, accessIpNum, loginIpNum } = total;
      let item = {
        domain: "本页统计",
        registerNum,
        accessIpNum,
        loginIpNum
      };
      return item;
    },
    // 排序
    sortChange({ column, key, order }) {
      let data = {
        sortKey: key,
        sortVal: order,
        siteId: this.$root.nowSite.id,
        ...this.searchKey
      };
      if (data.sortVal === "normal") {
        delete data.sortKey;
        delete data.sortVal;
      }
      this.getData({ params: data });
    },
    searchSubmit() {
      let data = {
        ...this.searchKey,
        startTime: this.$root.formatTimeS(this.Time[0]),
        endTime: this.$root.formatnightTimeS(this.Time[1])
      };
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      let { startTime, endTime } = data;
      if (startTime == "Invalid date" || endTime == "Invalid date") {
        this.$Tip.info({ content: "请选择查询时间" });
        return false;
      }
      this.getData({ params: data });
    },
    onPageChange(page) {
      this.getData({ params: this.searchKey, query: { page } });
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize;
      this.getData({ params: this.searchKey });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.bd-bg {
  width: 80px;
  height: 36px;
  background-color: #2d8cf0;
  color: #ffffff;
  box-shadow: 0;
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
.bg-or {
  width: 80px;
  height: 36px;
  border: 1px solid #eaeaea;
  &:focus {
    box-shadow: 0 0 0 0;
  }
  &:hover {
    background: #f4f9ff;
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
  }
}
</style>


