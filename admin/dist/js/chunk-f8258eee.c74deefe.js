(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8258eee"],{"5d48":function(e,t,a){"use strict";var n=a("ad46"),s=a.n(n);s.a},ad46:function(e,t,a){},c399:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"v2-search"},[a("Form",{ref:"searchKey",attrs:{inline:""}},[a("FormItem",{attrs:{label:"状态"}},[a("Select",{staticClass:"s-86",model:{value:e.searchKey.status,callback:function(t){e.$set(e.searchKey,"status",t)},expression:"searchKey.status"}},[a("Option",{attrs:{value:"all"}},[e._v("全部")]),a("Option",{attrs:{value:"yes"}},[e._v("启用")]),a("Option",{attrs:{value:"no"}},[e._v("停用")])],1)],1),a("FormItem",[a("Checkbox",{model:{value:e.searchKey.isLike,callback:function(t){e.$set(e.searchKey,"isLike",t)},expression:"searchKey.isLike"}},[a("span",{staticClass:"pl5"},[e._v("模糊")])])],1),a("FormItem",[a("Select",{staticClass:"s-100",model:{value:e.searchKey.checktype,callback:function(t){e.$set(e.searchKey,"checktype",t)},expression:"searchKey.checktype"}},[a("Option",{attrs:{value:"0"}},[e._v("会员账号")]),a("Option",{attrs:{value:"1"}},[e._v("上级代理")])],1)],1),a("FormItem",[a("Input",{staticClass:"s-140",attrs:{placeholder:"多个请以,逗号隔开"},model:{value:e.searchKey.val,callback:function(t){e.$set(e.searchKey,"val",t)},expression:"searchKey.val"}})],1),a("FormItem",[a("Poptip",{staticClass:"ml14f",attrs:{trigger:"hover",content:"多个请以,逗号隔开,仅支持同类型多个输入",placement:"bottom-end"}},[a("Icons",{attrs:{type:"bangzhutishi",color:"#E4E4E4",size:26}})],1)],1),a("FormItem",[a("Button",{staticClass:"search",attrs:{type:"primary",loading:e.$root.searchBtnLoading},on:{click:e.searchSubmit}},[e._v("查询")])],1)],1)],1),a("div",{staticClass:"v2-table"},[a("Tables",{attrs:{editable:"",columns:e.table.columns,loading:e.$root.tableLoading,value:e.table.data,total:e.table.total,pageSizeOpts:e.table.pageSizeOpts},on:{"on-page-change":e.onPageChange,"on-sort-change":e.sortChange}})],1),a("Modals",{ref:"changeAgency",attrs:{title:"切换上级代理",width:"766"}},[a("div",{staticClass:"v2-form-wrapper",attrs:{slot:"content"},slot:"content"},[a("Form",{ref:"agencyInfo",staticStyle:{width:"766px"},attrs:{model:e.agencyInfo,rules:e.agencyInfoRulesValidate,"label-width":233}},[a("FormItem",{attrs:{label:"会员账号"}},[a("Input",{staticClass:"w260x",attrs:{disabled:""},model:{value:e.agencyInfo.changingAgency,callback:function(t){e.$set(e.agencyInfo,"changingAgency",t)},expression:"agencyInfo.changingAgency"}})],1),a("FormItem",{attrs:{label:"上级代理",prop:"superior"}},[a("Input",{staticClass:"w260x",model:{value:e.agencyInfo.superior,callback:function(t){e.$set(e.agencyInfo,"superior",t)},expression:"agencyInfo.superior"}})],1),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:"vip"==e.searchKey.searchType,expression:"searchKey.searchType == 'vip'"}],attrs:{label:"代理等级"}}),a("FormItem",{attrs:{label:"备注信息"}},[a("Input",{staticClass:"w260x",attrs:{type:"textarea",rows:6,placeholder:"此栏位仅供管理者记录其他咨询，会员无法检视"},model:{value:e.agencyInfo.remarks,callback:function(t){e.$set(e.agencyInfo,"remarks",t)},expression:"agencyInfo.remarks"}})],1),a("FormItem",[a("Button",{staticClass:"ivu-btn submit bg",attrs:{loading:e.$root.editBtnLoading},on:{click:e.save}},[e._v("确认保存")])],1)],1)],1)])],1)},s=[],i=a("e069"),r=a("fa69"),o=a("83ae"),c=a("c276"),l=a("f28b"),h=a("fab6"),u=a("d027"),m=a("45e2"),d={name:"agencySearch",mixins:[h["a"]],components:{Icons:o["a"],Tables:r["a"],Modals:u["a"],ShowMore:m["a"]},data:function(){var e=this;this.$createElement;return{searchKey:{checktype:"0",status:"all",val:"",isLike:!0},Time:[this.$root.startTime(),this.$root.formatnightTimeS()],table:{data:[],total:0,pageSizeOpts:[20],columns:[{title:"会员账号",key:"userName",align:"center",render:function(e,t){return e(i["Tooltip"],{attrs:{placement:"right"}},[e("div",{style:{display:"flex",justifyContent:"space-around",alignItems:"center"}},[e("span",{style:{width:"80px"}},[t.row.userName]),e(o["a"],{attrs:{type:"huiyuanchaxunzaixian",color:"yes"===t.row.active?"#57A3F3":"#B3B3B3",size:"20"}})]),e("div",{slot:"content"},["yes"===t.row.active?"在线":"离线"])])}},{title:"账号类型",key:"agencyType",align:"center",render:function(e,t){return e("span",["agency"==t.row.agencyType?"".concat(t.row.levelId,"级代理"):"大股东"])}},{title:"上级代理",key:"superiorUserName",align:"center"},{title:"下级人数",key:"subordinate",align:"center",render:function(t,a){return t("a",[t("span",{style:"color:#57A3F3FF",class:"cs",on:{click:function(){e.$router.push({name:"agencySubordinate"})}}},[a.row.subordinate])])}},{title:"有效人数",key:"valid",align:"center"},{title:"新增人数",key:"newAdd",align:"center"},{title:"首存人数",key:"deposit",align:"center"},{title:"团队净盈利",key:"profit",align:"center"},{title:"团队余额",key:"balance",align:"center"},{title:"状态",key:"status",align:"center",render:function(e,t){return e("span",{style:{color:t.row.return?"#515a6e":"#FF2626"}},[t.row.return?"正常":"停用"])}},{title:"操作",align:"center",width:"150",render:function(t,a){return t("div",{class:"flex-row"},[t("a",[t("span",{class:"blue-font",on:{click:function(t){var n=a.row.return?"您确定停用该会员状态吗?":"您确定启用该会员状态吗",s=a.row.return?"停用状态成功":"启用状态成功";e.$Tip.confirm({content:n,onOk:function(){e.$Tip.success({content:s,onOk:function(){}})}})}}},[a.row.return?"停用":"启用"])]),t("a",[t("span",{class:"blue-font",on:{click:function(t){e.agencyInfo.changingAgency=a.row.account,e.$refs.changeAgency.show()}}},["切换上级代理"])])])}},{title:"...",type:"expand",align:"center",width:"50",render:function(t,a){var n=e;return t(m["a"],{props:{fd_type:n.fd_type,fs_type:n.fs_type,search_type:n.searchKey.searchType},on:{change_fd_type:function(e){n.fd_type=e},change_fs_type:function(e){n.fs_type=e}}})}}]},agencyInfo:{changingAgency:"sadasa"},agencyInfoRulesValidate:{superior:[{required:!0,message:"请输入上级代理",trigger:"blur"}]},fd_type:"liuhecai",fs_type:"zhenrenshixun",index:0}},mounted:function(){this.searchKey.siteId=this.$root.nowSite.id},methods:{searchSubmit:function(){},getData:function(e){var t=this;this.$root.startTableLoading(),Object(l["j"])(e).then(function(e){var a=e.data,n=a.total,s=a.data;t.table.total=n,t.table.data=s})},save:function(){this.$refs.changeAgency.hide(),this.$Tip.success({content:"修改成功",onOk:function(){}})},sortChange:function(e){Object(c["A"])(e)}}},p=d,y=(a("5d48"),a("2877")),g=Object(y["a"])(p,n,s,!1,null,"b344be14",null);t["default"]=g.exports},fab6:function(e,t,a){"use strict";var n=a("cebc"),s=a("2f62"),i={data:function(){return{Time:[],searchKey:{},page:1,sortParams:{}}},computed:Object(n["a"])({},Object(s["d"])({nowSite:function(e){return e.user.nowSite}})),watch:{},filters:{},mounted:function(){var e={siteId:this.$root.nowSite.id};this.getData({params:Object(n["a"])({},this.searchKey,e)})},methods:{onPageChange:function(e){var t=Object(n["a"])({},this.searchKey,{siteId:this.nowSite.id});for(var a in t)t[a]||delete t[a];delete t.startTime,delete t.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(t.startTime=this.$root.formatTimeS(this.Time[0]),t.endTime=this.$root.formatnightTimeS(this.Time[1])),this.page=e,t=Object(n["a"])({},t,this.sortParams),this.getData({params:t,query:{page:e}})},onPageSizeChange:function(e){this.searchKey.limit=e;var t=Object(n["a"])({},this.searchKey,{siteId:this.nowSite.id,limit:e});for(var a in t)t[a]||delete t[a];delete t.startTime,delete t.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(t.startTime=this.$root.formatTimeS(this.Time[0]),t.endTime=this.$root.formatnightTimeS(this.Time[1])),console.log(t),this.getData({params:t})},sortChange:function(e){e.column;var t=e.key,a=e.order,s={sortKey:t,sortVal:a,siteId:this.$root.nowSite.id};this.searchKey.startTime=this.$root.formatTimeS(this.Time[0]),this.searchKey.endTime=this.$root.formatnightTimeS(this.Time[1]),"normal"===s.sortVal&&(delete s.sortKey,delete s.sortVal),this.sortParams={},this.sortParams=Object(n["a"])({},s),1!==this.page?this.getData({params:Object(n["a"])({},this.searchKey,s),query:{page:this.page}}):this.getData({params:Object(n["a"])({},this.searchKey,s)})},exportExcel:function(){this.$root.exportBtnLoading=!0,this.$root.exportBtnLoading=!1}}};t["a"]=i}}]);