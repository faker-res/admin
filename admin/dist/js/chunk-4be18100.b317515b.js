(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4be18100"],{"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],o=(n("ac6a"),n("5176")),r=n.n(o),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),l=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},u=c,d=(n("4974"),n("2877")),h=Object(d["a"])(u,s,l,!1,null,null,null),m=h.exports,p={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},g=p,f=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(m,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",r()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){g[t]&&a.push(g[t])});var i=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",i.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),b=f,y=(n("1e5b"),Object(d["a"])(b,a,i,!1,null,"a62d0182",null));e["a"]=y.exports},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),i=n.n(a);i.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},"492d":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),i=n.n(a);i.a},d4d7:function(t,e,n){"use strict";var a=n("492d"),i=n.n(a);i.a},ee00:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search"},[n("Form",{ref:"searchKey",attrs:{inline:""}},[n("FormItem",{attrs:{label:"操作事件"}},[n("Select",{staticClass:"s-86",attrs:{clearable:"",placeholder:"全部"},model:{value:t.searchKey.act,callback:function(e){t.$set(t.searchKey,"act",e)},expression:"searchKey.act"}},[n("Option",{attrs:{value:"create"}},[t._v("创建")]),n("Option",{attrs:{value:"update"}},[t._v("更新")]),n("Option",{attrs:{value:"delete"}},[t._v("删除")]),n("Option",{attrs:{value:"other"}},[t._v("其它")])],1)],1),n("FormItem",{attrs:{label:"开始时间"}},[n("DatePicker",{staticClass:"s-120",attrs:{type:"date",placeholder:"请选择日期"},model:{value:t.Time[0],callback:function(e){t.$set(t.Time,0,e)},expression:"Time[0]"}})],1),n("FormItem",{attrs:{label:"结束时间"}},[n("DatePicker",{staticClass:"s-120",attrs:{type:"date",placeholder:"请选择日期"},model:{value:t.Time[1],callback:function(e){t.$set(t.Time,1,e)},expression:"Time[1]"}})],1),n("FormItem",{attrs:{label:"会员账号"}},[n("Input",{staticClass:"s-140",attrs:{placeholder:"多个请以，逗号隔开"},model:{value:t.searchKey.username,callback:function(e){t.$set(t.searchKey,"username",e)},expression:"searchKey.username"}})],1),n("FormItem",[n("Button",{staticClass:"search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.searchSubmit}},[t._v("查询")])],1)],1)],1),n("div",{staticClass:"v2-table"},[n("Tables",{attrs:{columns:t.table.columns,loading:t.$root.tableLoading,value:t.table.data,total:t.table.total,pageSizeOpts:t.table.pageSizeOpts},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange,"on-sort-change":t.sortChange}})],1)])},i=[],o=n("768b"),r=n("cebc"),s=n("fa69"),l=n("83ae"),c=n("fab6"),u=n("8194"),d=(n("c276"),{name:"memberLog",mixins:[c["a"]],components:{Tables:s["a"],Icons:l["a"]},data:function(){var t=this;this.$createElement;return{Time:[],searchKey:{},table:{loading:!0,pageSizeOpts:[20,30,40,50],total:100,columns:[{title:"会员账号",key:"username",align:"center"},{title:"IP",key:"ip",align:"center"},{title:"操作时间",key:"created_at",align:"center",render:function(e,n){return e("span",{class:"pl20 pr20"},[t.$root.unixTime(n.row.created_at)])}},{title:"操作事件",key:"act",align:"center",render:function(t,e){var n;return n="create"===e.row.act?"创建":"update"===e.row.act?"更新":"delete"===e.row.act?"删除":"其他",t("span",[n])}},{title:"操作日志",key:"actionInfo",align:"center",tooltip:!0}],data:[]}}},created:function(){},methods:{getData:function(t){var e=this;this.$root.startTableLoading(this);var n=t.params;for(var a in n)n[a]||delete n[a];Object(u["o"])(t).then(function(t){var n=t.data,a=n.data,i=n.total;e.table.data=a,e.table.total=i,e.table.loading=!1})},searchSubmit:function(){var t=Object(r["a"])({},this.searchKey);if(t.siteId=this.nowSite.id,!this.$root.validateTime(this.Time))return!1;var e=this.$root.validateTime(this.Time),n=Object(o["a"])(e,2),a=n[0],i=n[1];for(var s in t.startTime=a&&this.$root.formatTime(a),t.endTime=i&&this.$root.formatTime(i),this.searchKey.startTime=t.startTime,this.searchKey.endTime=t.endTime,t)t[s]||delete t[s];t.userName||delete t.userName,this.getData({params:t})}}}),h=d,m=(n("d4d7"),n("2877")),p=Object(m["a"])(h,a,i,!1,null,"08a172a8",null);e["default"]=p.exports},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]},fab6:function(t,e,n){"use strict";var a=n("cebc"),i=n("2f62"),o={data:function(){return{Time:[],searchKey:{},page:1,sortParams:{}}},computed:Object(a["a"])({},Object(i["d"])({nowSite:function(t){return t.user.nowSite}})),watch:{},filters:{},mounted:function(){var t={siteId:this.$root.nowSite.id};this.getData({params:Object(a["a"])({},this.searchKey,t)})},methods:{onPageChange:function(t){var e=Object(a["a"])({},this.searchKey,{siteId:this.nowSite.id});for(var n in e)e[n]||delete e[n];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),this.page=t,e=Object(a["a"])({},e,this.sortParams),this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t;var e=Object(a["a"])({},this.searchKey,{siteId:this.nowSite.id,limit:t});for(var n in e)e[n]||delete e[n];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),console.log(e),this.getData({params:e})},sortChange:function(t){t.column;var e=t.key,n=t.order,i={sortKey:e,sortVal:n,siteId:this.$root.nowSite.id};this.searchKey.startTime=this.$root.formatTimeS(this.Time[0]),this.searchKey.endTime=this.$root.formatnightTimeS(this.Time[1]),"normal"===i.sortVal&&(delete i.sortKey,delete i.sortVal),this.sortParams={},this.sortParams=Object(a["a"])({},i),1!==this.page?this.getData({params:Object(a["a"])({},this.searchKey,i),query:{page:this.page}}):this.getData({params:Object(a["a"])({},this.searchKey,i)})},exportExcel:function(){this.$root.exportBtnLoading=!0,this.$root.exportBtnLoading=!1}}};e["a"]=o}}]);