(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-603662ea"],{"0acf":function(t,e,n){"use strict";var a=n("0f01"),r=n.n(a);r.a},"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},r=[],o=(n("ac6a"),n("5176")),i=n.n(o),u=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),s=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},l=c,d=(n("4974"),n("2877")),p=Object(d["a"])(l,u,s,!1,null,null,null),f=p.exports,m={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},h=m,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(f,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",i()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){h[t]&&a.push(h[t])});var r=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",r.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),v=g,y=(n("1e5b"),Object(d["a"])(v,a,r,!1,null,"a62d0182",null));e["a"]=y.exports},"0f01":function(t,e,n){},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),r=n.n(a);r.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),r=n.n(a);r.a},8593:function(t,e,n){"use strict";n.d(e,"mb",function(){return r}),n.d(e,"rb",function(){return o}),n.d(e,"C",function(){return i}),n.d(e,"k",function(){return u}),n.d(e,"Ab",function(){return s}),n.d(e,"hb",function(){return c}),n.d(e,"I",function(){return l}),n.d(e,"J",function(){return d}),n.d(e,"db",function(){return p}),n.d(e,"gb",function(){return f}),n.d(e,"eb",function(){return m}),n.d(e,"fb",function(){return h}),n.d(e,"l",function(){return g}),n.d(e,"H",function(){return v}),n.d(e,"lb",function(){return y}),n.d(e,"nb",function(){return b}),n.d(e,"jb",function(){return q}),n.d(e,"kb",function(){return C}),n.d(e,"tb",function(){return x}),n.d(e,"wb",function(){return S}),n.d(e,"sb",function(){return D}),n.d(e,"ub",function(){return w}),n.d(e,"vb",function(){return k}),n.d(e,"xb",function(){return $}),n.d(e,"x",function(){return I}),n.d(e,"y",function(){return T}),n.d(e,"z",function(){return L}),n.d(e,"K",function(){return F}),n.d(e,"qb",function(){return z}),n.d(e,"D",function(){return _}),n.d(e,"ob",function(){return B}),n.d(e,"pb",function(){return E}),n.d(e,"L",function(){return N}),n.d(e,"ib",function(){return O}),n.d(e,"U",function(){return U}),n.d(e,"V",function(){return M}),n.d(e,"S",function(){return P}),n.d(e,"T",function(){return R}),n.d(e,"W",function(){return A}),n.d(e,"ab",function(){return K}),n.d(e,"Y",function(){return j}),n.d(e,"X",function(){return H}),n.d(e,"bb",function(){return G}),n.d(e,"Z",function(){return J}),n.d(e,"cb",function(){return W}),n.d(e,"P",function(){return Q}),n.d(e,"N",function(){return V}),n.d(e,"M",function(){return X}),n.d(e,"Q",function(){return Y}),n.d(e,"O",function(){return Z}),n.d(e,"R",function(){return tt}),n.d(e,"u",function(){return et}),n.d(e,"s",function(){return nt}),n.d(e,"r",function(){return at}),n.d(e,"v",function(){return rt}),n.d(e,"t",function(){return ot}),n.d(e,"w",function(){return it}),n.d(e,"p",function(){return ut}),n.d(e,"A",function(){return st}),n.d(e,"n",function(){return ct}),n.d(e,"o",function(){return lt}),n.d(e,"B",function(){return dt}),n.d(e,"m",function(){return pt}),n.d(e,"q",function(){return ft}),n.d(e,"i",function(){return mt}),n.d(e,"h",function(){return ht}),n.d(e,"j",function(){return gt}),n.d(e,"f",function(){return vt}),n.d(e,"g",function(){return yt}),n.d(e,"e",function(){return bt}),n.d(e,"a",function(){return qt}),n.d(e,"d",function(){return Ct}),n.d(e,"c",function(){return xt}),n.d(e,"b",function(){return St}),n.d(e,"zb",function(){return Dt}),n.d(e,"yb",function(){return wt}),n.d(e,"F",function(){return kt}),n.d(e,"E",function(){return $t}),n.d(e,"G",function(){return It});var a=n("66df"),r=function(t){var e=t.params,n=t.query,r={url:"siteManagementList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},o=function(t){var e={url:"/menuSort",method:"post",data:t};return a["a"].request(e)},i=function(t){var e={url:"/menuDel",method:"post",data:t};return a["a"].request(e)},u=function(t){var e={url:"/menuAdd",method:"post",data:t};return a["a"].request(e)},s=function(t){var e={url:"/menuUpdate",method:"post",data:t};return a["a"].request(e)},c=function(t){var e={url:"/permissionSearchUri",method:"post",data:t};return a["a"].request(e)},l=function(t){var e={url:"/permissionList",method:"get",data:t};return a["a"].request(e)},d=function(){var t={url:"/roleList",method:"get"};return a["a"].request(t)},p=function(t){var e={url:"/roleAdd",method:"post",data:t};return a["a"].request(e)},f=function(t){var e={url:"/roleUpdate",method:"post",data:t};return a["a"].request(e)},m=function(t){var e={url:"/roleDel",method:"post",data:t};return a["a"].request(e)},h=function(t){var e={url:"/roleDetail",method:"post",data:t};return a["a"].request(e)},g=function(t){var e={url:"/adminModifyStatus",method:"get",params:t};return a["a"].request(e)},v=function(t){var e=t.params,n=t.query,r={url:"/adminLogList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},y=function(t){var e={url:"siteManagementDetail",method:"get",params:t};return a["a"].request(e)},b=function(t){var e={url:"siteManagementUpdate",method:"post",data:t};return a["a"].request(e)},q=function(t){var e={url:"siteManagementCreate",method:"post",data:t};return a["a"].request(e)},C=function(){var t={url:"siteManagementDbId",method:"get"};return a["a"].request(t)},x=function(t){var e=t.params,n=t.query,r={url:"systemMemberLevelList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},S=function(t){var e=t.params,n=t.query,r={url:"systemMemberRefundLevelList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},D=function(t){var e={url:"systemMemberLevelAdd",method:"post",data:t};return a["a"].request(e)},w=function(t){var e={url:"systemMemberLevelUp",method:"post",data:t};return a["a"].request(e)},k=function(t){var e={url:"systemMemberRefundLevelAdd",method:"post",data:t};return a["a"].request(e)},$=function(t){var e={url:"systemMemberRefundLevelUp",method:"post",data:t};return a["a"].request(e)},I=function(t){var e={url:"blackList",method:"get",params:t};return a["a"].request(e)},T=function(t){var e={url:"blackListCreate",method:"post",data:t};return a["a"].request(e)},L=function(t){var e={url:"blackListDelete",method:"get",params:t};return a["a"].request(e)},F=function(t){var e={url:"/slideList",method:"get",params:t};return a["a"].request(e)},z=function(t){var e={url:"slideIns",method:"post",data:t};return a["a"].request(e)},_=function(t){var e={url:"/slideDel",method:"get",params:t};return a["a"].request(e)},B=function(t){var e={url:"/slideImgInfo",method:"get",params:t};return a["a"].request(e)},E=function(t){var e={url:"slideImgInfoUpt",method:"post",data:t};return a["a"].request(e)},N=function(t){var e=t.params,n=t.query,r={url:"inBox",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},O=function(t){var e=t.params,n=t.query,r={url:"outBox",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},U=function(t){var e={url:"letterReply",method:"post",data:t};return a["a"].request(e)},M=function(t){var e={url:"letterSend",method:"post",data:t};return a["a"].request(e)},P=function(t){var e={url:"letterDel",method:"post",data:t};return a["a"].request(e)},R=function(t){var e={url:"/letterDetail",method:"get",params:t};return a["a"].request(e)},A=function(t){var e={url:"/letterUptRead",method:"get",params:t};return a["a"].request(e)},K=function(t){var e=t.params,n=t.query,r={url:"popupsList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},j=function(t){var e={url:"popupsDetail",method:"get",params:t};return a["a"].request(e)},H=function(t){var e={url:"/popupsDel",method:"get",params:t};return a["a"].request(e)},G=function(t){var e={url:"popupsStatusChange",method:"post",data:t};return a["a"].request(e)},J=function(t){var e={url:"popupsIns",method:"post",data:t};return a["a"].request(e)},W=function(t){var e={url:"popupsUpt",method:"post",data:t};return a["a"].request(e)},Q=function(t){var e=t.params,n=t.query,r={url:"lanternList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},V=function(t){var e={url:"lanternDetail",method:"get",params:t};return a["a"].request(e)},X=function(t){var e={url:"/lanternDel",method:"get",params:t};return a["a"].request(e)},Y=function(t){var e={url:"lanternStatusChange",method:"post",data:t};return a["a"].request(e)},Z=function(t){var e={url:"lanternIns",method:"post",data:t};return a["a"].request(e)},tt=function(t){var e={url:"lanternUpt",method:"post",data:t};return a["a"].request(e)},et=function(t){var e=t.params,n=t.query,r={url:"articleList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},nt=function(t){var e={url:"articleDetail",method:"get",params:t};return a["a"].request(e)},at=function(t){var e={url:"/articleDel",method:"get",params:t};return a["a"].request(e)},rt=function(t){var e={url:"articleStatusChange",method:"post",data:t};return a["a"].request(e)},ot=function(t){var e={url:"articleIns",method:"post",data:t};return a["a"].request(e)},it=function(t){var e={url:"articleUpt",method:"post",data:t};return a["a"].request(e)},ut=function(t){var e=t.params,n=t.query,r={url:"adminNewList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},st=function(t){var e={url:"changePassWord",method:"post",data:t};return a["a"].request(e)},ct=function(t){var e={url:"adminNewDelete",method:"post",data:t};return a["a"].request(e)},lt=function(t){var e={url:"adminNewDetail",method:"post",data:t};return a["a"].request(e)},dt=function(t){var e={url:"copyAdmin",method:"post",data:t};return a["a"].request(e)},pt=function(t){var e={url:"adminNewAdd",method:"post",data:t};return a["a"].request(e)},ft=function(t){var e={url:"adminNewUpdate",method:"post",data:t};return a["a"].request(e)},mt=function(t){var e=t.params,n=t.query,r={url:"activityList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},ht=function(t){var e={url:"activityIns",method:"post",data:t};return a["a"].request(e)},gt=function(t){var e={url:"activityUpt",method:"post",data:t};return a["a"].request(e)},vt=function(t){var e={url:"/activityDel",method:"get",params:t};return a["a"].request(e)},yt=function(t){var e={url:"/activityDetail",method:"get",params:t};return a["a"].request(e)},bt=function(t){var e={url:"activityChangeStatus",method:"post",data:t};return a["a"].request(e)},qt=function(t){var e={url:"/activityBySort",method:"get",params:t};return a["a"].request(e)},Ct=function(t){var e={url:"/activityCateList",method:"get",params:t};return a["a"].request(e)},xt=function(t){var e={url:"activityCateIns",method:"post",data:t};return a["a"].request(e)},St=function(t){var e={url:"/activityCateDel",method:"get",params:t};return a["a"].request(e)},Dt=function(t){var e={url:"systemSiteGameUp",method:"post",data:t};return a["a"].request(e)},wt=function(t){var e={url:"systemSiteGameList",method:"post",data:t};return a["a"].request(e)},kt=function(t){var e={url:"gameConfigList",method:"post",data:t};return a["a"].request(e)},$t=function(t){var e={url:"/gameConfigClassification",method:"get",params:t};return a["a"].request(e)},It=function(t){var e={url:"/gameConfigUpGameStatus",method:"post",data:t};return a["a"].request(e)}},a2eb:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search"},[n("Form",{ref:"searchKey",attrs:{inline:""}},["super"==t.adminType||-1!=t.authInPage.indexOf("siteManagementCreate")?n("Button",{staticClass:"w130x cardNutton",on:{click:t.addSite}},[t._v("新增站点")]):t._e(),n("FormItem",{attrs:{label:"站点名称"}},[n("Input",{staticClass:"s-140",attrs:{placeholder:"请输入站点名称",clearable:""},model:{value:t.searchKey.siteName,callback:function(e){t.$set(t.searchKey,"siteName",e)},expression:"searchKey.siteName"}})],1),n("FormItem",{attrs:{label:"站点代号"}},[n("Input",{staticClass:"s-140",attrs:{placeholder:"请输入站点代号",clearable:""},model:{value:t.searchKey.siteCode,callback:function(e){t.$set(t.searchKey,"siteCode",e)},expression:"searchKey.siteCode"}})],1),n("FormItem",[n("Button",{staticClass:"search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.submit}},[t._v("查询")])],1)],1)],1),n("div",{staticClass:"v2-table"},[n("Tables",{attrs:{loading:t.$root.tableLoading,value:t.table.data,columns:t.table.columns,total:t.table.total,pageSizeOpts:t.table.pageSizeOpts},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange,"on-details":t.onDetail,"on-edit":t.onEdit}})],1)])},r=[],o=n("cebc"),i=n("fa69"),u=n("8593"),s=n("c276"),c={name:"siteList",components:{Tables:i["a"]},data:function(){var t=this;this.$createElement;return{adminType:Object(s["l"])(),authInPage:JSON.parse(localStorage.authInPage),searchKey:{limit:20},table:{total:0,data:[],loading:!0,pageSizeOpts:[20,30,40],columns:[{title:"站点名称",key:"siteName",align:"center"},{title:"站点代号",key:"siteCode",align:"center"},{title:"创建人",key:"createUserName",align:"center"},{title:"更新人",key:"updateUserName",align:"center",render:function(e,n){return e("span",[t.$root.text(n.row.updateUserName)])}},{title:"创建日期",key:"created_at",align:"center",render:function(e,n){return e("span",[t.$root.unixTime(n.row.created_at)])}},{title:"操作",align:"center",render:function(e,n){return e("div",[e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("siteManagementDetail")?"inline-block":"none"},on:{click:function(){t.onDetail(n)}}},["详情"]),e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("siteManagementUpdate")?"inlinr-block":"none"},on:{click:function(){t.onEdit(n)}}},["编辑"])])}}]}}},mounted:function(){this.getData({params:this.searchKey})},methods:{getData:function(t){var e=this;this.$root.startTableLoading(this),Object(u["mb"])(t).then(function(t){var n=t.data,a=n.data,r=n.total;e.table.data=a,e.table.total=r})},onPageChange:function(t){var e=Object(o["a"])({},this.searchKey);for(var n in e)e[n]||delete e[n];this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t;var e=Object(o["a"])({},this.searchKey);for(var n in e)e[n]||delete e[n];this.getData({params:e})},submit:function(){var t=Object(o["a"])({},this.searchKey);for(var e in t)t[e]||delete t[e];this.getData({params:t})},onDetail:function(t){this.$router.push({name:"siteDetail",query:{id:t.row.id}})},addSite:function(){this.$router.push({name:"siteAdd",params:{page:"create"}})},onEdit:function(t){this.$router.push({name:"siteAdd",params:{page:"edit"},query:{id:t.row.id}})}}},l=c,d=(n("0acf"),n("2877")),p=Object(d["a"])(l,a,r,!1,null,"7e19a81c",null);e["default"]=p.exports},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);