<template>
  <div ref="dragable">
    <Row>
        <span class="gameHeader">排序类别</span>
        <Select v-model="typeId" style="width:250px"   label="彩票"  >
              <Option
                v-for="(item,index) in siteGameType"
                :key="index.id"
                :value="item.id"
              >{{item.name}}</Option>
        </Select>       
        <span class="gameHeader" style="">
          <Icons  type="tishi" />
          长按可以拖拽排序
        </span>
        <Button 
          v-if="!isEdit"  
          type="primary" 
          @click="toEdit()" 
          class="w120x fr gameHeader">编辑</Button>
        <!-- <Button v-if="isEdit"  type="primary" @click="toEdit()" class="w120x fr gameHeader">取消编辑</Button> -->
        <Button  
          v-if="isEdit" 
          type="primary" 
          @click="submit()" 
          class="w120x fr gameHeader">保存</Button>
    </Row>
    <!-- 彩票游戏排序 -->
   
    <Row  v-if="isGame"  class="a">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Row ref="gameTypeList" > 
        <draggable 
              element='div' 
              v-show="isGame"   
              class="gameTypeList"  
              :move="onMove"
              @moved ="isEdit" 
              @end="isDragging=true" 
              @start="isDragging=true" 
              :options='options' 
              :list="gameTypeList">
              <Button 
              type="default" 
              style="margin:10px"
              v-for="(item,index) in gameTypeList"
              :key="index"           
              class="w120x gameButton "
              :title="item.title"
              :class="isNavCurrentBtn(item.id) ? 'v2-tag-active1' : ''"
              @click="showList(item)"
              :value="item.id"
              >{{item.name}}
              <Icons size="20"  
                v-model="item.title"  
                v-if="isEdit "  
                :color="item.title ? '#2D8CF0' : '#B1B1B1'"  
                type="bianjijianjie1"   
                class="gameClose bianji"   />
              <Icons 
                :type="item.lock ==!0 ? 'suodingpaixu1' : 'jiesuopaixu'" 
                v-if="item.lock == 1 || isEdit" 
                @click="lockGame(item.id,item.lock)" 
                :color="item.lock ==!0 ? '#CECECE' : '#2D8CF0'" 
                class="gameLock" 
                size="20"></Icons>
              <Input 
                v-model="item.title" 
                @input="changeFunc(item, index)" 
                type="textarea" 
                class="edit" 
                :autosize="{minRows: 1,maxRows: 5}"  
                v-if="isEdit  " 
                placeholder="简介" 
                clearable style="width: 120px" />
              </Button>
        </draggable>   
      </Row>
      <Card class="gameList scoll" ref="gameList"  v-if="isGameList" >
        <span class="gameHeader" style="">
          <Icons  type="tishi" />
          长按可以拖拽排序
        </span>
        <draggable 
          element='div' 
          v-if="showGameList"  
          class="mt10 "  
          :options='options2'  
          :move="onMove" 
          @end="isDragging=true" 
          @moved ="isEdit" 
          @start="isDragging=true" 
          :list="gameList" >
          <Button 
          type="default" 
          style="margin:10px"
          v-for="(item,index) in gameList"
          :key="index"  
          class="w120x gameButton hideOverflow"
          :title="item.name"
          :value="item.id"
           >{{item.name}}
          </Button>
        </draggable>
      </Card>
      <Row v-if="!spinShow">
        <Col class="gameBottom" style="">
            <Icons  type="tishi" />
                锁定后，排序不会因用户习惯发生变化
        </Col>
      </Row>
    </Row>
    <!-- 导航排序 非彩票游戏List  可以克隆且上方非彩票游戏不可有重复数据 -->
    <Row  v-if="!isGame"  class="a">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Row ref="gameTypeList">
        <draggable 
            element='div'  
            class="mt10 list-group-item" 
            :move="onMove"
            :options ="{group:'people',disabled:!isEdit}"
            @end="isDragging=false" 
            @moved ="isEdit" 
            @start="isDragging=true" 
            :list="allGameList" >
            <Button 
            type="default" 
            style="margin:10px"
            v-for="(item,index) in allGameList"
            :key="index"  
            class=" gameButton "
            :class="isNavCurrentBtn(item.id) ? 'v2-tag-active1' : ''"
            :title="item.name"
            :value="item.id">
            {{item.name}}
              <Icon
              size="18"  
              v-if="isEdit   "  
              class="close"
              style="border:1px #CECECE " 
              @click="remove(item.id,item.name,index)" 
              type="md-close"/>
            <!-- </span> -->

            </Button>
        </draggable>
      </Row> 
      <Card class="gameList" ref="gameList" v-if="showGameList" >
        <span class="gameHeader" style="">
           <Icons  type="tishi" />
          下方可以拖动到上方排序,该列表仅做克隆不做排序
        </span>
        <draggable 
              element='div'
              class="gameTypeList"
              :move="onMove"
              @moved ="isEdit"
              @end="isDragging=true" 
              @start="isDragging=true" 
              :list="allGameTypeList"
              :sort="false"
              :options="{filter: '.disabled,.disable-button',group:{ name: 'people', pull: 'clone', put: false },disabled:!isEdit}"
              >
              <Tag               
                v-for="(item, index) in allGameTypeList"
                :class="[isNavCurrentTag(item.id) ? 'v2-tag-active' : '', 
                allGameList.find(
                  game => game.id === item.id
                ) ? 'disable-button' :'']  "
                :key="index"
                @click.native="showAllList(item.id)"
              >{{item.name}}
             </Tag>
        </draggable>
      <!-- 二级菜单 -->
        <draggable element='div'
              class="gameTypeList"
              :move="onMove"
              @moved ="isEdit"
              @end="isDragging=true" 
              @start="isDragging=true" 
              :list="navGameTypeList"
              :sort="false"
              :options="{filter: '.disabled',group:{ name: 'people', pull: 'clone', put: false },disabled:!isEdit}"
              >
              <Button 
              type="default" 
              style="margin:10px"
              v-for="(item,index) in navGameTypeList"
              :key="index"
              :class="[{disabled: allGameList.find(game => game.id === item.id)},isNavCurrentBtn1(item.id) ? 'v2-tag-active1' : '']"
              @click="showNavAllList(item)" 
                          
              class="w120x gameButton"
              :value="item.id"            
              >{{item.name}}          
              </Button>
        </draggable>
        <Card v-if="isNavGameList  "  class="gameList isgerry">
          <draggable element='div'
                class="gameTypeList list-group-item "
                :move="onMove"
                :options="{filter: '.disabled',disabled:!isEdit}"
                @moved ="isEdit" 
                @end="isDragging=true" 
                @start="isDragging=true" 
                :list="navGameList"
                :group="{ name: 'people', pull: 'clone', put: false }"
                :sort="false"
                >
                <Button 
                type="default" 
                style="margin:10px"
                v-for="(item,index) in navGameList"
                :key="index"
                class="w120x gameButton hideOverflow"
                :class="{disabled: allGameList.find(game => game.id === item.id)}"
                :value="item.id"
                >{{item.name}} 
                </Button>
          </draggable>
        </Card>
      </Card>
      <Row v-if="!spinShow">
        <Col class="gameBottom" style="">
            <Icons  type="tishi" />
                锁定后，排序不会因用户习惯发生变化
        </Col>
      </Row>
    </Row>

  </div>
</template>
<script>
import Icons from "@/components/icons";
import draggable from 'vuedraggable'
import {  Spin } from 'iview';
import {
  systemSiteGameUp,
  systemSiteGameList,
} from "@/api/system";
import { log } from 'util';
export default {
  // mixins: [mixins],
  name:'gameSort',
  watch: {
    'typeId': {
      handler(newTypeId, oldTypeId) {
        if(newTypeId == oldTypeId) return
        this.gameTypeList = []
        this.isEdit = false
        this.toChangeDisabled(true)
        this.resetList(newTypeId)
        this.isGame = this.gameId.indexOf(newTypeId)!==-1 ? true : (this.navGationId.indexOf(newTypeId)!==-1 ? false : undefined )          
        if(this.siteGameList[newTypeId] == undefined || newTypeId == '99999' || this.siteGameList[newTypeId][0] == null || this.siteGameList[newTypeId] == null) return this.allGameList = []
        this.gameList = []

        if( typeof (this.siteGameList[newTypeId][0].list) == Array) {
         this.gameList = this.siteGameList[newTypeId][0].list[0]
        } 
        if(!this.isGame) {
          this.allGameList = []
          this.allGameList = this.siteGameList[newTypeId]
          console.log(this.allGameList);
          
          // this.clickId = this.allGameList.length > 0 ? this.allGameList[0].id :0
        } 
        
        this.gameTypeList = newTypeId < 10006
        ? this.siteGameList[newTypeId][0].list.filter( i => i.id !== 88888 )
        :this.toArray( this.siteGameList[newTypeId])
        this.isGame ? this.showList(this.siteGameList[newTypeId]['0'].list['0']) : this.showAllList(10000)
      },
      deep: true
    },
    isDragging (newValue, oldValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    },
  },
  data() {
    return {
      gameId: [10000,10001,10002,10003,10004,10005,10006],
      navGationId: [20001,20002,30001,30002,99999],
      isEdit: false,//是否为编辑状态
      spinShow: true, //加载效果
      isClose: false,
      editable: true,
      is: true,
      allGameList:[],
      k3Obj:{
        id:10011,
        name:'手机端快3侧边栏',
        },
      allObj: {
        id:88888,
        name:'所有端彩票侧边栏',
      },
      clickNavId:10000,
      isNavGameList:true,
      isGameList:true,
      list1:[],
      list:[],
      allGameTypeList:[],
      allGame:[],//全部游戏
      k3Game:[],
      isGame: true,
      isDragging: false,
      delayedDragging: false,
      siteGameList:{},//游戏所有
      siteGameType:[],//游戏2大类
      listCfig:[],//游戏配置显示删除，锁等
      // gameType:[],
      gameTypeList:[
      ],//暂存游戏2大类
      navGameTypeList:[],
      gameSonList:[],//暂存游戏2大类
      list:[],
      showGameList:false,
      typeId:null,
      gameList:[
      ],//重置游戏 2大类
      navGameList:[],
      newFormGameList:[],
      formGameList:[
      ],
      clickId:88888,
      clickId1:0,
      clickId2:0,
      options:{
        animation: 150,
        disabled: true,
        ghostClass: 'opacity:1',
      },
      options1:{
        animation: 150,
        disabled: true,
        ghostClass: 'opacity:1',
      },
      options2:{
        animation: 150,
        disabled: true,
        ghostClass: 'opacity:1',        
      },
      navOptions:{
        animation: 150,
        disabled: true,
        ghostClass: 'opacity:1',
      },    
      //暂存提交表单游戏列表
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    //编辑
    changeFunc(item, index) {
      return item
    },
    toEdit() {
      this.isEdit = true
      this.toChangeDisabled(false)
    },
    isCurrentTag(item) {
      return item == this.clickId ? true : false
    },
    isNavCurrentBtn(item) {
      return item == this.clickId ? true : false
    },


    isNavCurrentBtn1(item) { 
      return item == this.clickId1 ? true : false
    },
    isNavCurrentTag(item) {
      return item == this.clickNavId ? true : false
    },
    lockGame(id,lock) {
      if(!isEdit) return false
      for(let i =0 ; i<this.gameTypeList.length ;i++) {
           if(this.gameTypeList[i].id == id){
             this.$set(this.gameTypeList[i],'lock',(lock== 0) ? 1 : 0) 
          }
      }
    },
    //处理彩票类的游戏
    getLotteryGame(data) {
    this.gameTypeList = Object.keys(data.list).map(function (tz) { 
        return data.list[tz]
    })
    },
    // 取出类别 游戏
    // getComponentData() {
    //   return {
    //     on: {
    //       change: this.handleChange,
    //       input: this.inputChanged
    //     },
    //     attrs:{
    //       wrap: false
    //     },
    //     props: {
    //       value: this.activeNames
    //     }
    //   };
    // },
    //重置当前list 配置
    resetList(newTypeId) {
        this.listCfig = {}
        //重置当前list 配置 
        this.listCfig = this.siteGameType.filter( i => i.id === newTypeId )
    },
    //拖动时的对象
    handleChange(item) {  
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    //获取游戏列表数据
    getData() {
      this.$root.startTableLoading(this)
      const data = {
        siteId: this.$root.nowSite.id,
      };
      systemSiteGameList(data).then(res => {
        if(res === undefined) return false
        this.siteGameType = [] 
        this.siteGameList = {}   
        let gameType = res.data.siteGameType
        let gameList = res.data.siteGameList
        this.formGameList = res.data.siteGameList 
        this.siteGameList = res.data.siteGameList
        // let k3obj = {
        //   list: this.siteGameList['10000'][0].list,
        // }
        for (var key in gameType) {
          //小于10005 1.提交的数据为当前id的改变完的所有数据。2.没有删除按钮 3.有锁状态 4 子类只能在当前父id 中拖拽 5 没有title按钮 简介可编辑
          let isGame =  key > 10005 ? false : true       
          //配置列表              
          if(Number(key) == undefined) return
          let obj = {
            id:Number(key),
            name:gameType[key],
          }       
          this.siteGameType.push(obj) 
          // if(isGame) {
          // this.allGameTypeList.push(obj)
          // }
        }    
        // this.siteGameType.push(this.k3Obj)
        // this.siteGameType.push(this.allObj)
        //把全部游戏提取出来
        this.getNavTypeList(gameList)
        this.siteGameList['10000']['0'].list.forEach(i => {
          if(i.id === 88888) {
             this.allGame = []
             this.allGame.push(i)
          }
          else
          if(i.id === 10011) {
            this.k3Game = []
            this.k3Game.push(i) 
          }      
        })
        this.siteGameList['88888'] = this.allGame
        this.siteGameList['10011'] = this.k3Game
        this.typeId = 10000  
        this.spinShow = false    
      });
    },
    getNavTypeList(gameList) {     
      for (var key in  gameList) {
        //小于10005 1.提交的数据为当前id的改变完的所有数据。2.没有删除按钮 3.有锁状态 4 子类只能在当前父id 中拖拽 5 没有title按钮 简介可编辑
        let isGame =  key > 10005 ? false : true       
        //配置列表 
        if(!isGame) return false
        if(Number(key) == undefined ) return false
        let obj = {
          id:Number(key),
          bid:gameList[key][0].bid,
          level:gameList[key][0].level,
          list:gameList[key][0].list,
          lock:gameList[key][0].lock,
          name:gameList[key][0].name,
          
        }   
        if(isGame) {
        this.allGameTypeList.push(obj)
        }        
      }
    },
    submit() {
      //提交过滤     
      if(!this.siteGameList[this.typeId] || this.siteGameList[this.typeId] == undefined) return
      this.newFormGameList  = this.isGame ? [...this.gameTypeList] : [...this.allGameList]
      if(this.listCfig[0].id === 10000) {
         this.newFormGameList =[...this.newFormGameList, ...this.allGame]
      }

      if(!this.isGame) {
        if(this.newFormGameList.length === 0)  return false 
        this.newFormGameList = this.newFormGameList.map(i=>{        
          return  {
            bid:i.bid,
            id:i.id,
            level:i.level,
            name:i.name,
            title:i.title?i.title:'' ,
          }
        })  
      }
      const data = {
        siteId: this.$root.nowSite.id , 
        type:this.listCfig[0].id ,
        json: 
          this.isGame
          ? JSON.stringify([{
          id: this.siteGameList[this.typeId][0].id,
          name:this.siteGameList[this.typeId][0].name,
          level:this.siteGameList[this.typeId][0].level,
          lock:this.siteGameList[this.typeId][0].lock,
          bid:this.siteGameList[this.typeId][0].bid,
          list:this.typeId===10000?[...this.newFormGameList]: [...new Set(this.newFormGameList)]
          }])
          :JSON.stringify(
            this.newFormGameList
          ),
      }
      systemSiteGameUp(data).then(res => {
        this.isEdit = false 
        this.toChangeDisabled(true)
      })
    },
    //删除列表
    toChangeDisabled(type) {
        this.options.disabled = type
        this.options1.disabled = type
        this.options2.disabled = type
        this.navOptions.disabled = type 
    },
    remove(id,levelName,dataIndex) {
      let text, msg;
      text = `您确定删除${levelName}吗？`;
      msg = `删除成功${levelName}`;
      this.$Tip.confirm({
        content: text,
        onOk: () => {
            //去掉列表中的游戏分类           
            this.allGameList = this.allGameList.filter( i => i.id !== id )
            //去掉要保存的游戏列表
        }
      });     
    },
    // 去重
    //显示游戏3大类
    showAllList(id) {
      //重置当前游戏3大类，重置当前选中游戏大类id

      
        this.navGameTypeList = []
        this.clickNavId = id         
        if(this.siteGameList[id] == undefined || id == '99999' || this.siteGameList[id][0] == null || this.siteGameList[id] == null) return
        this.navGameList = []
        this.navGameTypeList = id < 10006
        ? this.siteGameList[id][0].list.filter( i => i.id !== 88888 )
        :this.toArray( this.siteGameList[id])    
        this.navGameList = this.navGameTypeList[0].list ? this.navGameTypeList[0].list : []        
        this.isNavGameList = this.navGameList.length === 0 ? false : true
        this.clickId1 = this.navGameList.length > 0 ? this.navGameList[0].id : 0
        
    },
    showNavAllList(data) {

      this.clickId1 = data.id
        if(data.list) {
          this.navGameList = data.list
        }
    },
    showList(data) {
      //重置当前游戏3大类，重置当前选中游戏大类id
      if(!data.list || data.list.length == 0){
          this.isGameList = false
          this.clickId = data.id
      } 
      else {
          this.isGameList = true
          this.showGameList = true
          this.gameList = data.list
          this.clickId = data.id
          console.log(data.id);
          
          this.clickId1 = data.list[0].id
                    
      }

    },
   // 对象变数组
    toArray(data) {
      var arr = []
        for (let key in data) { 
          arr.push(data[key])       
        }
      return arr     
    },
    //拖动后改变位置
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
  },
  components:{
    draggable,
    Icons,
  },
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.gameHeader{
  margin:0 15px
}
.gameBottom{
    top: 20px;
    left: 20px;
}
.gameNav{
  border-radius:0
}
.ivu-upload-drag{
  height: 50px;
  margin-top: 20px;
}
.isgerry{
  background-color: #F6F6F8;
  max-height: 400px;
}
.gameButton{
  position: relative;
  min-width: 120px;
  text-overflow: "…"!important;
}

.scoll{
  max-height: 500px;
}

.disable-button{
cursor:not-allowed !important;
    color: #c5c8ce;
    background-color: #f7f7f7;
    border-color: #dcdcdc;
}
.a {
  position: relative;
}
.hideOverflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
// .gameButton:hover .edit{
//   bottom: -35px;
//   left: -1px;
//   opacity: 1;
// }
.gameClose{
  position: absolute;
  top: -14px;
  right: 15px;
}
.close{
  position: absolute;
  background-color: #F6F6F8;
  border-radius: 50%;
  border:1px #CECECE;
  top: -8px;
  right: -6px;
  color: #CCCCCC;
}
.ivu-icon-md-close{
  border: 1px solid #CCCCCC !important
}
.close:hover { 
  color:#2D8CF0;
}
.gameLock{
  position: absolute;
  top: -14px;
  right: -8px;
}
.edit{
  transition: all .3s; 
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 700;

}
.gameList{
  overflow-y: scroll;
  padding-bottom: 25px;
  margin-top: 30px
}
.gameButton:hover .edit{
  bottom: -35px;
  left: -1px;
  opacity: 1;
}
@active: #2D8CF0;
@icon-close-border: #CECECE;
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
width: 20px;
border-radius:10px;
background:#2D8CF0;
}
.nav-body {
  width: 100%;
  padding: 1px 4px 0;
  height: ~"calc(100% - 1px)";
  display: inline-block;
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
  margin: 0 1px; 
  background-color: #fff !important;
  // font-size: 18px;

}
/deep/.v2-tag-active1{
  box-shadow: 0 0 0 1px #2D8CF0 !important;
  color: #2D8CF0 !important;
}
  
</style>