(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50544836"],{"0479":function(t,e,n){},"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],o=(n("ac6a"),n("5176")),r=n.n(o),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),l=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},u=c,d=(n("4974"),n("2877")),m=Object(d["a"])(u,s,l,!1,null,null,null),p=m.exports,g={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},f=g,h=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(p,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",r()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){f[t]&&a.push(f[t])});var i=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",i.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=h,b=(n("1e5b"),Object(d["a"])(y,a,i,!1,null,"a62d0182",null));e["a"]=b.exports},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),i=n.n(a);i.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),i=n.n(a);i.a},"59ad8":function(t,e,n){"use strict";var a=n("0479"),i=n.n(a);i.a},"7e1e":function(t,e,n){"use strict";n.d(e,"e",function(){return i}),n.d(e,"i",function(){return o}),n.d(e,"j",function(){return r}),n.d(e,"g",function(){return s}),n.d(e,"f",function(){return l}),n.d(e,"h",function(){return c});var a=n("66df"),i=function(){return a["a"].request({url:"get_mborrow_data_o",method:"get"})},o=function(){return a["a"].request({url:"get_management_data",method:"get"})},r=function(){return a["a"].request({url:"get_over_due_static",method:"get"})},s=function(){return a["a"].request({url:"get_level_man",method:"get"})},l=function(){return a["a"].request({url:"get_code_man",method:"get"})},c=function(){return a["a"].request({url:"get_log_list",method:"get"})}},be6c:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search"},[n("Form",{ref:"searchKey",attrs:{inline:""}},[n("FormItem",{attrs:{label:"游戏类型"}},[n("Select",{staticStyle:{width:"100px"},model:{value:t.searchKey.type,callback:function(e){t.$set(t.searchKey,"type",e)},expression:"searchKey.type"}},t._l(t.gameList,function(t){return n("Option",{key:t.value,attrs:{value:t.value}})}),1)],1),n("FormItem",{attrs:{label:"游戏平台"}},[n("Select",{staticClass:"s-120",attrs:{clearable:""},model:{value:t.searchKey.gamePlatform,callback:function(e){t.$set(t.searchKey,"gamePlatform",e)},expression:"searchKey.gamePlatform"}},t._l(t.gamePlatformList,function(e,a){return n("Option",{key:a,attrs:{value:e.value}},[t._v(t._s(e.title))])}),1)],1),n("FormItem",{attrs:{label:"开始时间"}},[n("DatePicker",{staticClass:"s-120",attrs:{type:"date"},model:{value:t.searchKey.startTime,callback:function(e){t.$set(t.searchKey,"startTime",e)},expression:"searchKey.startTime"}})],1),n("FormItem",{attrs:{label:"结束时间"}},[n("DatePicker",{staticClass:"s-120",attrs:{type:"date"},model:{value:t.searchKey.endTime,callback:function(e){t.$set(t.searchKey,"endTime",e)},expression:"searchKey.endTime"}})],1),n("FormItem",{attrs:{label:"账号类型"}},[n("Select",{staticStyle:{width:"100px"}},t._l(t.accountList,function(t){return n("Option",{key:t.value,attrs:{value:t.value}})}),1)],1),n("FormItem",{staticClass:"ml10"},[n("Checkbox",[t._v("模糊")])],1),n("FormItem",{attrs:{label:"会员账号"}},[n("Input",{staticClass:"s-140",attrs:{placeholder:"多个请以，逗号隔开"},model:{value:t.searchKey.account,callback:function(e){t.$set(t.searchKey,"account",e)},expression:"searchKey.account"}})],1),n("FormItem",[n("Button",{staticClass:"search",attrs:{type:"primary"}},[t._v("查询")])],1),n("FormItem",[n("Button",{staticClass:"ivu-btn export",attrs:{type:"primary"},on:{click:t.exportEXCEL}},[t._v("导出EXCEL")])],1)],1)],1),n("div",{staticClass:"v2-table"},[n("Tables",{attrs:{editable:"",columns:t.table.columns,loading:t.$root.tableLoading,value:t.table.data,total:t.table.total,more:t.table.more},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}},[n("div",{attrs:{slot:"footer"},slot:"footer"},[n("span",{staticClass:"td4"},[t._v("总计")]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.betSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.numberSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.moneySum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.betValidSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.menberSySum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.rateSum))+"%")]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.hdCashSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.memberBackwaterSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.agencyRebatesSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.agencyBackwaterSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.agencyCashSum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.agencyPaySum)))]),n("span",{staticClass:"td3"},[t._v(t._s(t._f("unit")(t.agencyProfitSum)))])])])],1)])},i=[],o=n("cebc"),r=n("fa69"),s=n("7e1e"),l=n("2f62"),c={name:"totalReportGameChildren",components:{Tables:r["a"]},data:function(){var t=this;return{gamePlatformList:[],currentName:"name1",betSum:0,numberSum:0,moneySum:0,betValidSum:0,menberSySum:0,rateSum:0,hdCashSum:0,memberBackwaterSum:0,agencyRebatesSum:0,agencyBackwaterSum:0,agencyCashSum:0,agencyPaySum:0,agencyProfitSum:0,table:{more:!0,loading:!1,total:100,columns:[{title:"游戏平台",align:"center"},{title:"会员账号/类型",key:"type",align:"center",render:function(e,n){return e("a",{on:{click:function(){t.$router.push({name:"totalReportChildren"})}}},n.row.type)}},{title:"投注人数",key:"bet",align:"center"},{title:"注单数量",key:"number",align:"center"},{title:"投注金额",key:"money",align:"center"},{title:"有效投注",key:"validPepole",align:"center"},{title:"会员输赢",key:"menberSy",align:"center"}],data:[]},searchKey:{},gameList:[{value:"真人视讯"},{value:"电子游戏"},{value:"棋牌游戏"},{value:"彩票游戏"},{value:"VR彩票"},{value:"体育赛事"}],accountList:[{value:"大股东"},{value:"会员"},{value:"代理"}]}},methods:{getGamePlatform:function(t){},exportEXCEL:function(){},getData:function(t){var e=this;this.betSum=this.numberSum=this.moneySum=this.betValidSum=this.menberSySum=0,Object(s["reportTotalData"])().then(function(t){e.table.loading=!0,setTimeout(function(){e.table.data=t.data,e.table.loading=!1,e.table.data.map(function(t){e.betSum+=1*t.bet,e.numberSum+=1*t.number,e.moneySum+=1*t.money,e.betValidSum+=1*t.betValid,e.menberSySum+=1*t.menberSy})},2e3)})},onPageChange:function(t){var e={page:t};this.getData(e)},onPageSizeChange:function(t){alert(t)},changeName:function(t){this.currentName=t}},watch:{"searchKey.type":function(){this.getGamePlatform(this.searchKey.type)}},computed:Object(o["a"])({},Object(l["d"])({typeList:function(t){return t.info.platformReport}})),mounted:function(){var t=this;this.$nextTick(function(){Object(s["reportTotalData"])().then(function(e){t.table.loading=!0,setTimeout(function(){t.table.data=e.data,t.table.loading=!1},2e3)}),t.getData()})},filters:{unit:function(t){return t.toFixed(2)}}},u=c,d=(n("59ad8"),n("2877")),m=Object(d["a"])(u,a,i,!1,null,"0e2170e2",null);e["default"]=m.exports},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);