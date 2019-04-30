<template>
  <Modals ref="PaymentModifyModal" title="支付设置" :width="900">
    <div slot="content">
      <Tabs type="card" value="pc">
        <TabPane label="电脑端" name="pc">
          <div class="modal-overflow">
            <ul class="">
              <li class="pt15 pb10" v-for="(pc,i) in pcList" :key="pc.class_id">
                <label style="width:110px;" class="txt-r ib mr20">{{pc.class_name}}:</label>
                <Select
                  v-for="t in [0,1,2,3,4]"
                  clearable
                  :key="t"
                  v-model="pc.selected_id.split(',')[t]"
                  class="mr20"
                  :style="{width:'120px', maxHeight: '150px'}"
                  :placeholder="'选择通道' + (t===0 ? '一' :t===1 ? '二' : t===2? '三' :t===3 ? '四' : '五')"
                  @on-clear="resetSelected('pc',i,t)"
                >
                  <Option
                    v-for="item in pc.payment_list"
                    :value="item.id+''"
                    :key="item.id"
                    :label="item.payName"
                    :disabled="pc.selected_id.includes(item.id+'')"
                    class="option-span"
                    @click.native="onPcChange(i,t,pc.class_id,item.id)"
                  >
                    {{item.payName}}
                  </Option>
                </Select>
              </li>
              <Form>
                <Button
                  class="ivu-btn submit btw260 ft20 gd mb60 mt40 bg"
                  style="margin-left:306px;"
                  @click="submit"
                  type="primary"
                >提交保存</Button>
              </Form>
            </ul>
          </div>
        </TabPane>
        <TabPane label="手机端" name="mobile">
          <div class="modal-overflow">
            <ul class="">
              <li class="pt15 pb10" v-for="(h5,i) in h5List" :key="h5.class_id">
                <label style="width:110px;" class="txt-r ib mr20">{{h5.class_name}}:</label>
                <Select
                  v-for="t in [0,1,2,3,4]"
                  clearable
                  :key="t"
                  v-model="h5.selected_id.split(',')[t]"
                  class="mr20"
                  :style="{width:'120px'}"
                  :placeholder="'选择通道' + (t===0 ? '一' :t===1 ? '二' : t===2? '三' :t===3 ? '四' : '五')"
                  @on-clear="resetSelected('h5',i,t)"
                >
                  <Option
                    v-for="item in h5.payment_list"
                    :value="item.id+''"
                    :key="item.id"
                    :label="item.payName"
                    :disabled="h5.selected_id.includes(item.id+'')"
                    class="option-span"
                    @click.native="onH5Change(i,t,h5.class_id,item.id)"
                  >
                    {{item.payName}}
                  </Option>
                </Select>
              </li>
              <Form>
                <Button
                  class="ivu-btn submit btw260 ft20 gd mb60 mt40 bg"
                  style="margin-left:306px;"
                  @click="submit"
                  type="primary"
                >提交保存</Button>
              </Form>
            </ul>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </Modals>
</template>
<script>
import Modals from "@/components/modals";
import { paymentsetting, payMentDetail } from "@/api/member";

export default {
  components: { Modals },
  data() {
    return {
      formKey: {
        levelLabel: "",
        data: {
          pc: {},
          h5: {}
        }
      },
      pcList: [], // pc总数居
      h5List: [],
      // pcBtnDisabled: true,
      // h5BtnDisabled: true,
      pcSelect: '',
      h5Select: ''
    };
  },
  methods: {
    resetForm() {
      this.formKey.data.pc = {};
      this.formKey.data.h5 = {};
    },
    init(levelLabel) {
      this.resetForm();
      this.formKey.levelLabel = levelLabel;
      const data = {
        siteId: this.$root.nowSite.id,
        levelLabel: levelLabel
      };
      payMentDetail(data).then(res => {
        const { pc, h5 } = res.data;
        this.pcList = pc;
        this.h5List = h5;
        this.$refs.PaymentModifyModal.show();
      });
    },
    onPcChange(p_i, t_i, c_id, id) {
      // this.pcBtnDisabled = false;
      this.createData("pc", p_i, t_i, c_id, id);
    },
    onH5Change(p_i, t_i, c_id, id) {
      // this.h5BtnDisabled = false;
      this.createData("h5", p_i, t_i, c_id, id);
    },
    createData(key, p_i, t_i, c_id, id) {
      /**
       * key 判断平台的key,指向data的目标列表 pc | h5
       * p_i 最上层index
       * t_i 当前通道的index
       * c_id 父级id
       * id 当前选择项
       */
      let targetList = key === "pc" ? "pcList" : "h5List";
      if (this[targetList][p_i].selected_id.includes(id)) return false;
      let ids = this[targetList][p_i].selected_id.split(",");
      ids[t_i] = id;
      this[targetList][p_i].selected_id = ids.join(",");
      this.formKey.data[key][c_id] = ids.join(",");
    },
    submit() {
      let params = { ...this.formKey };
      params.siteId = this.$root.nowSite.id;
      params.data.pc = this.completeParams("pc");
      params.data.h5 = this.completeParams("h5");
      params = Object.assign(params, this.formKey)
      const { pc, h5 } = params.data;
      // if (!Object.keys(pc).length || !Object.keys(h5).length) {
      //   this.$Tip.info({
      //     content: "PC或H5的支付通道必须至少选择一个"
      //   });
      //   this.dsbBtn();
      //   return false;
      // }
      params.data = JSON.stringify(params.data);
      this.$refs.PaymentModifyModal.spinShow();
      paymentsetting(params)
        .then(res => {
          //更改弹窗模式
          if (res.code === 200) {
            this.$Tip.hide()
            this.$Message.success(`修改${res.data}`)
          }
          this.$refs.PaymentModifyModal.hide();
          this.$refs.PaymentModifyModal.spinHide();
          this.resetForm();
        })
        .catch(err => {
          this.$refs.PaymentModifyModal.spinHide();
        });
    },
    // dsbBtn () {
    //   this.h5BtnDisabled = true;
    //   this.pcBtnDisabled = true;
    // },
    completeParams(key) {
      // 如果有默认的通道并且没有触发通道change事件，则需要补全之前默认的的通道信息提交后台
      let targetList = key === "pc" ? "pcList" : "h5List";
      let data = {};
      this[targetList].forEach(pay => {
        if (pay.selected_id) data[pay.class_id] = pay.selected_id;
      });
      return data;
    },
    resetStatus () {
      this.dsbBtn()
    },
    resetSelected(type, i, t) {
      if (type === 'pc') {
        let arr = this.pcList[i].selected_id.split(',')
        arr[t] = undefined
        let selected_id = arr.join(',')
        this.pcList[i].selected_id = selected_id
        // this.pcBtnDisabled = false
        return
      } else if (type === 'h5') {
        let arr = this.h5List[i].selected_id.split(',')
        arr[t] = undefined
        let selected_id = arr.join(',')
        this.h5List[i].selected_id = selected_id
        // this.h5BtnDisabled = false
        return
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/tabs.less";
@import "../../../styles/button.less";
.option-span.ivu-select-item {
  height: 100%;
  padding: 7px 16px;
}
.ivu-select-item {
  padding: 0;
}
</style>


