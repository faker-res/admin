(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b5cc1c7c"],{"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},r=[],i=(n("ac6a"),n("5176")),o=n.n(i),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),u=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},l=c,d=(n("4974"),n("2877")),f=Object(d["a"])(l,s,u,!1,null,null,null),m=f.exports,p={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},h=p,v=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(m,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",o()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){h[t]&&a.push(h[t])});var r=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",r.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),g=v,y=(n("1e5b"),Object(d["a"])(g,a,r,!1,null,"a62d0182",null));e["a"]=y.exports},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),r=n.n(a);r.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),r=n.n(a);r.a},"4ffd":function(t,e,n){},5118:function(t,e,n){(function(t){var a="undefined"!==typeof t&&t||"undefined"!==typeof self&&self||window,r=Function.prototype.apply;function i(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new i(r.call(setTimeout,a,arguments),clearTimeout)},e.setInterval=function(){return new i(r.call(setInterval,a,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(a,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n("6017"),e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof t&&t.clearImmediate||this&&this.clearImmediate}).call(this,n("c8ba"))},6017:function(t,e,n){(function(t,e){(function(t,n){"use strict";if(!t.setImmediate){var a,r=1,i={},o=!1,s=t.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(t);u=u&&u.setTimeout?u:t,"[object process]"==={}.toString.call(t.process)?m():p()?h():t.MessageChannel?v():s&&"onreadystatechange"in s.createElement("script")?g():y(),u.setImmediate=c,u.clearImmediate=l}function c(t){"function"!==typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var o={callback:t,args:e};return i[r]=o,a(r),r++}function l(t){delete i[t]}function d(t){var e=t.callback,a=t.args;switch(a.length){case 0:e();break;case 1:e(a[0]);break;case 2:e(a[0],a[1]);break;case 3:e(a[0],a[1],a[2]);break;default:e.apply(n,a);break}}function f(t){if(o)setTimeout(f,0,t);else{var e=i[t];if(e){o=!0;try{d(e)}finally{l(t),o=!1}}}}function m(){a=function(t){e.nextTick(function(){f(t)})}}function p(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}function h(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"===typeof n.data&&0===n.data.indexOf(e)&&f(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),a=function(n){t.postMessage(e+n,"*")}}function v(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;f(e)},a=function(e){t.port2.postMessage(e)}}function g(){var t=s.documentElement;a=function(e){var n=s.createElement("script");n.onreadystatechange=function(){f(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}function y(){a=function(t){setTimeout(f,0,t)}}})("undefined"===typeof self?"undefined"===typeof t?this:t:self)}).call(this,n("c8ba"),n("4362"))},"75de":function(t,e,n){"use strict";var a=n("4ffd"),r=n.n(a);r.a},8593:function(t,e,n){"use strict";n.d(e,"mb",function(){return r}),n.d(e,"rb",function(){return i}),n.d(e,"C",function(){return o}),n.d(e,"k",function(){return s}),n.d(e,"Ab",function(){return u}),n.d(e,"hb",function(){return c}),n.d(e,"I",function(){return l}),n.d(e,"J",function(){return d}),n.d(e,"db",function(){return f}),n.d(e,"gb",function(){return m}),n.d(e,"eb",function(){return p}),n.d(e,"fb",function(){return h}),n.d(e,"l",function(){return v}),n.d(e,"H",function(){return g}),n.d(e,"lb",function(){return y}),n.d(e,"nb",function(){return b}),n.d(e,"jb",function(){return w}),n.d(e,"kb",function(){return C}),n.d(e,"tb",function(){return x}),n.d(e,"wb",function(){return q}),n.d(e,"sb",function(){return S}),n.d(e,"ub",function(){return T}),n.d(e,"vb",function(){return I}),n.d(e,"xb",function(){return $}),n.d(e,"x",function(){return k}),n.d(e,"y",function(){return D}),n.d(e,"z",function(){return _}),n.d(e,"K",function(){return O}),n.d(e,"qb",function(){return F}),n.d(e,"D",function(){return B}),n.d(e,"ob",function(){return L}),n.d(e,"pb",function(){return j}),n.d(e,"L",function(){return M}),n.d(e,"ib",function(){return P}),n.d(e,"U",function(){return E}),n.d(e,"V",function(){return N}),n.d(e,"S",function(){return A}),n.d(e,"T",function(){return z}),n.d(e,"W",function(){return K}),n.d(e,"ab",function(){return R}),n.d(e,"Y",function(){return U}),n.d(e,"X",function(){return H}),n.d(e,"bb",function(){return W}),n.d(e,"Z",function(){return G}),n.d(e,"cb",function(){return J}),n.d(e,"P",function(){return V}),n.d(e,"N",function(){return Q}),n.d(e,"M",function(){return X}),n.d(e,"Q",function(){return Y}),n.d(e,"O",function(){return Z}),n.d(e,"R",function(){return tt}),n.d(e,"u",function(){return et}),n.d(e,"s",function(){return nt}),n.d(e,"r",function(){return at}),n.d(e,"v",function(){return rt}),n.d(e,"t",function(){return it}),n.d(e,"w",function(){return ot}),n.d(e,"p",function(){return st}),n.d(e,"A",function(){return ut}),n.d(e,"n",function(){return ct}),n.d(e,"o",function(){return lt}),n.d(e,"B",function(){return dt}),n.d(e,"m",function(){return ft}),n.d(e,"q",function(){return mt}),n.d(e,"i",function(){return pt}),n.d(e,"h",function(){return ht}),n.d(e,"j",function(){return vt}),n.d(e,"f",function(){return gt}),n.d(e,"g",function(){return yt}),n.d(e,"e",function(){return bt}),n.d(e,"a",function(){return wt}),n.d(e,"d",function(){return Ct}),n.d(e,"c",function(){return xt}),n.d(e,"b",function(){return qt}),n.d(e,"zb",function(){return St}),n.d(e,"yb",function(){return Tt}),n.d(e,"F",function(){return It}),n.d(e,"E",function(){return $t}),n.d(e,"G",function(){return kt});var a=n("66df"),r=function(t){var e=t.params,n=t.query,r={url:"siteManagementList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},i=function(t){var e={url:"/menuSort",method:"post",data:t};return a["a"].request(e)},o=function(t){var e={url:"/menuDel",method:"post",data:t};return a["a"].request(e)},s=function(t){var e={url:"/menuAdd",method:"post",data:t};return a["a"].request(e)},u=function(t){var e={url:"/menuUpdate",method:"post",data:t};return a["a"].request(e)},c=function(t){var e={url:"/permissionSearchUri",method:"post",data:t};return a["a"].request(e)},l=function(t){var e={url:"/permissionList",method:"get",data:t};return a["a"].request(e)},d=function(){var t={url:"/roleList",method:"get"};return a["a"].request(t)},f=function(t){var e={url:"/roleAdd",method:"post",data:t};return a["a"].request(e)},m=function(t){var e={url:"/roleUpdate",method:"post",data:t};return a["a"].request(e)},p=function(t){var e={url:"/roleDel",method:"post",data:t};return a["a"].request(e)},h=function(t){var e={url:"/roleDetail",method:"post",data:t};return a["a"].request(e)},v=function(t){var e={url:"/adminModifyStatus",method:"get",params:t};return a["a"].request(e)},g=function(t){var e=t.params,n=t.query,r={url:"/adminLogList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},y=function(t){var e={url:"siteManagementDetail",method:"get",params:t};return a["a"].request(e)},b=function(t){var e={url:"siteManagementUpdate",method:"post",data:t};return a["a"].request(e)},w=function(t){var e={url:"siteManagementCreate",method:"post",data:t};return a["a"].request(e)},C=function(){var t={url:"siteManagementDbId",method:"get"};return a["a"].request(t)},x=function(t){var e=t.params,n=t.query,r={url:"systemMemberLevelList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},q=function(t){var e=t.params,n=t.query,r={url:"systemMemberRefundLevelList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},S=function(t){var e={url:"systemMemberLevelAdd",method:"post",data:t};return a["a"].request(e)},T=function(t){var e={url:"systemMemberLevelUp",method:"post",data:t};return a["a"].request(e)},I=function(t){var e={url:"systemMemberRefundLevelAdd",method:"post",data:t};return a["a"].request(e)},$=function(t){var e={url:"systemMemberRefundLevelUp",method:"post",data:t};return a["a"].request(e)},k=function(t){var e={url:"blackList",method:"get",params:t};return a["a"].request(e)},D=function(t){var e={url:"blackListCreate",method:"post",data:t};return a["a"].request(e)},_=function(t){var e={url:"blackListDelete",method:"get",params:t};return a["a"].request(e)},O=function(t){var e={url:"/slideList",method:"get",params:t};return a["a"].request(e)},F=function(t){var e={url:"slideIns",method:"post",data:t};return a["a"].request(e)},B=function(t){var e={url:"/slideDel",method:"get",params:t};return a["a"].request(e)},L=function(t){var e={url:"/slideImgInfo",method:"get",params:t};return a["a"].request(e)},j=function(t){var e={url:"slideImgInfoUpt",method:"post",data:t};return a["a"].request(e)},M=function(t){var e=t.params,n=t.query,r={url:"inBox",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},P=function(t){var e=t.params,n=t.query,r={url:"outBox",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},E=function(t){var e={url:"letterReply",method:"post",data:t};return a["a"].request(e)},N=function(t){var e={url:"letterSend",method:"post",data:t};return a["a"].request(e)},A=function(t){var e={url:"letterDel",method:"post",data:t};return a["a"].request(e)},z=function(t){var e={url:"/letterDetail",method:"get",params:t};return a["a"].request(e)},K=function(t){var e={url:"/letterUptRead",method:"get",params:t};return a["a"].request(e)},R=function(t){var e=t.params,n=t.query,r={url:"popupsList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},U=function(t){var e={url:"popupsDetail",method:"get",params:t};return a["a"].request(e)},H=function(t){var e={url:"/popupsDel",method:"get",params:t};return a["a"].request(e)},W=function(t){var e={url:"popupsStatusChange",method:"post",data:t};return a["a"].request(e)},G=function(t){var e={url:"popupsIns",method:"post",data:t};return a["a"].request(e)},J=function(t){var e={url:"popupsUpt",method:"post",data:t};return a["a"].request(e)},V=function(t){var e=t.params,n=t.query,r={url:"lanternList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},Q=function(t){var e={url:"lanternDetail",method:"get",params:t};return a["a"].request(e)},X=function(t){var e={url:"/lanternDel",method:"get",params:t};return a["a"].request(e)},Y=function(t){var e={url:"lanternStatusChange",method:"post",data:t};return a["a"].request(e)},Z=function(t){var e={url:"lanternIns",method:"post",data:t};return a["a"].request(e)},tt=function(t){var e={url:"lanternUpt",method:"post",data:t};return a["a"].request(e)},et=function(t){var e=t.params,n=t.query,r={url:"articleList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},nt=function(t){var e={url:"articleDetail",method:"get",params:t};return a["a"].request(e)},at=function(t){var e={url:"/articleDel",method:"get",params:t};return a["a"].request(e)},rt=function(t){var e={url:"articleStatusChange",method:"post",data:t};return a["a"].request(e)},it=function(t){var e={url:"articleIns",method:"post",data:t};return a["a"].request(e)},ot=function(t){var e={url:"articleUpt",method:"post",data:t};return a["a"].request(e)},st=function(t){var e=t.params,n=t.query,r={url:"adminNewList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},ut=function(t){var e={url:"changePassWord",method:"post",data:t};return a["a"].request(e)},ct=function(t){var e={url:"adminNewDelete",method:"post",data:t};return a["a"].request(e)},lt=function(t){var e={url:"adminNewDetail",method:"post",data:t};return a["a"].request(e)},dt=function(t){var e={url:"copyAdmin",method:"post",data:t};return a["a"].request(e)},ft=function(t){var e={url:"adminNewAdd",method:"post",data:t};return a["a"].request(e)},mt=function(t){var e={url:"adminNewUpdate",method:"post",data:t};return a["a"].request(e)},pt=function(t){var e=t.params,n=t.query,r={url:"activityList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},ht=function(t){var e={url:"activityIns",method:"post",data:t};return a["a"].request(e)},vt=function(t){var e={url:"activityUpt",method:"post",data:t};return a["a"].request(e)},gt=function(t){var e={url:"/activityDel",method:"get",params:t};return a["a"].request(e)},yt=function(t){var e={url:"/activityDetail",method:"get",params:t};return a["a"].request(e)},bt=function(t){var e={url:"activityChangeStatus",method:"post",data:t};return a["a"].request(e)},wt=function(t){var e={url:"/activityBySort",method:"get",params:t};return a["a"].request(e)},Ct=function(t){var e={url:"/activityCateList",method:"get",params:t};return a["a"].request(e)},xt=function(t){var e={url:"activityCateIns",method:"post",data:t};return a["a"].request(e)},qt=function(t){var e={url:"/activityCateDel",method:"get",params:t};return a["a"].request(e)},St=function(t){var e={url:"systemSiteGameUp",method:"post",data:t};return a["a"].request(e)},Tt=function(t){var e={url:"systemSiteGameList",method:"post",data:t};return a["a"].request(e)},It=function(t){var e={url:"gameConfigList",method:"post",data:t};return a["a"].request(e)},$t=function(t){var e={url:"/gameConfigClassification",method:"get",params:t};return a["a"].request(e)},kt=function(t){var e={url:"/gameConfigUpGameStatus",method:"post",data:t};return a["a"].request(e)}},cc02:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search mb20 clearfix"},[n("Form",{attrs:{inline:""}},[n("div",{staticClass:"fl"},["super"==t.adminType||-1!=t.authInPage.indexOf("activityIns")?n("Button",{staticClass:"cardNutton activity-btn",staticStyle:{width:"148px"},on:{click:t.addActivity}},[n("Icons",{attrs:{type:"tianjialunbotuanniu"}}),t._v("新增活动\n        ")],1):t._e()],1),n("div",{staticClass:"fl"},[n("Button",{staticClass:"cardNutton fr ml20 activity-btn bc-c1",class:"mobile"===t.searchKey.client_type?"active":"",on:{click:function(e){return t.selectWay("mobile")}}},[t._v("移动端")]),n("Button",{staticClass:"cardNutton fr ml20 activity-btn bc-c1",class:"pc"===t.searchKey.client_type?"active":"",on:{click:function(e){return t.selectWay("pc")}}},[t._v("PC")]),n("Button",{staticClass:"cardNutton fr ml30 activity-btn bc-c1",class:"pc,mobile"===t.searchKey.client_type?"active":"",on:{click:function(e){return t.selectWay("pc,mobile")}}},[t._v("全部")])],1)])],1),n("div",{staticClass:"v2-search bb mb20"},[n("ButtonGroup",{staticClass:"repay-button"},[n("Button",{class:"all"==t.currentBtn?"active":"noactive",on:{click:function(e){return t.getall()}}},[t._v("\n        全部\n        "),n("i",{staticClass:"ivu-icon ivu-icon-ios-close"})]),t._l(t.buttonlist,function(e,a){return n("Button",{key:a,class:t.currentBtn==a?"active":"noactive",on:{click:function(n){return t.gettable(e,a)}}},[t._v("\n        "+t._s(e.activity_cate_name)+"\n        "),"super"==t.adminType||-1!=t.authInPage.indexOf("activityCateDel")?n("i",{staticClass:"ivu-icon ivu-icon-ios-close",on:{click:function(n){return t.delactity(e)}}}):t._e()])}),"super"==t.adminType||-1!=t.authInPage.indexOf("activityCateIns")?n("span",{staticClass:"addfenlei",on:{click:t.addfenlei}},[t._v("+")]):t._e()],2)],1),n("div",{staticClass:"v2-table"},[n("Tables",{ref:"table",attrs:{loading:t.$root.tableLoading,columns:t.table.columns,value:t.table.data,draggable:!0,page:!1},on:{"on-edit":t.onEdit,"on-details":t.onDetails,"on-preview":t.preview,"on-delete":t.onDelete,"on-drag-drop":t.onDragDrop}}),n("Modals",{ref:"ModalsDetial",attrs:{title:"预览地址",width:"760px"}},[n("div",{staticClass:"modal-overflow",staticStyle:{width:"760px"},attrs:{slot:"content"},slot:"content"},[n("Form",{ref:"formKey",attrs:{"label-width":230}},[n("FormItem",{staticClass:"address_item",attrs:{label:"预览地址："}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.previewlist.url_link,expression:"previewlist.url_link"}],attrs:{disabled:""},domProps:{value:t.previewlist.url_link},on:{input:function(e){e.target.composing||t.$set(t.previewlist,"url_link",e.target.value)}}}),n("Button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}]},[t._v("复制")])],1),n("FormItem",{attrs:{label:"有效时间："}},[n("span",[t._v(t._s(t.$root.unixTime(t.previewlist.online_time)))]),n("span",[t._v("(预览只限20分钟之内有效)")])]),n("FormItem",{attrs:{label:"预览方式："}},[t._v("打开网页后，粘贴网址打开即可预览")])],1)],1)])],1),n("Modals",{ref:"addfenleiModal",attrs:{title:"新增分类",width:"500px"}},[n("div",{staticClass:"modal-overflow",staticStyle:{width:"500px"},attrs:{slot:"content"},slot:"content"},[n("Form",{ref:"memberLevelForm",attrs:{rules:t.addActivityRules,"label-width":150,model:t.memberLevelForm}},[n("FormItem",{attrs:{label:"分类名称",prop:"fenleiName"}},[n("Input",{staticClass:"w260x",attrs:{placeholder:"请输入分类名称"},model:{value:t.memberLevelForm.fenleiName,callback:function(e){t.$set(t.memberLevelForm,"fenleiName",e)},expression:"memberLevelForm.fenleiName"}})],1),n("Button",{staticClass:"ivu-btn addSave mt40",on:{click:t.addsave}},[t._v("确认添加")])],1)],1)])],1)},r=[],i=n("7618"),o=n("cebc"),s=n("fa69"),u=n("fab6"),c=n("83ae"),l=n("d027"),d=n("c276"),f=n("8593"),m=(n("5118"),{mixins:[u["a"]],components:{Tables:s["a"],Icons:c["a"],Modals:l["a"]},data:function(){var t=this;this.$createElement;return{adminType:Object(d["l"])(),authInPage:JSON.parse(localStorage.authInPage),id:"",canDrag:!1,searchKey:{siteId:this.$root.nowSite.id,client_type:"pc,mobile",activity_cate_id:""},previewlist:"",currentBtn:"all",buttonlist:[],addActivityRules:{fenleiName:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},memberLevelForm:{fenleiName:""},table:{total:0,data:[],loading:!0,pageSizeOpts:[20,30,40],columns:[{title:"排序",align:"center",width:60,render:function(t,e){return t(c["a"],{props:{type:"paixukongjian",color:"#dadada",size:20}})}},{title:"活动标题",key:"title",align:"center"},{title:"下架时间",key:"offline_time",align:"center",render:function(e,n){return e("span",[t.$root.unixTime(n.row.offline_time)])}},{title:"发布人",key:"adminName",align:"center"},{title:"状态",key:"",align:"center",render:function(e,n){var a="yes"==n.row.status;return e("i-switch",{props:{value:a,size:"large"},scopedSlots:{open:function(){return e("span","开启")},close:function(){return e("span","停用")}},on:{"on-change":function(e){"super"==t.adminType||-1!=t.authInPage.indexOf("activityChangeStatus")?t.switch(n.row):t.$Tip.info({content:"对不起，您暂时没有此权限"})}}})}},{title:"终端",key:"client_type",align:"center",render:function(t,e){var n=e.row.client_type;return"pc,mobile"!==n?t("div",[t(c["a"],{props:{type:"zhongduan-".concat("pc"===n?"PC":"shouji"),color:"#C5C5C5"}}),t("span",{class:"ml10 f-color"},"pc"===n?"PC":"手机")]):t("table",{style:{width:"100%"}},[t("th",{style:{width:"50%",textAlign:"center",background:"none",borderBottom:"none"}},[t("div",[t(c["a"],{attrs:{type:"zhongduan-PC",color:"#C5C5C5"}}),t("span",{class:"ml10 f-color",style:"font-weight: normal"},["PC"])])]),t("th",{style:{width:"50%",textAlign:"center",background:"none",borderBottom:"none",borderRight:"none"}},[t("div",[t(c["a"],{attrs:{type:"zhongduan-shouji",color:"#C5C5C5"}}),t("span",{class:"ml10 f-color",style:"font-weight: normal"},["手机"])])])])}},{title:"操作",align:"center",render:function(e,n){return e("div",[e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("activityDetail")?"inline-block":"none"},on:{click:function(){t.preview(n)}}},["预览"]),e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("activityUpt")?"inline-block":"none"},on:{click:function(){t.onEdit(n)}}},["编辑"]),e("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("activityDel")?"inline-block":"none"},on:{click:function(){t.onDelete(n)}}},["删除"])])}}]}}},mounted:function(){},created:function(){this.getActivelist()},methods:{getData:function(t){var e=this,n=t.params;for(var a in n)n[a]||delete n[a];this.$root.startTableLoading(),Object(f["i"])(t).then(function(t){var n=t.data;e.table.data=n})},onDelete:function(t){var e=this;this.$Tip.confirm({content:"您确定删除吗？",onOk:function(){var n={id:t.row.id,siteId:e.$root.nowSite.id};Object(f["f"])(n).then(function(n){200==n.code&&e.table.data.splice(t.index,1)})}})},gettable:function(t,e){this.currentBtn=e,this.searchKey.activity_cate_id=t.id;var n=Object(o["a"])({},this.searchKey);n.siteId=this.$root.nowSite.id,this.getData({params:n})},selectWay:function(t){this.searchKey.client_type=t;var e=Object(o["a"])({},this.searchKey);console.log(11111,e),e.siteId=this.$root.nowSite.id,this.getData({params:e})},getall:function(){this.currentBtn="all",this.searchKey.activity_cate_id="";var t=Object(o["a"])({},this.searchKey);t.siteId=this.$root.nowSite.id,delete t.activity_cate_id,this.getData({params:t})},preview:function(t){var e=this;Object(f["g"])({siteId:this.$root.nowSite.id,id:t.row.id}).then(function(t){e.previewlist=t.data,e.$refs.ModalsDetial.show()})},onEdit:function(t){this.$router.push({name:"addActivities",params:{page:"edit"},query:{id:t.row.id,siteId:this.$root.nowSite.id}})},getActivelist:function(){var t=this;Object(f["d"])({siteId:this.$root.nowSite.id}).then(function(e){t.buttonlist=e.data})},addsave:function(){var t=this;this.$refs.memberLevelForm.validate(function(e){if(e){var n={siteId:t.$root.nowSite.id,activity_cate_name:t.memberLevelForm.fenleiName};Object(f["c"])(n).then(function(e){t.$refs.addfenleiModal.hide(),t.getActivelist()})}})},onDetails:function(t){var e=this,n={id:t.row.id,siteId:this.$root.nowSite.id};lanternDetail(n).then(function(t){e.poplist=t.data,e.$refs.ModalsDetial.show()})},switch:function(t){var e=this,n=t.siteId,a=t.id,r=t.status,i={siteId:n,id:a,status:"yes"==r?"no":"yes"};Object(f["e"])(i).then(function(t){e.getData({params:e.searchKey})})},delactity:function(t){var e=this;this.$Tip.confirm({content:"您确定删除吗？",onOk:function(){var n={id:t.id,siteId:e.$root.nowSite.id};Object(f["b"])(n).then(function(t){200==t.code&&e.getActivelist()})}})},onCopy:function(t){this.$Message.success("复制成功")},onError:function(t){this.$Message.error("复制失败")},addActivity:function(){this.$router.push({name:"addActivities",params:{page:"create"}})},addfenlei:function(){this.memberLevelForm.fenleiName="",this.$refs.addfenleiModal.show()},onDragDrop:function(t,e){var n=this,a={id:this.$refs.table.insideTableData[t].id,siteId:this.$root.nowSite.id,oldIndex:t,newIndex:e};"super"==this.adminType||-1!=this.authInPage.indexOf("activityBySort")?Object(f["a"])(a).then(function(t){"object"===Object(i["a"])(t)&&200===t.code&&("all"===n.currentBtn?n.getall():n.gettable(n.buttonlist[n.currentBtn],n.currentBtn))}):this.$Tip.info({content:"对不起，您暂时没有此权限"})}}}),p=m,h=(n("75de"),n("2877")),v=Object(h["a"])(p,a,r,!1,null,"061431a1",null);e["default"]=v.exports},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]},fab6:function(t,e,n){"use strict";var a=n("cebc"),r=n("2f62"),i={data:function(){return{Time:[],searchKey:{},page:1,sortParams:{}}},computed:Object(a["a"])({},Object(r["d"])({nowSite:function(t){return t.user.nowSite}})),watch:{},filters:{},mounted:function(){var t={siteId:this.$root.nowSite.id};this.getData({params:Object(a["a"])({},this.searchKey,t)})},methods:{onPageChange:function(t){var e=Object(a["a"])({},this.searchKey,{siteId:this.nowSite.id});for(var n in e)e[n]||delete e[n];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),this.page=t,e=Object(a["a"])({},e,this.sortParams),this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t;var e=Object(a["a"])({},this.searchKey,{siteId:this.nowSite.id,limit:t});for(var n in e)e[n]||delete e[n];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),console.log(e),this.getData({params:e})},sortChange:function(t){t.column;var e=t.key,n=t.order,r={sortKey:e,sortVal:n,siteId:this.$root.nowSite.id};this.searchKey.startTime=this.$root.formatTimeS(this.Time[0]),this.searchKey.endTime=this.$root.formatnightTimeS(this.Time[1]),"normal"===r.sortVal&&(delete r.sortKey,delete r.sortVal),this.sortParams={},this.sortParams=Object(a["a"])({},r),1!==this.page?this.getData({params:Object(a["a"])({},this.searchKey,r),query:{page:this.page}}):this.getData({params:Object(a["a"])({},this.searchKey,r)})},exportExcel:function(){this.$root.exportBtnLoading=!0,this.$root.exportBtnLoading=!1}}};e["a"]=i}}]);