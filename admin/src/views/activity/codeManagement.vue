<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline class="pb20">
        <FormItem label="金管家等级">
          <Select v-model="searchKey.level" class="s-86" clearable>
            <Option value="1">等级1</Option>
            <Option value="2">等级2</Option>
            <Option value="3">等级3</Option>
          </Select>
        </FormItem>
        <FormItem label="锁定状态">
          <Select v-model="searchKey.status" class="s-86">
            <Option value="1">未锁定</Option>
            <Option value="2">已锁定</Option>
          </Select>
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
        <FormItem v-show="showBtn">
          <Button class="bb-color blue-bd w120x" @click="() => { showBtn = !showBtn }">编辑</Button>
        </FormItem>
        <div class="ib" v-show="!showBtn">
          <FormItem>
            <Button class="w120x" @click="cancel">取消</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" class="bg w120x" @click="statusSave">保存</Button>
          </FormItem>
        </div>
      </Form>
    </div>
    <div class="v2-search bb">
      <ButtonGroup class="repay-button">
        <Button
          @click="() => { currentBtn = 'live' }"
          :class="currentBtn == 'live' ? 'active' : ''"
        >视讯</Button>
        <Button
          @click="() => { currentBtn = 'chess' }"
          :class="currentBtn == 'chess' ? 'active' : ''"
        >棋牌</Button>
        <Button
          @click="() => { currentBtn = 'game' }"
          :class="currentBtn == 'game' ? 'active' : ''"
        >电子</Button>
        <Button
          @click="() => { currentBtn = 'lottery' }"
          :class="currentBtn == 'lottery' ? 'active' : ''"
        >彩票</Button>
      </ButtonGroup>
    </div>
    <LiveCode
      class="mt20"
      ref="liveCode"
      @sendNewData="getLiveData"
      v-show="currentBtn == 'live'"
      :showBtn="showBtn"
    ></LiveCode>
    <OtherCode
      class="mt20"
      ref="otherCode"
      @sendNewData="getOtherData"
      v-show="currentBtn != 'live'"
      :type="currentBtn"
      :showBtn="showBtn"
    ></OtherCode>
  </div>
</template>
<script>
import LiveCode from "./components/live-code";
import OtherCode from "./components/other-code";
import Icons from "_c/icons";
export default {
  name: "codeManagement",
  components: {
    LiveCode,
    Icons,
    OtherCode
  },
  data() {
    return {
      newLiveData: [], //视讯改变状态之后的数据
      newOtherData: [], //其他平台改变之后的数据
      currentBtn: "live",
      searchKey: {},
      showBtn: true //搜索栏按钮的显示隐藏
    };
  },
  methods: {
    // 保存编辑结果
    statusSave() {
      this.showBtn = !this.showBtn;
      if(this.currentBtn == 'live'){
        this.$refs.liveCode.setNewData(this.newLiveData);
        this.$Message.success('编辑成功')
      }else{
        this.$refs.otherCode.setNewData(this.newOtherData);
      }
    },
    //取消编辑
    cancel() {
      this.showBtn = !this.showBtn;
      if(this.currentBtn == 'live'){
        this.$refs.liveCode.exit()
      }else{
        this.$refs.otherCode.exit()
      }
    },
    getLiveData(val) {
      this.newLiveData = val;
    },
    getOtherData(data) {
      this.newOtherData = data;
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
</style>



