(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba1c5ca0"],{"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},r=[],o=(n("ac6a"),n("5176")),i=n.n(o),u=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),s=[],l={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},c=l,d=(n("4974"),n("2877")),f=Object(d["a"])(c,u,s,!1,null,null,null),p=f.exports,h={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},m=h,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(p,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",i()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){m[t]&&a.push(m[t])});var r=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",r.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=g,v=(n("1e5b"),Object(d["a"])(y,a,r,!1,null,"a62d0182",null));e["a"]=v.exports},1184:function(t,e,n){"use strict";n.d(e,"z",function(){return r}),n.d(e,"B",function(){return o}),n.d(e,"L",function(){return i}),n.d(e,"w",function(){return u}),n.d(e,"G",function(){return s}),n.d(e,"u",function(){return l}),n.d(e,"y",function(){return c}),n.d(e,"t",function(){return d}),n.d(e,"H",function(){return f}),n.d(e,"I",function(){return p}),n.d(e,"J",function(){return h}),n.d(e,"K",function(){return m}),n.d(e,"s",function(){return g}),n.d(e,"x",function(){return y}),n.d(e,"v",function(){return v}),n.d(e,"C",function(){return b}),n.d(e,"D",function(){return x}),n.d(e,"E",function(){return C}),n.d(e,"p",function(){return S}),n.d(e,"q",function(){return k}),n.d(e,"r",function(){return w}),n.d(e,"A",function(){return L}),n.d(e,"F",function(){return q}),n.d(e,"a",function(){return $}),n.d(e,"f",function(){return D}),n.d(e,"h",function(){return _}),n.d(e,"l",function(){return I}),n.d(e,"b",function(){return T}),n.d(e,"c",function(){return F}),n.d(e,"d",function(){return B}),n.d(e,"e",function(){return O}),n.d(e,"g",function(){return z}),n.d(e,"i",function(){return N}),n.d(e,"m",function(){return E}),n.d(e,"n",function(){return A}),n.d(e,"o",function(){return R}),n.d(e,"k",function(){return j}),n.d(e,"j",function(){return P});var a=n("66df"),r=function(){var t={url:"lotteryNameList",method:"get"};return a["a"].request(t)},o=function(t){var e=t.siteId,n=t.lotteryId,r={url:"lotteryOddsSiteidLid/".concat(e,"/").concat(n),method:"get"};return a["a"].request(r)},i=function(t){var e=t.id,n=t.oddsInfo,r={id:e,oddsInfo:n},o={url:"lotteryUpdateOddsSiteidLid",method:"post",data:r};return a["a"].request(o)},u=function(t){var e={url:"lotteryLhcTimeList",method:"get",params:t};return a["a"].request(e)},s=function(t){var e=t.params,n=t.lid,r={url:"lotteryTimeList/".concat(n),method:"get",params:e};return a["a"].request(r)},l=function(t){var e={url:"lotteryLhcTimeAdd",method:"post",data:t};return a["a"].request(e)},c=function(t){var e={url:"lotteryLhcTimeUp",method:"post",data:t};return a["a"].request(e)},d=function(t){var e={url:"lotteryLhcAddNum",method:"post",data:t};return a["a"].request(e)},f=function(t){var e={url:"lotteryTimeOneUp",method:"post",data:t};return a["a"].request(e)},p=function(t){var e={url:"lotteryTimeUp",method:"post",data:t};return a["a"].request(e)},h=function(t){var e={url:"lotteryUpNum",method:"post",data:t};return a["a"].request(e)},m=function(t){var e={url:"lotteryUpNumFast",method:"post",data:t};return a["a"].request(e)},g=function(t){var e={url:"lotteryAgainPrizeFast",method:"post",data:t};return a["a"].request(e)},y=function(t){var e={url:"lotteryLhcTimeSetUp",method:"post",data:t};return a["a"].request(e)},v=function(t){var e={url:"lotteryLhcTimeDel",method:"post",data:t};return a["a"].request(e)},b=function(t){var e=t.params,n=t.query,r={url:"lotteryOpenNumberList",method:"post",data:e,query:n};return n&&(r.params=n),a["a"].request(r)},x=function(t){var e=t.params,n=t.query,r={url:"lotteryOpenNumberListFast",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},C=function(t){var e={url:"lotteryPayMoney",method:"post",data:t};return a["a"].request(e)},S=function(t){var e={url:"lotteryAddNum",method:"post",data:t};return a["a"].request(e)},k=function(t){var e={url:"lotteryAddNumFast",method:"post",data:t};return a["a"].request(e)},w=function(t){var e={url:"lotteryAgainPrize",method:"post",data:t};return a["a"].request(e)},L=function(t){var e={url:"lotteryNoNumLottery",method:"post",data:t};return a["a"].request(e)},q=function(t){var e={url:"lotteryRevocation",method:"post",data:t};return a["a"].request(e)},$=function(t){var e={url:"fastLottery",method:"post",data:t};return a["a"].request(e)},D=function(t){var e=t.params,n=t.query,r={url:"fastLotteryDetail",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},_=function(t){var e={url:"fastLotteryInit",method:"post",data:t};return a["a"].request(e)},I=function(t){var e={url:"fastLotteryUpdate",method:"post",data:t};return a["a"].request(e)},T=function(t){var e=t.params,n=t.query,r={url:"fastLotteryBlackList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},F=function(t){var e={url:"fastLotteryBlackListAdd",method:"post",data:t};return a["a"].request(e)},B=function(t){var e={url:"fastLotteryBlackListDel",method:"post",data:t};return a["a"].request(e)},O=function(t){var e={url:"fastLotteryBySite",method:"post",data:t};return a["a"].request(e)},z=function(t){var e=t.params,n=t.query,r={url:"fastLotteryDetailBySite",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},N=function(t){var e={url:"fastLotteryInitBySite",method:"post",data:t};return a["a"].request(e)},E=function(t){var e={url:"fastLotteryUpdateBySite",method:"post",data:t};return a["a"].request(e)},A=function(t){var e={url:"fastLotteryUpdateOpen",method:"post",data:t};return a["a"].request(e)},R=function(t){var e={url:"fastLotteryUpdateOpenBySite",method:"post",data:t};return a["a"].request(e)},j=function(t){var e={url:"fastLotteryOpenInitBySite",method:"post",data:t};return a["a"].request(e)},P=function(t){var e={url:"fastLotteryOpenInit",method:"post",data:t};return a["a"].request(e)}},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),r=n.n(a);r.a},2178:function(t,e,n){},"30d9":function(t,e,n){},3445:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",["大彩种"==t.mode&&"normal"==t.stage?n("Select",{attrs:{clearable:t.clearable,placeholder:"全部"},on:{"on-change":t.onLotteryChange,"on-clear":t.selectClear},model:{value:t.lotteryName,callback:function(e){t.lotteryName=e},expression:"lotteryName"}},t._l(t.lotteryList,function(e){return n("Option",{key:e.id,attrs:{value:e.id+":"+e.code}},[t._v(t._s(e.name))])}),1):t._e(),"大彩种"!=t.mode&&"normal"==t.stage?n("Select",{attrs:{placeholder:"全部",clearable:t.clearable},on:{"on-change":t.onLotteryChange,"on-clear":t.selectClear},model:{value:t.lid,callback:function(e){t.lid=e},expression:"lid"}},t._l(t.lotteryList,function(e){return n("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])}),1):t._e(),"大彩种"==t.mode&&"odd"==t.stage?n("Select",{attrs:{placeholder:"全部",clearable:t.clearable},on:{"on-change":t.onLotteryChange,"on-clear":t.selectClear},model:{value:t.classId,callback:function(e){t.classId=e},expression:"classId"}},t._l(t.lotteryList,function(e){return n("Option",{key:e.classId,attrs:{value:e.classId}},[t._v(t._s(e.className))])}),1):t._e()],1)},r=[],o=(n("28a5"),n("768b")),i=(n("96cf"),n("3b8d")),u=n("2934"),s=n("1184"),l={props:{mode:{type:String,default:"大彩种"},stage:{type:String,default:"normal"},clearable:{type:Boolean,default:!0}},data:function(){return{lotteryList:[],lotteryName:"0:ALL",lid:1,classId:""}},methods:{init:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if("大彩种"!=this.mode||"normal"!=this.stage){t.next=5;break}return t.next=3,Object(u["f"])().then(function(t){e.lotteryList=t.data});case 3:t.next=19;break;case 5:if("官方彩"!=this.mode||"normal"!=this.stage){t.next=11;break}return this.lid=1,t.next=9,Object(s["z"])().then(function(t){e.lotteryList=t.data.sort1.official,e.$emit("on-name-change",e.lotteryList)});case 9:t.next=19;break;case 11:if("快速彩"!=this.mode||"normal"!=this.stage){t.next=17;break}return this.lid=12,t.next=15,Object(s["z"])().then(function(t){e.lotteryList=t.data.sort1.fast,e.$emit("on-name-change",e.lotteryList)});case 15:t.next=19;break;case 17:return t.next=19,Object(s["z"])().then(function(t){e.lotteryList=t.data.sort2});case 19:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),addAll:function(){this.lotteryList.unshift({id:0,code:"ALL",name:"全部"})},onLotteryChange:function(t){if("大彩种"==this.mode&&"normal"==this.stage){var e=t.split(":"),n=Object(o["a"])(e,2),a=n[0],r=n[1];this.$emit("on-lottery-change",{id:a,code:r})}else this.$emit("on-lottery-change",t)},selectClear:function(){}}},c=l,d=n("2877"),f=Object(d["a"])(c,a,r,!1,null,"80cebb66",null),p=f.exports;e["a"]=p},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),r=n.n(a);r.a},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);