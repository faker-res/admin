<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <Button class="w130x bb-color blue-bd" @click="showModals('addBlackList')">添加黑名单</Button>
        <Button class="w130x bb-color ml20 blue-bd" :disabled="disabled" @click="batchOut">移出黑名单</Button>
        <FormItem label="活动类型">
          <Select v-model="searchKey.activety_name" class="s-120">
            <Option v-for="(t,i) in activityList" :key="i" :value="t.name">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以,逗号隔开" class="s-140" v-model="searchKey.userNames" clearable/>
        </FormItem>
        <FormItem>
          <Poptip
            trigger="hover"
            content="多个请以,逗号隔开,仅支持同类型多个输入"
            placement="bottom-start"
            class="ml14f"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="search"
            @click="searchSubmit"
            :loading="$root.searchBtnLoading"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :total="table.total"
        :value="table.data"
        :columns="table.columns"
        @on-selection-change="onSelectionChange"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
    </div>
    <!-- 添加黑名单 -->
    <Modals ref="addBlackList" title="添加黑名单" width="585" height="300">
      <div slot="content" class="mb20">
        <div class="f6Color mt20 mb20">
          <Icons type="bangzhutishi" class="ib mt5 mb5 ml40" size="24"></Icons>
          <p class="ib ft16 ml10 mb5">添加到指定活动类型中的黑名单会员不能参与相关活动</p>
        </div>
        <Form
          ref="addBlackInfo"
          :model="addBlackInfo"
          style="width:585px;"
          :rules="rules"
          :label-width="150"
        >
          <FormItem label="会员账号" class="mb20">
            <AutoSearch
              ref="autoSearch"
              class="260x"
              placeholder="会员账号，默认查询"
              @sendSuperior="getSuperior"
            ></AutoSearch>
          </FormItem>
          <FormItem label="活动类型" prop="activety_name">
            <Select
              ref="select"
              v-model="addBlackInfo.activety_name"
              multiple
              class="w260x"
              transfer
              @on-change="onChange"

            >
              <Option
                v-for="(t,i) in activityList"
                :key="i"
                :value="t.name"
                :disabled="t.disabled"
              >{{t.name}}</Option>
            </Select>
          </FormItem>

          <FormItem class="mb20">
            <Button type="primary" class="w260x bg" @click="submit('add')">确认添加</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import {
  preferentialList,
  blackListShow,
  removeBlackList,
  addtoBlackList
} from "@/api/activity";
import Icons from "_c/icons";
import Modals from "_c/modals";
import Tables from "_c/tables";
import AutoSearch from "_c/auto-search";
export default {
  name: "activityBlackList",
  components: {
    Icons,
    Tables,
    Modals,
    AutoSearch
  },
  data() {
    return {
      selectShow: true,
      checkedArr: [],
      activityList: [], //优惠活动下拉列表
      disabled: true, //移除黑名单的状态
      searchKey: {
        activety_name: "全部",
        limit: 10,
        userNames: "",
        siteId: this.$root.nowSite.id
      },
      table: {
        total: 0,
        data: [],
        loading: true,
        pageSizeOpts: [10, 20, 30],
        columns: [
          {
            type: "selection",
            width: 80,
            align: "center"
          },
          {
            title: "活动类型",
            key: "activety_name",
            align: "center"
          },
          {
            title: "会员账号",
            key: "userName",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.userName)}</span>
            )
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
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span class="pl20 pr20">{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      paddingRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.$Tip.confirm({
                          content: "您确定将此会员移出黑名单吗？",
                          onOk: () => {
                            let data = {
                              siteId: this.$root.nowSite.id,
                              ids: params.row.id
                            };
                            removeBlackList(data).then(res => {
                              if (res.code == 200)
                                this.table.data.splice(params.index, 1);
                              this.table.total--;
                            });
                          }
                        });
                      }
                    }
                  },
                  "移除"
                )
              ]);
            }
          }
        ]
      },
      addBlackInfo: {
        siteId: this.$root.nowSite.id,
        activety_name: "",
        userNames: ""
      },
      rules: {
        activety_name: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "change",
            pattern: /.+/
          }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      preferentialList().then(res => {
        res.data.list.forEach(item => {
          this.activityList.push({ name: item, disabled: false });
        });
      });
    });
  },
  mounted() {
    for (let k in this.searchKey) {
      if (!this.searchKey[k]) delete this.searchKey[k];
    }
    this.getData({ params: this.searchKey });
  },
  watch: {
    "addBlackInfo.activety_name": {
      handler(val, oldVal) {
        if (val && val.indexOf("全部") != -1) {
          val.forEach((item, index) => {
            if (item != "全部") val.splice(index, 1);
          });
          this.activityList.forEach(item => {
            if (item != "全部") item.disabled = true;
          });
        } else if (val && val.indexOf("全部") == -1) {
          this.selectShow = true
          //复位禁止
          this.activityList.forEach(item => {
            item.disabled = false
          });
        }
      },
      deep: true
    }
  },
  methods: {
    //下拉框选择全部关闭下拉框
    onChange (val) {
      if (val.length === 1 && val[0] === '全部') {
        this.$refs.select.visible = false
      }
    },
    onOpenChange() {},
    getData(data) {
      for (let key in data.params) {
        if (!data.params[key]) delete data.params[key];
      }
      this.$root.startTableLoading(this);
      blackListShow(data).then(res => {
        let { data, total } = res.data.data;
        this.table.data = data;
        this.table.total = total;
        // 重置移出黑名单，没办法和onselection管理起来就查询时移出有问题在改
        this.disabled = true
      });
    },
    //查询
    searchSubmit() {
      let data = { ...this.searchKey, siteId: this.$root.nowSite.id };
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      this.getData({ params: data });
    },
    onSelectionChange(value) {
      this.checkedArr = value;
      if (value.length >= 1) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    showModals(name) {
      this.$refs.addBlackInfo.resetFields();
      this.addBlackInfo = {};
      this.addBlackInfo.siteId = this.$root.nowSite.id;
      this.$refs.autoSearch.removeDefault();
      this.$refs[name].show();
    },
    //add-添加黑名单
    submit(stage) {
      this.$refs.addBlackInfo.validate(valid => {
        if (valid) {
          if (!this.addBlackInfo.userNames) {
            this.$Tip.info({ content: "请输入会员账号" });
            return false;
          }
          let data = JSON.parse(JSON.stringify(this.addBlackInfo));
          data.activety_name = data.activety_name.join(",");
          this.$refs.addBlackList.spinShow();
          addtoBlackList(data)
            .then(res => {
              this.$refs.addBlackList.spinHide();
              if (res.code == 200) {
                this.$refs.addBlackList.hide();
                this.searchSubmit();
              }
            })
            .catch(error => {
              this.$refs.addBlackList.spinHide();
            });
        }
      });
    },
    batchOut() {
      if (!this.disabled) {
        let arr = [];
        this.checkedArr.forEach(item => arr.push(item.id));
        this.$Tip.confirm({
          content: "您确定将所选会员移出黑名单吗?",
          onOk: () => {
            let data = { siteId: this.$root.nowSite.id, ids: arr.join(",") };
            removeBlackList(data).then(res => {
              if (res.code == 200) this.searchSubmit();
            });
          }
        });
      }
    },
    onPageChange(page) {
      let data = { params: this.searchKey, query: { page } };
      this.getData(data);
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize;
      this.getData({ params: this.searchKey });
    },
    getSuperior(res) {
      this.addBlackInfo.userNames = res;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-form-item-error-tip {
  top: 5px;
  left: 260px;
}
</style>
