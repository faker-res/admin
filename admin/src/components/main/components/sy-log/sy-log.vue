<template>
  <div class="sy-log" @click="() => {$router.push({ name: 'mail'})}">
    <Badge :count="messageCount">
        <Icons @click.native="openErrorLoggerPage" type="daohanglanxinxi" size="32" color="#ccc"></Icons>
    </Badge>
    <!-- <Badge dot>
        <Icons @click.native="openErrorLoggerPage" type="daohanglangonggao" size="32" color="#ccc"></Icons>
    </Badge> -->
  </div>
</template>

<script>
import Icons from "@/components/icons";
export default {
  name: "syLog",
  props: ['messageCount'],
  components: { Icons },
  methods: {
    openErrorLoggerPage() {
      // this.$router.push({
      //   name: "error_logger_page"
      // });
    }
  }
};
</script>

<style lang="less">
.sy-log {
  width: 65px;
  display: flex;
  justify-content: space-around;
  margin-right: 12px;
  .ivu-badge-dot {
    top: 7px;
  }
}
// .ivu-badge-count{
//   top: 7px!important;
// }
</style>
