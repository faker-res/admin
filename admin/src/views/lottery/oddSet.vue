<template>
  <div>
    <div class="v2-search">
      <Form ref="lotterySetting" inline>
        <FormItem label="彩票分类">
          <LotterySelect
            ref="LotterySelect"
            stage="odd"
            class="s-140"
            @on-lottery-change="onLotteryChange"
          ></LotterySelect>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="submit" :loading="$root.searchBtnLoading">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables :columns="table.columns" :loading="table.loading" :value="table.data" :page="false"></Tables>
    </div>
  </div>
</template>

<script>
import { lotteryNameList } from "@/api/lottery";
import Tables from "@/components/tables";
import LotterySelect from "@/components/lottery-select";
import { getUserType } from '@/libs/util';
export default {
  name: "oddSet",
  components: {
    Tables,
    LotterySelect
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      lotteryList: [],
      lotteryId: 0,
      table: {
        total: 0,
        data: [],
        loading: true,
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
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryOddsSiteidLid') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      this.$router.push({
                        name: "oddsSetting",
                        query: { lotteryId: params.row.id }
                      });
                    }}
                  >
                    赔率设置
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
    submit() {
      if (this.lotteryId) {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = this.lotteryList[this.lotteryId].list;
          this.table.loading = false;
        }, 1000);
      }else{
        this.getAllData()
      }
    },
    onLotteryChange(res) {
      this.lotteryId = res;
    },
    getAllData() {
      this.$root.startTableLoading(this);
      lotteryNameList().then(res => {
        const { sort1, sort2 } = res.data;
        this.lotteryList = sort2;
        this.table.data = [...sort1.official, ...sort1.fast];
        this.table.loading = false;
      });
    },
    getData(classId) {
      this.$root.startTableLoading(this);
      lotteryNameList().then(res => {
        const { sort1, sort2 } = res.data;
        this.table.data = sort2[classId].list;
        this.table.loading = false;
      });
    }
  }
};
</script>
5