(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20be6294"],{"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},r=[],o=(n("ac6a"),n("5176")),i=n.n(o),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),u=[],c={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},l=c,d=(n("4974"),n("2877")),p=Object(d["a"])(l,s,u,!1,null,null,null),m=p.exports,f={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},h=f,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(m,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",i()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){h[t]&&a.push(h[t])});var r=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",r.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=g,v=(n("1e5b"),Object(d["a"])(y,a,r,!1,null,"a62d0182",null));e["a"]=v.exports},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),r=n.n(a);r.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4974:function(t,e,n){"use strict";var a=n("2178"),r=n.n(a);r.a},"5fac":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"v2-search"},[n("Form",{ref:"searchKey",attrs:{inline:""}},["super"==t.adminType||-1!=t.authInPage.indexOf("adminAdd")?n("FormItem",{staticClass:"origin"},[n("Button",{staticClass:"s-120 bgSend white-font",on:{click:t.addAdmin}},[n("Icon",{attrs:{type:"ios-add",color:"#ffffff",size:"22"}}),t._v("新增管理员\n        ")],1)],1):t._e(),"super"==t.adminType?n("FormItem",[n("Checkbox",{model:{value:t.searchKey.type,callback:function(e){t.$set(t.searchKey,"type",e)},expression:"searchKey.type"}},[n("span",[t._v("只看超管")])])],1):t._e(),n("FormItem",{attrs:{label:"管理员账号"}},[n("Input",{staticClass:"s-160",attrs:{placeholder:"多个请以,逗号隔开"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchSubmit(e)}},model:{value:t.searchKey.userName,callback:function(e){t.$set(t.searchKey,"userName",e)},expression:"searchKey.userName"}})],1),n("FormItem",[n("Button",{staticClass:"search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.searchSubmit}},[t._v("查询")])],1)],1)],1),n("div",{staticClass:"v2-table"},[n("Tables",{ref:"tables",attrs:{columns:t.table.columns,loading:t.$root.tableLoading,value:t.table.data,total:t.table.total,pageSizeOpts:t.table.pageSizeOpts},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}})],1),n("Modals",{ref:"changePwd",attrs:{title:"修改密码",width:"526"}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("Form",{ref:"changePwdInfo",staticStyle:{width:"526px"},attrs:{"label-width":130,model:t.changePwdInfo,rules:t.changePwdInfoRules}},[n("FormItem",{attrs:{label:"管理员账号",prop:"userName",required:""}},[n("Input",{staticClass:"w320x",attrs:{disabled:""},model:{value:t.changePwdInfo.userName,callback:function(e){t.$set(t.changePwdInfo,"userName",e)},expression:"changePwdInfo.userName"}})],1),n("FormItem",{attrs:{label:"管理员密码",prop:"password"}},[n("Input",{staticClass:"w320x",attrs:{placeholder:"请输入6-20位数字或字母"},model:{value:t.changePwdInfo.password,callback:function(e){t.$set(t.changePwdInfo,"password",e)},expression:"changePwdInfo.password"}})],1),n("FormItem",[n("Button",{staticClass:"w260x ml30",attrs:{type:"primary"},on:{click:t.saveChange}},[t._v("确认保存")])],1)],1)],1)]),n("Modals",{ref:"copyPermission",attrs:{title:"复制权限",width:"526"}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("div",{staticClass:"copy-tip"},[n("Icon",{staticClass:"ib ml20",staticStyle:{marginTop:"-2px"},attrs:{type:"ios-alert-outline",size:"22"}}),n("p",{staticClass:"ib ml10"},[t._v("复制成功将继承该管理员的所有权限")])],1),n("Form",{ref:"copyPermissionInfo",staticStyle:{width:"526px"},attrs:{model:t.copyPermissionInfo,rules:t.copyPermissionInfoRules,"label-width":140}},[n("FormItem",{attrs:{label:"当前管理员",prop:"currentAdmin",required:""}},[n("Input",{staticClass:"w320x",attrs:{disabled:""},model:{value:t.copyPermissionInfo.currentAdmin,callback:function(e){t.$set(t.copyPermissionInfo,"currentAdmin",e)},expression:"copyPermissionInfo.currentAdmin"}})],1),n("FormItem",{attrs:{label:"新增管理员",prop:"userName"}},[n("Input",{staticClass:"w320x",attrs:{placeholder:"请输入6-20位数字或字母"},model:{value:t.copyPermissionInfo.userName,callback:function(e){t.$set(t.copyPermissionInfo,"userName",e)},expression:"copyPermissionInfo.userName"}})],1),n("FormItem",{attrs:{label:"管理员密码",prop:"password"}},[n("Input",{staticClass:"w320x",attrs:{placeholder:"请输入6-20位数字或字母"},model:{value:t.copyPermissionInfo.password,callback:function(e){t.$set(t.copyPermissionInfo,"password",e)},expression:"copyPermissionInfo.password"}})],1),n("FormItem",[n("Button",{staticClass:"w320x",attrs:{type:"primary"},on:{click:t.copyAdminSubmit}},[t._v("确认新增")])],1)],1)],1)])],1)},r=[],o=n("cebc"),i=n("fa69"),s=n("d027"),u=(n("e069"),n("8593")),c=n("c276"),l={name:"admin",components:{Tables:i["a"],Modals:s["a"]},data:function(){var t=this;this.$createElement;return{adminType:Object(c["l"])(),authInPage:JSON.parse(localStorage.authInPage),changePwdInfo:{userName:"",adminId:null,password:""},changePwdInfoRules:{password:[{required:!0,message:"请输入您的新密码",trigger:"blur"},{pattern:/^[A-Za-z0-9]{6,20}$/,message:"请输入6-20位数字或字母",trigger:"blur"}]},copyPermissionInfo:{currentAdmin:"",userName:"",password:""},copyPermissionInfoRules:{userName:[{required:!0,message:"请输入管理员账号",trigger:"blur"},{pattern:/^[A-Za-z0-9]{6,20}$/,message:"请输入6-20位数字或字母",trigger:"blur"}],password:[{required:!0,message:"请输入管理员密码",trigger:"blur"},{pattern:/^[A-Za-z0-9]{8,20}$/,message:"请输入8-20位数字或字母",trigger:"blur"}]},searchKey:{siteId:this.$root.nowSite.id},table:{loading:!0,pageSizeOpts:[20,30,40,50],data:[],total:0,columns:[{title:"管理员账号",key:"userName",align:"center"},{title:"管理员别称",key:"groupName",align:"center",render:function(e,n){return e("span",[t.$root.text(n.row.otherName)])}},{title:"可用站点",key:"siteId",align:"center",width:100,render:function(t,e){return t("a",[e.row.siteId.slice(0,1)[0]&&e.row.siteId.slice(0,1)[0].siteName])}},{title:"上次登录",key:"lastTime",align:"center",render:function(e,n){return e("span",[t.$root.unixTime(n.row.lastTime)])}},{title:"创建时间",key:"time",align:"center",render:function(e,n){return e("span",[t.$root.unixTime(n.row.time)])}},{title:"创建人",key:"createUserName",align:"center",width:110},{title:"状态",key:"status",align:"center",width:70,render:function(t,e){var n="yes"===e.row.status?"":"#FF0000",a="yes"==e.row.status?"正常":"停用";return t("span",{style:{color:n}},[a])}},{title:"操作",align:"center",render:function(e,n){return e("div",[e("a",{class:"ib mr15",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("adminModifyStatus")?"inline-block":"none"},on:{click:function(){var e={id:n.row.id,status:"yes"===n.row.status?"no":"yes"},a=n.row.status?"您确定停用此管理员账号吗？":"您确定启用此管理员账户吗？";t.$Tip.confirm({content:a,onOk:function(){Object(u["l"])(e).then(function(e){200==e.code&&(t.table.data[n.index].status="yes"==t.table.data[n.index].status?"no":"yes")})}})}}},["yes"==n.row.status?"停用":"启用"]),e("a",{class:"ib mr15",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("adminUpdate")?"inline-block":"none",color:"super"===n.row.type?"#918b8b":"#2D8CF0"},on:{click:function(){"super"!=n.row.type&&t.$router.push({name:"adminEdit",query:{id:n.row.id},params:{page:"edit"}})}}},["编辑"]),e("a",{class:"ib mr15",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("changePassWord")?"inline-block":"none"},on:{click:function(){t.changePwdInfo.userName=n.row.userName,t.changePwdInfo.adminId=n.row.id,t.$refs.changePwd.show()}}},["修改密码"]),e("a",{class:"ib mr15",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("copyAdmin")?"inline-block":"none"},on:{click:function(){t.copyPermissionInfo.currentAdmin=n.row.userName,t.copyPermissionInfo.adminId=n.row.id,t.$refs.copyPermission.show()}}},["复制"]),e("a",{class:"ib",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("adminDelete")?"inline-block":"none"},on:{click:function(){var e={adminId:n.row.id};t.$Tip.confirm({content:"您确定删除此管理员账号吗？",onOk:function(){Object(u["n"])(e).then(function(e){200==e.code&&(t.table.data.splice(n.index,1),t.table.total--)})}})}}},["删除"])])}}]}}},mounted:function(){var t=Object(o["a"])({},this.searchKey);this.searchKey.type&&(t.type="super"),this.getData({params:t})},methods:{getData:function(t){var e=this;this.$root.startTableLoading(this),Object(u["p"])(t).then(function(t){var n=t.data,a=n.data,r=n.total;e.table.data=a,e.table.total=r})},searchSubmit:function(){var t={params:Object(o["a"])({},this.searchKey)};if(this.searchKey.type&&(t.params.type="super"),t.params.userName&&t.params.userName.length<5)return this.$Tip.info({content:"查询用户名须大于5字符"}),!1;for(var e in t.params)t.params[e]||delete t.params[e];this.getData(t)},saveChange:function(){var t=this;this.$refs.changePwdInfo.validate(function(e){if(e){t.$refs.changePwd.spinShow();var n=t.changePwdInfo,a=n.adminId,r=n.password,i={adminId:a,password:r};Object(u["A"])(i).then(function(e){if(t.$refs.changePwd.spinHide(),200==e.code){var n={params:Object(o["a"])({},t.searchKey)};for(var a in n.params.type=n.params.type?"super":"",n.params)n.params[a]||delete n.params[a];t.$refs.changePwd.hide(),t.getData(n),t.$refs.changePwdInfo.resetFields()}}).catch(function(e){t.$refs.changePwd.spinHide()})}})},copyAdminSubmit:function(){var t=this;this.$refs.copyPermissionInfo.validate(function(e){if(e){var n=Object(o["a"])({},t.copyPermissionInfo);delete n.currentAdmin,t.$refs.copyPermission.spinShow(),Object(u["B"])(n).then(function(e){if(t.$refs.copyPermission.spinHide(),200==e.code){t.$refs.copyPermission.hide();var n={params:Object(o["a"])({},t.searchKey)};for(var a in t.searchKey.type&&(n.params.type="super"),n.params)n.params[a]||delete n.params[a];t.getData(n),t.$refs.tables.setPage(),t.$refs.copyPermissionInfoRules.resetFields()}}).catch(function(e){t.$refs.copyPermission.spinHide()})}})},onPageChange:function(t){var e={params:Object(o["a"])({},this.searchKey),query:{page:t}};for(var n in e.params.type=e.params.type?"super":"",e.params)e.params[n]||delete e.params[n];this.getData(e)},onPageSizeChange:function(t){this.searchKey.limit=t;var e={params:Object(o["a"])({},this.searchKey)};for(var n in e.params.type=e.params.type?"super":"",e.params)e.params[n]||delete e.params[n];this.getData(e)},addAdmin:function(){this.$router.push({name:"adminEdit",params:{page:"add"}})}}},d=l,p=(n("8f1a"),n("2877")),m=Object(p["a"])(d,a,r,!1,null,"34c4e086",null);e["default"]=m.exports},8593:function(t,e,n){"use strict";n.d(e,"mb",function(){return r}),n.d(e,"rb",function(){return o}),n.d(e,"C",function(){return i}),n.d(e,"k",function(){return s}),n.d(e,"Ab",function(){return u}),n.d(e,"hb",function(){return c}),n.d(e,"I",function(){return l}),n.d(e,"J",function(){return d}),n.d(e,"db",function(){return p}),n.d(e,"gb",function(){return m}),n.d(e,"eb",function(){return f}),n.d(e,"fb",function(){return h}),n.d(e,"l",function(){return g}),n.d(e,"H",function(){return y}),n.d(e,"lb",function(){return v}),n.d(e,"nb",function(){return b}),n.d(e,"jb",function(){return w}),n.d(e,"kb",function(){return C}),n.d(e,"tb",function(){return I}),n.d(e,"wb",function(){return q}),n.d(e,"sb",function(){return x}),n.d(e,"ub",function(){return k}),n.d(e,"vb",function(){return $}),n.d(e,"xb",function(){return S}),n.d(e,"x",function(){return P}),n.d(e,"y",function(){return D}),n.d(e,"z",function(){return F}),n.d(e,"K",function(){return T}),n.d(e,"qb",function(){return N}),n.d(e,"D",function(){return O}),n.d(e,"ob",function(){return z}),n.d(e,"pb",function(){return A}),n.d(e,"L",function(){return L}),n.d(e,"ib",function(){return _}),n.d(e,"U",function(){return B}),n.d(e,"V",function(){return E}),n.d(e,"S",function(){return R}),n.d(e,"T",function(){return j}),n.d(e,"W",function(){return M}),n.d(e,"ab",function(){return K}),n.d(e,"Y",function(){return U}),n.d(e,"X",function(){return H}),n.d(e,"bb",function(){return G}),n.d(e,"Z",function(){return J}),n.d(e,"cb",function(){return Z}),n.d(e,"P",function(){return W}),n.d(e,"N",function(){return Q}),n.d(e,"M",function(){return V}),n.d(e,"Q",function(){return X}),n.d(e,"O",function(){return Y}),n.d(e,"R",function(){return tt}),n.d(e,"u",function(){return et}),n.d(e,"s",function(){return nt}),n.d(e,"r",function(){return at}),n.d(e,"v",function(){return rt}),n.d(e,"t",function(){return ot}),n.d(e,"w",function(){return it}),n.d(e,"p",function(){return st}),n.d(e,"A",function(){return ut}),n.d(e,"n",function(){return ct}),n.d(e,"o",function(){return lt}),n.d(e,"B",function(){return dt}),n.d(e,"m",function(){return pt}),n.d(e,"q",function(){return mt}),n.d(e,"i",function(){return ft}),n.d(e,"h",function(){return ht}),n.d(e,"j",function(){return gt}),n.d(e,"f",function(){return yt}),n.d(e,"g",function(){return vt}),n.d(e,"e",function(){return bt}),n.d(e,"a",function(){return wt}),n.d(e,"d",function(){return Ct}),n.d(e,"c",function(){return It}),n.d(e,"b",function(){return qt}),n.d(e,"zb",function(){return xt}),n.d(e,"yb",function(){return kt}),n.d(e,"F",function(){return $t}),n.d(e,"E",function(){return St}),n.d(e,"G",function(){return Pt});var a=n("66df"),r=function(t){var e=t.params,n=t.query,r={url:"siteManagementList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},o=function(t){var e={url:"/menuSort",method:"post",data:t};return a["a"].request(e)},i=function(t){var e={url:"/menuDel",method:"post",data:t};return a["a"].request(e)},s=function(t){var e={url:"/menuAdd",method:"post",data:t};return a["a"].request(e)},u=function(t){var e={url:"/menuUpdate",method:"post",data:t};return a["a"].request(e)},c=function(t){var e={url:"/permissionSearchUri",method:"post",data:t};return a["a"].request(e)},l=function(t){var e={url:"/permissionList",method:"get",data:t};return a["a"].request(e)},d=function(){var t={url:"/roleList",method:"get"};return a["a"].request(t)},p=function(t){var e={url:"/roleAdd",method:"post",data:t};return a["a"].request(e)},m=function(t){var e={url:"/roleUpdate",method:"post",data:t};return a["a"].request(e)},f=function(t){var e={url:"/roleDel",method:"post",data:t};return a["a"].request(e)},h=function(t){var e={url:"/roleDetail",method:"post",data:t};return a["a"].request(e)},g=function(t){var e={url:"/adminModifyStatus",method:"get",params:t};return a["a"].request(e)},y=function(t){var e=t.params,n=t.query,r={url:"/adminLogList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},v=function(t){var e={url:"siteManagementDetail",method:"get",params:t};return a["a"].request(e)},b=function(t){var e={url:"siteManagementUpdate",method:"post",data:t};return a["a"].request(e)},w=function(t){var e={url:"siteManagementCreate",method:"post",data:t};return a["a"].request(e)},C=function(){var t={url:"siteManagementDbId",method:"get"};return a["a"].request(t)},I=function(t){var e=t.params,n=t.query,r={url:"systemMemberLevelList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},q=function(t){var e=t.params,n=t.query,r={url:"systemMemberRefundLevelList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},x=function(t){var e={url:"systemMemberLevelAdd",method:"post",data:t};return a["a"].request(e)},k=function(t){var e={url:"systemMemberLevelUp",method:"post",data:t};return a["a"].request(e)},$=function(t){var e={url:"systemMemberRefundLevelAdd",method:"post",data:t};return a["a"].request(e)},S=function(t){var e={url:"systemMemberRefundLevelUp",method:"post",data:t};return a["a"].request(e)},P=function(t){var e={url:"blackList",method:"get",params:t};return a["a"].request(e)},D=function(t){var e={url:"blackListCreate",method:"post",data:t};return a["a"].request(e)},F=function(t){var e={url:"blackListDelete",method:"get",params:t};return a["a"].request(e)},T=function(t){var e={url:"/slideList",method:"get",params:t};return a["a"].request(e)},N=function(t){var e={url:"slideIns",method:"post",data:t};return a["a"].request(e)},O=function(t){var e={url:"/slideDel",method:"get",params:t};return a["a"].request(e)},z=function(t){var e={url:"/slideImgInfo",method:"get",params:t};return a["a"].request(e)},A=function(t){var e={url:"slideImgInfoUpt",method:"post",data:t};return a["a"].request(e)},L=function(t){var e=t.params,n=t.query,r={url:"inBox",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},_=function(t){var e=t.params,n=t.query,r={url:"outBox",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},B=function(t){var e={url:"letterReply",method:"post",data:t};return a["a"].request(e)},E=function(t){var e={url:"letterSend",method:"post",data:t};return a["a"].request(e)},R=function(t){var e={url:"letterDel",method:"post",data:t};return a["a"].request(e)},j=function(t){var e={url:"/letterDetail",method:"get",params:t};return a["a"].request(e)},M=function(t){var e={url:"/letterUptRead",method:"get",params:t};return a["a"].request(e)},K=function(t){var e=t.params,n=t.query,r={url:"popupsList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},U=function(t){var e={url:"popupsDetail",method:"get",params:t};return a["a"].request(e)},H=function(t){var e={url:"/popupsDel",method:"get",params:t};return a["a"].request(e)},G=function(t){var e={url:"popupsStatusChange",method:"post",data:t};return a["a"].request(e)},J=function(t){var e={url:"popupsIns",method:"post",data:t};return a["a"].request(e)},Z=function(t){var e={url:"popupsUpt",method:"post",data:t};return a["a"].request(e)},W=function(t){var e=t.params,n=t.query,r={url:"lanternList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},Q=function(t){var e={url:"lanternDetail",method:"get",params:t};return a["a"].request(e)},V=function(t){var e={url:"/lanternDel",method:"get",params:t};return a["a"].request(e)},X=function(t){var e={url:"lanternStatusChange",method:"post",data:t};return a["a"].request(e)},Y=function(t){var e={url:"lanternIns",method:"post",data:t};return a["a"].request(e)},tt=function(t){var e={url:"lanternUpt",method:"post",data:t};return a["a"].request(e)},et=function(t){var e=t.params,n=t.query,r={url:"articleList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},nt=function(t){var e={url:"articleDetail",method:"get",params:t};return a["a"].request(e)},at=function(t){var e={url:"/articleDel",method:"get",params:t};return a["a"].request(e)},rt=function(t){var e={url:"articleStatusChange",method:"post",data:t};return a["a"].request(e)},ot=function(t){var e={url:"articleIns",method:"post",data:t};return a["a"].request(e)},it=function(t){var e={url:"articleUpt",method:"post",data:t};return a["a"].request(e)},st=function(t){var e=t.params,n=t.query,r={url:"adminNewList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},ut=function(t){var e={url:"changePassWord",method:"post",data:t};return a["a"].request(e)},ct=function(t){var e={url:"adminNewDelete",method:"post",data:t};return a["a"].request(e)},lt=function(t){var e={url:"adminNewDetail",method:"post",data:t};return a["a"].request(e)},dt=function(t){var e={url:"copyAdmin",method:"post",data:t};return a["a"].request(e)},pt=function(t){var e={url:"adminNewAdd",method:"post",data:t};return a["a"].request(e)},mt=function(t){var e={url:"adminNewUpdate",method:"post",data:t};return a["a"].request(e)},ft=function(t){var e=t.params,n=t.query,r={url:"activityList",method:"post",data:e};return n&&(r.params=n),a["a"].request(r)},ht=function(t){var e={url:"activityIns",method:"post",data:t};return a["a"].request(e)},gt=function(t){var e={url:"activityUpt",method:"post",data:t};return a["a"].request(e)},yt=function(t){var e={url:"/activityDel",method:"get",params:t};return a["a"].request(e)},vt=function(t){var e={url:"/activityDetail",method:"get",params:t};return a["a"].request(e)},bt=function(t){var e={url:"activityChangeStatus",method:"post",data:t};return a["a"].request(e)},wt=function(t){var e={url:"/activityBySort",method:"get",params:t};return a["a"].request(e)},Ct=function(t){var e={url:"/activityCateList",method:"get",params:t};return a["a"].request(e)},It=function(t){var e={url:"activityCateIns",method:"post",data:t};return a["a"].request(e)},qt=function(t){var e={url:"/activityCateDel",method:"get",params:t};return a["a"].request(e)},xt=function(t){var e={url:"systemSiteGameUp",method:"post",data:t};return a["a"].request(e)},kt=function(t){var e={url:"systemSiteGameList",method:"post",data:t};return a["a"].request(e)},$t=function(t){var e={url:"gameConfigList",method:"post",data:t};return a["a"].request(e)},St=function(t){var e={url:"/gameConfigClassification",method:"get",params:t};return a["a"].request(e)},Pt=function(t){var e={url:"/gameConfigUpGameStatus",method:"post",data:t};return a["a"].request(e)}},"8f1a":function(t,e,n){"use strict";var a=n("f66e"),r=n.n(a);r.a},f66e:function(t,e,n){},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);