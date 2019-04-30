<template>
  <div>
    <div class="mb20 mt10">
      <Button @click="addBlackList" class="w130x oldColor"
        v-if="(adminType == 'super') || (authInPage.indexOf('blackListCreate') != -1)"
      >添加黑名单</Button>
      <Button @click="batchReduce" class="w130x oldColor ml20"
        v-if="(adminType == 'super') || (authInPage.indexOf('blackListDelete') != -1)"
      >删除选中</Button>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :value="table.data"
        :showSizer="false"
        :columns="table.columns"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-selection-change="onSelectionChange"
        @on-page-change="onPageChange"
        @on-delete="onDelete"
      ></Tables>
    </div>
    <Modals title="添加区域黑名单" :width="620" ref="addBlackList">
      <div slot="content">
        <Form :label-width="160" ref="addBlackListInfo" :model="addBlackListInfo" :rules="rules">
          <FormItem label="账号IP" prop="ip">
            <Input v-model="addBlackListInfo.ip" class="w320x" placeholder="请输入IP地址"/>
          </FormItem>
          <FormItem label="黑名单时效">
            <Select v-model="addBlackListInfo.type" class="w320x">
              <Option value="forever">立即生效（永久）</Option>
              <Option value="expire">按照时间</Option>
            </Select>
          </FormItem>
          <FormItem label="开始日期" v-if="addBlackListInfo.type == 'expire'">
            <DatePicker type="date" class="w120x" v-model="addBlackListInfo.startTime" transfer></DatePicker>
            <span class="pl20 pr5">结束日期</span>
            <DatePicker type="date" class="w120x" v-model="addBlackListInfo.endTime" transfer></DatePicker>
          </FormItem>
          <FormItem label="描述">
            <Input
              type="textarea"
              class="w320x"
              v-model="addBlackListInfo.description"
              :rows="4"
              placeholder="请输入描述"
            />
          </FormItem>
          <FormItem>
            <Button class="search w320x" type="primary" @click="submit">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>

<script>
import Icons from "_c/icons";
import Tables from "_c/tables";
import Modals from "_c/modals";
import SiteSelect from "_c/site-select";
import { getUserType } from '@/libs/util';
import {
  siteManagementList,
  blackList,
  blackListCreate,
  blackListDelete
} from "@/api/system";
import { getAccessFromLocal } from "@/libs/util";
export default {
  name: "siteBlackList",
  components: {
    Icons,
    Tables,
    SiteSelect,
    Modals
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      searchKey: { limit: 10 },
      siteId: 0,
      siteName: "",
      checkedArr: [],
      addBlackListInfo: {
        type: "forever",
        ip: ''
      },
      rules: {
        ip: [
          {
            required: true,
            message: "请输入ip",
            trigger: "blur"
          }
        ]
      },
      table: {
        total: 0,
        data: [],
        loading: true,
        pageSizeOpts: [20],
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "限制区域IP",
            key: "ip",
            align: "center"
          },
          {
            title: "描述",
            key: "description",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.description)}</span>
            )
          },
          {
            title: "解封时间",
            key: "expire",
            align: "center",
            render: (h, params) => {
              if(params.row.expire == 0){
                return <span>永久封禁</span>
              }else{
                return <span>{this.$root.unixTime(params.row.expire)}</span>
              }
            }
          },
          {
            title: "操作员",
            key: "who",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.who)}</span>
            )
          },
          {
            title: "添加时间",
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span class="pr20 pl20">{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "操作",
            align: "center",
            render: (h,params) => {
              return (
                <a
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('blackListDelete') != -1) ? 'inline-block' : 'none'
                  }}
                  onClick={() => {this.onDelete(params)}}
                >删除</a>
              )
            }
          }
        ]
      }
    };
  },
  watch: {
    "$root.nowSite": {
      handler(val, oldVal) {
        this.$nextTick(() => {
          const { id, siteName } = val;
          this.siteId = id;
          this.siteName = siteName;
          this.getData({siteId: this.siteId});
        });
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSelectionChange(selection) {
      this.checkedArr = selection;
    },
    // 获取黑名单列表
    getData(data) {
      this.$root.startTableLoading(this);
      blackList(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    addBlackList() {
      this.$refs.addBlackListInfo.resetFields();
      this.$refs.addBlackList.show();
    },
    // 删除黑名单
    onDelete(params) {
      this.$Tip.confirm({
        content: `您确定将${params.row.ip}移出黑名单吗？`,
        onOk: () => {
          let data = {
            siteId: this.siteId,
            id: params.row.id
          };
          blackListDelete(data).then(res => {
            if (res.code == 200)  {
              this.table.data.splice(params.index, 1);
              this.table.total--;
            }
          });
        }
      });
    },
    batchReduce() {
      let arr = [];
      this.checkedArr.forEach(item => arr.push(item.id));
      let data = { siteId: this.siteId, id: String(arr) };
      this.$Tip.confirm({
        content: "您确定将名单批量移除吗？",
        onOk: () => {
          blackListDelete(data).then(res => {
            if (res.code == 200)
              this.getData({ siteId: this.siteId });
          });
        }
      });
    },
    submit() {
      this.$refs.addBlackListInfo.validate(valid => {
        if (valid) {
          let data = {
            ...this.addBlackListInfo,
            siteId: this.siteId,
            siteName: this.siteName
          };
          for (let key in data) {
            data[key] ? "" : delete data[key];
          }
          this.$refs.addBlackList.spinShow();
          let { startTime, endTime } = data;
          if (startTime && endTime) {
            data.expire = this.$moment(endTime).format('X');
            delete data.startTime;
            delete data.endTime;
          }
          if(data.type == 'expire') {
            if(!data.expire){
              this.$Tip.info({content: '请选择时间'})
              this.$refs.addBlackList.spinHide();
              return false
            }
          }
          blackListCreate(data).then(res => {
            this.$refs.addBlackList.spinHide();
            if (res.code == 200) {
              this.$refs.addBlackList.hide();
              this.getData({siteId: this.siteId} );
            }
          }).catch(error => {
            this.$refs.addBlackList.spinHide()
          })
        }
      });
    },
    onPageChange(page) {
      let data = { siteId: this.$root.nowSite.id, page }
      this.getData(data)
    }
  }
};
</script>
