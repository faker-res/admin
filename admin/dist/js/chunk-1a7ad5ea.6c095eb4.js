(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a7ad5ea"],{"132e":function(e,t,a){"use strict";var s=a("7219"),r=a.n(s);r.a},"134a":function(e,t,a){},"2ca4":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("collapse",{attrs:{simple:"",value:"1"}},[a("panel",{attrs:{name:"1","hide-arrow":!0}},[a("div",{staticClass:"title",on:{click:function(t){e.open=!e.open}}},[e._v("返点设置\n      "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:!e.open,expression:"!open"}],attrs:{type:"ios-arrow-down",size:"18",color:"#999"}}),a("Icon",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],attrs:{type:"ios-arrow-forward",size:"18",color:"#999"}})],1),a("div",{staticClass:"section p15",attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"btns"},e._l(e.lottMenu,function(t,s){return a("Button",{key:s,staticClass:"lottery mr20",class:e.showKey==t?"bd-bg":"bg-or",on:{click:function(a){return e.onselectLott(t,s)}}},[e._v(e._s(t))])}),1),a("div",{staticClass:"clearfix"},[e.$route.params.page?a("div",{staticClass:"clearfix"},[a("div",{staticClass:"fl clearfix h60"},[a("div",{staticClass:"label fl"},[e._v("统一设置：")]),a("Select",{staticClass:"fl",staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},on:{"on-change":e.batchSetRebate},model:{value:e.batchRebate,callback:function(t){e.batchRebate=t},expression:"batchRebate"}},e._l(e.defaultOptions,function(t,s){return a("Option",{key:s,attrs:{value:t}},[e._v(e._s(t)+"%")])}),1)],1),a("div",{staticClass:"fl ml20 clearfix h60"},[a("div",{staticClass:"label fl"},[e._v("批量设置：")]),a("div",{staticClass:"fl"},[a("Button",{attrs:{icon:"ios-remove",size:"small"},on:{click:e.reduceRebate}}),a("Button",{staticClass:"ml20",attrs:{icon:"ios-add",size:"small"},on:{click:e.addRebate}})],1)])]):e._e(),e._l(e.lottSub[e.showKey],function(t){return a("div",{key:t.id,staticClass:"clearfix w25 h40 fl"},[a("div",{staticClass:"label fl"},[e._v(e._s(t.name)+"：")]),e.$route.params.page?a("div",{staticClass:"fl"},[a("Select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择"},on:{"on-change":e.selectSingleRabate},model:{value:t.rebate,callback:function(a){e.$set(t,"rebate",a)},expression:"lott.rebate"}},e._l(t.options,function(t,s){return a("Option",{key:s,attrs:{value:t}},[e._v(e._s(t)+"%")])}),1),e.showParent?a("span",{staticClass:"tip"},[e._v("上限："+e._s((+t.parent_rebate).toFixed(2)||"-")+"%")]):e._e()],1):a("div",[e._v(e._s(t.rebate)+"%")])])})],2)])])],1)},r=[],n=a("f499"),o=a.n(n),i=(a("c5f6"),a("ac6a"),a("83ae")),c=a("c276"),l={components:{Icons:i["a"]},props:{data:{type:Array,required:!0,default:function(){return[]}},showParent:{type:Boolean,default:!1}},data:function(){return{open:!1,lottIndex:0,showKey:"六合彩",batchRebate:""}},computed:{defaultOptions:function(){for(var e=[],t=0;t<3;t++)for(var a=0;a<=10;a++){var s=.1*a;e[e.length]=(t+s).toFixed(2)}return e},lottMenu:function(){for(var e=[],t=0;t<this.data.length;t++)e[e.length]=this.data[t].className;return Object(c["n"])(e)},lottSub:function(){for(var e={},t=0;t<this.lottMenu.length;t++){var a=this.lottMenu[t];e[a]=[];for(var s=0;s<this.data.length;s++)if(this.data[s].className===this.lottMenu[t]){var r=e[a].length;this.data[s].options=this.createOptions(+this.data[s].parent_rebate||3),e[a][r]=this.data[s]}}for(var n in e)e[n].forEach(function(e){e.rebate=Number(e.rebate).toFixed(2)});return e}},methods:{batchSetRebate:function(e){e&&(this.lottSub[this.showKey].forEach(function(t){t.rebate=e}),this.createData())},selectSingleRabate:function(){this.createData()},onselectLott:function(e,t){this.lottIndex=t,this.showKey=e,this.batchRebate=""},reduceRebate:function(e){this.lottSub[this.showKey].forEach(function(e){var t=+e.rebate-.1;t=t<=0?0:t,e.rebate=t.toFixed(2)}),this.createData()},addRebate:function(){this.lottSub[this.showKey].forEach(function(e){var t=+e.rebate+.1;t=t>=+e.parent_rebate?+e.parent_rebate:t,e.rebate=t.toFixed(2)}),this.createData()},createOptions:function(e){for(var t=[],a=0;a<e;a++)for(var s=0;s<=10;s++){var r=.1*s;a+r<=e&&t.push((a+r).toFixed(2))}return t},createData:function(){var e={};return this.data.forEach(function(t){var a="CT_".concat(t.id,"_LOTTERY");e[a]=t.rebate}),this.$emit("on-rebate-change",o()(e)),o()(e)}}},u=l,d=(a("8c6e"),a("2877")),f=Object(d["a"])(u,s,r,!1,null,"259de1b0",null),m=f.exports;t["a"]=m},"45be":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"v2-edit"},[a("div",{staticClass:"items bb"},[a("div",{staticClass:"title"},[e._v("基础设置")]),a("div",{staticClass:"section"},[a("Form",{ref:"Form",attrs:{inline:"","label-width":100,model:e.formKey,rules:e.rules}},[a("FormItem",{staticClass:"w25 ti10",attrs:{label:"会员账号",prop:"userName"}},[a("Input",{staticClass:"s-140",attrs:{placeholder:"会员账号",disabled:""},model:{value:e.formKey.userName,callback:function(t){e.$set(e.formKey,"userName",t)},expression:"formKey.userName"}})],1),0!==e.formKey.agencyId?a("FormItem",{staticClass:"w25 ti10",attrs:{label:"上级代理",prop:"agencyName"}},[a("AutoSearch",{ref:"autoSearch",staticClass:"auto-serch",attrs:{width:140,clearable:!1,placeholder:"默认查询"},on:{sendSuperior:e.getSuperior,sendId:e.getId}})],1):e._e(),a("FormItem",{staticClass:"w25 ti10",attrs:{label:"真实姓名",prop:"realName"}},[a("Input",{staticClass:"s-140",attrs:{placeholder:"暂无信息",disabled:""},model:{value:e.formKey.realName,callback:function(t){e.$set(e.formKey,"realName",t)},expression:"formKey.realName"}})],1),a("FormItem",{staticClass:"w25 ti10",attrs:{label:"邮箱账号",prop:"email"}},[a("Input",{staticClass:"s-200",attrs:{placeholder:"暂无信息"},model:{value:e.formKey.email,callback:function(t){e.$set(e.formKey,"email",t)},expression:"formKey.email"}})],1),a("FormItem",{staticClass:"w25 ti10",attrs:{label:"手机号码",prop:"phone"}},[a("Input",{staticClass:"s-140",attrs:{placeholder:"暂无信息"},model:{value:e.formKey.phone,callback:function(t){e.$set(e.formKey,"phone",t)},expression:"formKey.phone"}})],1),a("FormItem",{staticClass:"w25 ti10",attrs:{label:"微信账号",prop:"wechat"}},[a("Input",{staticClass:"s-140",attrs:{placeholder:"暂无信息"},model:{value:e.formKey.wechat,callback:function(t){e.$set(e.formKey,"wechat",t)},expression:"formKey.wechat"}})],1),a("FormItem",{staticClass:"w50 ti10",attrs:{label:"备注信息",prop:"remark"}},[a("Input",{staticClass:"s-436",attrs:{placeholder:"此栏位仅供管理者记录其他资讯，会员无法检视"},model:{value:e.formKey.remark,callback:function(t){e.$set(e.formKey,"remark",t)},expression:"formKey.remark"}})],1)],1)],1)]),a("div",{staticClass:"items mt15 bb"},[a("div",{staticClass:"section"},[a("RebateSelect",{ref:"rebateSelect",attrs:{showParent:!1,data:e.rebate},on:{"on-rebate-change":e.onRebateChange}})],1)]),a("div",{staticClass:"items mt15 bb"},[a("div",{staticClass:"section"},[a("RefundSelect",{ref:"refundSelect",attrs:{data:e.refund,showParent:!1},on:{"on-refund-change":e.onRefundChange}})],1)]),a("div",{staticClass:"items mt15"},[a("div",{staticClass:"flex-row p10"},[a("div",{staticClass:"flex-row"},[a("Button",{staticClass:"more-btn ml40 ivu-btn export-ok",staticStyle:{width:"140px"},attrs:{type:"primary",loading:e.$root.editBtnLoading},on:{click:e.submit}},[e._v("确认保存")]),"super"==e.adminType||-1!=e.authInPage.indexOf("memberResetPassword")?a("Button",{staticClass:"more-btn ml40",on:{click:function(t){return e.resetMemberPassowrd("secret")}}},[e._v("重设密保答案")]):e._e(),"super"==e.adminType||-1!=e.authInPage.indexOf("memberResetPassword")?a("Button",{staticClass:"more-btn ml40",on:{click:function(t){return e.resetMemberPassowrd("payPwd")}}},[e._v("重设取款密码")]):e._e(),"super"==e.adminType||-1!=e.authInPage.indexOf("memberResetPassword")?a("Button",{staticClass:"more-btn ml40",on:{click:function(t){return e.resetMemberPassowrd("loginPwd")}}},[e._v("重设登陆密码")]):e._e()],1)])]),a("Modals",{ref:"successModal",attrs:{width:"480",height:"280",title:e.title}},[a("div",{staticClass:"v2-form-wrapper flex-column",attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"mb40 clearfix"},[a("Input",{staticClass:"fl w70 disabled",attrs:{disabled:""},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}}),a("Button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.result,expression:"result",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"}],staticClass:"bgc pl20 fl ft20",attrs:{type:"info",size:"small"}},[a("span",{staticClass:"ft20 blue-font"},[e._v("复制")])])],1),a("Button",{staticClass:"export-ok ft20",attrs:{type:"primary"},on:{click:e.secondSure}},[e._v("确定")])],1)])],1)},n=[],o=a("cebc"),i=(a("c5f6"),a("ac6a"),a("2ca4")),c=a("ded5"),l=a("d027"),u=a("5c64"),d=a("8194"),f=a("f28b"),m=a("c276"),h={components:{RebateSelect:i["a"],RefundSelect:u["a"],Modals:l["a"],AutoSearch:c["a"]},data:function(){return{adminType:Object(m["l"])(),authInPage:JSON.parse(localStorage.authInPage),title:"",result:"",formKey:{userName:"",agencyName:"",agencyId:-1,siteId:"",uid:"",realName:"",phone:"",email:"",wechat:"",remark:"",rebate:"",refund:""},rebate:[],refund:[],bankInfo:[],rules:{userName:[{required:!0,message:"请输入会员账号",trigger:"blur"}],agencyName:[{required:!0,message:"请选择上级代理",trigger:"blur"}],email:[{type:"email",message:"请输入正确的邮箱格式",trigger:"blur"}],phone:[{pattern:/^1(3|4|5|7|8)\d{9}$/,message:"请输入正确的手机格式",trigger:"blur"}]}}},created:function(){var e=this.$route.query,t=e.uid,a=e.siteId;this.getDetails({params:{uid:t,siteId:a}})},watch:{"formKey.agencyName":{handler:function(e,t){this.$refs.autoSearch.setDefault(e);var a={uname:e,siteId:this.$root.nowSite.id};this.getRebateSetting(a)}}},methods:{getSiteData:function(){var e=this,t={siteId:this.$root.nowSite.id,uname:""};Object(f["k"])(t).then(function(t){var a=t.data,s=a.rebate,r=a.platform;e.rebate.forEach(function(e){var t=s.filter(function(t){return t.id===e.id});e.parent_rebate=t[0]?t[0].rebate:""});var n=function(t){e.refund[t].list.forEach(function(e){var a=r[t].list.filter(function(t){return t.key===e.name_en});e.parent_refund=a[0]?a[0].value:""})};for(var o in e.refund)n(o);e.rebateShow=!0})},getSuperior:function(e){this.formKey.agencyName=e},getId:function(e){this.formKey.agencyId=e},getDetails:function(e){var t=this;Object(d["m"])(e).then(function(e){var a=e.data,s=a.basic,r=a.rebate,n=a.refund,o=a.bank_info;for(var i in t.rebate=r,t.rebate.forEach(function(e){e.rebate=Number(e.rebate).toFixed(2)}),t.refund=n,t.bankInfo=o,t.formKey)for(var c in s)i===c&&(t.formKey[i]=s[c])}).then(function(e){0==t.$route.query.agencyId&&t.getSiteData()})},secondSure:function(){this.$refs.successModal.hide(),this.$Message.success(this.title)},getRebateSetting:function(e){var t=this;Object(f["k"])(e).then(function(e){var a=e.data,s=a.rebate,r=a.platform;t.rebate.forEach(function(e){var t=s.filter(function(t){return t.id===e.id});e.parent_rebate=t[0]?t[0].rebate:""});var n=function(e){t.refund[e].list.forEach(function(t){var a=r[e].list.filter(function(e){return e.key===t.name_en});t.parent_refund=a[0]?a[0].value:""})};for(var o in t.refund)n(o);t.rebateShow=!0})},onRebateChange:function(e){this.formKey.rebate=e,s},onRefundChange:function(e){this.formKey.refund=e},onCopy:function(){this.$Message.success("复制".concat(this.result,"成功!")),this.$refs.successModal.hide()},submit:function(){var e=this;this.$root.startEditLoading(),this.$refs.Form.validate(function(t){if(t){var a=e.$route.query,s=a.siteId,r=a.agencyId,n=Object(o["a"])({},e.formKey);for(var i in n.siteId=s,n)n[i]||delete n[i];0==r&&(n.agencyId=r,n.agencyName=""),delete n.userName,n.rebate||(n.rebate=e.$refs.rebateSelect.createData()),n.refund||(n.refund=e.$refs.refundSelect.createData()),Object(d["v"])(n).then(function(t){t.code&&200==t.code&&e.$router.push({name:"memberSearch"})})}})},resetMemberPassowrd:function(e){var t,a,s=this,r=this.$route.query,n=r.siteId,o=r.uid,i={siteId:n,uid:o,type:e};switch(e){case"secret":t="您确认要重设密保答案吗？",a="重设密保答案成功！";break;case"loginPwd":t="您确认要重设登录密码吗？",a="重设登录密码成功！";break;case"payPwd":t="你确定要重设取款密码吗？",a="重设取款密码成功！";break}this.$Tip.confirm({content:t,onOk:function(){Object(d["u"])(i,123).then(function(e){s.result=e.data,s.title=a,s.$refs.successModal.show()})}})}}},p=h,b=(a("132e"),a("2877")),v=Object(b["a"])(p,r,n,!1,null,"568b6f91",null);t["default"]=v.exports},"5c64":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("collapse",{attrs:{simple:"",value:"1"}},[a("panel",{attrs:{name:"1","hide-arrow":!0}},[a("div",{staticClass:"title",on:{click:function(t){e.open=!e.open}}},[e._v("\n      返水设置\n      "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:!e.open,expression:"!open"}],attrs:{type:"ios-arrow-down",size:"18",color:"#999"}}),a("Icon",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],attrs:{type:"ios-arrow-forward",size:"18",color:"#999"}})],1),a("div",{staticClass:"section p15",attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"btns"},e._l(e._data_,function(t,s){return a("Button",{key:t.name,staticClass:"lottery mr20",class:e.showKey==s?"bd-bg":"bg-or",on:{click:function(t){return e.onselectMenu(s)}}},[e._v(e._s(t.name))])}),1),e._data_[e.showKey]?a("div",{staticClass:"clearfix info pt10"},e._l(e._data_[e.showKey].list,function(t){return a("div",{key:t.name_en,staticClass:"clearfix w20 h40 fl"},[a("div",{staticClass:"label fl"},[e._v(e._s(t.name_cn)+"：")]),e.$route.params.page?a("div",{staticClass:"fl"},[a("InputNumber",{staticClass:"w60xh36",attrs:{step:.1,max:t.parent_refund,min:0},on:{"on-change":e.onChange},model:{value:t.refund,callback:function(a){e.$set(t,"refund",a)},expression:"sub.refund"}}),e.showParent?a("span",{staticClass:"tip"},[a("span",{staticClass:"mr5"},[e._v("上限")]),e._v("\n              "+e._s(t.parent_refund.toFixed(2)||"-")+"\n            ")]):e._e()],1):a("div",[e._v(e._s(t.refund))])])}),0):e._e()])])],1)},r=[],n=a("f499"),o=a.n(n),i=(a("ac6a"),a("cebc")),c=a("83ae"),l=(a("c276"),{components:{Icons:c["a"]},props:{data:{type:[Object,Array],required:!0,default:function(){}},showParent:{type:Boolean,required:!1,default:!1}},data:function(){return{open:!1,showKey:"live"}},computed:{_data_:function(){var e=Object(i["a"])({},this.data);for(var t in e)e[t].list.forEach(function(e){e.refund=+e.refund,e.parent_refund=+e.parent_refund});return e}},methods:{onselectMenu:function(e){this.showKey=e},onChange:function(e){this.createData()},createData:function(){var e={};for(var t in this._data_)this._data_[t].list.forEach(function(t){e[t.name_en]=t.refund});return this.$emit("on-refund-change",o()(e)),o()(e)}}}),u=l,d=(a("6e9d"),a("2877")),f=Object(d["a"])(u,s,r,!1,null,"deef8c56",null),m=f.exports;t["a"]=m},"6e9d":function(e,t,a){"use strict";var s=a("134a"),r=a.n(s);r.a},7219:function(e,t,a){},"8c6e":function(e,t,a){"use strict";var s=a("fac7"),r=a.n(s);r.a},fac7:function(e,t,a){}}]);