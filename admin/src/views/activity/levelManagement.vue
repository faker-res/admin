<template>
  <div>
    <div class="v2-search bb mb10">
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
    <LiveLevel v-show="currentBtn == 'live'"></LiveLevel>
    <OtherTypeLevel :type="currentBtn" v-show="currentBtn != 'live'"></OtherTypeLevel>
  </div>
</template>
<script>
import LiveLevel from './components/live-level';
import OtherTypeLevel from './components/other-type-level';
export default {
  name: 'levelManagement',
  components: {
    LiveLevel,OtherTypeLevel
  },
  data() {
    return{
      currentBtn: 'live'
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
</style>


