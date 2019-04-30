<template>
  <div class="v2-search">
    <Form inline>
      <Button class="w130x cardNutton" @click="addPlatform">添加游戏平台</Button>
      <FormItem label="游戏类型" class="pb20">
        <Select class="s-140">
          <Option v-for="(item,i)  in  gameList" :key="i" :value="item.id">{{item.className}}</Option>
        </Select>
      </FormItem>
      <Button type="primary" class="search ml20" :loading="$root.searchBtnLoading">查询</Button>
    </Form>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :value="table.data"
        :columns="table.columns"
        :total="table.total"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-size-change="onPageSizeChange"
        @on-edit="onEdit"
        @on-change-status="onStatus"
        @on-delete="onDelete"
        @on-list="onList"
      ></Tables>
    </div>
    <Modals ref="gamePlatform" :title="gamePlatformTitle==='create'?'添加游戏平台':'编辑游戏平台'" width="670">
      <div slot="content">
        <Form :label-width="210" >
          <FormItem label="创建人">
            <Input class="w320x"/>
          </FormItem>
          <FormItem label="游戏类型">
            <Select class="w320x">
              <Option v-for="(item,i)  in  gameList" :key="i" :value="item.id">{{item.className}}</Option>
            </Select>
          </FormItem>
          <FormItem label="游戏平台">
              <Input class="w320x"/>
          </FormItem>
          <FormItem label="平台编号">
              <Input class="w320x"/>
          </FormItem>
          <FormItem label="简介">
              <Input class="w320x"/>
          </FormItem>
          <FormItem label="显示状态">
              <Select class="w320x" >
              <!-- <Option vlaue="yes">正常</Option>
              <Option  vlaue="no">停用</Option> -->
            </Select>
          </FormItem>
          <FormItem>
             <Button  type="primary"  :loading="$root.editLoading"
              class="ivu-btn submit mb20">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "_c/tables";
import Modals from "@/components/modals";
import { gameConfigList, gameConfigClassification } from "@/api/system";
export default {
  name: "gameManage",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      gamePlatformTitle: "", //添加和编辑的标题
      gameList: [], //游戏类型
      table: {
        total: 0,
        data: [],
        loading: true,
        pageSizeOpts: [20, 30, 40],
        columns: [
          {
            title: "游戏类型",
            key: "siteName",
            align: "center"
          },
          {
            title: "游戏平台",
            key: "platform",
            align: "center"
          },
          {
            title: "简介",
            key: "siteName",
            align: "center"
          },
          {
            title: "创建时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span class="pr20 pl20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "变更时间",
            key: "updated_at",
            align: "center",
            render: (h, params) => {
              return <span class="pr20 pl20">{this.$root.unixTime(params.row.updated_at)}</span>;
            }
          },
          {
            title: "显示",
            key: "status",
            align: "center"
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["status", "edit", "list", "delete"]
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
    this.getGameList();
  },
  methods: {
    //游戏列表
    getData() {
      const data = {
        platform: "sport"
      };
      gameConfigList(data).then(res => {
        this.table.data = res.data.data;
        this.table.total = res.total;
      });
    },
    //游戏类型
    getGameList() {
      gameConfigClassification().then(res => {
        this.gameList = res.data;
      });
    },
    //添加游戏平台
    addPlatform() {
      this.gamePlatformTitle = "create";
      this.$refs.gamePlatform.show();
    },
    //编辑
    onEdit() {
      this.gamePlatformTitle = "edit";
      this.$refs.gamePlatform.show();
    },
    //切换状态
    onStatus() {
      this.$Tip.confirm({
        content: "您确定要停用吗？",
        onOk: () => {}
      });
    },
    //删除
    onDelete() {
      this.$Tip.confirm({
        content: "您确定要删除吗？",
        onOk: () => {}
      });
    },
    //列表
    onList() {
      this.$router.push({name:"gameList"})
    },
    onPageChange() {},
    onPageSizeChange() {}
  }
};
</script>

<style lang="less"  scoped>
@import "../../../styles/button.less";
</style>
