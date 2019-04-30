<template>
  <div class="notice">
    <marquee class="roll-txt">
      <span class="txt">
        {{notice}}
      </span>
    </marquee>
  </div>
</template>

<script>

export default {
  props: ['notice']
}
</script>

<style lang="less" scoped>
  .notice {
    position: absolute;
    right: 20%;
    width: 20%;
    padding: 0;
    .roll-txt {
      display: block;
      .txt {
        color: white;
      }
    }
  }
</style>
