<template>
  <div class="v2-search">
    <Form inline>
      <FormItem label="游戏平台">
        <Select>
          <Option v-for="(item,i)  in   gamePlatform" :key="i" :value="item.value">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="客户端">
        <Select>
          <Option v-for="(item,i)  in   gamePlatform" :key="i" :value="item.value">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="显示状态">
        <Select>
          <Option v-for="(item,i)  in   status" :key="i" :value="item.value">{{item.name}}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Select class="w100x">
          <Option v-for="(item,i)  in   status" :key="i" :value="item.value">{{item.name}}</Option>
        </Select>
        <span class="w100x pl10 pr10">-</span>
        <Select class="w100x">
          <Option v-for="(item,i)  in   status" :key="i" :value="item.value">{{item.name}}</Option>
        </Select>
        <span class="w100x pl10 pr10">-</span>
        <Select class="w100x">
          <Option v-for="(item,i)  in   status" :key="i" :value="item.value">{{item.name}}</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          :loading="$root.searchBtnLoading"
          class="search"
          @click="searchSubmit"
        >查询</Button>
      </FormItem>
    </Form>
    <div>
      <Button class="w130x cardNutton mb20" @click="addGame">添加游戏</Button>
    </div>
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
        @on-details="onDetials"
      ></Tables>
    </div>
    <Modals ref="gameModal" :title="gameModalTitle==='create'?'添加游戏平台':'编辑游戏平台'" width="670">
      <div slot="content">
        <Form :label-width="210">
          <FormItem label="创建人">
            <Input class="w320x"/>
          </FormItem>
          <FormItem label="游戏平台">
            <Select class="w320x">
              <Option v-for="(item,i)  in  gamePlatform " :key="i" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="游戏名称">
            <Input class="w320x"/>
          </FormItem>
          <FormItem label="游戏编号">
            <Input class="w320x"/>
          </FormItem>
          <FormItem label="客户端" class="clearfix">
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll"
              class="fl"
            >全选</Checkbox>
            <CheckboxGroup class="fl" v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox label="全部"></Checkbox>
              <Checkbox label="PC"></Checkbox>
              <Checkbox label="H5"></Checkbox>
              <Checkbox label="Android"></Checkbox>
              <Checkbox label="IOS"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="标签">
            <CheckboxGroup v-model="tip">
              <Checkbox label="最新游戏"></Checkbox>
              <Checkbox label="热门游戏"></Checkbox>
              <Checkbox label="经典游戏"></Checkbox>
              <Checkbox label="老虎机"></Checkbox>
              <Checkbox label="奖池游戏"></Checkbox>
              <Checkbox label="单线"></Checkbox>
              <Checkbox label="5-15线"></Checkbox>
              <Checkbox label="5-10线"></Checkbox>
              <Checkbox label="243线"></Checkbox>
              <Checkbox label="其它"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="显示状态">
            <Select class="w320x">
              <!-- <Option vlaue="yes">正常</Option>
              <Option  vlaue="no">停用</Option>-->
            </Select>
          </FormItem>
          <FormItem label="游戏图片">
            <Upload class="w320x" :multiple="false" type="drag" action="//jsonplaceholder.typicode.com/posts/">
              <p>鼠标拖拽图片至此区域上传</p>
              <Button style="padding: 3px 10px" class="mb10">
                <Icons type="shangchuan" size="16" style="color: #3399ff"></Icons>
                <span>上传图片</span>
              </Button>
            </Upload>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="$root.editLoading" class="ivu-btn submit mb20">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "_c/tables";
import Modals from "@/components/modals";
import Icons  from  "@/components/icons"
import { gameConfigList } from "@/api/system";
export default {
  name: "gameList",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      tip: [], //标签
      checkAllGroup: [],
      gameList: [],
      gameModalTitle: "", //添加和编辑的标题
      gamePlatform: [
        { name: "MG电子", value: "1" },
        { name: "AG电子", value: "2" },
        { name: "FG电子", value: "3" }
      ], //游戏平台
      client: [
        { name: "全部", value: "1" },
        { name: "PC", value: "1" },
        { name: "H5", value: "2" },
        { name: "FG电子", value: "3" },
        { name: "IOS", value: "4" }
      ], //客户端
      status: [
        { name: "全部", value: "1" },
        { name: "正常", value: "2" },
        { name: "关闭", value: "3" }
      ],
      table: {
        total: 0,
        data: [],
        loading: true,
        pageSizeOpts: [20, 30, 40],
        columns: [
          {
            title: "游戏平台",
            key: "siteName",
            align: "center"
          },
          {
            title: "游戏名称",
            key: "platform",
            align: "center"
          },
          {
            title: "标签",
            key: "platform",
            align: "center"
          },
          {
            title: "显示客户端",
            key: "platform",
            align: "center"
          },
          {
            title: "显示",
            key: "platform",
            align: "center"
          },
          {
            title: "创建时间",
            key: "platform",
            align: "center"
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["status", "detials", "edit", "delete"]
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const data = {
        platform: "sport"
      };
      gameConfigList(data).then(res => {
        console.log(res);
        console.log(res.data.data);
        this.table.data = res.data.data;
        this.table.total = res.total;
      });
    },
    //添加游戏
    addGame() {
      
    },
    onEdit() {
      this.$refs.gameModal.show();
    },
    //改变状态
    onStatus() {
      this.$Tip.confirm({
        content: "您确定要停用吗？",
        onOk: () => {}
      });
    },
    onDelete() {
      this.$Tip.confirm({
        content: "您确定要删除吗？",
        onOk: () => {}
      });
    },
    onDetials() {},
    searchSubmit() {},
    onPageChange() {},
    onPageSizeChange() {},
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["香蕉", "苹果", "西瓜"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
</style>