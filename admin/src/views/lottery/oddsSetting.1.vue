<template>
  <div>
    <div class="v2-search clearfix">
      <div class="v2-button fl">
        <Button class="w120x fl" v-show="oddsStatus" @click="btnShow">修改赔率</Button>
        <div v-show="!oddsStatus" class="fl">
          <Button @click="save(1)" class="w120x fl">确认保存</Button>
          <Button @click="save(0)" class="w120x fl">取消修改</Button>
        </div>
      </div>
      <div class="fr font-bold ft18">当前彩票：{{lotteryName}}</div>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :total="table.total"
        :loading="$root.tableLoading"
        :value="table.data"
        :columns="table.columns"
        :page="false"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { lotteryOddsSiteId, lotteryUpdateOddsSiteidLid } from "@/api/lottery";
export default {
  name: "oddsSetting",
  components: {
    Tables
  },
  data() {
    return {
      postData: {},
      lotteryName: "",
      oddsId: 0, //赔率ID
      oddsStatus: true,
      originData: [],
      table: {
        total: 0,
        data: [],
        columns: [
          {
            title: "描述",
            key: "title",
            align: "center"
          },
          {
            title: "号码",
            key: "ball",
            align: "center",
            width: "800",
            tooltip: true
          },
          {
            title: "赔率",
            key: "oddsMin",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: this.oddsStatus ? "block" : "none"
                    }
                  },
                  params.row.oddsMin
                ),
                h("InputNumber", {
                  style: {
                    display: !this.oddsStatus && !params.row.oddsMin.split("/")[1] ? "block" : "none", //只有一个赔率
                    width: "50%",
                    margin: "0 auto",
                    borderRadius: "0"
                  },
                  props: {
                    step: 0.01,
                    value: Number(params.row.oddsMin),
                    min: 0,
                    max: Number(params.row.oddsMax)
                  },
                  on: {
                    "on-change": value => {
                      this.$set( this.table.data[params.index], "oddsMin", String(value) );
                    }
                    //  "on-blur": e => {
                    //   this.$set( this.table.data[params.index], "oddsMin", String(e.target.value) );
                    // }
                  }
                }),
                h('div',[
                  h('InputNumber',{
                    style: {
                      display: !this.oddsStatus && params.row.oddsMin.split('/')[1] ? 'inline-block' : 'none',
                      borderRadius: '0',
                      marginRight: '10px',
                    },
                    props: {
                      step: 0.01,
                      value: Number(params.row.oddsMin.split('/')[0]),
                      min: 0,
                      max: Number(params.row.oddsMax.split('/')[0])
                    },
                    on: {
                      'on-change': value => {
                        let { row, index } = params
                        this.$set(this.table.data[index],'oddsMin',`${value}/${row.oddsMin.split('/')[1]}`)
                      }
                    }
                  }),
                  // 特码三中二，连码特中二
                  h('InputNumber',{
                    style: {
                      display: !this.oddsStatus && params.row.oddsMin.split('/')[1] ? 'inline-block' : 'none',
                      borderRadius: '0',
                    },
                    props: {
                      step: 0.01,
                      value: Number(params.row.oddsMin.split('/')[1]),
                      min: 0,
                      max: Number(params.row.oddsMax.split('/')[1])
                    },
                    on: {
                      'on-change': value => {
                        let { index, row } = params
                        this.$set(this.table.data[index],'oddsMin',`${row.oddsMin.split('/')[0]}/${value}`)
                      }
                    }
                  })
                ])
              ]);
            }
          },
          {
            title: "返水",
            key: "fsrate",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: this.oddsStatus ? "block" : "none"
                    }
                  },
                  `${params.row.fsrate ? params.row.fsrate : 0}%`
                ),
                h("InputNumber", {
                  style: {
                    display: this.oddsStatus ? "none" : "inline-block",
                    textAlign: "center",
                    width: "40%",
                    margin: "0 auto",
                    borderRadius: "0"
                  },
                  props: {
                    step: 0.01,
                    value: Number(params.row.fsrate),
                    min: 0
                  },
                  on: {
                    "on-change": value => {
                      this.$set( this.table.data[params.index], "fsrate", String(value) );
                    }
                  }
                }),
                h("span", {
                  style: {
                    display: this.oddsStatus ? 'none' : 'inline-block',
                    marginLeft: '5px'
                  }
                },'%')
              ]);
            }
          }
        ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.postData = {
        lotteryId: vm.$route.query.lotteryId,
        siteId: vm.$root.nowSite.id
      };
      vm.getData(vm.postData);
    });
  },
  methods: {
    btnShow() {
      this.oddsStatus = !this.oddsStatus;
    },
    getData(data) {
      this.$root.startTableLoading();
      lotteryOddsSiteId(data).then(res => {
        const { lotteryName, oddsInfo, id } = res.data;
        this.originData = JSON.parse(JSON.stringify(oddsInfo));
        this.lotteryName = lotteryName;
        this.oddsId = id;
        this.table.data = oddsInfo;
        this.table.loading = false;
      });
    },
    // 赔率修改
    save(flag) {
      // 确认保存
      if (flag == 1) {
        let oddsInfo = [];
        this.table.data.forEach(item => {
          delete item.initRowIndex;
          oddsInfo.push(item);
        });
        let data = {
          id: this.oddsId,
          oddsInfo: JSON.stringify(oddsInfo)
        };
        lotteryUpdateOddsSiteidLid(data).then(res => {
          if(res.code == 200) {
            this.oddsStatus = !this.oddsStatus;
          this.originData = JSON.parse(JSON.stringify(this.table.data));
          }
        });
      } else {
        this.oddsStatus = !this.oddsStatus;
        this.table.data = this.originData;
      }
      this.originData = JSON.parse(JSON.stringify(this.table.data)); //防止第二次点击取消修改数据依旧改变
    }
  }
};
</script>
<style lang="less" scoped >
.clearfix {
  .dqcp {
    width: 40%;
    border: 1px solid #dcdcdc;
    text-align: center;
    line-height: 32px;
  }
}
.ivu-input-number {
  margin: auto;
}
/deep/.ivu-table-cell-tooltip-content {
  padding: 0 100px 0 100px !important;
}
/deep/.ivu-input-number-input {
  border-radius: 0px !important;
}
</style>


