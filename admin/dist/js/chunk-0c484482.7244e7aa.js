(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c484482"],{"0023":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-button"},["super"==t.adminType||-1!=t.authInPage.indexOf("refundLevelCreate")?n("Button",{on:{click:t.addLevel}},[t._v("添加返水等级")]):t._e()],1),n("div",{staticClass:"v2-table"},[n("Tables",{attrs:{columns:t.table.columns,loading:t.$root.tableLoading,value:t.table.data,total:t.table.total,page:!1,pageSizeOpts:t.table.pageSizeOpts},on:{"on-details":t.onDetails,"on-change-status":t.onChangeStatus,"on-edit":t.onEdit,"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}})],1)])},i=[],o=n("fa69"),l=n("c276"),s=n("8194"),r={name:"memberRefund",components:{Tables:o["a"]},data:function(){var t=this;this.$createElement;return{adminType:Object(l["l"])(),authInPage:JSON.parse(localStorage.authInPage),table:{loading:!0,total:0,pageSizeOpts:[20,30,40,50],columns:[{title:"返水等级",key:"levelName",align:"center"},{title:"返水等级别称",key:"levelAlias",align:"center"},{title:"最低下注",key:"lessBetAmount",align:"center"},{title:"最大返水",key:"maxBonusAmonut",align:"center"},{title:"创建日期",key:"created_at",align:"center",render:function(e,n){return e("span",{class:"pl20 pr20"},[t.$root.unixTime(n.row.created_at)])}},{title:"默认等级",key:"default",align:"center",render:function(t,e){return t("span",{style:{color:"yes"===e.row.default?"#515a6e":"#ff2626"}},["yes"===e.row.default?"是":"否"])}},{title:"状态",key:"status",align:"center",render:function(t,e){return t("span",{style:{color:"yes"===e.row.status?" #515a6e ":"#FF2626 "}},["yes"===e.row.status?"正常":"停用"])}},{title:"操作",align:"center",render:function(e,n){return e("div",[e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("refundLevelUpdate")?"inline-block":"none"},on:{click:function(){t.onEdit(n)}}},["编辑"]),e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("refundLevelModifyStatus")?"inline-block":"none"},on:{click:function(){t.onChangeStatus(n)}}},["yes"==n.row.status?"停用":"启用"])])}}],data:[]}}},watch:{"$root.nowSite":{handler:function(t,e){this.getData({siteId:t.id})},deep:!0}},mounted:function(){this.getData({siteId:this.$root.nowSite.id})},methods:{getData:function(t){var e=this;this.$root.startTableLoading(),Object(s["f"])(t).then(function(t){e.table.data=t.data,e.table.total=t.data.length})},addLevel:function(){this.$router.push({name:"memberRefundEdit",params:{page:"create"},query:{siteId:0,id:0}})},onDetails:function(t){this.$router.push({name:"memberRefundDetails",query:{siteId:this.$root.nowSite.id,id:t.row.id}})},onPageSizeChange:function(){},onEdit:function(t){this.$router.push({name:"memberRefundEdit",params:{page:"edit"},query:{siteId:this.$root.nowSite.id,id:t.row.id}})},onPageChange:function(t){var e={siteId:this.$root.nowSite.id,page:t};this.getData(e)},onChangeStatus:function(t){var e,n,a=this,i=t.row,o=i.status,l=i.levelName,r=i.id;"yes"===o&&(e="您确定停用".concat(l,"吗？"),n="停用".concat(l,"成功")),"no"===o&&(e="您确定启用".concat(l,"吗？"),n="启用".concat(l,"成功"));var c={siteId:this.$root.nowSite.id,id:r,statusKey:"status",statusVal:"yes"===o?0:1};this.$Tip.confirm({content:e,onOk:function(){Object(s["A"])(c).then(function(e){200==e.code&&(a.$Tip.hide(),a.$Message.success(n),t.row.status="yes"===o?"no":"yes")})}})}}},c=r,u=n("2877"),d=Object(u["a"])(c,a,i,!1,null,null,null);e["default"]=d.exports},"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],o=(n("ac6a"),n("5176")),l=n.n(o),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),r=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},u=c,d=(n("4974"),n("2877")),p=Object(d["a"])(u,s,r,!1,null,null,null),g=p.exports,h={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},f=h,m=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(g,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",l()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){f[t]&&a.push(f[t])});var i=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",i.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=m,b=(n("1e5b"),Object(d["a"])(y,a,i,!1,null,"a62d0182",null));e["a"]=b.exports},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),i=n.n(a);i.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),i=n.n(a);i.a},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);