<template>
  <div id="app">
        <router-view/>
  </div>
</template>

<style lang="less">
*{list-style: none;}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family:"Microsoft YaHei",'微软雅黑',"Microsoft JhengHei",'华文细黑','STHeiti','MingLiu';
  // font-family: "Arial", "PingFang SC","微软雅黑","Microsoft YaHei","Microsoft YaHei UI";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666666;
}
</style>
