(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7dd70e72"],{"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],o=(n("ac6a"),n("5176")),r=n.n(o),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),l=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},u=c,d=(n("4974"),n("2877")),p=Object(d["a"])(u,s,l,!1,null,null,null),f=p.exports,m={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},h=m,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(f,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",r()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){h[t]&&a.push(h[t])});var i=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",i.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),b=g,y=(n("1e5b"),Object(d["a"])(b,a,i,!1,null,"a62d0182",null));e["a"]=y.exports},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),i=n.n(a);i.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),i=n.n(a);i.a},5899:function(t,e,n){},"7e1e":function(t,e,n){"use strict";n.d(e,"e",function(){return i}),n.d(e,"i",function(){return o}),n.d(e,"j",function(){return r}),n.d(e,"g",function(){return s}),n.d(e,"f",function(){return l}),n.d(e,"h",function(){return c});var a=n("66df"),i=function(){return a["a"].request({url:"get_mborrow_data_o",method:"get"})},o=function(){return a["a"].request({url:"get_management_data",method:"get"})},r=function(){return a["a"].request({url:"get_over_due_static",method:"get"})},s=function(){return a["a"].request({url:"get_level_man",method:"get"})},l=function(){return a["a"].request({url:"get_code_man",method:"get"})},c=function(){return a["a"].request({url:"get_log_list",method:"get"})}},e288:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search"},[n("Form",{ref:"searchKey",attrs:{inline:""}},[n("FormItem",{attrs:{label:"借款状态"}},[n("Select",{staticClass:"s-86",model:{value:t.searchKey.status,callback:function(e){t.$set(t.searchKey,"status",e)},expression:"searchKey.status"}},[n("Option",{attrs:{value:"1"}},[t._v("待审核")]),n("Option",{attrs:{value:"2"}},[t._v("成功")]),n("Option",{attrs:{value:"3"}},[t._v("失败")])],1)],1),n("FormItem",{attrs:{label:"开始日期"}},[n("DatePicker",{staticClass:"s-140",attrs:{type:"date",placeholder:"请选择开始日期"},model:{value:t.Time[0],callback:function(e){t.$set(t.Time,0,e)},expression:"Time[0]"}})],1),n("FormItem",{attrs:{label:"结束日期"}},[n("DatePicker",{staticClass:"s-140",attrs:{type:"date",placeholder:"请选择结束日期"},model:{value:t.Time[1],callback:function(e){t.$set(t.Time,1,e)},expression:"Time[1]"}})],1),n("FormItem",[n("Checkbox",{model:{value:t.searchKey.isLike,callback:function(e){t.$set(t.searchKey,"isLike",e)},expression:"searchKey.isLike"}}),n("span",[t._v("模糊")])],1),n("FormItem",{attrs:{label:"会员账号"}},[n("Input",{staticClass:"s-140",attrs:{placeholder:"账号/姓名"},model:{value:t.searchKey.account,callback:function(e){t.$set(t.searchKey,"account",e)},expression:"searchKey.account"}})],1),n("FormItem",[n("Poptip",{staticClass:"ml14f",attrs:{trigger:"hover",content:"多个请以,逗号隔开,仅支持同类型多个输入",placement:"bottom-start"}},[n("Icons",{attrs:{type:"bangzhutishi",color:"#E4E4E4",size:26}})],1)],1),n("FormItem",[n("Button",{staticClass:"search",attrs:{type:"primary"}},[t._v("查询")])],1)],1)],1),n("div",{staticClass:"v2-table"},[n("Tables",{attrs:{loading:t.$root.tableLoading,columns:t.table.columns,value:t.table.data,total:t.table.total}})],1),n("Modals",{ref:"review",attrs:{title:"借款审核",width:460}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("p",{staticClass:"ft14 ml85 mt20"},[n("span",{staticClass:"pr10"},[t._v("会员账号：")]),n("span",[t._v(t._s(t.reviewInfo.account))])]),n("p",{staticClass:"ft14 ml85 mt20"},[n("span",{staticClass:"pr10"},[t._v("可借总额：")]),n("span",[t._v(t._s(t.reviewInfo.borrowAmount))])]),n("p",{staticClass:"ft14 ml85 mt20"},[n("span",{staticClass:"pr10"},[t._v("借款金额：")]),n("span",{staticClass:"red-font"},[t._v(t._s(t.reviewInfo.borrow))])]),n("p",{staticClass:"ft14 ml85 mt20"},[n("span",{staticClass:"pr10"},[t._v("操作类型：")]),n("RadioGroup",{model:{value:t.reviewInfo.type,callback:function(e){t.$set(t.reviewInfo,"type",e)},expression:"reviewInfo.type"}},[n("Radio",{attrs:{label:"success"}},[t._v("通过")]),n("Radio",{staticClass:"ml5",attrs:{label:"fail"}},[t._v("拒绝")])],1)],1),n("p",{staticClass:"ft14 ml85 mt20"},[n("span",{staticClass:"pr10"},[t._v("备注信息：")]),n("Input",{staticClass:"b w260x mt10 mb20",attrs:{type:"textarea",placeholder:"此栏位仅供管理者记录其他咨询，会员无法检视",rows:4}})],1),n("Button",{staticClass:"w260x ml85 h50x ft20 mb20",attrs:{type:"primary"},on:{click:function(e){return t.modalsSubmit("review")}}},[t._v("确定")])],1)])],1)},i=[],o=(n("7f7f"),n("7e1e")),r=n("fa69"),s=n("83ae"),l=n("d027"),c={name:"activityBorrow",components:{Icons:s["a"],Tables:r["a"],Modals:l["a"]},data:function(){var t=this;this.$createElement;return{reviewInfo:{},searchKey:{},Time:[],table:{total:100,data:[],loading:!0,columns:[{title:"会员账号",key:"account",align:"center"},{title:"姓名",key:"name",align:"center"},{title:"电子可借额度",key:"gameLimit",align:"center"},{title:"棋牌可借额度",key:"gameLimit",align:"center"},{title:"彩票可借额度",key:"lotteryLimit",align:"center"},{title:"视讯可借额度",key:"gameLimit",align:"center"},{title:"可借总额",key:"borrowAmount",align:"center",renderHeader:function(t,e){return t("p",[t("span","可借总额"),t("Poptip",{props:{trigger:"hover",content:"视讯可借额度与电子,棋牌,彩票三者中最高金管家等级的可借额度之和",placement:"top-end"}},[t(s["a"],{props:{type:"bangzhutishi"},style:{color:"#b3b3b3",marginLeft:"5px"}})])])}},{title:"借款金额",key:"borrow",align:"center",render:function(t,e){return t("span",{class:"red-font"},[e.row.borrow])}},{title:"状态",key:"status",align:"center",render:function(t,e){var n=e.row.status?"#E2930E":e.row.return?"#118C1E":"#FF0000",a=e.row.status?"待审核":e.row.return?"成功":"失败";return t("span",{style:{color:n}},[a])}},{title:"操作",align:"center",render:function(e,n){return n.row.status?e("span",{class:"blue-font",on:{click:function(){var e=n.row,a=e.account,i=e.borrowAmount,o=e.borrow;t.reviewInfo={account:a,borrowAmount:i,borrow:o,type:"success"},t.modalsShow("review")}}},["审核"]):e("span",{class:"blue-font",on:{click:function(){t.$Tip.confirm({content:"您确定撤销审核吗？撤销后，可重新进行审核！",onOk:function(){t.$Message.success("撤销审核成功")}})}}},["撤销"])}},{title:"备注",key:"remarks",align:"center",tooltip:!0,width:"100"},{title:"提交时间",key:"updateTime",align:"center",width:"150"},{title:"审核时间",key:"checkTime",align:"center",render:function(t,e){return t("span",[e.row.status?"-":e.row.checkTime])}},{title:"审核者",key:"checker",align:"center",render:function(t,e){return t("span",[e.row.status?"-":e.row.checker])}}]}}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.$root.startTableLoading(this),Object(o["e"])().then(function(e){t.table.data=e.data})},modalsShow:function(t){this.$refs[t].show()},modalsSubmit:function(t){this.$refs[t].hide(),this.$Message.success("借款审核成功")}}},u=c,d=(n("eafb"),n("2877")),p=Object(d["a"])(u,a,i,!1,null,"4a81f2da",null);e["default"]=p.exports},eafb:function(t,e,n){"use strict";var a=n("5899"),i=n.n(a);i.a},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);