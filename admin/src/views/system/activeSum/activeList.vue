<template>
  <div>
    <div class="v2-search mb20 clearfix">
      <Form inline>
        <div class="fl">
          <Button
            class="cardNutton activity-btn"
            @click="addActivity"
            style="width:148px"
            v-if="(adminType == 'super') || (authInPage.indexOf('activityIns') != -1)"
          >
            <Icons type="tianjialunbotuanniu"></Icons>新增活动
          </Button>
        </div>
        <div class="fl">
          <Button
            class="cardNutton fr ml20 activity-btn bc-c1"
            @click="selectWay('mobile')"
            :class="searchKey.client_type==='mobile'?'active':''"
          >移动端</Button>
          <Button
            class="cardNutton fr ml20 activity-btn bc-c1"
            @click="selectWay('pc')"
            :class="searchKey.client_type==='pc'?'active':''"
          >PC</Button>
          <Button
            class="cardNutton fr ml30 activity-btn bc-c1"
            @click="selectWay('pc,mobile')"
            :class="searchKey.client_type==='pc,mobile'?'active':''"
          >全部</Button>
        </div>
      </Form>
    </div>
    <div class="v2-search bb mb20">
      <ButtonGroup class="repay-button">
        <Button @click="getall()" :class="currentBtn == 'all' ? 'active' : 'noactive'">
          全部
          <i class="ivu-icon ivu-icon-ios-close"></i>
        </Button>

        <Button
          @click="gettable(item,index)"
          :class="currentBtn == index ? 'active' : 'noactive'"
          v-for="(item,index) in buttonlist"
          :key="index"
        >
          {{item.activity_cate_name}}
          <i
            v-if="(adminType == 'super') || (authInPage.indexOf('activityCateDel') != -1)"
            class="ivu-icon ivu-icon-ios-close"
            @click="delactity(item)"
          ></i>
        </Button>

        <span class="addfenlei" @click="addfenlei" v-if="(adminType == 'super') || (authInPage.indexOf('activityCateIns') != -1)">+</span>
      </ButtonGroup>
    </div>
    <div class="v2-table">
      <Tables
        ref="table"
        :loading="$root.tableLoading"
        :columns="table.columns"
        :value="table.data"
        :draggable="true"
        @on-edit="onEdit"
        @on-details="onDetails"
        @on-preview="preview"
        @on-delete="onDelete"
        @on-drag-drop="onDragDrop"
        :page="false"
      ></Tables>
      <!--
        :columns="table.columns"
        @on-change-status="onStatusChange"
        @on-page-size-change="onPageSizeChange"
        @on-page-change="onPageChange"
      -->
      <Modals ref="ModalsDetial" title="预览地址" width="760px">
        <div slot="content" class="modal-overflow" style="width:760px">
          <Form ref="formKey" :label-width="230">
            <FormItem label="预览地址：" class="address_item">
              <input v-model="previewlist.url_link" disabled>
              <Button v-clipboard:copy v-clipboard:success="onCopy" v-clipboard:error="onError">复制</Button>
            </FormItem>
            <FormItem label="有效时间：">
              <span>{{$root.unixTime(previewlist.online_time)}}</span>
              <span>(预览只限20分钟之内有效)</span>
            </FormItem>
            <FormItem label="预览方式：">打开网页后，粘贴网址打开即可预览</FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <Modals ref="addfenleiModal" title="新增分类" width="500px">
      <div slot="content" class="modal-overflow" style="width:500px">
        <Form
          ref="memberLevelForm"
          :rules="addActivityRules"
          :label-width="150"
          :model="memberLevelForm"
        >
          <FormItem label="分类名称" prop="fenleiName">
            <Input placeholder="请输入分类名称" class="w260x" v-model="memberLevelForm.fenleiName"/>
          </FormItem>
          <Button class="ivu-btn addSave mt40" @click="addsave">确认添加</Button>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "_c/tables";
import tableMixins from "@/mixins/table";
import Icons from "_c/icons";
import Modals from "@/components/modals";
import { getUserType } from "@/libs/util";
import {
  activityList,
  activityCateList,
  activityCateIns,
  activityDel,
  activityCateDel,
  activityDetail,
  activityBySort,
  activityChangeStatus
} from "@/api/system";
import { setTimeout } from 'timers';
export default {
  // name: "activeList",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons,
    Modals
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      id: "",
      canDrag: false,
      searchKey: {
        siteId: this.$root.nowSite.id,
        client_type: "pc,mobile",
        activity_cate_id: ""
      },
      previewlist: "",
      currentBtn: "all",
      buttonlist: [],
      addActivityRules: {
        fenleiName: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur"
          }
        ]
      },
      memberLevelForm: {
        fenleiName: ""
      },
      table: {
        total: 0,
        data: [],
        loading: true,
        pageSizeOpts: [20, 30, 40],
        columns: [
          {
            title: "排序",
            align: "center",
            width: 60,
            render: (h, params) => {
              return h(Icons, {
                props: {
                  type: "paixukongjian",
                  color: "#dadada",
                  size: 20
                }
              });
            }
          },
          {
            title: "活动标题",
            key: "title",
            align: "center"
          },
          {
            title: "下架时间",
            key: "offline_time",
            align: "center",
            render: (h, params) => {
              return (<span>{this.$root.unixTime(params.row.offline_time)}</span>)
            }
          },
          {
            title: "发布人",
            key: "adminName",
            align: "center"
          },
          {
            title: "状态",
            key: "",
            align: "center",
            render: (h, params) => {
              const statu = params.row.status == "yes" ? true : false;
              return h("i-switch", {
                props: {
                  value: statu,
                  size: "large"
                },
                scopedSlots: {
                  open: () => h("span", "开启"),
                  close: () => h("span", "停用")
                },
                on: {
                  "on-change": value => {
                    if (
                      this.adminType == "super" ||
                      this.authInPage.indexOf("activityChangeStatus") != -1
                    ) {
                      this.switch(params.row);
                    } else {
                      this.$Tip.info({ content: "对不起，您暂时没有此权限" });
                    }
                  }
                }
              });
            }
          },
          {
            title: "终端",
            key: "client_type",
            align: "center",
            render: (h, params) => {
              let type = params.row.client_type;
              if (type !== "pc,mobile") {
                return h("div", [
                  h(Icons, {
                    props: {
                      type: `zhongduan-${type === "pc" ? "PC" : "shouji"}`,
                      color: "#C5C5C5"
                    }
                  }),
                  h(
                    "span",
                    {
                      class: "ml10 f-color"
                    },
                    type === "pc" ? "PC" : "手机"
                  )
                ]);
              } else {
                return (
                  <table style={{ width: "100%" }}>
                    <th
                      style={{
                        width: "50%",
                        textAlign: "center",
                        background: "none",
                        borderBottom: "none"
                      }}
                    >
                      <div>
                        <Icons type="zhongduan-PC" color="#C5C5C5" />
                        <span class="ml10 f-color" style="font-weight: normal">
                          PC
                        </span>
                      </div>
                    </th>
                    <th
                      style={{
                        width: "50%",
                        textAlign: "center",
                        background: "none",
                        borderBottom: "none",
                        borderRight: "none"
                      }}
                    >
                      <div>
                        <Icons type="zhongduan-shouji" color="#C5C5C5" />
                        <span class="ml10 f-color" style="font-weight: normal">
                          手机
                        </span>
                      </div>
                    </th>
                  </table>
                );
              }
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  <a
                    class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('activityDetail') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      this.preview(params);
                    }}
                  >
                    预览
                  </a>
                  <a
                    class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('activityUpt') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {
                      this.onEdit(params);
                    }}
                  >
                    编辑
                  </a>
                  <a
                    class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('activityDel') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {
                      this.onDelete(params);
                    }}
                  >
                    删除
                  </a>
                </div>
              );
            }
          }
        ]
      }
    };
  },

  mounted() {
    //这里除了limit还要传个值给后台   具体字段找后台商量下
    // this.getData({params: {limit:10}})
  },
  created() {
    this.getActivelist();
  },
  methods: {
    getData(data) {
      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      activityList(data).then(res => {
        //不带分页
        const data = res.data;
        this.table.data = data;
      });
    },
    //删除事件
    onDelete(params) {
      this.$Tip.confirm({
        content: `您确定删除吗？`,
        onOk: () => {
          let data = {
            id: params.row.id,
            siteId: this.$root.nowSite.id
          };
          activityDel(data).then(res => {
            if (res.code == 200) {
              this.table.data.splice(params.index, 1);
            }
          });
        }
      });
    },
    gettable(item, index) {
      this.currentBtn = index;
      this.searchKey.activity_cate_id = item.id;
      let params = { ...this.searchKey };
      params.siteId = this.$root.nowSite.id;
      this.getData({ params });
    },
    selectWay(way) {
      this.searchKey.client_type = way;
      let params = { ...this.searchKey };
      console.log(11111, params)
      params.siteId = this.$root.nowSite.id;
      this.getData({ params });
    },
    getall() {
      this.currentBtn = "all";
      this.searchKey.activity_cate_id = "";
      let params = { ...this.searchKey };
      params.siteId = this.$root.nowSite.id;
      delete params.activity_cate_id;
      this.getData({ params });
      //获取去不信息重置按钮信息
    },
    preview(params) {
      //预览
      activityDetail({ siteId: this.$root.nowSite.id, id: params.row.id }).then(
        res => {
          this.previewlist = res.data;
          this.$refs.ModalsDetial.show();
        }
      );
    },
    //编辑路由跳转编辑活动
    onEdit(params) {
      this.$router.push({
        name: "addActivities",
        params: { page: "edit" },
        query: { id: params.row.id, siteId: this.$root.nowSite.id }
      });
    },
    getActivelist() {
      activityCateList({ siteId: this.$root.nowSite.id }).then(res => {
        this.buttonlist = res.data;
      });
    },
    addsave() {
      //添加分类
      this.$refs.memberLevelForm.validate(valid => {
        if (valid) {
          let params = {
            siteId: this.$root.nowSite.id,
            activity_cate_name: this.memberLevelForm.fenleiName
          };
          activityCateIns(params).then(res => {
            this.$refs.addfenleiModal.hide();
            this.getActivelist();
          });
        }
      });
    },
    onDetails(params) {
      const data = { id: params.row.id, siteId: this.$root.nowSite.id };
      lanternDetail(data).then(res => {
        this.poplist = res.data;
        this.$refs.ModalsDetial.show();
      });
    },
    switch(index) {
      const { siteId, id, status } = index;
      const data = {
        siteId,
        id,
        status: status == "yes" ? "no" : "yes"
      };
      activityChangeStatus(data).then(res => {
        this.getData({ params: this.searchKey });
      });
    },
    delactity(item) {
      this.$Tip.confirm({
        content: `您确定删除吗？`,
        onOk: () => {
          let data = {
            id: item.id,
            siteId: this.$root.nowSite.id
          };
          activityCateDel(data).then(res => {
            if (res.code == 200) {
              this.getActivelist();
            }
          });
        }
      });
    },
    onCopy: function(e) {
      this.$Message.success("复制成功");
    },
    onError: function(e) {
      this.$Message.error("复制失败");
    },
    //新增活动
    addActivity() {
      this.$router.push({
        name: "addActivities",
        params: { page: "create" }
      });
    },
    //新增分类
    addfenlei() {
      this.memberLevelForm.fenleiName = "";
      this.$refs.addfenleiModal.show();
    },
    //拖住排序id参数不知道是啥
    onDragDrop(oldIndex, newIndex) {
      const params = {
        id: this.$refs.table.insideTableData[oldIndex].id,
        siteId: this.$root.nowSite.id,
        oldIndex,
        newIndex
      };
      if ((this.adminType == 'super') || (this.authInPage.indexOf('activityBySort') != -1)) {
        activityBySort(params).then(res => {
          if (typeof res === "object" && res.code === 200) {
            if (this.currentBtn === "all") {
              this.getall();
            } else {
              //此处返回数据有问题
              this.gettable(this.buttonlist[this.currentBtn], this.currentBtn);
            }
          }
        });
      } else {
        this.$Tip.info({content: '对不起，您暂时没有此权限'})
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.activity-btn {
  height: 36px;
  width: 80px;
}
.fl {
  .bc-c1 {
    border-color: #dcdcdc;
    color: #666666;
  }
  .active {
    background-color: #2d8cf0;
    color: #ffffff;
  }
}
.ivu-btn.addSave {
  margin: 15px 125px auto;
  width: 250px;
}
.repay-button {
  height: 39px;
  .noactive {
    height: 39px;
    border: 1px solid #eaeaea;
    //  margin-left:5px;
    background: #f7f7f7;
    text-align: left;
    padding-left: 32px;
    border-radius: 0;
    // .ivu-icon-ios-close{
    // border: 1px solid #eaeaea;
    // }
  }
  button.active {
    height: 39px;
    border-radius: 0;
    border: none;
    border-top: 2px solid #2d8cf0;
    border-left: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    background: #fff;
    color: #2d8cf0;
  }
  .addfenlei {
    font-size: 25px;
    // margin-left: 10px;
    padding: 0 10px;
    // border: 1px solid #eaeaea;
    cursor: pointer;
  }
}
.ivu-icon-ios-close {
  position: absolute;
  right: 5px;
  top: 6px;
  width: 25px;
  height: 25px;
  margin-left: 2px;
  // border:1px solid #62B1FD;
  border-radius: 15px;
  cursor: pointer;
  color: #666;
  font-size: 24px;
  opacity: 0.66;
}
.modal-overflow form {
  margin-top: 45px;
  margin-bottom: 50px;
}
.bb {
  margin-top: 30px;
}
.address_item {
  input {
    color: #808080;
    border-radius: 7px;
    border: 1px solid #eaeaea;
    width: 293px;
    outline: none;
    padding: 0 20px;
  }
  button {
    margin-left: 15px;
    width: 70px;
    color: #62b1fd;
    border: 1px solid #62b1fd;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
  }
}
</style>
