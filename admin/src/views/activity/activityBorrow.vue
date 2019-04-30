<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="借款状态">
          <Select class="s-86" v-model="searchKey.status">
            <Option value="1">待审核</Option>
            <Option value="2">成功</Option>
            <Option value="3">失败</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择开始日期" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择结束日期" class="s-140" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox v-model="searchKey.isLike"></Checkbox>
          <span>模糊</span>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="账号/姓名" class="s-140" v-model="searchKey.account"/>
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
          <Button type="primary" class="search">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :columns="table.columns"
        :value="table.data"
        :total="table.total"
      ></Tables>
    </div>
    <!--借款审核-->
    <Modals ref="review" title="借款审核" :width="460">
      <div slot="content">
        <p class="ft14 ml85 mt20">
          <span class="pr10">会员账号：</span>
          <span>{{reviewInfo.account}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">可借总额：</span>
          <span>{{reviewInfo.borrowAmount}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">借款金额：</span>
          <span class="red-font">{{reviewInfo.borrow}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">操作类型：</span>
          <RadioGroup v-model="reviewInfo.type">
            <Radio label="success">通过</Radio>
            <Radio label="fail" class="ml5">拒绝</Radio>
          </RadioGroup>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">备注信息：</span>
          <Input
            type="textarea"
            placeholder="此栏位仅供管理者记录其他咨询，会员无法检视"
            :rows="4"
            class="b w260x mt10 mb20"
          />
        </p>
        <Button type="primary" class="w260x ml85 h50x ft20 mb20" @click="modalsSubmit('review')">确定</Button>
      </div>
    </Modals>
  </div>
</template>
<script>
import { borrowDataO } from "@/api/data";
import Tables from "_c/tables";
import Icons from "_c/icons";
import Modals from "_c/modals";
export default {
  name: "activityBorrow",
  components: {
    Icons,
    Tables,
    Modals
  },
  data() {
    return {
      //借款审核信息
      reviewInfo: {},
      searchKey: {},
      Time: [],
      table: {
        total: 100,
        data: [],
        loading: true,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center"
          },
          {
            title: "姓名",
            key: "name",
            align: "center"
          },
          {
            title: "电子可借额度",
            key: "gameLimit",
            align: "center"
          },
          {
            title: "棋牌可借额度",
            key: "gameLimit",
            align: "center"
          },
          {
            title: "彩票可借额度",
            key: "lotteryLimit",
            align: "center"
          },
          {
            title: "视讯可借额度",
            key: "gameLimit",
            align: "center"
          },
          {
            title: "可借总额",
            key: "borrowAmount",
            align: "center",
            renderHeader: (h, params) => {
              return h("p", [
                h("span", "可借总额"),
                h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      content:
                        "视讯可借额度与电子,棋牌,彩票三者中最高金管家等级的可借额度之和",
                      placement: "top-end"
                    }
                  },
                  [
                    h(Icons, {
                      props: {
                        type: "bangzhutishi"
                      },
                      style: {
                        color: "#b3b3b3",
                        marginLeft: "5px"
                      }
                    })
                  ]
                )
              ]);
            }
          },
          {
            title: "借款金额",
            key: "borrow",
            align: "center",
            render: (h, params) => (
              <span class="red-font">{params.row.borrow}</span>
            )
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status
                ? "#E2930E"
                : params.row.return
                ? "#118C1E"
                : "#FF0000";
              let text = params.row.status
                ? "待审核"
                : params.row.return
                ? "成功"
                : "失败";
              return <span style={{ color }}>{text}</span>;
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              if (params.row.status) {
                return (
                  <span
                    class="blue-font"
                    onClick={() => {
                      let { account, borrowAmount, borrow } = params.row;
                      this.reviewInfo = {
                        account,
                        borrowAmount,
                        borrow,
                        type: "success"
                      };
                      this.modalsShow("review");
                    }}
                  >
                    审核
                  </span>
                );
              } else {
                return <span class="blue-font" onClick={() => {
                  this.$Tip.confirm({
                    content: '您确定撤销审核吗？撤销后，可重新进行审核！',
                    onOk: () => {
                      this.$Message.success('撤销审核成功')
                    }
                  })
                }}>撤销</span>;
              }
            }
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center',
            tooltip: true,
            width: '100'
          },
          {
            title: '提交时间',
            key: 'updateTime',
            align: 'center',
            width: '150'
          },
          {
            title: '审核时间',
            key: 'checkTime',
            align: 'center',
            render: (h,params) => <span>{params.row.status ? '-' : params.row.checkTime}</span>
          },
          {
            title: '审核者',
            key: 'checker',
            align: 'center',
            render: (h,params) => <span>{params.row.status ? '-' : params.row.checker}</span>
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
      this.$root.startTableLoading(this);
      borrowDataO().then(res => {
        this.table.data = res.data;
      });
    },
    //弹框出现
    modalsShow(name) {
      this.$refs[name].show();
    },
    // 弹框中的确认事件
    modalsSubmit(name) {
      this.$refs[name].hide();
      this.$Message.success("借款审核成功");
    }
  }
};
</script>
<style lang="less" scoped>
.b {
  display: block;
}
</style>

