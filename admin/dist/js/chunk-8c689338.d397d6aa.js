(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c689338"],{"09bb":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"v2-search"},[a("Form",{ref:"searchKey",attrs:{inline:""}},[a("FormItem",{attrs:{label:"时区"}},[a("Select",{staticClass:"s-120",model:{value:t.searchKey.timeType,callback:function(e){t.$set(t.searchKey,"timeType",e)},expression:"searchKey.timeType"}},t._l(t.timeList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.name))])}),1)],1),a("FormItem",{attrs:{label:"开始时间"}},[a("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"开始时间"},model:{value:t.Time[0],callback:function(e){t.$set(t.Time,0,e)},expression:"Time[0]"}})],1),a("FormItem",{attrs:{label:"结束时间"}},[a("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"结束时间",format:"yyyy-MM-dd 23:59:59"},model:{value:t.Time[1],callback:function(e){t.$set(t.Time,1,e)},expression:"Time[1]"}})],1),a("FormItem",{attrs:{label:"会员账号"}},[a("Input",{staticClass:"s-140",attrs:{placeholder:"多个请以，逗号隔开"},model:{value:t.searchKey.userName,callback:function(e){t.$set(t.searchKey,"userName",e)},expression:"searchKey.userName"}})],1),a("FormItem",[a("Button",{staticClass:"search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.searchSubmit}},[t._v("查询")])],1),a("FormItem",[a("Button",{staticClass:"ivu-btn export w100x",attrs:{type:"primary",loading:t.$root.exportBtnLoading},on:{click:t.exportExcel}},[t._v("导出EXCEL")])],1)],1)],1),a("div",{staticClass:"v2-table"},[a("Tables",{ref:"table",attrs:{editable:"",columns:t.table.columns,loading:t.$root.tableLoading,total:t.table.total,value:t.table.data},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}})],1)])},i=[],o=a("768b"),r=(a("c5f6"),a("cebc")),s=a("fa69"),l=a("fab6"),c=a("1c31"),u=(a("2f62"),{name:"platformReportDetail",mixins:[l["a"]],components:{Tables:s["a"]},data:function(){var t=this;this.$createElement;return{timeList:[{value:"cn",name:"北京时间"},{value:"en",name:"美东时间"}],searchKey:{timeType:"cn",startTime:this.$root.formatTime(new Date)+" 00:00:00",endTime:this.$root.formatTimeS(new Date),platform:"live_casino"},table:{loading:!0,pageSizeOpts:[20],total:100,data:[],columns:[{title:"会员账号",key:"userName",align:"center"},{title:"注单数量",key:"betCount",align:"center",sortable:"custom"},{title:"投注金额",key:"betAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.betAmount)])}},{title:"有效投注",key:"validBetAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.validBetAmount)])}},{title:"平台输赢",key:"netAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.netAmount)])}},{title:"盈率",key:"winRate",align:"center",sortable:"custom",render:function(t,e){return t("span",["".concat(e.row.winRate,"%")])}}]}}},created:function(){var t=this.$route.query,e=t.startTime,a=t.endTime;this.searchKey=Object(r["a"])({},this.searchKey,this.$route.query),this.Time=[e,a]},methods:{getData:function(t){var e=this,a=t.params;for(var n in a)a[n]||delete a[n];t.params.isLike&&(t.params.isLike=Number(t.params.isLike)),this.$root.startTableLoading(),Object(c["m"])(t).then(function(t){var a=t.data.data,n=a.list,i=a.total;n.length&&n.push(e.createTotalData(i)),e.table.data=n,e.table.total=t.data.total})},createTotalData:function(t){var e=t.betCount,a=t.betAmount,n=t.validBetAmount,i=t.netAmount,o=t.winRate,r={userName:"本页统计",betCount:e,betAmount:a,validBetAmount:n,netAmount:i,winRate:o};return r},searchSubmit:function(){this.$refs.table.setPage();var t=Object(r["a"])({},this.searchKey);if(t.siteId=this.$root.nowSite.id,!this.$root.validateTime(this.Time))return!1;var e=this.$root.validateTime(this.Time),a=Object(o["a"])(e,2),n=a[0],i=a[1];if(t.startTime=n&&this.$root.formatTimeS(n),t.endTime=i&&this.$root.formatnightTimeS(i),t.userName&&t.userName.length<5)return this.$Tip.info({content:"会员账号最小5个字符！"}),!1;for(var s in t.userName||delete t.isLike,t)t[s]||delete t[s];this.getData({params:t})}}}),d=u,m=(a("b584"),a("2877")),p=Object(m["a"])(d,n,i,!1,null,null,null);e["default"]=p.exports},"0ef3":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),a("Row",{staticStyle:{"margin-top":"15px"}},[t.more?a("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),a("Col",{attrs:{span:t.more?12:24}},[t.page?a("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?a("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),a("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],o=(a("ac6a"),a("5176")),r=a.n(o),s=(a("c5f6"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tables-edit-outer"},[t.isEditting?a("div",{staticClass:"tables-editting-con"},[a("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),a("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[a("Icon",{attrs:{type:"md-checkmark"}})],1),a("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[a("Icon",{attrs:{type:"md-close"}})],1)],1):a("div",{staticClass:"tables-edit-con"},[a("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?a("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[a("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),l=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},u=c,d=(a("4974"),a("2877")),m=Object(d["a"])(u,s,l,!1,null,null,null),p=m.exports,h={delete:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-delete",e)}}},"删除")},list:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-reply",e)}}},"回复")},edit:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-edit",e)}}},"编辑")},details:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-details",e)}}},"详情")},status:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,a){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){a.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,a){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){a.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-preview",e)}}},"预览")},look:function(t,e,a){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){a.$emit("on-look",e)}}},"查看")}},f=h,g=(a("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var a=this;return t.render=function(t,e){return t(p,{props:{params:e,value:a.insideTableData[e.index][e.column.key],edittingCellId:a.edittingCellId,editable:a.editable},on:{input:function(t){a.edittingText=t},"on-start-edit":function(t){a.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),a.$emit("on-start-edit",t)},"on-cancel-edit":function(t){a.edittingCellId="",a.$emit("on-cancel-edit",t)},"on-save-edit":function(t){a.value[t.row.initRowIndex][t.column.key]=a.edittingText,a.$emit("input",a.value),a.$emit("on-save-edit",r()(t,{value:a.edittingText})),a.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,a=t.options||[],n=[];a.forEach(function(t){f[t]&&n.push(f[t])});var i=t.button?[].concat(n,t.button):n;return t.render=function(t,a){return a.tableData=e.value,t("div",i.map(function(n){return n(t,a,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,a){var n=t;return n.editable&&(n=e.suportEdit(n,a)),"handle"===n.key&&(n=e.surportHandle(n)),n})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var a=t;return a.initRowIndex=e,a})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,a){this.$emit("on-sort-change",t,e,a)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,a){this.$emit("on-expand",t,e,a)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=g,b=(a("1e5b"),Object(d["a"])(y,n,i,!1,null,"a62d0182",null));e["a"]=b.exports},"1c31":function(t,e,a){"use strict";a.d(e,"l",function(){return i}),a.d(e,"m",function(){return o}),a.d(e,"g",function(){return r}),a.d(e,"i",function(){return s}),a.d(e,"j",function(){return l}),a.d(e,"e",function(){return c}),a.d(e,"f",function(){return u}),a.d(e,"h",function(){return d}),a.d(e,"k",function(){return m}),a.d(e,"b",function(){return p}),a.d(e,"c",function(){return h}),a.d(e,"d",function(){return f}),a.d(e,"a",function(){return g});var n=a("66df"),i=function(t){var e=t.params,a=t.query,i={url:"/platformReports",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},o=function(t){var e=t.params,a=t.query,i={url:"/platformReportsDetail",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},r=function(t){var e=t.params,a=t.query,i={url:"/firstDepositReports",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},s=function(t){var e=t.params,a=t.query,i={url:"/lotteryReports",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},l=function(t){var e=t.params,a=t.query,i={url:"/lotteryReportsDetail",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},c=function(t){var e=t.params,a=t.query,i={url:"/agencyReports",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},u=function(t){var e=t.params,a=t.query,i={url:"/memberReports",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},d=function(t){var e=t.params,a=t.query,i={url:"/gameRecordsDetail",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},m=function(t){var e={url:"/multipleReports",method:"post",data:t};return n["a"].request(e)},p=function(t){var e=t.params,a=t.query,i={url:"domainReports",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},h=function(t){var e=t.params,a=t.query,i={url:"domainReportsDetailByDomain",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},f=function(t){var e=t.params,a=t.query,i={url:"domainReportsDetailByUser",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)},g=function(t){var e=t.params,a=t.query,i={url:"dayReport",method:"post",data:e};return a&&(i.params=a),n["a"].request(i)}},"1e5b":function(t,e,a){"use strict";var n=a("35ee"),i=a.n(n);i.a},2178:function(t,e,a){},"30d9":function(t,e,a){},"35ee":function(t,e,a){},4974:function(t,e,a){"use strict";var n=a("2178"),i=a.n(n);i.a},a7b7:function(t,e,a){},b584:function(t,e,a){"use strict";var n=a("a7b7"),i=a.n(n);i.a},fa69:function(t,e,a){"use strict";var n=a("0ef3");e["a"]=n["a"]},fab6:function(t,e,a){"use strict";var n=a("cebc"),i=a("2f62"),o={data:function(){return{Time:[],searchKey:{},page:1,sortParams:{}}},computed:Object(n["a"])({},Object(i["d"])({nowSite:function(t){return t.user.nowSite}})),watch:{},filters:{},mounted:function(){var t={siteId:this.$root.nowSite.id};this.getData({params:Object(n["a"])({},this.searchKey,t)})},methods:{onPageChange:function(t){var e=Object(n["a"])({},this.searchKey,{siteId:this.nowSite.id});for(var a in e)e[a]||delete e[a];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),this.page=t,e=Object(n["a"])({},e,this.sortParams),this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t;var e=Object(n["a"])({},this.searchKey,{siteId:this.nowSite.id,limit:t});for(var a in e)e[a]||delete e[a];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),console.log(e),this.getData({params:e})},sortChange:function(t){t.column;var e=t.key,a=t.order,i={sortKey:e,sortVal:a,siteId:this.$root.nowSite.id};this.searchKey.startTime=this.$root.formatTimeS(this.Time[0]),this.searchKey.endTime=this.$root.formatnightTimeS(this.Time[1]),"normal"===i.sortVal&&(delete i.sortKey,delete i.sortVal),this.sortParams={},this.sortParams=Object(n["a"])({},i),1!==this.page?this.getData({params:Object(n["a"])({},this.searchKey,i),query:{page:this.page}}):this.getData({params:Object(n["a"])({},this.searchKey,i)})},exportExcel:function(){this.$root.exportBtnLoading=!0,this.$root.exportBtnLoading=!1}}};e["a"]=o}}]);