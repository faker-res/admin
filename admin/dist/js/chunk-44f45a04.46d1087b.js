(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44f45a04"],{"0a0d":function(t,e,o){t.exports=o("e829")},"2f37":function(t,e,o){var i=o("63b6");i(i.S,"Date",{now:function(){return(new Date).getTime()}})},"3e8f":function(t,e){},"6ab7":function(t,e,o){"use strict";o.r(e);var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"v2-search"},[o("Form",{ref:"formKey",attrs:{model:t.formKey,rules:t.rules}},[o("div",{staticClass:"mb25"},[o("FormItem",{staticStyle:{"margin-bottom":"20px"},attrs:{label:"公告标题",prop:"title"}},[o("Input",{staticClass:"w609x ml5",attrs:{placeholder:"请输入标题(20字以内)"},model:{value:t.formKey.title,callback:function(e){t.$set(t.formKey,"title",e)},expression:"formKey.title"}})],1)],1),o("div",{staticClass:"clearfix mb20 ",attrs:{label:"起止时间"}},[o("FormItem",{staticClass:"fl ",attrs:{label:"开始日期",prop:"publish_at"}},[o("DatePicker",{staticClass:"w165x ml5",attrs:{type:"date",placeholder:"请选择日期",options:t.options3},model:{value:t.formKey.publish_at,callback:function(e){t.$set(t.formKey,"publish_at",e)},expression:"formKey.publish_at"}})],1),o("FormItem",{staticClass:"fl ml5",attrs:{label:"结束日期",prop:"offline_at"}},[o("DatePicker",{staticClass:"w165x",attrs:{type:"date",placeholder:"请选择日期",options:t.options3},model:{value:t.formKey.offline_at,callback:function(e){t.$set(t.formKey,"offline_at",e)},expression:"formKey.offline_at"}})],1)],1),o("div",{staticClass:"mb20"},[o("FormItem",[o("span",{staticClass:"ml10"},[t._v("弹跳位置")]),o("Select",{staticClass:"w110x ml20",model:{value:t.formKey.bounce_location,callback:function(e){t.$set(t.formKey,"bounce_location",e)},expression:"formKey.bounce_location"}},t._l(t.list,function(e,i){return o("Option",{key:i,attrs:{value:e.value}},[t._v(t._s(e.name))])}),1)],1)],1),o("div",{staticClass:"mb20"},[o("FormItem",{attrs:{label:"出现位置",prop:"newappears_location"}},[o("CheckboxGroup",{staticClass:"ml5",on:{"on-change":t.Checkappears},model:{value:t.formKey.newappears_location,callback:function(e){t.$set(t.formKey,"newappears_location",e)},expression:"formKey.newappears_location"}},[o("Checkbox",{attrs:{label:"首页"}}),o("Checkbox",{attrs:{label:"游戏页"}})],1)],1)],1),o("div",{staticClass:"mb20 ml15"},[o("FormItem",{attrs:{label:"客户端",prop:"newclient_type"}},[o("CheckboxGroup",{staticClass:"ml5",on:{"on-change":t.checkAllGroupChange},model:{value:t.formKey.newclient_type,callback:function(e){t.$set(t.formKey,"newclient_type",e)},expression:"formKey.newclient_type"}},[o("Checkbox",{attrs:{label:"PC"}}),o("Checkbox",{attrs:{label:"H5"}}),o("Checkbox",{attrs:{label:"Android"}}),o("Checkbox",{attrs:{label:"IOS"}})],1)],1)],1),o("div",{staticClass:"mb  mb20 ml10"},[o("FormItem",{attrs:{label:"编辑内容",prop:"desc_format_type"}},[o("div",{staticClass:"v2-button ml5"},[o("Button",{staticClass:"w148x fl mt10 mb20",class:1==this.seltext?"active":"",on:{click:t.onText}},[t._v("文本")]),o("Button",{staticClass:"w148x fl mt10 mb20",class:1==this.selimg?"active":"",on:{click:t.onImg}},[t._v("使用图片")])],1)])],1),t.selimg&&t.showh5?o("div",{staticClass:"mt30 clearfix ml20"},[o("div",{staticClass:"upLoad fl"},[t.showimg?o("div",{staticStyle:{"text-align":"center"}},[o("p",{staticClass:"ft18 txt-a mt20"},[t._v("PC端")]),o("Upload",{attrs:{"default-file-list":t.uploadForm.defaultList,headers:t.uploadForm.headers,action:t.uploadForm.action,data:t.uploadForm.data,name:t.uploadForm.name,"on-success":function(e){t.onUploadSuccess(e,"pc")},format:["jpg","jpeg","png"],"on-format-error":t.handleFormatError}},[o("Button",{staticClass:"w148x mt20",attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传图片")])],1)],1):t._e(),t.showimg?t._e():o("div",{staticClass:"demo-upload-list"},[o("img",{attrs:{src:t.formKey.pc_pic}}),o("div",{staticClass:"demo-upload-list-cover"},[o("Icon",{attrs:{type:"ios-eye-outline",size:"60"},nativeOn:{click:function(e){return t.handleView("pc")}}}),o("Icon",{attrs:{type:"ios-trash-outline",size:"60"},nativeOn:{click:function(e){return t.handleRemove("pc")}}})],1)])]),o("div",{staticClass:"upLoad fl ml20"},[t.showimgphone?o("div",{staticStyle:{"text-align":"center"}},[o("p",{staticClass:"ft18 txt-a mt20"},[t._v("手机端")]),o("Upload",{attrs:{"default-file-list":t.uploadForm.defaultList,headers:t.uploadForm.headers,action:t.uploadForm.action,data:t.uploadForm.data,name:t.uploadForm.name,"on-success":function(e){t.onUploadSuccess(e,"phone")},format:["jpg","jpeg","png"],"on-format-error":t.handleFormatError}},[o("Button",{staticClass:"w148x mt20",attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传图片")])],1)],1):t._e(),t.showimgphone?t._e():o("div",{staticClass:"demo-upload-list"},[o("img",{attrs:{src:t.formKey.mob_pic}}),o("div",{staticClass:"demo-upload-list-cover"},[o("Icon",{attrs:{type:"ios-eye-outline",size:"60"},nativeOn:{click:function(e){return t.handleView("phone")}}}),o("Icon",{attrs:{type:"ios-trash-outline",size:"60"},nativeOn:{click:function(e){return t.handleRemove("phone")}}})],1)])])]):t._e(),t.selimg&&!t.showh5?o("div",{staticClass:"mt30 clearfix ml20"},[o("div",{staticClass:"upLoadPC fl"},[t.showimg2?o("div",{staticStyle:{"text-align":"center"}},[o("p",{staticClass:"ft18 txt-a mt20"},[t._v(t._s(t.pc?"PC端":"手机端"))]),o("Upload",{attrs:{"default-file-list":t.uploadForm.defaultList,headers:t.uploadForm.headers,action:t.uploadForm.action,data:t.uploadForm.data,name:t.uploadForm.name,"on-success":function(e){t.onUploadSuccess(e,t.pc)},format:["jpg","jpeg","png"],"on-format-error":t.handleFormatError}},[o("Button",{staticClass:"w148x mt20",attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传图片")])],1)],1):t._e(),t.showimg2?t._e():o("div",{staticClass:"demo-upload-list"},[o("img",{attrs:{src:t.pc?t.formKey.pc_pic:t.formKey.mob_pic}}),o("div",{staticClass:"demo-upload-list-cover"},[o("Icon",{attrs:{type:"ios-eye-outline",size:"60"},nativeOn:{click:function(e){return t.handleView(t.pc)}}}),o("Icon",{attrs:{type:"ios-trash-outline",size:"60"},nativeOn:{click:function(e){return t.handleRemove(t.pc)}}})],1)])])]):t._e(),t.seltext?o("div",{staticClass:"ml10  mb20"},[o("UE",{ref:"ue1",attrs:{defaultMsg:t.defaultMsg1,config:t.config,id:t.ue1}})],1):t._e(),o("FormItem",{staticClass:"mt10",attrs:{label:"状态"}},[o("i-switch",{staticClass:"ml30",attrs:{size:"large"},model:{value:t.formKey.status,callback:function(e){t.$set(t.formKey,"status",e)},expression:"formKey.status"}}),o("span",{staticClass:"ml20"},[t._v(t._s(0==t.formKey.status?"未启用":"已启用"))]),o("Button",{staticClass:"ivu-btn addSave ml40",on:{click:t.save}},[t._v(t._s("edit"===t.$route.params.page?"确认保存":"确认新增"))])],1)],1),o("Modal",{attrs:{title:"图片预览","class-name":"vertical-center-modal"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?o("img",{staticStyle:{width:"100%"},attrs:{src:t.url}}):t._e()])],1)},a=[],s=(o("28a5"),o("a4bb")),n=o.n(s),r=(o("ac6a"),o("6b54"),o("cebc")),c=o("0a0d"),l=o.n(c),p=o("a0f0"),m=o("e945"),u=o("8593"),h=(o("2934"),o("c276")),d=o("2f62"),f=(o("3e8f"),{name:"noticeDetial",components:{Editor:p["a"],UE:m["a"]},data:function(){return{rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],publish_at:[{required:!0,message:"请选择日期",trigger:"blur",pattern:/.+/}],offline_at:[{required:!0,message:"请选择日期",trigger:"blur",pattern:/.+/}],newappears_location:[{required:!0,message:"请选择出现位置",trigger:"change",pattern:/.+/}],newclient_type:[{required:!0,message:"请选择客户端",trigger:"change",pattern:/.+/}]},defaultMsg1:"",config:{initialFrameWidth:900,initialFrameHeight:350},ue1:"ue1",uploadForm:{headers:{Authorization:Object(h["j"])()},action:"/api/v2/uploadImg",data:{siteId:""},name:"img",defaultList:[],path:"",src:""},options3:{disabledDate:function(t){return t&&t.valueOf()<l()()-864e5}},showimg:!0,showimg2:!0,showimgphone:!0,showpc:!1,searchKey:{text:"text"},type:!1,visible:!1,content:"",switch1:!1,indeterminate:!0,checkAll:!1,pc:!0,h5:!1,phone:!1,checkAllGroup:["PC"],formKey:{siteId:"",siteName:"",type:"popups",title:"",publish_at:"",offline_at:"",bounce_location:"",desc_format_type:"text",description:"",status:"",appears_location:"",client_type:"",newappears_location:[],newclient_type:[],pc_pic:"",mob_pic:"",url:"",pcpath:"",phonepath:""},seltext:!0,selimg:!1,showh5:!1,list:[{value:"1",name:"登录前"},{value:"2",name:"登录后"},{value:"4",name:"不限制"}]}},created:function(){this.uploadForm.data.siteId=this.$root.nowSite.id},mounted:function(){if("edit"===this.$route.params.page){var t={id:this.$route.query.id,siteId:this.$root.nowSite.id};this.onDetails(t)}},methods:{onText:function(){this.seltext=!0,this.selimg=!1,this.formKey.desc_format_type="text"},onImg:function(){this.selimg=!0,this.seltext=!1,this.formKey.desc_format_type="pic"},save:function(){var t=this;this.$refs.formKey.validate(function(e){if(e){if("create"===t.$route.params.page){var o=Object(r["a"])({},t.formKey),i=[o.publish_at,o.offline_at];if(!t.$root.validatecourseTime(i))return!1;if(o.publish_at=t.$root.formatTimeS(o.publish_at),o.offline_at=t.$root.formatnightTimeS(o.offline_at),o.siteId=t.$root.nowSite.id,o.siteName=t.$root.nowSite.siteName,1==o.status?o.status="yes":o.status="no",o.pc_pic=o.pcpath,o.mob_pic=o.phonepath,delete o.pcpath,delete o.phonepath,delete o.newappears_location,delete o.newclient_type,"text"==o.desc_format_type)o.description=t.$refs.ue1.getUEContent(),delete o.pc_pic,delete o.mob_pic;else{if(delete o.description,t.pc&&!t.h5&&(delete o.mob_pic,!o.pc_pic))return t.$Message.error("请上传图片"),!1;if(!t.pc&&t.h5&&(delete o.pc_pic,!o.mob_pic))return t.$Message.error("请上传图片"),!1;if(t.pc&&t.h5){if(!o.pc_pic)return t.$Message.error("请上传pc端图片"),!1;if(!o.mob_pic)return t.$Message.error("请上传手机端图片"),!1}}for(var a in delete o.url,o)o[a]||delete o[a];Object(u["Z"])(o).then(function(e){t.$router.go(-1)})}if("edit"===t.$route.params.page){var s=Object(r["a"])({},t.formKey),n=[s.publish_at,s.offline_at];if(!t.$root.validatecourseTime(n))return!1;for(var c in s.publish_at=t.$root.formatTimeS(s.publish_at),s.offline_at=t.$root.formatnightTimeS(s.offline_at),s.siteId=t.$root.nowSite.id,s.siteName=t.$root.nowSite.siteName,s.id=t.$route.query.id,s)s[c]||delete s[c];if(1==s.status?s.status="yes":s.status="no",s.pcpath&&(s.pc_pic=s.pcpath),s.phonepath&&(s.mob_pic=s.phonepath),delete s.pcpath,delete s.phonepath,delete s.newappears_location,delete s.newclient_type,"text"==s.desc_format_type)s.description=t.$refs.ue1.getUEContent(),delete s.pc_pic,delete s.mob_pic;else{if(delete s.description,t.pc&&!t.h5&&(delete s.mob_pic,!s.pc_pic))return t.$Message.error("请上传图片"),!1;if(!t.pc&&t.h5&&(delete s.pc_pic,!s.mob_pic))return t.$Message.error("请上传图片"),!1;if(t.pc&&t.h5){if(!s.pc_pic)return t.$Message.error("请上传pc端图片"),!1;if(!s.mob_pic)return t.$Message.error("请上传手机端图片"),!1}}delete s.url,Object(u["cb"])(s).then(function(e){200==e.code&&t.$router.go(-1)})}}})},handleChange:function(t,e){this.formKey.description=t.toString()},handleFormatError:function(t){this.$Tip.info({content:"请上传图片"})},change:function(t){},checkAllGroupChange:function(){var t=[];this.h5=this.formKey.newclient_type.some(function(t){return"H5"==t||"Android"==t||"IOS"==t}),this.pc=this.formKey.newclient_type.some(function(t){return"PC"==t}),this.pc&&this.h5?this.showh5=!0:this.showh5=!1,this.formKey.newclient_type.map(function(e){t.push(e)}),t.length>1?this.formKey.client_type=t.join(","):this.formKey.client_type=t[0]},Checkappears:function(){var t=[];this.formKey.newappears_location.map(function(e){"首页"==e?t.push("1"):t.push("2")}),t.length>1?this.formKey.appears_location=t.join(","):this.formKey.appears_location=t[0]},handleView:function(t){this.url="pc"==t||1==t?this.formKey.pc_pic:this.formKey.mob_pic,this.visible=!0},handleRemove:function(t){"pc"==t||1==t?(this.formKey.pc_pic="",this.formKey.pcpath=" ",this.showimg=!0,this.showimg2=!0):(t||(this.showimg=!0,this.showimgphone=!0,this.showimg2=!0),this.formKey.mob_pic="",this.formKey.phonepath="",this.showimgphone=!0)},onUploadSuccess:function(t,e){var o=t.data,i=o.path,a=o.src,s=o.host;"pc"==e||1==e?(this.formKey.pc_pic="".concat(s,"/").concat(a),this.formKey.pcpath=i,this.showimg=!1,this.showimg2=!1):(e||(this.showimg=!1,this.showimg2=!1),this.showimgphone=!1,this.formKey.mob_pic="".concat(s,"/").concat(a),this.formKey.phonepath=i)},onDetails:function(t){var e=this;Object(u["Y"])(t).then(function(t){n()(e.formKey).forEach(function(o){e.formKey[o]="status"==o?"yes"==t.data[o]:"newclient_type"==o||"newappears_location"==o?e.formKey[o]:"bounce_location"==o?t.data[o].toString():"publish_at"==o||"offline_at"==o?e.$root.unixTime(t.data[o]):t.data[o]});var o=e.formKey,i=o.newclient_type,a=o.client_type,s=o.appears_location,r=o.newappears_location,c=(o.publish_at,o.offline_at,o.desc_format_type),l=(o.bounce_location,o.description);1==a.length?i.push(a):a.split(",").map(function(t){i.push(t)}),1==s.length?"1"==s?r.push("首页"):r.push("游戏页"):s.split(",").map(function(t){t="1"==t?"首页":"游戏页",r.push(t)}),l&&(e.$refs.ue1._data.editor.body.innerHTML=l),e.h5=e.formKey.newclient_type.some(function(t){return"H5"==t||"Android"==t||"IOS"==t}),e.pc=e.formKey.newclient_type.some(function(t){return"PC"==t}),e.pc&&e.h5?e.showh5=!0:e.showh5=!1,e.pc&&e.h5?(e.showimg=!1,e.showimgphone=!1):e.pc&&!e.h5?e.showimg2=!1:e.h5&&!e.pc&&(e.showimg2=!1),"pic"==c&&(e.selimg=!0,e.seltext=!1)})}},computed:Object(r["a"])({username:function(){return Object(h["k"])()}},Object(d["d"])({token:function(t){return t.user.token}})),watch:{"$root.nowSite":{handler:function(t){this.uploadForm.data.siteId=t.id},deep:!0}}}),_=f,g=(o("6f3c"),o("2877")),y=Object(g["a"])(_,i,a,!1,null,"0e80397e",null);e["default"]=y.exports},"6f3c":function(t,e,o){"use strict";var i=o("e104"),a=o.n(i);a.a},e104:function(t,e,o){},e829:function(t,e,o){o("2f37"),t.exports=o("584a").Date.now},e945:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("script",{ref:"editor",attrs:{id:t.id,type:"text/plain"}})])},a=[],s={name:"UE",data:function(){return{editor:null}},props:{defaultMsg:{type:String},config:{type:Object},id:{type:String}},mounted:function(){var t=this;this.editor=window.UE.getEditor(this.id,this.config),this.editor.addListener("ready",function(){t.editor.setContent(t.defaultMsg)})},methods:{getUEContent:function(){return this.editor.getContent()},getUEContentTxt:function(){return this.editor.getContentTxt()}},destroyed:function(){this.editor.destroy()}},n=s,r=o("2877"),c=Object(r["a"])(n,i,a,!1,null,null,null),l=c.exports;e["a"]=l}}]);