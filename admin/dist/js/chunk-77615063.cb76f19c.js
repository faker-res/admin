(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77615063"],{"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],o=(n("ac6a"),n("5176")),r=n.n(o),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),c=[],u={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},l=u,m=(n("4974"),n("2877")),d=Object(m["a"])(l,s,c,!1,null,null,null),p=d.exports,h={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},f=h,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(p,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",r()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){f[t]&&a.push(f[t])});var i=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",i.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=g,b=(n("1e5b"),Object(m["a"])(y,a,i,!1,null,"a62d0182",null));e["a"]=b.exports},"1c31":function(t,e,n){"use strict";n.d(e,"l",function(){return i}),n.d(e,"m",function(){return o}),n.d(e,"g",function(){return r}),n.d(e,"i",function(){return s}),n.d(e,"j",function(){return c}),n.d(e,"e",function(){return u}),n.d(e,"f",function(){return l}),n.d(e,"h",function(){return m}),n.d(e,"k",function(){return d}),n.d(e,"b",function(){return p}),n.d(e,"c",function(){return h}),n.d(e,"d",function(){return f}),n.d(e,"a",function(){return g});var a=n("66df"),i=function(t){var e=t.params,n=t.query,i={url:"/platformReports",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},o=function(t){var e=t.params,n=t.query,i={url:"/platformReportsDetail",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},r=function(t){var e=t.params,n=t.query,i={url:"/firstDepositReports",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},s=function(t){var e=t.params,n=t.query,i={url:"/lotteryReports",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},c=function(t){var e=t.params,n=t.query,i={url:"/lotteryReportsDetail",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},u=function(t){var e=t.params,n=t.query,i={url:"/agencyReports",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},l=function(t){var e=t.params,n=t.query,i={url:"/memberReports",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},m=function(t){var e=t.params,n=t.query,i={url:"/gameRecordsDetail",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},d=function(t){var e={url:"/multipleReports",method:"post",data:t};return a["a"].request(e)},p=function(t){var e=t.params,n=t.query,i={url:"domainReports",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},h=function(t){var e=t.params,n=t.query,i={url:"domainReportsDetailByDomain",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},f=function(t){var e=t.params,n=t.query,i={url:"domainReportsDetailByUser",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)},g=function(t){var e=t.params,n=t.query,i={url:"dayReport",method:"post",data:e};return n&&(i.params=n),a["a"].request(i)}},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),i=n.n(a);i.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},"3c43":function(t,e){e.endianness=function(){return"LE"},e.hostname=function(){return"undefined"!==typeof location?location.hostname:""},e.loadavg=function(){return[]},e.uptime=function(){return 0},e.freemem=function(){return Number.MAX_VALUE},e.totalmem=function(){return Number.MAX_VALUE},e.cpus=function(){return[]},e.type=function(){return"Browser"},e.release=function(){return"undefined"!==typeof navigator?navigator.appVersion:""},e.networkInterfaces=e.getNetworkInterfaces=function(){return{}},e.arch=function(){return"javascript"},e.platform=function(){return"browser"},e.tmpdir=e.tmpDir=function(){return"/tmp"},e.EOL="\n",e.homedir=function(){return"/"}},"3f25":function(t,e,n){"use strict";var a=n("9b3e"),i=n.n(a);i.a},4974:function(t,e,n){"use strict";var a=n("2178"),i=n.n(a);i.a},"68da":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search clearfix"},[n("Form",{ref:"searchKey",staticClass:"fl",attrs:{inline:""}},[n("FormItem",{attrs:{label:"时区"}},[n("Select",{staticClass:"s-140",model:{value:t.searchKey.timeType,callback:function(e){t.$set(t.searchKey,"timeType",e)},expression:"searchKey.timeType"}},[n("Option",{attrs:{value:"cn"}},[t._v("北京时间")]),n("Option",{attrs:{value:"en"}},[t._v("美东时间")])],1)],1),n("FormItem",{attrs:{label:"开始时间"}},[n("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"开始时间"},model:{value:t.Time[0],callback:function(e){t.$set(t.Time,0,e)},expression:"Time[0]"}})],1),n("FormItem",{attrs:{label:"结束时间"}},[n("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"结束时间",format:"yyyy-MM-dd 23:59:59"},model:{value:t.Time[1],callback:function(e){t.$set(t.Time,1,e)},expression:"Time[1]"}})],1),n("FormItem",[n("Checkbox",[t._v("模糊")])],1),n("FormItem",{attrs:{label:"会员账号"}},[n("Input",{staticClass:"s-140",attrs:{placeholder:"多个请以,逗号隔开"},model:{value:t.searchKey.userName,callback:function(e){t.$set(t.searchKey,"userName",e)},expression:"searchKey.userName"}})],1),n("FormItem",[n("Button",{staticClass:"search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.searchSubmit}},[t._v("查询")])],1),n("FormItem",[n("Button",{staticClass:"ivu-btn export",attrs:{type:"primary",loading:t.$root.exportBtnLoading}},[t._v("导出EXCEL")])],1)],1),t.table.data[0]?n("div",{staticClass:"fr"},[n("span",{staticClass:"ft16",staticStyle:{fontWeight:"bold"}},[t._v("当前彩票：")]),n("span",{staticClass:"ft16"},[t._v(t._s(t.table.data[0].gameName))])]):t._e()],1),n("div",{staticClass:"v2-table"},[n("Tables",{ref:"table",attrs:{loading:t.$root.tableLoading,columns:t.table.columns,total:t.table.total,value:t.table.data},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange,"on-sort-change":t.sortChange}})],1)])},i=[],o=(n("c5f6"),n("768b")),r=n("cebc"),s=n("fa69"),c=n("fab6"),u=n("1c31"),l=(n("3c43"),{name:"lotteryReportDetail",mixins:[c["a"]],components:{Tables:s["a"]},data:function(){var t=this;this.$createElement;return{searchKey:{timeType:"cn",startTime:this.$root.startTime(),endTime:this.$root.formatnightTimeS()},Time:[this.$root.startTime(),this.$root.formatnightTimeS()],table:{total:0,data:[],columns:[{title:"会员账号",key:"userName",align:"center",render:function(e,n){var a=n.row.userName;return e("span",{class:{"blue-font":"本页统计"!==a},on:{click:function(){return t.goGameRecordPage(n)}}},[a])}},{title:"注单数量",key:"betCount",align:"center",sortable:"custom"},{title:"投注金额",key:"betAmount",align:"center",sortable:"custom",render:function(e,n){return e("span",[t.$root.keepTwo(n.row.betAmount)])}},{title:"有效投注",key:"validBetAmount",sortable:"custom",align:"center",render:function(e,n){return e("span",[t.$root.keepTwo(n.row.validBetAmount)])}},{title:"中奖金额",key:"winAmount",align:"center",sortable:"custom",render:function(e,n){return e("span",[t.$root.keepTwo(n.row.winAmount)])}},{title:"撤单金额",key:"cancelBetAmount",sortable:"custom",align:"center",render:function(e,n){return e("span",[t.$root.keepTwo(n.row.cancelBetAmount)])}},{title:"返点金额",key:"rebatePointsAmount",sortable:"custom",align:"center",render:function(e,n){return e("span",[t.$root.keepTwo(n.row.rebatePointsAmount)])}},{title:"平台输赢",key:"netAmount",align:"center",sortable:"custom",render:function(e,n){return e("span",[t.$root.keepTwo(n.row.netAmount)])}},{title:"盈率",key:"winRate",align:"center",sortable:"custom",render:function(t,e){return t("span",["".concat(e.row.winRate,"%")])}}]}}},created:function(){var t=this.$route.query,e=t.startTime,n=t.endTime;this.searchKey=Object(r["a"])({},this.searchKey,this.$route.query),this.Time=[e,n]},methods:{goGameRecordPage:function(t){var e=t.row.userName,n=this.$route.query.platform,a=Object(o["a"])(this.Time,2),i=a[0],r=a[1];i=this.$root.formatTimeS(i),r=this.$root.formatnightTimeS(r),this.$router.push({name:"gameReport",query:{type:"lottery",userName:e,startTime:i,endTime:r,platform:n}})},getData:function(t){var e=this,n=t.params;for(var a in n)n[a]||delete n[a];this.$root.startTableLoading(),t.params.isLike&&(t.params.isLike=Number(t.params.isLike)),Object(u["j"])(t).then(function(t){var n=t.data.data,a=n.list,i=n.total;a.length&&a.push(e.createTotalData(i)),e.table.data=a,e.table.total=t.data.total})},createTotalData:function(t){var e=t.betUser,n=t.betCount,a=t.betAmount,i=t.validBetAmount,o=t.netAmount,r=t.cancelBetAmount,s=t.rebatePointsAmount,c=t.winAmount,u=t.winRate,l={userName:"本页统计",betUser:e,betCount:n,betAmount:a,validBetAmount:i,netAmount:o,cancelBetAmount:r,rebatePointsAmount:s,winAmount:c,winRate:u};return l},searchSubmit:function(){this.$refs.table.setPage();var t=Object(r["a"])({},this.searchKey);if(t.siteId=this.nowSite.id,!this.$root.validateTime(this.Time))return!1;var e=this.$root.validateTime(this.Time),n=Object(o["a"])(e,2),a=n[0],i=n[1];if(t.startTime=a&&this.$root.formatTimeS(a),t.endTime=i&&this.$root.formatnightTimeS(i),t.userName&&t.userName.length<5)return this.$Tip.info({content:"会员账号最小5个字符！"}),!1;for(var s in this.searchKey.startTime=t.startTime,this.searchKey.endTime=t.endTime,t.userName||delete t.isLike,t)t[s]||delete t[s];this.getData({params:t})}}}),m=l,d=(n("3f25"),n("2877")),p=Object(d["a"])(m,a,i,!1,null,"7d8b9c02",null);e["default"]=p.exports},"9b3e":function(t,e,n){},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]},fab6:function(t,e,n){"use strict";var a=n("cebc"),i=n("2f62"),o={data:function(){return{Time:[],searchKey:{},page:1,sortParams:{}}},computed:Object(a["a"])({},Object(i["d"])({nowSite:function(t){return t.user.nowSite}})),watch:{},filters:{},mounted:function(){var t={siteId:this.$root.nowSite.id};this.getData({params:Object(a["a"])({},this.searchKey,t)})},methods:{onPageChange:function(t){var e=Object(a["a"])({},this.searchKey,{siteId:this.nowSite.id});for(var n in e)e[n]||delete e[n];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),this.page=t,e=Object(a["a"])({},e,this.sortParams),this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t;var e=Object(a["a"])({},this.searchKey,{siteId:this.nowSite.id,limit:t});for(var n in e)e[n]||delete e[n];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),console.log(e),this.getData({params:e})},sortChange:function(t){t.column;var e=t.key,n=t.order,i={sortKey:e,sortVal:n,siteId:this.$root.nowSite.id};this.searchKey.startTime=this.$root.formatTimeS(this.Time[0]),this.searchKey.endTime=this.$root.formatnightTimeS(this.Time[1]),"normal"===i.sortVal&&(delete i.sortKey,delete i.sortVal),this.sortParams={},this.sortParams=Object(a["a"])({},i),1!==this.page?this.getData({params:Object(a["a"])({},this.searchKey,i),query:{page:this.page}}):this.getData({params:Object(a["a"])({},this.searchKey,i)})},exportExcel:function(){this.$root.exportBtnLoading=!0,this.$root.exportBtnLoading=!1}}};e["a"]=o}}]);