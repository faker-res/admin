<template>
  <div>
    <Form :model="imgInfor">
      <FormItem label="终端:" >
        <CheckboxGroup @on-change="checkAllGroupChange" v-model="imgInfor.newclient_type">
          <Checkbox label="pc" :disabled="showpc"></Checkbox>
          <Checkbox label="h5" :disabled="showphone"></Checkbox>
          <Checkbox label="android" :disabled="showphone"></Checkbox>
          <Checkbox label="ios" :disabled="showphone"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem>
        <table class="ivu-table bt bl br w100" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th class="w5 ivu-table-column-center br">排序</th>
              <th class="w20 ivu-table-column-center br">标题</th>
              <th class="w20 ivu-table-column-center br">跳转地址</th>
              <th class="w20 ivu-table-column-center br">时间选择</th>
              <th class="w20 ivu-table-column-center br">图片</th>
              <th class="w5 ivu-table-column-center br">状态</th>
              <th class="w10 ivu-table-column-center">操作</th>
            </tr>
          </thead>
          <tbody ref="list" v-if="tbodyShow">
            <tr v-for="(item,index) in carouselList" :key="'item'+index">
              <td class="w5 ivu-table-column-center br">
                <Icons type="paixukongjian" color="#dadada" size="20"/>
              </td>
              <td class="w20 ivu-table-column-center br">
                <Input class="w310x" v-model="item.title" :key="'title'+index" :disabled="item.edit"/>
              </td>
              <td class="w20 ivu-table-column-center br">
                <FormItem :key="'foward_type'+index">
                  <Select v-model="item.foward_type" transfer class="w310x pt15" :disabled="item.edit">
                    <Option
                      v-for="(t,i) in item.options"
                      :key="'options1'+i"
                      :value="t.value"
                    >{{t.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem v-show="item.foward_type=='1'">
                  <Input v-model="item.target" class="w310x" :disabled="item.edit"/>
                </FormItem>
              </td>
              <td class="w20 ivu-table-column-center br">
                <FormItem>
                  <Select
                    v-model="item.online_type"
                    :disabled="item.edit"
                    transfer
                    class="w310x pt15"
                    :key="'online_type'+index"
                  >
                    <Option
                      v-for="(t,i) in item.options2"
                      :key="'options2'+i"
                      :value="t.value"
                    >{{t.name}}</Option>
                  </Select>
                </FormItem>
                <div v-if="item.online_type=='1'" class="pb10">
                  <DatePicker
                    :key="'date1'+index"
                    type="date"
                    placeholder="开始时间"
                    :disabled="item.edit"
                    class="w130x"
                    v-model="item.Time[0]"
                    :options="options3"
                    transfer
                  ></DatePicker>
                  <span class="ml10 mr10">——</span>
                  <DatePicker
                    :key="'date2'+index"
                    type="date"
                    :disabled="item.edit"
                    placeholder="结束时间"
                    class="w130x"
                    v-model="item.Time[1]"
                    :options="options3"
                    transfer
                  ></DatePicker>
                </div>
              </td>
              <td class="w20 ivu-table-column-center br">
                <div class="center">
                  <div class="demo-upload-list">
                    <template v-if="item.newstatus == 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress :percent="item.percentage" hide-info></Progress>
                    </template>
                  </div>
                  <Upload
                    :key="'upload'+index"
                    ref="upload"
                    :disabled="item.edit"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :headers="uploadForm.headers"
                    :action="uploadForm.action"
                    :data="uploadForm.data"
                    :name="uploadForm.name"
                    :on-success="(res)=>{ onUploadSuccess(res,item) }"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    class="ib w58x"
                    multiple
                    type="drag"
                  >
                    <div class="w58x">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                    <!-- <Button icon="ios-cloud-upload-outline">上传图片</Button> -->
                  </Upload>
                  <Modal title="图片预览" :key="'modal'+index" v-model="visible">
                     <img :src="item.url" v-if="visible" class="w100">
                  </Modal>
                </div>
              </td>
               <td class="w5 ivu-table-column-center br">
                  <Switch size="large" v-model="item.status" :disabled="item.edit">
                     <span slot="open">开启</span>
                     <span slot="close">关闭</span>
                  </Switch>
                 <!-- <Icons type="paixukongjian" color="#dadada" size="20"/> -->
              </td>
              <td class="w10 ivu-table-column-center" :key="'handle'+index">
                <Button size="small" @click="changedit(item)" 
                  v-if="($route.params.page == 'edit' && showedit) ||  ((adminType == 'super') || (authInPage.indexOf('slideImgInfoUpt')) != -1)"
                >{{item.edit ? "编辑":"确定"}}</Button>
                <Button size="small" v-if="!item.edit && item.del" @click="changDetail(index)">取消</Button>
                <Button size="small" @click="deleteCarousel(index)" v-if="item.edit||!item.del">删除</Button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7">
                <Button long class="button" @click="addCarouselItem">添加轮播图</Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </FormItem>
    </Form>
    <div class="flex-row">
      <Button type="primary" class="w140x ft18" @click="submit">确认保存</Button>
    </div>
  </div>
</template>
<script>
import Icons from "_c/icons";
import Tables from "_c/tables";
import { slideIns, slideImgInfo, slideImgInfoUpt } from "@/api/system";
import Sortable from "sortablejs";
import ViewImg from "./../components/ViewImg";
import Modals from "@/components/modals";
import { uploadImg } from "@/api/common";
import { getUserName } from "@/libs/util";
import { getToken, getUserType } from "@/libs/util";
import { mapState } from "vuex";
import { setTimeout } from "timers";
import { constants } from 'fs';
export default {
  name: "lunboEdit",
  components: {
    Tables,
    Icons,
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      tbodyShow: true,
      defaultList: [],
      imgName: "",
      showedit:true,
      visible: false,
      uploadList: [],
      uploadForm: {
        headers: { Authorization: getToken() },
        action: "/api/v2/uploadImg",
        data: { siteId: "" },
        name: "img",
        defaultList: [],
        path: "",
        src: ""
      },
       options3: {
        disabledDate:date=> {
         return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      isModify: -1,
      showpc: false,
      showphone: false,
      carouselList: [],
      oldcarouseList:[],
      Time: [],
      imgInfor: {
        newclient_type: []
      }
    };
  },
  created() {
    if (this.$route.params.page == "edit") {
      const { siteId, promotionId } = this.$route.query;
      this.ondeatail({ siteId, promotionId });
    }
    if(this.$route.params.page == "create"){
       this.addCarouselItem()
    }
    this.sortInit();
    this.uploadForm.data.siteId = this.$root.nowSite.id;
  },
  methods: {
    sortInit() {
      this.tbodyShow = true;
      this.$nextTick(() => {
        let el = this.$refs.list;
        let that = this;
        Sortable.create(el, {
          onEnd: that.endFunc
        });
      });
    },
    endFunc(e) {
      let _carouselList = [...this.carouselList];
      let movedRow = _carouselList[e.oldIndex];
      let targetRow = _carouselList[e.newIndex];
      _carouselList.splice(e.oldIndex, 1);
      _carouselList.splice(e.newIndex, 0, movedRow);
      this.carouselList = [];
      this.carouselList = [..._carouselList];
      setTimeout(() => {
        this.tbodyShow = false;
      }, 10);
      setTimeout(() => {
        this.sortInit();
      }, 30);
    },
    changedit(item){
       this.showedit=false
       item.edit=!item.edit
       this.showedit=true
    },
    checkAllGroupChange(res) {
      if (this.imgInfor.newclient_type.length != 0) {
        let haslock = this.imgInfor.newclient_type.some(item => item == "pc");
        if (haslock) {
          this.showpc = false;
          this.showphone = true;
        } else {
          this.showpc = true;
          this.showphone = false;
        }
      } else {
        this.showpc = false;
        this.showphone = false;
      }
    },
    submit() {
      if (this.$route.params.page == "create") {
        let body = [];
        this.carouselList.forEach(item => {
          let obj = {};
          obj.title = item.title;
          obj.status = item.status==false ?"no":"yes"
          obj.foward_type = item.foward_type;
          if (obj.foward_type == "1") {
            obj.target = item.target;
          }else{
            obj.target="#"
          }
          obj.online_type = item.online_type;
          if (obj.online_type == "1") {
            obj.publish_at = this.$root.formatTime(item.Time[0]);
            obj.offline_at = this.$root.formatnightTimeS(item.Time[1]);
          }
          obj.img = item.image;
          body.push(obj);
        });
        if (!this.imgInfor.newclient_type.length) {
          this.$Message.error("请选择终端");
          return false;
        }
        var mess = false;
        if (body.length > 0) {
          body.forEach(item => {
            if (item.img== "" || item.title == "") {
              mess = true;
              return false;
            }
          });
        } else {
          this.$Message.error("请填写轮播信息");
          return false;
        }
        if (mess) {
          this.$Message.error("请填写轮播信息");
          return false;
        }
        const params = {};
        params.body = JSON.stringify(body);
        params.siteId = this.$root.nowSite.id;
        params.bodyFormatType = "JSON";
        if (this.imgInfor.newclient_type.length > 1)
          params.clientType = this.imgInfor.newclient_type.join(",");
        else params.clientType = this.imgInfor.newclient_type[0];
        slideIns(params).then(res => {
          this.$router.go(-1);
        });
      }
      if (this.$route.params.page == "edit") {
        let body = [];
        this.carouselList.forEach(item => {
          let obj = {};
          obj.title = item.title;
           obj.status = item.status==false ?"no":"yes"
          obj.foward_type = item.foward_type;
          if (obj.foward_type == "1") {
            obj.target = item.target;
          }else{
            obj.target="#"
          }
          obj.online_type = item.online_type;
          if (obj.online_type == "1") {
            obj.publish_at = this.$root.formatTime(item.Time[0]);
            obj.offline_at = this.$root.formatnightTimeS(item.Time[1]);
          }
          obj.img = item.image;
          body.push(obj);
        });
        var mess = false;
        if (body.length > 0) {
          body.forEach(item => {
            if (item.img == "" || item.title == "") {
              mess = true;
              return false;
            }
          });
        } else {
          this.$Message.error("请填写轮播信息");
          return false;
        }
        if (mess) {
          this.$Message.error("请填写轮播信息");
          return false;
        }
        const params = {};
        params.body = JSON.stringify(body);
        params.siteId = this.$root.nowSite.id;
        params.promotionId = this.$route.query.promotionId;

        slideImgInfoUpt(params).then(res => {
          this.$router.go(-1);
        });
      }
    },
    deleteCarousel(index) {
      let msg = "删除成功";
      this.$Tip.confirm({
        content: `你确定要删除吗？`,
        onOk: () => {
          this.carouselList.splice(index, 1);
        }
      });
    },
    changDetail(index){
        this.tbodyShow = false;
        this.carouselList[index]=Object.assign({},this.oldcarouseList[index])
        setTimeout(()=>{
          this.tbodyShow = true;
        },10)
    },
    ondeatail(data) {
      slideImgInfo(data).then(res => {
        const { body, clientType } = res.data;
        JSON.parse(body).forEach(t => {
          let obj = {
            id: "",
            actionType: "",
            edit:true,
            del:true,
            status:t.status=="no"? false :true,
            image: t.img,
            target: "",
            title: t.title,
            foward_type: t.foward_type,
            target: t.target,
            url: t.img,
            online_type: t.online_type,
            Time: [t.offline_at, t.publish_at],
            newstatus: "finished",
            options: [
              { name: "自定义", value: "1" },
              { name: "真人视讯", value: "2" },
              { name: "彩票游戏", value: "3" },
              { name: "棋牌游戏", value: "4" },
              { name: "电子游艺", value: "5" },
              { name: "体育投注", value: "6" },
              { name: "捕鱼达人", value: "7" },
              { name: "优惠活动", value: "8" }
            ],
            options2: [
              { name: "自定义上线", value: "1" },
              { name: "即时上线", value: "2" }
            ]
          };
          this.carouselList.push(obj);
          this.oldcarouseList = JSON.parse(JSON.stringify(this.carouselList))
        });
        if (clientType.length == 1)
          this.imgInfor.newclient_type.push(clientType);
        else
          clientType.split(",").map(item => {
            this.imgInfor.newclient_type.push(item);
          });
        this.showpc = true;
        this.showphone = true;
      });
    },
    //添加轮播图
    addCarouselItem() {
      let obj = {
        id: "",
        actionType: "",
        image: "",
        target: "",
        title: "",
        status:false,
        foward_type: "",
        target: "",
        online_type: "",
        url: "",
        Time: [],
        newstatus: "statr",
        options: [
          { name: "自定义", value: "1" },
          { name: "真人视讯", value: "2" },
          { name: "彩票游戏", value: "3" },
          { name: "棋牌游戏", value: "4" },
          { name: "电子游艺", value: "5" },
          { name: "体育投注", value: "6" },
          { name: "捕鱼达人", value: "7" },
          { name: "优惠活动", value: "8" }
        ],
        options2: [
          { name: "自定义上线", value: "1" },
          { name: "即时上线", value: "2" }
        ]
      };
      if(this.$route.params.page == "edit"){
           obj.edit=false
           obj.del=false
        } 
        
        
      let _carouselList = [...this.carouselList];
      _carouselList.push(obj);
      this.carouselList = [];
      this.carouselList = [..._carouselList];
      this.isModify = this.carouselList.length - 1;
    },
    deleteCarouselItem(index) {
      this.carouselList.splice(index, 1);
    },
    onUploadSuccess(res, item) {
      const { path, src, host } = res.data;
      if (path) {
        item.newstatus = "finished";
        item.url = `${host}/${src}`;
        item.image = path;
      }
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      file.newstatus = "start";
      file.url = "";
      file.image = "";
    },
    handleFormatError(file) {
       this.$Tip.info({ content: "请上传图片"});
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    }
  }
};
</script>
<style  lang="less" scoped >


.w58x {
  width: 58px;
  height: 58px;
  line-height: 58px;
}
.img {
  width: 180px;
  height: 60px;
  line-height: 60px;
  color: #666666;
  border: 1px solid #dfdfdf;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.upLoadImg {
  width: 100%;
  margin: auto;
  color: #62b1fd;
  background: #f5faff;
  text-align: center;
  cursor: pointer;
}
.button {
  height: 47px;
  background-color: #f5faff;
  border: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>