(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61febc88"],{2237:function(e,t,a){},"4e9c":function(e,t,a){"use strict";var s=a("2237"),n=a.n(s);n.a},"6c96":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"v2-search"},[a("Form",{ref:"searchKey",attrs:{inline:""}},[a("FormItem",{attrs:{label:"状态"}},[a("Select",{staticClass:"s-86",attrs:{clearable:"",placeholder:"全部"},model:{value:e.searchKey.status,callback:function(t){e.$set(e.searchKey,"status",t)},expression:"searchKey.status"}},[a("Option",{attrs:{value:"yes"}},[e._v("正常")]),a("Option",{attrs:{value:"no"}},[e._v("停用")]),a("Option",{attrs:{value:"online"}},[e._v("在线")]),a("Option",{attrs:{value:"offline"}},[e._v("离线")]),a("Option",{attrs:{value:"catch"}},[e._v("异常")])],1)],1),a("FormItem",{attrs:{label:"客户端"}},[a("Select",{attrs:{clearable:"",placeholder:"全部"},model:{value:e.searchKey.lastDevice,callback:function(t){e.$set(e.searchKey,"lastDevice",t)},expression:"searchKey.lastDevice"}},e._l(e.platformList,function(t,s){return a("Option",{key:s,attrs:{value:t.value}},[e._v(e._s(t.name))])}),1)],1),a("FormItem",{attrs:{label:"等级"}},[a("LevelSelect",{ref:"LevelSelect",attrs:{placeholder:"全部",clearable:"",width:"86",levelType:"member"},on:{"on-level-change":e.levelChange}})],1),a("FormItem",{attrs:{label:"开始日期"}},[a("DatePicker",{staticClass:"s-120",attrs:{type:"date",placeholder:"开始时间"},model:{value:e.Time[0],callback:function(t){e.$set(e.Time,0,t)},expression:"Time[0]"}})],1),a("FormItem",{attrs:{label:"结束日期"}},[a("DatePicker",{staticClass:"s-120",attrs:{type:"date",placeholder:"结束时间"},model:{value:e.Time[1],callback:function(t){e.$set(e.Time,1,t)},expression:"Time[1]"}})],1),a("FormItem",[a("Checkbox",{model:{value:e.searchKey.isLike,callback:function(t){e.$set(e.searchKey,"isLike",t)},expression:"searchKey.isLike"}},[a("span",[e._v("模糊")])])],1),a("FormItem",[a("Select",{staticClass:"s-140",attrs:{placeholder:"请选择查询类型"},model:{value:e.searchKey.typeTag,callback:function(t){e.$set(e.searchKey,"typeTag",t)},expression:"searchKey.typeTag"}},[a("Option",{attrs:{value:"userName"}},[e._v("会员账号")]),a("Option",{attrs:{value:"agencyName"}},[e._v("上级代理")]),a("Option",{attrs:{value:"phone"}},[e._v("手机号码")]),a("Option",{attrs:{value:"email"}},[e._v("Email")]),a("Option",{attrs:{value:"wechat"}},[e._v("微信号")]),a("Option",{attrs:{value:"shareholder"}},[e._v("大股东")]),a("Option",{attrs:{value:"realName"}},[e._v("姓名")])],1)],1),a("FormItem",[a("Input",{staticClass:"s-140",attrs:{placeholder:"多个请以,逗号隔开",disabled:!e.searchKey.typeTag},model:{value:e.searchKey.content,callback:function(t){e.$set(e.searchKey,"content",t)},expression:"searchKey.content"}})],1),a("FormItem",[a("Poptip",{staticClass:"ml14f",attrs:{trigger:"hover",content:"多个请以,逗号隔开,仅支持同类型多个输入",placement:"bottom-end"}},[a("Icons",{attrs:{type:"bangzhutishi",color:"#E4E4E4",size:26}})],1)],1),a("FormItem",[a("Button",{staticClass:"search",attrs:{type:"primary",loading:e.$root.searchBtnLoading},on:{click:e.searchSubmit}},[e._v("查询")])],1)],1)],1),a("div",{staticClass:"v2-table"},[a("Tables",{ref:"tables",attrs:{loading:e.$root.tableLoading,columns:e.table.columns,value:e.table.data,total:e.table.total,pageSizeOpts:e.table.pageSizeOpts},on:{"on-page-change":e.onPageChange,"on-page-size-change":e.onPageSizeChange,"on-sort-change":e.sortChange}})],1),a("Modals",{ref:"oneTabFundsModal",attrs:{title:e.fundsModalTitle}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("Tabs",{attrs:{type:"card",value:"single"}},[a("TabPane",{attrs:{label:"加款/减款",name:"single"}},[a("FundsForms",{ref:"oneTabFundsForms",attrs:{mode:"single",oprateTypes:e.oprateTypes},on:{"on-submit":e.submitFundsForm}})],1)],1)],1)]),a("Modals",{ref:"twoTabFundsModal",attrs:{title:e.fundsModalTitle},on:{modalVisible:e.modalVisible}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("Tabs",{attrs:{type:"card",value:"single"},on:{"on-click":e.tabChange}},[a("TabPane",{attrs:{label:"加款/减款",name:"single"}},[a("FundsForms",{ref:"twoTabFundsForms",attrs:{mode:"single",oprateTypes:e.oprateTypes},on:{"on-submit":e.submitFundsForm}})],1),a("TabPane",{attrs:{label:"批量加款/减款",name:"batch"}},[a("FundsForms",{attrs:{oprateTypes:e.oprateTypes,mode:"batch"},on:{"on-submit":e.submitFundsForm}})],1)],1)],1)]),a("Modals",{ref:"historyModal",attrs:{title:"历史登录",width:"800"}},[a("div",{staticClass:"modal-overflow",attrs:{slot:"content"},slot:"content"},[a("Tables",{attrs:{columns:e.historyTable.columns,loading:e.historyTable.loading,value:e.historyTable.data,page:!1}})],1)]),a("member-code-detail",{attrs:{codeDetailTitle:"mainCodeDetail"}}),a("div")],1)},n=[],i=(a("6762"),a("2fdb"),a("28a5"),a("768b")),o=a("75fc"),r=a("cebc"),l=(a("7f7f"),a("c5f6"),a("fa69")),c=a("83ae"),u=a("d027"),d=a("1055"),m=a("4475"),p=a("e069"),h=a("fab6"),y=a("c276"),b=a("8da3"),f=a("8194"),g={name:"memberSearch",mixins:[h["a"]],components:{Tables:l["a"],Icons:c["a"],Modals:u["a"],FundsForms:d["a"],LevelSelect:m["a"],memberCodeDetail:b["a"]},data:function(){var e=this;this.$createElement;return{flag:{member:[],refund:[]},uid:[],adminType:Object(y["l"])(),sort:!1,authInPage:JSON.parse(localStorage.authInPage),sortParams:{},routes:[],page:1,searchKey:{typeTag:"userName"},Time:[],platformList:[{value:"pc",name:"PC"},{value:"h5",name:"H5"},{value:"ios",name:"IOS"},{value:"android",name:"Android"}],fundsModalTitle:"加款/减款",oprateTypes:{add:{manual:{id:0,type:"deposit",subType:"manual",class:"存款",subClass:"人工汇款"},giftBonusAdmin:{id:1,type:"bonus",subType:"giftBonusAdmin",class:"彩金",subClass:"彩金派送"},RebateBonus:{type:"bonus",subType:"manualRebateBonus",class:"返水",subClass:"返水派送"},bonus:{id:3,type:"bonus",subType:"manualBonus",class:"优惠",subClass:"汇款优惠"},transfer:{id:4,type:"deposit",subType:"transfer",class:"额度转换",subClass:"额度转换失败"},other:{id:5,type:"other",subType:"other",class:"其他",subClass:"其他"}},reduce:{manual:{id:6,type:"withdrawals",subType:"manual",class:"取款",subClass:"人工提出"},other:{id:7,type:"other",subType:"other",class:"其他",subClass:"其他"}}},table:{total:0,loading:!0,pageSizeOpts:[20,30,40,50],columns:[{title:"会员账号",key:"userName",align:"center",width:180,render:function(t,a){var s=!0;return t(p["Tooltip"],{attrs:{placement:"right",title:a.row.userName.length>9?a.row.userName:""}},[t("div",{style:{display:"flex",justifyContent:"space-around",alignItems:"center"}},[t("span",{style:{width:"135px",cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},on:{click:function(){s&&e.$store.commit("setCodeDetail",{uid:a.row.uid,time:(new Date).getTime(),title:"mainCodeDetail"})},mousemove:function(e){e.movementX>4&&(s=!1)},mousedown:function(){s=!0}}},[a.row.userName]),t(c["a"],{attrs:{type:"huiyuanchaxunzaixian",color:"off"==a.row.online?"#B3B3B3":"#57A3F3",size:"20"}})]),t("div",{slot:"content"},["off"===a.row.online?"离线":a.row.lastDevice+"在线"])])}},{title:"姓名",key:"realname",align:"center",width:95,render:function(t,a){return t("span",[e.$root.text(a.row.realName)])}},{title:"账号类型",key:"account_type",align:"center",width:90},{title:"等级",key:"levelAlias",align:"center",width:80},{title:"上级代理",key:"agencyName",align:"center",render:function(t,a){return t("span",[e.$root.text(a.row.agencyName)])}},{title:"余额",key:"balance",align:"center",sortable:"custom",render:function(t,a){var s=a.row.wallet,n=s.last,i=s.list;return t(p["Tooltip"],{attrs:{placement:"bottom",width:"900px"},style:"{display: block}",class:"money-tip"},[t("a",{class:"blue-font"},[Number(n.balance).toFixed(2)]),t("div",{slot:"content"},[t("div",[t("div",{class:"tooltip-title flex-row"},[t("div",{class:"txt-right-liner mt10",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("thirdBalanceRecycle")?"inline-block":"none"}},[t(c["a"],{attrs:{type:"huiyuanchaxunzhuanhui",color:"#FFF",size:"20"}}),t("span",{class:"icon-right-txt",on:{click:function(t){e.changeBalance(a)}}},["转回"])]),t("div",{class:"txt-right-liner mt10",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("refreshThirdBalance")?"inline-block":"none"}},[t(c["a"],{attrs:{type:"huiyuanchaxunshuaxin",color:"#FFF",size:"18"}}),t("span",{class:"icon-right-txt",on:{click:function(t){e.refreshBalance(a)}}},["刷新"])])]),t("div",{class:"tooltip-section pb10 flex-row"},[i.length?i.map(function(e,a){return t("div",{class:"items balance"},[e.name,":",Number(e.balance).toFixed(2)])}):t("div",{class:"item",style:{textAlign:"center",width:"100%"}},["加载中"])])])])])}},{title:"借呗",key:"lastWithdrawalsTime",align:"center",render:function(e,t){return e(p["Tooltip"],{attrs:{placement:"bottom","max-width":"350"},class:"money-tip"},[e("a",{class:"blue-font"},["0"]),e("div",{slot:"content"},[e("div",{class:"tooltip-section pb10 borrow"},[e("div",{class:"items"},["可借: 0"]),e("div",{class:"items flex-row"},[e("span",["借款: 0"]),e("span",["时间: 2018.12.25"])]),e("div",{class:"items flex-row"},[e("span",["还款: 0"]),e("span",["时间: 2018.12.25"])])])])])}},{title:"未登录/天",key:"not_login_day",align:"center",width:95},{title:"注册时间",key:"created_at",align:"center",width:180,render:function(t,a){return t("span",{class:"pl20  pr20"},[e.$root.unixTime(a.row.created_at)])}},{title:"操作",align:"center",minWidth:150,render:function(t,a){return t("div",[t("span",{class:"ib mr10 blue-font",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("memberModifyStatus")?"inline-block":"none",color:"yes"!==a.row.status?"red":""},on:{click:function(){e.changeStatus(a,"status")}}},["yes"==a.row.status?"状态正常":"状态停用"]),t("span",{class:"ib mr10 blue-font",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("refundLevelModifyStatus")?"inline-block":"none",color:"yes"!==a.row.refundBonus?"red":""},on:{click:function(){e.changeStatus(a,"refundBonus")}}},["yes"===a.row.refundBonus?"返水正常":"返水停用"]),t("span",{class:"ib mr10 blue-font",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("memberDetail")?"inline-block":"none"},on:{click:function(){e.$router.push({name:"memberDetails",query:{siteId:e.nowSite.id,uid:a.row.uid}})}}},["详情"]),t("span",{class:"ib mr10 blue-font",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("memberUpdate")?"inline-block":"none"},on:{click:function(){var t=a.row,s=t.uid,n=t.siteId,i=t.agencyId;e.$router.push({name:"memberEdit",params:{page:"edit"},query:{uid:s,siteId:n,agencyId:i}})}}},["编辑"]),t("span",{class:"ib mr10 blue-font",style:{display:"super"==e.adminType||-1!=e.authInPage.indexOf("memberModifyStatus")?"inline-block":"none"},on:{click:function(){1==a.row.is_agency?e.$Tip.info({content:"此功能暂未开放"}):e.changeStatus(a,"is_agency")}}},[1!==a.row.is_agency?"升为代理":"降为会员"])])}}],data:[]},historyTable:{loading:!0,columns:[{title:"登录设备",key:"device",align:"center"},{title:"登录域名",key:"domain",align:"center"},{title:"登录IP",key:"ip",align:"center"},{title:"归属地",key:"location",align:"center"},{title:"登录时间",key:"created_at",align:"center",render:function(t,a){return t("span",[e.$root.unixTime(a.row.created_at)])}}],data:[]}}},computed:{modalKey:function(){var e=this.$route.meta.title;return"加款减款"!==e?"oneTabFundsModal":"twoTabFundsModal"},fundsKey:function(){var e=this.$route.meta.title;return"加款减款"!==e?"oneTabFundsForms":"twoTabFundsForms"}},watch:{nowSite:{handler:function(e,t){var a=this;this.$nextTick(function(){var t=a.$route.name;"memberSearch"===t&&a.$refs.LevelSelect.init(e.id)})},deep:!0,immediate:!0}},beforeRouteEnter:function(e,t,a){a(function(a){var s;"加款减款"===e.meta.title&&(a.routes=[],(s=a.routes).push.apply(s,[e,t]),a.$refs.twoTabFundsForms.setOrigin(),a.$refs.twoTabFundsModal.show())})},methods:{levelChange:function(e){this.searchKey.levelId=e.levelLabel},onPageChange:function(e){this.page=e;var t=Object(r["a"])({},this.searchKey,{siteId:this.nowSite.id});t=Object(r["a"])({},t,this.sortParams),this.getData({params:t,query:{page:e}})},refreshBalance:function(e){var t=e.row,a=t.siteId,s=t.uid;e.row.wallet.list=[],Object(f["y"])({siteId:a,uid:s}).then(function(t){e.row.wallet.list=Object(o["a"])(t.data.platform_balance)})},changeBalance:function(e){var t=this,a=e.row,s=a.siteId,n=a.uid;this.$Tip.confirm({content:"您确定回收该用户的第三方余额吗？",onOk:function(){Object(f["E"])({siteId:s,uid:n}).then(function(e){200===e.code&&t.$Message.success("第三方余额回收成功")})}})},getData:function(e){var t=this,a=e.params;for(var s in a)a[s]||delete a[s];this.$root.startTableLoading(),e.params.typeTag||delete e.params.content,e.params.isLike&&(e.params.isLike=Number(e.params.isLike)),Object(f["g"])(e).then(function(e){var a=e.data,s=a.data,n=a.total;t.table.data=s,t.table.total=n})},sortChange:function(e){var t=e.key,a=e.order,s=this.nowSite.id,n={sortKey:t,sortVal:a,siteId:s};"normal"==n.sortVal&&(delete n.sortKey,delete n.sortVal),this.sortParams={},this.sortParams=Object(r["a"])({},n),1!==this.page?this.getData({params:Object(r["a"])({},this.searchKey,n),query:{page:this.page}}):this.getData({params:Object(r["a"])({},this.searchKey,n)})},searchSubmit:function(){var e=Object(r["a"])({},this.searchKey);if(!this.$root.validateTime(this.Time))return!1;var t=this.$root.validateTime(this.Time),a=Object(i["a"])(t,2),s=a[0],n=a[1];for(var o in e.startTime=s&&this.$root.formatTime(s),e.endTime=n&&this.$root.formatTime(n),this.searchKey.startTime=e.startTime,this.searchKey.endTime=e.endTime,e.siteId=this.nowSite.id,e)e[o]||delete e[o];this.$refs.tables.setPage(),this.getData({params:e})},changeStatus:function(e,t){var a,s,n,i,o=this,r=e.row,l=r.status,c=r.refundBonus,u=r.is_agency;switch(t){case"status":a="yes"===l?"您确定停用该会员状态吗?":"您确定启用该会员状态吗?",s="yes"===l?"停用状态成功":"启用状态成功",n="yes"===l?0:1,i="yes"===l?"no":"yes";break;case"refundBonus":a="yes"===c?"您确定停用该会员返水吗？":"您确定启用该会员返水吗？",s="yes"===c?"停用返水成功":"启用返水成功",n="yes"===c?0:1,i="yes"===c?"no":"yes";break;case"is_agency":a=0==u?"您确定晋升会员为代理吗？":"您确定降级该代理为会员吗？",s=0==u?"晋升为代理成功":"降级为会员成功",n=0==u?1:0,i=0==u?1:0;break}var d={siteId:this.nowSite.id,uid:e.row.uid,statusKey:t,statusVal:n};console.log(d),this.$Tip.confirm({content:a,onOk:function(){Object(f["t"])(d).then(function(a){if(200==a.code){"string"===typeof a.data&&(o.$Tip.hide(),o.$Message.config({top:150,duration:1}),o.$Message.success({content:s})),e.row[t]=i;var n=e.row.account_type,r=n.split("级")[0];e.row.account_type="".concat(r,0==i?"级会员":"级代理")}})}})},tabChange:function(e){this.fundsModalTitle="single"===e?"加款/减款":"批量加款/减款"},submitFundsForm:function(e){var t=this;this.$root.startEditLoading(this),Object(f["l"])(e).then(function(a){if(200==a.code){e.handle;if(t.$refs[t.modalKey].hide(),t.fundsModalTitle.includes("批量"))t.$store.commit("closeTag",t.routes[0]);else{var s={params:Object(r["a"])({},t.searchKey,{siteId:t.$root.nowSite.id}),query:{page:t.page}};t.getData(s),t.$store.commit("closeTag",t.routes[0])}}})},loginHistory:function(e){var t=this;this.$refs.historyModal.show(),Object(f["m"])({siteId:e.siteId,uid:e.uid}).then(function(e){var a=e.data.basic;t.historyTable.loading=!0,setTimeout(function(){t.historyTable.data=a.login_history,t.historyTable.loading=!1},2e3)})},modalVisible:function(e){e||this.$store.commit("closeTag",this.routes[0])}}},v=g,T=(a("4e9c"),a("2877")),w=Object(T["a"])(v,s,n,!1,null,"17660888",null);t["default"]=w.exports}}]);