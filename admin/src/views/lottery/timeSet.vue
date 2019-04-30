<template>
  <div>
    <div class="v2-search">
      <Form ref="lotterySetting" inline>
        <FormItem label="彩票分类">
          <LotterySelect
            ref="LotterySelect"
            class="s-140"
            stage="odd"
            @on-lottery-change="onLotteryChange"
          ></LotterySelect>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="submit" :loading="$root.searchBtnLoading">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :page="false"
      ></Tables>
    </div>
  </div>
</template>
<script>
import { lotteryNameList } from "@/api/lottery";
import Tables from "@/components/tables";
import LotterySelect from "@/components/lottery-select";
import { getUserType } from '@/libs/util';
export default {
  name: "timeSet",
  components: {
    Tables,
    LotterySelect
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      lotteryList: [],
      table: {
        loading: true,
        data: [],
        columns: [
          {
            title: "彩票名称",
            key: "name",
            align: "center"
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  <a
                    class="mr5"
                    style={{
                      display: (this.adminType == 'super') || ((this.authInPage.indexOf('lotteryTimeList') != -1) && (params.row.name != '香港六合彩')) || ((this.authInPage.indexOf('lotteryLhcTimeList') != -1) && (params.row.name == '香港六合彩')) ? 'inline-block' : 'none'
                    }}
                    onClick={e => {
                      let { name, id } = params.row;
                      if (params.row.name == "香港六合彩") {
                        this.$router.push({
                          name: "markTimeSetting",
                          query: { name }
                        });
                      } else {
                        // 低频彩需要显示开奖日期
                        if (this.table.data[0].classId == 10009) {
                          this.$router.push({
                            name: "timeSettingAno",
                            query: { lid: id, name, type: "低频彩" }
                          });
                        } else {
                          this.$router.push({
                            name: "timeSettingAno",
                            query: { lid: id, name }
                          });
                        }
                      }
                    }}
                  >
                    时间设置
                  </a>
                </div>
              );
            }
          }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.LotterySelect.init();
    });
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      this.$root.startTableLoading(this);
      lotteryNameList().then(res => {
        const { sort1, sort3 } = res.data;
        this.lotteryList = sort3;
        this.table.data = [...sort1.official, ...sort1.fast];
        this.table.loading = false;
      });
    },
    getData(classId) {
      this.table.loading = true;
      lotteryNameList().then(res => {
        const { sort1, sort3 } = res.data;
        this.table.data = sort3[classId].list;
        this.table.loading = false;
      });
    },
    onLotteryChange(res) {
      this.lotteryId = res;
    },
    submit() {
      if (this.lotteryId) {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = this.lotteryList[this.lotteryId].list;
          this.table.loading = false;
        }, 1000);
      } else {
        this.getAllData();
      }
    }
  }
};
</script>
