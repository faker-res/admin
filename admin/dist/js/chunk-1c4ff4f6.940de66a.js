(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c4ff4f6"],{"0ef3":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},a=[],s=(n("ac6a"),n("5176")),o=n.n(s),c=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),l=[],r={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},u=r,d=(n("4974"),n("2877")),f=Object(d["a"])(u,c,l,!1,null,null,null),p=f.exports,h={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},v=h,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(p,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",o()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],i=[];n.forEach(function(t){v[t]&&i.push(v[t])});var a=t.button?[].concat(i,t.button):i;return t.render=function(t,n){return n.tableData=e.value,t("div",a.map(function(i){return i(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var i=t;return i.editable&&(i=e.suportEdit(i,n)),"handle"===i.key&&(i=e.surportHandle(i)),i})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),b=g,m=(n("1e5b"),Object(d["a"])(b,i,a,!1,null,"a62d0182",null));e["a"]=m.exports},"1e5b":function(t,e,n){"use strict";var i=n("35ee"),a=n.n(i);a.a},"20ed":function(t,e,n){"use strict";var i=n("cdc9"),a=n.n(i);a.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},"45e2":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"expand"},[n("div",{staticClass:"section flex-row br"},[t._m(0),t._m(1),t._m(2),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.search_type||"vip"==t.search_type,expression:"(!search_type) || (search_type == 'vip')"}],staticClass:"row w15 bt bl ti10"},[n("div",{staticClass:"col bb"},[t._v("代理工资：10000.00")]),n("div",{staticClass:"col bb"},[t._v("代理佣金：10000.00")]),n("div",{staticClass:"col bb"},[t._v("代理分红：1000.00")]),n("div",{staticClass:"col bb"},[t._v("\n          赔率详情：\n          "),n("a",[n("span",{staticClass:"blue-font",on:{click:this.check}},[t._v("点此查看")])])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:"agency"==t.search_type,expression:"search_type == 'agency'"}],staticClass:"row w40 bt bl ti10"},[n("div",{staticClass:"col bb"},[t._v("投注人数：100")]),n("div",{staticClass:"col bb"},[t._v("有效投注：10000.00")]),n("div",{staticClass:"col bb"},[t._v("\n          赔率详情：\n          "),n("a",{staticClass:"blue-font"},[n("span",{staticClass:"blue-font",on:{click:this.check}},[t._v("点此查看")])])]),n("div",{staticClass:"col bb"},[t._v("注册时间:2019-1-23 16:00:35")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.search_type||"vip"==t.search_type,expression:"(!search_type) || (search_type == 'vip')"}],staticClass:"row w20 bt bl ti10"},[n("div",{staticClass:"col bb"},[t._v("投注人数：10000")]),n("div",{staticClass:"col bb"},[t._v("有效投注：1000000.00")]),n("div",{staticClass:"col bb"},[t._v("\n          下级人数:\n          "),t._m(3),n("Tooltip",{attrs:{placement:"right"}},[n("Icons",{attrs:{type:"bangzhutishi",size:18}}),n("div",{attrs:{slot:"content"},slot:"content"},[t._v("代理：100，会员：10人")])],1)],1),n("div",{staticClass:"col bb"},[t._v("注册时间:2019-1-23 16:00:35")])])]),n("div",{staticClass:"remarks ti10 bl br bb"},[t._v("备注：")])]),n("Modals",{ref:"odds",attrs:{title:"赔率详情"}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("div",[n("p",{staticClass:"ft16"},[t._v("返点信息")]),n("div",{staticClass:"con"},[n("ButtonGroup",{staticClass:"ml15"},t._l(t.fdList,function(e,i){return n("Button",{key:i,class:t.fd_type==e.key?"active m15 detail-bt":"m15 detail-bt",attrs:{value:"item.key"},on:{click:function(){t.change_fd_style(e.key)}}},[t._v(t._s(e.value))])}),1),n("ul",t._l(t.fdData,function(e,i){return n("li",{key:i,staticClass:"inblo ml15 mb20 ft14 w15"},[t._v(t._s(e.value)+"：0.5%")])}),0)],1)]),n("div",{staticClass:"mt15"},[n("p",{staticClass:"ft16"},[t._v("返水信息")]),n("div",{staticClass:"con"},[n("ButtonGroup",{staticClass:"ml15"},t._l(t.fsList,function(e,i){return n("Button",{key:i,class:t.fs_type==e.key?"active m20 detail-bt":"m20 detail-bt",on:{click:function(){t.change_fs_style(e.key)}}},[t._v(t._s(e.value))])}),1),n("ul",t._l(t.fsData,function(e,i){return n("li",{key:i,staticClass:"inblo mb20 ft14 w15 ml15"},[t._v(t._s(e.value)+"：0.5%")])}),0)],1)])])])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row w15 bt bl ti10",staticStyle:{width:"20%"}},[n("div",{staticClass:"col bb"},[t._v("团队净盈利：1000000.00")]),n("div",{staticClass:"col bb"},[t._v("团队返点：10000.00")]),n("div",{staticClass:"col bb"},[t._v("团队返水：1000000.00")]),n("div",{staticClass:"col bb"},[t._v("优惠金额：10000000.00")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row w30 bt bl ti10 "},[n("div",{staticClass:"col bb"},[t._v("\n          存款总额：1000000.00\n          "),n("span",{staticClass:"red-font"},[t._v("（500000笔，10000人）")])]),n("div",{staticClass:"col bb"},[t._v("\n          公司入款：200000.00\n          "),n("span",{staticClass:"red-font"},[t._v("（500笔，100人）")])]),n("div",{staticClass:"col bb"},[t._v("\n          线上支付：800.00\n          "),n("span",{staticClass:"red-font"},[t._v("（500笔，100人）")])]),n("div",{staticClass:"col bb"},[t._v("\n          取款总额：6000.00\n          "),n("span",{staticClass:"red-font"},[t._v("（500笔，100人）")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row w15 bt bl ti10"},[n("div",{staticClass:"col bb"},[t._v("输赢报表：100000000.00")]),n("div",{staticClass:"col bb"},[t._v("投注金额：100000000.00")]),n("div",{staticClass:"col bb"},[t._v("中奖金额：10000000.00")]),n("div",{staticClass:"col bb"},[t._v("现金报表：0.00")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",[n("span",{staticClass:"blue-font-nc"},[t._v("202")])])}],s=n("cebc"),o=n("83ae"),c=n("d027"),l=(n("4360"),n("2f62")),r={props:["fd_type","fs_type","search_type"],components:{Icons:o["a"],Modals:c["a"]},computed:Object(s["a"])({},Object(l["d"])({fdList:function(t){return t.info.lotteryType},fsList:function(t){return t.info.fsList}})),methods:{check:function(){this.$refs.odds.show()},change_fd_style:function(t){this.$emit("change_fd_type",t)},change_fs_style:function(t){this.$emit("change_fs_type",t)},getData:function(){var t=this,e=this.fdList.filter(function(e){if(e.key==t.fd_type)return e.info});this.fdData=e[0].info},getData2:function(){var t=this,e=this.fsList.filter(function(e){if(e.key==t.fs_type)return e.info});this.fsData=e[0].info}},data:function(){return{fdData:[],fsData:[]}},watch:{fd_type:function(){this.getData()},fs_type:function(){this.getData2()}},mounted:function(){this.getData(),this.getData2()}},u=r,d=(n("20ed"),n("2877")),f=Object(d["a"])(u,i,a,!1,null,"e8594bfa",null);e["a"]=f.exports},4974:function(t,e,n){"use strict";var i=n("2178"),a=n.n(i);a.a},cdc9:function(t,e,n){},fa69:function(t,e,n){"use strict";var i=n("0ef3");e["a"]=i["a"]}}]);