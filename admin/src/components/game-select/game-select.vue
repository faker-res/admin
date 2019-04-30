<template>
  <div :class="{'ib':inline}">
    <FormItem label="游戏类型">
      <Select v-model="game" @on-change="onGameChange" class="s-100" placeholder="全部" :clearable="clearable">
        <Option v-for="(game,i) in gameList" :value="game.type+':'+i" :key="game.type">{{game.name}}</Option>
      </Select>
    </FormItem>
    <FormItem label="游戏平台" v-if="showPlateform">
      <Select class="s-100" v-model="platform" @on-change="onPlatformChange" v-if="this.gameList[index]" :clearable="clearable" :placeholder="placeholder">
        <Option
          v-for="platform in this.gameList[index].list"
          :value="platform.platform"
          :key="platform.id"
        >{{platform.name}}</Option>
      </Select>
    </FormItem>
  </div>
</template>

<script>
import { getgameClassData } from "@/api/common";
export default {
  props: {
    // 是否显示二游戏平台
    showPlateform: {
      type: Boolean,
      default: true
    },
    // 水平还是垂直排列，默认水平
    inline: {
      type: Boolean,
      default: true
    },
    platforname:{
      type:Object
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      gameList: [],
      index: 0,
      game: "live_casino:0",
      platform: "all"
    };
  },
  created () {
    if(JSON.stringify(this.platforname) != "{}"){
        const {game,platform}=this.platforname
        this.game= game
        this.platform=platform
        this.onGameChange(this.game)
    }
  },
  methods: {
    async init() {
      await getgameClassData().then(res => {
        this.gameList = res.data;
      });
      // this.showPlateform ? this.addPlatformAll() : this.addAll()
    },
    addAll () {
      this.game = 'ALL:0'
      this.gameList.unshift({name: '全部', type: 'ALL'})
    },
    addPlatformAll () {
      this.gameList.forEach(el => el.list.unshift({name: '全部', id: 0, platform: 'all'}))
    },
    onGameChange(game) {
      const [value, index] = game.split(":");
      if (this.showPlateform) this.index = index;
      this.$emit("on-game-change", value);
    },
    onPlatformChange(platform) {
      this.$emit("on-platform-change", platform);
    }
  }
};
</script>
<style lang="less" scoped>
</style>


