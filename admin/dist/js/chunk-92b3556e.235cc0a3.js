(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92b3556e"],{"0ef3":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},a=[],o=(n("ac6a"),n("5176")),u=n.n(o),i=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),s=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},l=c,d=(n("4974"),n("2877")),f=Object(d["a"])(l,i,s,!1,null,null,null),p=f.exports,m={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},h=m,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(p,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",u()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],r=[];n.forEach(function(t){h[t]&&r.push(h[t])});var a=t.button?[].concat(r,t.button):r;return t.render=function(t,n){return n.tableData=e.value,t("div",a.map(function(r){return r(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var r=t;return r.editable&&(r=e.suportEdit(r,n)),"handle"===r.key&&(r=e.surportHandle(r)),r})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),v=g,b=(n("1e5b"),Object(d["a"])(v,r,a,!1,null,"a62d0182",null));e["a"]=b.exports},"1e5b":function(t,e,n){"use strict";var r=n("35ee"),a=n.n(r);a.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var r=n("2178"),a=n.n(r);a.a},"709f":function(t,e,n){"use strict";var r=n("c49c"),a=n.n(r);a.a},"7fe0":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"mt10 mb20"},[n("Button",{staticClass:"w130x oldColor",on:{click:t.addRole}},[t._v("新增角色")])],1),n("div",{staticClass:"v2-table"},[n("Tables",{ref:"dragable",attrs:{columns:t.table.columns,page:t.table.page,loading:t.$root.tableLoading,value:t.table.data},on:{"on-edit":t.onEdit,"on-delete":t.onDelete}})],1)])},a=[],o=n("fa69"),u=n("8593"),i={components:{Tables:o["a"]},data:function(){var t=this;this.$createElement;return{table:{page:!1,loading:!0,columns:[{title:"ID",key:"id",align:"center",width:50},{title:"角色名称",key:"title",align:"center"},{title:"角色描述",key:"description",align:"center"},{title:"更新时间",key:"updated_at",align:"center",render:function(e,n){return e("span",[t.$root.unixTime(n.row.updated_at)])}},{title:"操作",key:"handle",align:"center",width:220,options:["edit","delete"]}],data:[]}}},created:function(){this.getData()},methods:{getData:function(){var t=this;this.$root.startTableLoading(),Object(u["J"])().then(function(e){t.table.data=e.data.data})},addRole:function(){this.$router.push({name:"roleEdit",params:{page:"create"}})},onEdit:function(t){var e=t.row.id;this.$router.push({name:"roleEdit",params:{page:"edit"},query:{id:e}})},onDelete:function(t){var e=this;this.$Tip.confirm({content:"确定删除此角色吗",onOk:function(){Object(u["eb"])({id:t.row.id}).then(function(n){200==n.code&&e.table.data.splice(t.index,1)})}})}}},s=i,c=(n("709f"),n("2877")),l=Object(c["a"])(s,r,a,!1,null,"a66aedca",null);e["default"]=l.exports},8593:function(t,e,n){"use strict";n.d(e,"mb",function(){return a}),n.d(e,"rb",function(){return o}),n.d(e,"C",function(){return u}),n.d(e,"k",function(){return i}),n.d(e,"Ab",function(){return s}),n.d(e,"hb",function(){return c}),n.d(e,"I",function(){return l}),n.d(e,"J",function(){return d}),n.d(e,"db",function(){return f}),n.d(e,"gb",function(){return p}),n.d(e,"eb",function(){return m}),n.d(e,"fb",function(){return h}),n.d(e,"l",function(){return g}),n.d(e,"H",function(){return v}),n.d(e,"lb",function(){return b}),n.d(e,"nb",function(){return y}),n.d(e,"jb",function(){return q}),n.d(e,"kb",function(){return C}),n.d(e,"tb",function(){return x}),n.d(e,"wb",function(){return w}),n.d(e,"sb",function(){return D}),n.d(e,"ub",function(){return S}),n.d(e,"vb",function(){return k}),n.d(e,"xb",function(){return $}),n.d(e,"x",function(){return I}),n.d(e,"y",function(){return L}),n.d(e,"z",function(){return T}),n.d(e,"K",function(){return F}),n.d(e,"qb",function(){return E}),n.d(e,"D",function(){return _}),n.d(e,"ob",function(){return z}),n.d(e,"pb",function(){return B}),n.d(e,"L",function(){return R}),n.d(e,"ib",function(){return M}),n.d(e,"U",function(){return U}),n.d(e,"V",function(){return A}),n.d(e,"S",function(){return N}),n.d(e,"T",function(){return O}),n.d(e,"W",function(){return P}),n.d(e,"ab",function(){return j}),n.d(e,"Y",function(){return H}),n.d(e,"X",function(){return G}),n.d(e,"bb",function(){return J}),n.d(e,"Z",function(){return W}),n.d(e,"cb",function(){return K}),n.d(e,"P",function(){return Q}),n.d(e,"N",function(){return V}),n.d(e,"M",function(){return X}),n.d(e,"Q",function(){return Y}),n.d(e,"O",function(){return Z}),n.d(e,"R",function(){return tt}),n.d(e,"u",function(){return et}),n.d(e,"s",function(){return nt}),n.d(e,"r",function(){return rt}),n.d(e,"v",function(){return at}),n.d(e,"t",function(){return ot}),n.d(e,"w",function(){return ut}),n.d(e,"p",function(){return it}),n.d(e,"A",function(){return st}),n.d(e,"n",function(){return ct}),n.d(e,"o",function(){return lt}),n.d(e,"B",function(){return dt}),n.d(e,"m",function(){return ft}),n.d(e,"q",function(){return pt}),n.d(e,"i",function(){return mt}),n.d(e,"h",function(){return ht}),n.d(e,"j",function(){return gt}),n.d(e,"f",function(){return vt}),n.d(e,"g",function(){return bt}),n.d(e,"e",function(){return yt}),n.d(e,"a",function(){return qt}),n.d(e,"d",function(){return Ct}),n.d(e,"c",function(){return xt}),n.d(e,"b",function(){return wt}),n.d(e,"zb",function(){return Dt}),n.d(e,"yb",function(){return St}),n.d(e,"F",function(){return kt}),n.d(e,"E",function(){return $t}),n.d(e,"G",function(){return It});var r=n("66df"),a=function(t){var e=t.params,n=t.query,a={url:"siteManagementList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},o=function(t){var e={url:"/menuSort",method:"post",data:t};return r["a"].request(e)},u=function(t){var e={url:"/menuDel",method:"post",data:t};return r["a"].request(e)},i=function(t){var e={url:"/menuAdd",method:"post",data:t};return r["a"].request(e)},s=function(t){var e={url:"/menuUpdate",method:"post",data:t};return r["a"].request(e)},c=function(t){var e={url:"/permissionSearchUri",method:"post",data:t};return r["a"].request(e)},l=function(t){var e={url:"/permissionList",method:"get",data:t};return r["a"].request(e)},d=function(){var t={url:"/roleList",method:"get"};return r["a"].request(t)},f=function(t){var e={url:"/roleAdd",method:"post",data:t};return r["a"].request(e)},p=function(t){var e={url:"/roleUpdate",method:"post",data:t};return r["a"].request(e)},m=function(t){var e={url:"/roleDel",method:"post",data:t};return r["a"].request(e)},h=function(t){var e={url:"/roleDetail",method:"post",data:t};return r["a"].request(e)},g=function(t){var e={url:"/adminModifyStatus",method:"get",params:t};return r["a"].request(e)},v=function(t){var e=t.params,n=t.query,a={url:"/adminLogList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},b=function(t){var e={url:"siteManagementDetail",method:"get",params:t};return r["a"].request(e)},y=function(t){var e={url:"siteManagementUpdate",method:"post",data:t};return r["a"].request(e)},q=function(t){var e={url:"siteManagementCreate",method:"post",data:t};return r["a"].request(e)},C=function(){var t={url:"siteManagementDbId",method:"get"};return r["a"].request(t)},x=function(t){var e=t.params,n=t.query,a={url:"systemMemberLevelList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},w=function(t){var e=t.params,n=t.query,a={url:"systemMemberRefundLevelList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},D=function(t){var e={url:"systemMemberLevelAdd",method:"post",data:t};return r["a"].request(e)},S=function(t){var e={url:"systemMemberLevelUp",method:"post",data:t};return r["a"].request(e)},k=function(t){var e={url:"systemMemberRefundLevelAdd",method:"post",data:t};return r["a"].request(e)},$=function(t){var e={url:"systemMemberRefundLevelUp",method:"post",data:t};return r["a"].request(e)},I=function(t){var e={url:"blackList",method:"get",params:t};return r["a"].request(e)},L=function(t){var e={url:"blackListCreate",method:"post",data:t};return r["a"].request(e)},T=function(t){var e={url:"blackListDelete",method:"get",params:t};return r["a"].request(e)},F=function(t){var e={url:"/slideList",method:"get",params:t};return r["a"].request(e)},E=function(t){var e={url:"slideIns",method:"post",data:t};return r["a"].request(e)},_=function(t){var e={url:"/slideDel",method:"get",params:t};return r["a"].request(e)},z=function(t){var e={url:"/slideImgInfo",method:"get",params:t};return r["a"].request(e)},B=function(t){var e={url:"slideImgInfoUpt",method:"post",data:t};return r["a"].request(e)},R=function(t){var e=t.params,n=t.query,a={url:"inBox",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},M=function(t){var e=t.params,n=t.query,a={url:"outBox",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},U=function(t){var e={url:"letterReply",method:"post",data:t};return r["a"].request(e)},A=function(t){var e={url:"letterSend",method:"post",data:t};return r["a"].request(e)},N=function(t){var e={url:"letterDel",method:"post",data:t};return r["a"].request(e)},O=function(t){var e={url:"/letterDetail",method:"get",params:t};return r["a"].request(e)},P=function(t){var e={url:"/letterUptRead",method:"get",params:t};return r["a"].request(e)},j=function(t){var e=t.params,n=t.query,a={url:"popupsList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},H=function(t){var e={url:"popupsDetail",method:"get",params:t};return r["a"].request(e)},G=function(t){var e={url:"/popupsDel",method:"get",params:t};return r["a"].request(e)},J=function(t){var e={url:"popupsStatusChange",method:"post",data:t};return r["a"].request(e)},W=function(t){var e={url:"popupsIns",method:"post",data:t};return r["a"].request(e)},K=function(t){var e={url:"popupsUpt",method:"post",data:t};return r["a"].request(e)},Q=function(t){var e=t.params,n=t.query,a={url:"lanternList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},V=function(t){var e={url:"lanternDetail",method:"get",params:t};return r["a"].request(e)},X=function(t){var e={url:"/lanternDel",method:"get",params:t};return r["a"].request(e)},Y=function(t){var e={url:"lanternStatusChange",method:"post",data:t};return r["a"].request(e)},Z=function(t){var e={url:"lanternIns",method:"post",data:t};return r["a"].request(e)},tt=function(t){var e={url:"lanternUpt",method:"post",data:t};return r["a"].request(e)},et=function(t){var e=t.params,n=t.query,a={url:"articleList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},nt=function(t){var e={url:"articleDetail",method:"get",params:t};return r["a"].request(e)},rt=function(t){var e={url:"/articleDel",method:"get",params:t};return r["a"].request(e)},at=function(t){var e={url:"articleStatusChange",method:"post",data:t};return r["a"].request(e)},ot=function(t){var e={url:"articleIns",method:"post",data:t};return r["a"].request(e)},ut=function(t){var e={url:"articleUpt",method:"post",data:t};return r["a"].request(e)},it=function(t){var e=t.params,n=t.query,a={url:"adminNewList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},st=function(t){var e={url:"changePassWord",method:"post",data:t};return r["a"].request(e)},ct=function(t){var e={url:"adminNewDelete",method:"post",data:t};return r["a"].request(e)},lt=function(t){var e={url:"adminNewDetail",method:"post",data:t};return r["a"].request(e)},dt=function(t){var e={url:"copyAdmin",method:"post",data:t};return r["a"].request(e)},ft=function(t){var e={url:"adminNewAdd",method:"post",data:t};return r["a"].request(e)},pt=function(t){var e={url:"adminNewUpdate",method:"post",data:t};return r["a"].request(e)},mt=function(t){var e=t.params,n=t.query,a={url:"activityList",method:"post",data:e};return n&&(a.params=n),r["a"].request(a)},ht=function(t){var e={url:"activityIns",method:"post",data:t};return r["a"].request(e)},gt=function(t){var e={url:"activityUpt",method:"post",data:t};return r["a"].request(e)},vt=function(t){var e={url:"/activityDel",method:"get",params:t};return r["a"].request(e)},bt=function(t){var e={url:"/activityDetail",method:"get",params:t};return r["a"].request(e)},yt=function(t){var e={url:"activityChangeStatus",method:"post",data:t};return r["a"].request(e)},qt=function(t){var e={url:"/activityBySort",method:"get",params:t};return r["a"].request(e)},Ct=function(t){var e={url:"/activityCateList",method:"get",params:t};return r["a"].request(e)},xt=function(t){var e={url:"activityCateIns",method:"post",data:t};return r["a"].request(e)},wt=function(t){var e={url:"/activityCateDel",method:"get",params:t};return r["a"].request(e)},Dt=function(t){var e={url:"systemSiteGameUp",method:"post",data:t};return r["a"].request(e)},St=function(t){var e={url:"systemSiteGameList",method:"post",data:t};return r["a"].request(e)},kt=function(t){var e={url:"gameConfigList",method:"post",data:t};return r["a"].request(e)},$t=function(t){var e={url:"/gameConfigClassification",method:"get",params:t};return r["a"].request(e)},It=function(t){var e={url:"/gameConfigUpGameStatus",method:"post",data:t};return r["a"].request(e)}},c49c:function(t,e,n){},fa69:function(t,e,n){"use strict";var r=n("0ef3");e["a"]=r["a"]}}]);