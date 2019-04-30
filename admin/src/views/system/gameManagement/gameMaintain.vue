<template>
  <div>
    <Row v-if="isLoding">
      <Tag 
        v-for="(item, index) in gameMaintainList" 
        :class="isCurrentTag(item.id) ? 'v2-tag-active' : ''"
        :key="index"
        :name="item.name"
        :data-route-item="item"
        @on-close="remove(item.id,item.name,index)"
        @click.native="showList(item)"
      >{{item.name}}
        <!-- <span class="maintain" v-if="item.status === 'no'" >维护</span>   -->
      </Tag>
        <!-- <Icons size="15"  type="danchuangguanbi"   /> -->
        <Button  style="margin-left:10px ;" @click="maintain()"  type="info" ghost icon="ios-build">全挂维护 </Button>
    </Row>
    <Row class="gameRow">
      <Col

        span="4"
        v-for="(item, index) in gameList"
        :key="index"
        class="gameMaintain"
        :name="item.name"
        :data-route-item="item"
      >
      {{item.name}}
        <Switch @on-change="change(item.id,item.status,item.name)" v-model="item.status" size="large">
          <span slot="open" >正常</span>
          <span slot="close">维护</span>
        </Switch>
      </Col>
    </Row>

  </div>
</template>
<script>
import Icons from "@/components/icons";
import {
  gameConfigClassification,
  gameConfigUpGameStatus,
} from "@/api/system";
export default {
  name: "gameMaintain",
  data() {
    return {
      gameMaintainList:[

      ],
      sitegameMaintainList:{},
      gameList:[],
      isLoding:true,
      switch1: false,
      clickId : 10000,
      formData:{},
    };
  },
  created() {
    this.getData()
  },
  methods:{
    //获取游戏列表数据
    getData() {
      this.$root.startTableLoading(this)
      const data = {
        platform :'sport',
      };
      gameConfigClassification(data).then(res => { 
        this.gameMaintainList = res.data
        this.sitegameMaintainList = {}
        for (var key in this.gameMaintainList) {     
          return key == 0 ? this.showList( this.gameMaintainList[0]) : false 
        }    
      });

    },
    isCurrentTag(item) {
      return item == this.clickId ? true : false
    },
    remove() {

    },
    maintain() {
      if(this.formData === {}) return
      const data = {
        id: this.formData.id, 
        status: this.formData.status == 'yes' ? 'no' :'yes',
        name:this.formData.name
      }
      this.$Tip.confirm({
        content: "您确定要全挂维护" + '('+this.formData.name +')' +'吗',
        onOk: () => {
          gameConfigUpGameStatus(data).then(res => {
            if(!res ||res.code !== 200  ) return  this.ruter(data)
          })
        },
      })
    },
    showList(data){
      this.clickId = data.id
      this.formData = data 
      this.gameList = data.list.map(i=>{
        return {
          id:i.id,
          name:i.name,
          status:i.status === 'yes'? true:false
        }
      })
    },
    change (id,status,name) {
      const data = {
        id: id, 
        status:status == true ? 'yes' :'no',
      }
      this.$Tip.confirm({
        content: "您确定要维护" +name +'吗',
        onOk: () => {
          gameConfigUpGameStatus(data).then(res => {
            if(!res ||res.code !== 200  ) return  this.ruter(data)
          })
        },
      })
    },
    ruter(data) {
     this.gameList = this.gameList.map(i=>{  
        let obj = {
          id:i.id,
          name:i.name,
          status:i.status
        }
        if(i.id === data.id){
          obj.status = data.status == 'yes' ? false : true
        } 
        return obj 
      })
  }
  },
  components:{
    Icons,
  },
};
</script>
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.gameRow{
   margin:0 10px ;
}
.gameMaintain{
    border: 1px solid #E4E4E4;
    padding: 0;
    margin: 10px 0;
    line-height: 76px;
    width:150px;
    height:76px;
    border-radius:0 ;
    text-align: center
}
.gameHeader{
  margin:0 15px
}
.gameNav{
  border-radius:0
}
.gameButton{
  position: relative;
}
.gameClose{
  position: absolute;
  top: -8px;
  right: -8px;
}
.gameLock{
  
  position: absolute;
  bottom: -8px;
  right: -8px;
}
.gameMaintain:not(:first-child){
  border-left: none ;
}
.gameMaintain:nth-child(0){
  border-left: 1px #eaeaea; 
}
// .maintain{
//   position: absolute;
//   border: 1px solid #FF0000;
// }
@active: #2D8CF0;
@icon-close-border: #CECECE;
    .nav-body {
      padding: 1px 4px 0;
      height: ~"calc(100% - 1px)";
      display: inline-block;
      overflow-x: visible;
      white-space: nowrap;
      transition: left .3s ease;
      .ivu-tag-dot-inner {
        transition: background .2s ease;
      }
    }
    /deep/.ivu-tag {
      // border:none;
      border-left:none;
      padding: 0;
      margin: 10px 0;
      width: 139px;
      height: 39px;
      overflow: hidden;
      line-height: 39px;
    }
    /deep/.ivu-tag:nth-child(1){
      border-left:1px solid #eaeaea;
    }
    /deep/.v2-tag-active {
      // border-right: 1px solid #eaeaea;
      border-top: 2px solid @active;
      background: #fff;
      margin: 0 1px; 
      // font-size: 18px;

    }
    /deep/.ivu-tag:nth-child(1){
      border-left:1px solid #eaeaea;
    }
  
</style>