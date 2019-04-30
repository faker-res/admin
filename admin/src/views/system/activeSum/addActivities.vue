<template>
   <div class="v2-search" :key="$route.meta.title">
    <Form ref="formKey" :model="formKey" :rules="rules">
      <div class="mb20">
        <FormItem>
          <span class="ml10">活动类型</span>
          <Select v-model="formKey.activity_type" class="w110x ml20">
            <Option value="normal_activity">常规活动</Option>
            <Option value="url_activity">链接活动</Option>
          </Select>
        </FormItem>
      </div>
      <div class="mb25">
        <FormItem label="活动标题" prop="title" style="margin-bottom:20px">
          <Input placeholder="请输入标题(20字以内)" class="w609x ml5" v-model="formKey.title"/>
        </FormItem>
      </div>
      <div class="mb20">
        <FormItem label="活动时间" prop="activity_date_type">
          <Select class="w110x ml5" v-model="formKey.activity_date_type" >
            <Option value="lasting">永久上架</Option>
            <Option value="custom">自定义时间</Option>
          </Select>
        </FormItem>
      </div>
      <div label="起止时间" class="clearfix mb20" v-if="formKey.activity_date_type=='custom'">
        <FormItem label="开始日期" class="fl" prop="online_time">
          <DatePicker type="datetime"  placeholder="请选择日期" class="w165x ml5" v-model="formKey.online_time"
          size="large" format="yyyy-MM-dd HH:mm"
          ></DatePicker>
        </FormItem>
        <!-- <span class=" fl  ib">——</span> -->
        <FormItem label="结束日期"  class="fl ml5" prop="offline_time">
          <DatePicker type="datetime" placeholder="请选择日期" class="w165x" v-model="formKey.offline_time"
          size="large" format="yyyy-MM-dd HH:mm"
          ></DatePicker>
        </FormItem>
      </div>
      <div>
        <FormItem label="活动分类" prop="activity_cate_name">
          <Select class="w160x ml5" v-model="formKey.activity_cate_id">
            <!-- <Option value="全部"></Option> -->
            <Option :value="item.id" v-for="item in actlist" :key="item.id">{{item.activity_cate_name}}</Option>
          </Select>
        </FormItem>
      </div>
      <div class="mb20">
        <FormItem>
            <span class="ml40">状态</span>
            <Switch class="ml20" v-model="formKey.status" size="large"></Switch>
            <span class="ml5">{{formKey.status===true?"已启用":'未启用'}}</span>
        </FormItem>
      </div>
      <div class="mb20">
        <FormItem label="发布平台" prop="client_type">
          <CheckboxGroup class="ml5" v-model="formKey.client_type">
            <Checkbox label="pc"><span>PC</span></Checkbox>
            <Checkbox label="mobile"><span>移动端</span></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </div>
      <FormItem label="标题图片" prop="image" class="pic">
        <span v-show="false">{{formKey.image}}</span>
        <div class="mb mb20 ml10" :style="formKey.client_type.length<2?{textAlign: 'center'}:{}">
            <!-- <span class="ml0">标题图片</span> -->
            <p class="font" style="text-align: left">尺寸限制：PC-750x280px 移动端-750x280px</p>
            <div class="upload-img">
              <UpLoads v-for="(item,index) in uploadList" v-bind="item" :key="index"
              @on-success="uploadSuccess"
              @on-format-error="handleFormatError"
              :editPic="$route.params.page==='edit'?formKey.image:{}"
              />
            </div>
        </div>
      </FormItem>

      <!-- <div class="mb ml40">
                <div class="clearfix" style="display:inline-block;">
                    <div class="upLoad fl ml40">
                    <div style="text-align:center" v-show="showPcImg">
                    <p class="ft18 txt-a mt20">PC端</p>
                        <Upload
                        :default-file-list="uploadForm.defaultList"
                        :headers="uploadForm.headers"
                        :action="uploadForm.action"
                        :data="uploadForm.data"
                        :name="uploadForm.name"
                        :on-success="(res)=>{ onUploadSuccess(res,'pc') }"
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError"
                        >
                        <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </div>
                    <div class="demo-upload-list" v-show="!showPcImg">
                            <img :src="formKey.pc_pic">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView('pc')" size="60"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove('pc')" size="60"></Icon>
                            </div>
                    </div> -->
                        <!-- <Modal title="图片预览" v-model="visible">
                                <img :src="formKey.pc_pic" v-show="visible" style="width: 100%">
                    </Modal> -->
                    <!-- </div>

                    <div class="upLoad fl ml40">
                    <div style="text-align:center" v-show="showMoImg">
                    <p class="ft18 txt-a mt20">移动端</p>
                        <Upload
                        :default-file-list="uploadForm.defaultList"
                        :headers="uploadForm.headers"
                        :action="uploadForm.action"
                        :data="uploadForm.data"
                        :name="uploadForm.name"
                        :on-success="(res)=>{ onUploadSuccess(res,'mobile') }"
                        :format="['jpg','jpeg','png']"
                        :on-format-error="handleFormatError"
                        >
                        <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
                        </Upload>
                    </div>
                    <div class="demo-upload-list" v-show="!showMoImg">
                            <img :src="formKey.mobile_pic">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView('mobile')" size="60"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove('mobile')" size="60"></Icon>
                            </div>
                    </div> -->
                        <!-- <Modal title="图片预览" v-model="visible">
                                <img :src="formKey.pc_pic" v-if="visible" style="width: 100%">
                    </Modal> -->
                    <!-- </div>
                </div>
        </div> -->
      <div v-if="formKey.activity_type=='normal_activity'">
      <div class="mb mt20 ml10" >
        <span class="ml0" prop="desc_type">编辑内容</span>
          <div class="v2-button ml5">
            <Button class="w148x fl mt10 ml10" :class="this.seltext==true?'active':''" @click="onText">文本</Button>
            <Button class="w148x fl mt10" :class="this.selimg==true?'active':''" @click="onImg">使用图片</Button>
          </div>
          <div class="upload-img edit-img" v-if="selimg" :style="formKey.client_type.length<2?{textAlign: 'center'}:{}">
            <UpLoads v-for="(item,index) in uploadList" v-bind="item" :key="index"
            useType="edit"
            @on-success="uploadSuccess"
            @on-format-error="handleFormatError"
            :editPic="$route.params.page==='edit'&&formKey.desc_type==='pic'?formKey.description:{}"
            />
          </div>
      </div>
        <!-- <div class="mb" v-if="!seltext">
                <p class="font ml10">宽度限制：PC-750px 移动端-720px</p>
                <div class="clearfix ml40" style="display:inline-block;">
                    <div class="upLoad fl ml40">
                        <div style="text-align:center" v-if="showPcImg">
                        <p class="ft18 txt-a mt20">PC端</p>
                            <Upload
                            :default-file-list="uploadForm.defaultList"
                            :headers="uploadForm.headers"
                            :action="uploadForm.action"
                            :data="uploadForm.data"
                            :name="uploadForm.name"
                            :on-success="(res)=>{ onUploadSuccess(res,'pc') }"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"
                            >
                            <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
                            </Upload>
                        </div>
                        <div class="demo-upload-list" v-if="!showPcImg">
                                <img :src="formKey.pc_pic">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView('pc')" size="60"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove('pc')" size="60"></Icon>
                                </div>
                        </div> -->
                        <!-- <Modal title="图片预览" v-model="visible">
                                <img :src="formKey.pc_pic" v-if="visible" style="width: 100%">
                    </Modal> -->
                    <!-- </div>

                    <div class="upLoad fl ml40">
                        <div style="text-align:center" v-if="showMoImg">
                        <p class="ft18 txt-a mt20">移动端</p>
                            <Upload
                            :default-file-list="uploadForm.defaultList"
                            :headers="uploadForm.headers"
                            :action="uploadForm.action"
                            :data="uploadForm.data"
                            :name="uploadForm.name"
                            :on-success="(res)=>{ onUploadSuccess(res,'mobile') }"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"
                            >
                            <Button class="w148x mt20" icon="ios-cloud-upload-outline">上传图片</Button>
                            </Upload>
                        </div>
                        <div class="demo-upload-list" v-if="!showMoImg">
                                <img :src="formKey.mobile_pic">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView('mobile')" size="60"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove('mobile')" size="60"></Icon>
                                </div>
                        </div> -->
                        <!-- <Modal title="图片预览" v-model="visible">
                                <img :src="formKey.pc_pic" v-if="visible" style="width: 100%">
                    </Modal> -->
                    <!-- </div>
                </div>
        </div> -->
      <!-- 使用图片显示的内容 -->
      <!-- 选择pc和手机 -->
      <div class="ml10  mb20 add-acitivity" v-if="seltext" key="txt">
        <!-- <editor class="w690x ml70" ref="editor" v-model="formKey.description.value"
        valueType="text"
        :cache="false"
        /> -->
        <div v-for="(item) in formKey.client_type" :key="item">
          <span>{{item==="pc"?"PC端":"移动端"}}</span>
          <UE :defaultMsg="item==='pc'?defaultMsg1:defaultMsg2" :config="config" :id="item==='pc'?ue1:ue2"
          :ref="item==='pc'?ue1:ue2" class="editor" :class="item==='pc'?'pc-editor':''"></UE>
        </div>
        <!-- <div>
          <span>移动端</span>
          <UE :defaultMsg=defaultMsg2 :config=config :id=ue2 ref="ue2" class="editor"></UE>
        </div> -->
      </div>
    </div>
    <div v-if="formKey.activity_type=='url_activity'">
         <FormItem label="文件地址" prop="url_link" style="margin-bottom:20px">
              <Input placeholder="请输入标题文件地址" v-model="formKey.url_link" class="w609x ml5"/>
        </FormItem>
    </div>
    </Form>

    <Button class="ivu-btn addSave ml80" @click="submit">{{$route.params.page==="edit"?"确认保存":"确认新增"}}</Button>
     <Modal title="图片预览" class-name="vertical-center-modal">
            <!-- <img :src="url" v-if="visible" style="width: 100%">  -->
    </Modal>
  </div>
</template>
<script>
import Editor from "_c/editor";
import UE from "_c/UE";
import {
  activityCateList,
  activityIns,
  activityUpt,
  activityDetail
} from "@/api/system";
import { uploadImg } from "@/api/common";
import { getUserName } from "@/libs/util";
import { getToken } from "@/libs/util";
import { mapState } from "vuex";
import { constants } from "fs";
import { type } from 'os';
import UpLoads from './components/uploads'
import { setInterval } from 'timers';
export default {
  name: "addActivities",
  components: {
    Editor,
    UpLoads,
    UE
  },
  data() {
      const validatePic = (rule, val, cb) => {
        if (val.pc === undefined && val.mobile === undefined) {
          cb(new Error('请选择标题图片'))
        } else {
          cb()
        }
      }
      return{
          serchKey: {
            siteId: this.$root.nowSite.id,
            adminId: this.$store.state.user.userInfo.adminId,
            adminName: this.$store.state.user.userInfo.userName
          },
          actlist:[],
          rules: {
            title: [
            {
                required: true,
                message: "请输入标题",
                trigger: "blur"
            }
            ],
            activity_date_type: [
            {
                required: true,
                trigger: "change",
                message: "请选择活动时间",
                pattern: /.+/
            }
            ],
            client_type: [
            {
                required: true,
                message: "请选择客户端",
                trigger: "change",
                pattern: /.+/
            }
            ],
            online_time: [
            {
                required: true,
                message: "请选择开始日期",
                trigger: "change",
                pattern: /.+/
            }
            ],
            offline_time: [
            {
                required: true,
                message: "请选择结束日期",
                trigger: "change",
                pattern: /.+/
            }
            ],
            activity_type: [
            {
                required: true,
                message: "请选择活动类型",
                pattern: /.+/,
                trigger: "change"
            }
            ],
            image: [
              {
                type: 'object',
                required: true,
                // message: '请选择标题图片',
                validator: validatePic,
                trigger: 'change'
              }
            ],
            url_link: [
              {
                required: true,
                message: '请输入文件链接',
                trigger: 'blur'
              }
            ]
        },
        // uploadForm: {
        //     headers: { Authorization: getToken() },
        //     action: "/api/v2/uploadImg",
        //     data: { siteId: this.$root.nowSite.id },
        //     name: "img",
        //     defaultList: [],
        //     path: "",
        //     src: ""
        // },
        //图片上传
        uploadList: [],
        uploadForm: {
          headers: { Authorization: getToken() },
          action: '/api/v2/uploadImg',
          data: { siteId: this.$root.nowSite.id },
          name: 'img'
        },
        //编辑框
        defaultMsg1: '',
        defaultMsg2: '',
        config: {
        initialFrameWidth: 900,
        initialFrameHeight: 350
        },
        ue1: 'ue1',
        ue2: 'ue2',
        showPcImg: false,
        showMoImg: false,
        seltext: true,
        selimg: false,
        type: false,
        visible: false,
        content: "",
        pc: true,
        h5: false,
        formKey: {
            title: '',
            status: true,
            // desc_format_type: "text",
            activity_type:"normal_activity",
            activity_date_type:"custom",
            //上传参数
            activity_cate_id: '',
            online_time: '',
            offline_time: '',
            client_type: [],
            image: {},
            desc_type: '',
            description: {},
            url_link: ''
        }
      }
  },
  watch: {
    'formKey.client_type': {
      handler (val) {
          // if (!this.formKey.pc_pic) {
          //   this.showPcImg = this.formKey.client_type.includes('pc')
          // }
          // if (!this.formKey.mobile_pic) {
          //   this.showMoImg = this.formKey.client_type.includes('mobile')
          // }
          this.uploadList = []
          //根据勾选渲染出上传图片组件
          val.forEach(el => {
            this.uploadList.push({ ...this.uploadForm, showType: el })
          });
          //清除未被勾选的标题图片image
          Object.keys(this.formKey.image).forEach(el => {
            if (!val.includes(el)) {
              delete this.formKey.image[el]
            }
          })
          //清除未被勾选的编辑框image此处排除value编辑框进入时候会被清除
          Object.keys(this.formKey.description).forEach(el => {
            if (!val.includes(el) && el !== 'value') {
              delete this.formKey.description[el]
            }
          })
      },
      deep: true
    },
    'formKey.activity_type' () {
      // this.clearEditor()
    }
  },
  created(){
      this.getActivelist()
      //刷新时候清除文本框的内容
      // this.clearEditor()
  },
  methods: {
      handleFormatError(file) {
        this.$Tip.info({ content: "请上传图片" });
      },
      //文件上传成功后复制img地址，并打开显示
      // onUploadSuccess (res, type) {
      //   if (res.code === 200) {
      //     this.formKey.image[type] = res.data.src
      //     if (type === 'pc') {
      //       this.formKey.pc_pic = `${res.data.host}/${res.data.src}`
      //       this.showPcImg = false
      //     } else if (type === 'mobile') {
      //       this.formKey.mobile_pic = `${res.data.host}/${res.data.src}`
      //       this.showMoImg = false
      //     }
      //   }
      // },
      //文件上传成功后复制img地址，并打开显示
      uploadSuccess (res, type, useType) {
        if (res.code === 200) {
          if (useType === 'edit') {
            this.formKey.description[type] = res.data.path
          } else {
            this.formKey.image[type] = res.data.path
          }
        }
      },
      //这两个方法以及data函数里的一些showimg,seltext。。。等等可以借鉴新增公告里的
      handleView(val) {

      },
      //清除表单的image对象，清空imgurl地址
      // handleRemove(val) {
      //   if (val === 'pc') {
      //     delete this.formKey.image['pc']
      //     this.formKey.pc_pic = ''
      //     this.showPcImg = true
      //   } else if (val === 'mobile') {
      //     delete this.formKey.image['mobile']
      //     this.formKey.mobile_pic = ''
      //     this.showMoImg = true
      //   }
      // },
      onText() {
        this.seltext = true;
        this.selimg = false;
        this.formKey.desc_type = "text";
        //切换文本编辑器是清空内容
        // this.clearEditor()
        // this.formKey.description.value = ' '
      },
      onImg() {
        this.selimg = true;
        this.seltext = false;
        this.formKey.desc_type = "pic";
        this.formKey.description = {}
      },
      //提交表单信息
      submit(){
        this.$refs.formKey.validate(valid => {
          if (valid) {
            let data = {...this.formKey, ...this.serchKey}
            Object.keys(data).forEach(val => {
              if (val === 'client_type') {
                data['client_type'] = this.formKey['client_type'].join(',')
              } else if (val === 'status') {
                data['status'] = this.formKey['status'] === true ? 'yes' : 'no'
              } else if (val === 'image') {
                data[val] = JSON.stringify(this.formKey.image)
              } else if (val === 'activity_date_type') {
                //用户点击非lasting会把此字段读取进去提交删除
                if (this.formKey[val] === 'lasting') {
                  delete data.online_time
                  delete data.offline_time
                } else {
                  data.online_time = this.$root.formatTimeS(data.online_time)
                  data.offline_time = this.$root.formatTimeS(data.offline_time)
                }
              } else if (val === 'activity_type') {
                if (data[val] === 'normal_activity') {
                  if (this.seltext) {
                    this.formKey.client_type.map(item => {
                      item === 'pc' ? data.description[item] = this.$refs.ue1[0].getUEContent()
                      : data.description[item] = this.$refs.ue2[0].getUEContent()
                    })
                    data.description = JSON.stringify(data.description)
                    data.desc_type = 'text'
                  } else if (this.selimg) {
                    data.description = JSON.stringify(this.formKey.description)
                    data.desc_type = 'pic'
                  }
                  delete data.url_link
                } else if (data[val] === 'url_activity') {
                  delete data.description
                  delete data.desc_type
                }
              }
            })
            if (this.$route.params.page === 'edit') {
              activityUpt(data).then(res => {
                try {
                  if (res.code === 200) {
                    this.resetForm(this.formKey)
                    this.$store.commit('closeTag', this.$route)
                    setTimeout(() => {
                      this.$Tip.hide()
                    }, 1000)
                    this.$router.push({
                      name: 'activeList'
                    })
                  }
                } catch (e) {

                }
              })
            } else {
              activityIns(data).then(res => {
                try {
                  if (res.code === 200) {
                    this.resetForm(this.formKey)
                    this.$store.commit('closeTag', this.$route)
                    setTimeout(() => {
                        this.$Tip.hide()
                      }, 1000)
                    this.$router.push({
                      name: 'activeList'
                    })
                  }
                } catch (e) {

                }
              })
            }
          }
        })
      },
      //清空表单
      resetForm (obj) {
        //文本编辑框修复不知道咋回事不会
        // this.clearEditor()
        for (let val in obj) {
          if (typeof obj[val] === 'object') {
            if (obj[val] instanceof Array) {
              obj[val] = []
            } else {
              if (val === 'description') {
                Object.keys(obj[val]).map(item => {
                  if (item !== 'value') {
                    delete obj[val][item]
                  } else {
                    obj[val][item] = ' '
                  }
                })
              }
              else {
                obj[val] = {}
              }
            }
          } else {
            if (val === 'status') {
              obj[val] = false
            } else {
              obj[val] = ''
            }
          }
        }
      },
      getActivelist(){
         activityCateList({siteId: this.$root.nowSite.id}).then(res=>{
              this.actlist = res.data
         })
      },
      // clearEditor () {
      //   this.$nextTick(() => {
      //     if (document.querySelector('.add-acitivity .w-e-text')) {
      //       document.querySelector('.add-acitivity .w-e-text').innerHTML = ''
      //     }
      //   })
      // },
      //初始化编辑框内容
      initEdit (obj) {
        Object.keys(this.formKey).forEach((el) => {
          if (el === 'client_type') {
            if (obj[el]) {
              this.formKey[el] = obj[el].split(',')
            }
          } else if (el === 'image') {
            if (obj[el]) {
              this.formKey[el] = JSON.parse(obj['imageShow'])
            }
          } else if (el === 'status') {
            this.formKey[el] = obj[el] === 'yes' ? true : false
          } else if (el === 'online_time') {
            if (obj[el]) {
              this.formKey.online_time = this.$root.unixTime(obj[el])
            }
          } else if (el === 'offline_time') {
            if (obj[el]) {
              this.formKey.offline_time = this.$root.unixTime(obj[el])
            }
          } else {
            this.formKey[el] = obj[el]
          }
        })
        if (this.formKey.activity_type === 'normal_activity') {
          if (this.formKey.desc_type && this.formKey.desc_type === 'text') {
            this.onText()
            this.formKey.description = this.formKey.description && JSON.parse(this.formKey.description)
            // this.formKey.description.value = this.formKey.description.pc || this.formKey.description.mobile
            //更换编辑器先加1秒延时了出不来数据
            setTimeout(() => {
              this.$nextTick(() => {
                //显示编辑值
                if (this.$refs.ue1 && this.$refs.ue1[0]) {
                  this.$refs.ue1[0]._data.editor.body.innerHTML = this.formKey.description.pc ? this.formKey.description.pc : ''
                }
                // this.defaultMsg2 = this.formKey.description.mobile
                if (this.$refs.ue2 && this.$refs.ue2[0]) {
                  this.$refs.ue2[0]._data.editor.body.innerHTML = this.formKey.description.mobile ? this.formKey.description.mobile : ''
                }
                // this.defaultMsg = this.formKey.description.pc || this.formKey.description.mobile
              })
            }, 1000)
          } else if (this.formKey.desc_type === 'pic') {
            this.onImg()
            this.formKey.description = JSON.parse(obj['description'])
          }
        }
        const { id } = obj
        this.formKey.id = id
      }
    },
    mounted () {
      //获取编辑值
      this.$nextTick(() => {
        if (this.$route.params.page === 'edit') {
          // 直接用this.$root.nowSite.id异步第一次请求失败用页面传过来的参数
          let data = { id: this.$route.query.id, siteId: this.$route.query.siteId }
          activityDetail(data).then(res => {
            if (res.code === 200) {
              this.initEdit(res.data)
            }
          })
        }
      })
      if (this.$route.params.page === 'create') {
        this.formKey.client_type.push('pc')
      }
    }
}
</script>
<style scoped lang="less">
@import "../../../styles/button.less";
.font{color:#C5C5C5}
.v2-search{margin-left:50px;}
.v2-button{display:inline-block;vertical-align: middle;}
.v2-button .ivu-btn{
  border-color:#dcdcdc;
  color:#C5C5C5;
}
/deep/.v2-button .active{border-color: #62B1FD; color: #62B1FD;box-shadow:none !important;}
.upLoad {
  width: 345px;
  height: 140px;
  border: 1px solid #e4e4e4;
}
.upLoad :nth-child(1) {
  border-left: 0;
}
.upLoadPC {
  width: 690px;
  height: 140px;
  border: 1px solid #e4e4e4;
}
/deep/.ivu-form-item-error-tip {
  top: 33px;
}
.demo-upload-list {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 140px;
  // border: 1px solid transparent;
  // border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  // margin-right: 4px;
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
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  /deep/.ivu-modal {
    top: 0;
  }
}
// 上传图片样式
.upload-img {
  width: 692px;
  height: 165px;
  border: 1px solid #E4E4E4;
  border-radius: 5px;
}
/deep/.pic.ivu-form-item {
  margin: 0;
  height: 190px;
}
.edit-img {
  margin-left: 70px;
}
//编辑框样式
.editor {
  display: inline-block;
  margin-left: 10px;
  vertical-align: top;
  margin-bottom: 10px;
}
.pc-editor {
  margin-left: 20px;
}
</style>
