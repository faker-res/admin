(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18ad3ae4"],{"0125":function(t,e,n){},"0b07":function(t,e,n){"use strict";var a=n("0125"),o=n.n(a);o.a},"0ef3":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText,draggable:t.draggable},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand,"on-drag-drop":t.onDragDrop}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),n("Row",{staticStyle:{"margin-top":"15px"}},[t.more?n("Col",{attrs:{span:"12"}},[t._t("more")],2):t._e(),n("Col",{attrs:{span:t.more?12:24}},[t.page?n("Page",{attrs:{total:t.total,showTotal:"",current:t.currentpage,"show-sizer":t.showSizer,styles:t.pageStyle,"page-size":t.pageSize,"page-size-opts":t.pageSizeOpts},on:{"update:current":function(e){t.currentpage=e},"on-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange}}):t._e(),t.pageFixShow?n("span",{staticClass:"page-fix"},[t._v("10条/页")]):t._e()],1)],1),n("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},o=[],r=(n("ac6a"),n("5176")),i=n.n(r),s=(n("c5f6"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tables-edit-outer"},[t.isEditting?n("div",{staticClass:"tables-editting-con"},[n("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[n("Icon",{attrs:{type:"md-checkmark"}})],1),n("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[n("Icon",{attrs:{type:"md-close"}})],1)],1):n("div",{staticClass:"tables-edit-con"},[n("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?n("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[n("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),u=[],l={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},c=l,d=(n("4974"),n("2877")),p=Object(d["a"])(c,s,u,!1,null,null,null),f=p.exports,h={delete:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-delete",e)}}},"删除")},list:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-list",e)}}},"游戏列表")},reply:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-reply",e)}}},"回复")},edit:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-edit",e)}}},"编辑")},details:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-details",e)}}},"详情")},status:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-status",e)}}},"yes"===e.row.status?"停用":"启用")},frost:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frost",e)}}},1===e.row.admin_status?"解冻":"冻结")},frostStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:e.row.agent_type-1>0?"#2D8CF0":"#918b8b"},on:{click:function(){n.$emit("on-change-frostStatus",e)}}},"yes"===e.row.status?"停用":"启用")},odds:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-check-odds",e)}}},"赔率")},remove:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-remove",e)}}},"移出黑名单")},initialize:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-initialize",e)}}},"初始化")},classStatus:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-change-classStatus",e)}}},"yes"===e.row.classStatus?"停用":"启用")},preview:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-preview",e)}}},"预览")},look:function(t,e,n){return t("a",{style:{margin:"0 5px",color:"#2D8CF0"},on:{click:function(){n.$emit("on-look",e)}}},"查看")}},m=h,g=(n("30d9"),{name:"Tables",props:{value:{type:[Array,Number,String],default:function(){return[]}},columns:{type:Array,default:function(){return[]}},showSizer:{type:Boolean,default:!0},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!0},border:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},page:{type:Boolean,default:!0},total:{type:[Number,String],default:0},pageSizeOpts:{type:[Array],default:function(){return[20,30,40,50]}},editable:{type:Boolean,default:!1},more:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},pageFixShow:{type:Boolean,default:!1}},data:function(){return{pageStyle:{textAlign:"right"},insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",currentpage:1}},computed:{pageSize:function(){return this.pageSizeOpts[0]}},watch:{columns:function(t){this.handleColumns(t)},value:function(t){this.handleTableData()}},mounted:function(){this.showPageFix(),this.handleColumns(this.columns),this.handleTableData()},methods:{suportEdit:function(t,e){var n=this;return t.render=function(t,e){return t(f,{props:{params:e,value:n.insideTableData[e.index][e.column.key],edittingCellId:n.edittingCellId,editable:n.editable},on:{input:function(t){n.edittingText=t},"on-start-edit":function(t){n.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),n.$emit("on-start-edit",t)},"on-cancel-edit":function(t){n.edittingCellId="",n.$emit("on-cancel-edit",t)},"on-save-edit":function(t){n.value[t.row.initRowIndex][t.column.key]=n.edittingText,n.$emit("input",n.value),n.$emit("on-save-edit",i()(t,{value:n.edittingText})),n.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,n=t.options||[],a=[];n.forEach(function(t){m[t]&&a.push(m[t])});var o=t.button?[].concat(a,t.button):a;return t.render=function(t,n){return n.tableData=e.value,t("div",o.map(function(a){return a(t,n,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,n){var a=t;return a.editable&&(a=e.suportEdit(a,n)),"handle"===a.key&&(a=e.surportHandle(a)),a})},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var n=t;return n.initRowIndex=e,n})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,n){this.$emit("on-sort-change",t,e,n)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e,n){this.$emit("on-expand",t,e,n)},onPageChange:function(t){this.$emit("on-page-change",t)},onPageSizeChange:function(t){this.$emit("on-page-size-change",t)},onDragDrop:function(t,e){this.$emit("on-drag-drop",t,e)},setPage:function(){this.currentpage=1},showPageFix:function(){this.pageFixShow&&(this.pageStyle={textAlign:"right",marginRight:"95.35px"})}}}),y=g,v=(n("1e5b"),Object(d["a"])(y,a,o,!1,null,"a62d0182",null));e["a"]=v.exports},1184:function(t,e,n){"use strict";n.d(e,"z",function(){return o}),n.d(e,"B",function(){return r}),n.d(e,"L",function(){return i}),n.d(e,"w",function(){return s}),n.d(e,"G",function(){return u}),n.d(e,"u",function(){return l}),n.d(e,"y",function(){return c}),n.d(e,"t",function(){return d}),n.d(e,"H",function(){return p}),n.d(e,"I",function(){return f}),n.d(e,"J",function(){return h}),n.d(e,"K",function(){return m}),n.d(e,"s",function(){return g}),n.d(e,"x",function(){return y}),n.d(e,"v",function(){return v}),n.d(e,"C",function(){return b}),n.d(e,"D",function(){return I}),n.d(e,"E",function(){return x}),n.d(e,"p",function(){return C}),n.d(e,"q",function(){return $}),n.d(e,"r",function(){return w}),n.d(e,"A",function(){return k}),n.d(e,"F",function(){return S}),n.d(e,"a",function(){return O}),n.d(e,"f",function(){return D}),n.d(e,"h",function(){return q}),n.d(e,"l",function(){return L}),n.d(e,"b",function(){return T}),n.d(e,"c",function(){return F}),n.d(e,"d",function(){return B}),n.d(e,"e",function(){return _}),n.d(e,"g",function(){return N}),n.d(e,"i",function(){return z}),n.d(e,"m",function(){return E}),n.d(e,"n",function(){return j}),n.d(e,"o",function(){return P}),n.d(e,"k",function(){return R}),n.d(e,"j",function(){return A});var a=n("66df"),o=function(){var t={url:"lotteryNameList",method:"get"};return a["a"].request(t)},r=function(t){var e=t.siteId,n=t.lotteryId,o={url:"lotteryOddsSiteidLid/".concat(e,"/").concat(n),method:"get"};return a["a"].request(o)},i=function(t){var e=t.id,n=t.oddsInfo,o={id:e,oddsInfo:n},r={url:"lotteryUpdateOddsSiteidLid",method:"post",data:o};return a["a"].request(r)},s=function(t){var e={url:"lotteryLhcTimeList",method:"get",params:t};return a["a"].request(e)},u=function(t){var e=t.params,n=t.lid,o={url:"lotteryTimeList/".concat(n),method:"get",params:e};return a["a"].request(o)},l=function(t){var e={url:"lotteryLhcTimeAdd",method:"post",data:t};return a["a"].request(e)},c=function(t){var e={url:"lotteryLhcTimeUp",method:"post",data:t};return a["a"].request(e)},d=function(t){var e={url:"lotteryLhcAddNum",method:"post",data:t};return a["a"].request(e)},p=function(t){var e={url:"lotteryTimeOneUp",method:"post",data:t};return a["a"].request(e)},f=function(t){var e={url:"lotteryTimeUp",method:"post",data:t};return a["a"].request(e)},h=function(t){var e={url:"lotteryUpNum",method:"post",data:t};return a["a"].request(e)},m=function(t){var e={url:"lotteryUpNumFast",method:"post",data:t};return a["a"].request(e)},g=function(t){var e={url:"lotteryAgainPrizeFast",method:"post",data:t};return a["a"].request(e)},y=function(t){var e={url:"lotteryLhcTimeSetUp",method:"post",data:t};return a["a"].request(e)},v=function(t){var e={url:"lotteryLhcTimeDel",method:"post",data:t};return a["a"].request(e)},b=function(t){var e=t.params,n=t.query,o={url:"lotteryOpenNumberList",method:"post",data:e,query:n};return n&&(o.params=n),a["a"].request(o)},I=function(t){var e=t.params,n=t.query,o={url:"lotteryOpenNumberListFast",method:"post",data:e};return n&&(o.params=n),a["a"].request(o)},x=function(t){var e={url:"lotteryPayMoney",method:"post",data:t};return a["a"].request(e)},C=function(t){var e={url:"lotteryAddNum",method:"post",data:t};return a["a"].request(e)},$=function(t){var e={url:"lotteryAddNumFast",method:"post",data:t};return a["a"].request(e)},w=function(t){var e={url:"lotteryAgainPrize",method:"post",data:t};return a["a"].request(e)},k=function(t){var e={url:"lotteryNoNumLottery",method:"post",data:t};return a["a"].request(e)},S=function(t){var e={url:"lotteryRevocation",method:"post",data:t};return a["a"].request(e)},O=function(t){var e={url:"fastLottery",method:"post",data:t};return a["a"].request(e)},D=function(t){var e=t.params,n=t.query,o={url:"fastLotteryDetail",method:"post",data:e};return n&&(o.params=n),a["a"].request(o)},q=function(t){var e={url:"fastLotteryInit",method:"post",data:t};return a["a"].request(e)},L=function(t){var e={url:"fastLotteryUpdate",method:"post",data:t};return a["a"].request(e)},T=function(t){var e=t.params,n=t.query,o={url:"fastLotteryBlackList",method:"post",data:e};return n&&(o.params=n),a["a"].request(o)},F=function(t){var e={url:"fastLotteryBlackListAdd",method:"post",data:t};return a["a"].request(e)},B=function(t){var e={url:"fastLotteryBlackListDel",method:"post",data:t};return a["a"].request(e)},_=function(t){var e={url:"fastLotteryBySite",method:"post",data:t};return a["a"].request(e)},N=function(t){var e=t.params,n=t.query,o={url:"fastLotteryDetailBySite",method:"post",data:e};return n&&(o.params=n),a["a"].request(o)},z=function(t){var e={url:"fastLotteryInitBySite",method:"post",data:t};return a["a"].request(e)},E=function(t){var e={url:"fastLotteryUpdateBySite",method:"post",data:t};return a["a"].request(e)},j=function(t){var e={url:"fastLotteryUpdateOpen",method:"post",data:t};return a["a"].request(e)},P=function(t){var e={url:"fastLotteryUpdateOpenBySite",method:"post",data:t};return a["a"].request(e)},R=function(t){var e={url:"fastLotteryOpenInitBySite",method:"post",data:t};return a["a"].request(e)},A=function(t){var e={url:"fastLotteryOpenInit",method:"post",data:t};return a["a"].request(e)}},"1e5b":function(t,e,n){"use strict";var a=n("35ee"),o=n.n(a);o.a},2178:function(t,e,n){},"30d9":function(t,e,n){},"35ee":function(t,e,n){},4969:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"ft18 mb10 mr10 fl"},[n("span",[t._v("当前彩票：")]),n("span",{staticClass:"pl10"},[t._v(t._s(t.$route.query.lotteryName))])]),n("div",{staticClass:"v2-button"},["super"==t.adminType||-1!=t.authInPage.indexOf("fastLotteryOpenInit")||-1!=t.authInPage.indexOf("fastLotteryOpenInitBySite")?n("Button",{staticClass:"w160x",on:{click:t.openInit}},[t._v("预设期数")]):t._e()],1),n("div",{staticClass:"v2-table"},[n("Tables",{attrs:{editable:"",columns:t.table.columns,loading:t.$root.tableLoading,value:t.table.data,total:t.table.total,more:t.table.more,"show-sizer":!1,pageSizeOpts:t.table.pageSizeOpts},on:{"on-page-change":t.onPageChange}}),n("Modals",{ref:"editLotteryOpen",attrs:{title:"修改开奖号码",width:"800"}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("Form",{attrs:{"label-width":150}},[n("FormItem",{attrs:{label:"彩票名称："}},[n("span",{staticClass:"font-bold ft16 pl15"},[t._v(t._s(t.$route.query.lotteryName))])]),n("FormItem",{attrs:{label:"彩票期数："}},[n("Input",{staticClass:"w160x",model:{value:t.issue,callback:function(e){t.issue=e},expression:"issue"}}),n("span",{staticClass:"pl10"},[t._v("期:")])],1),n("FormItem",{attrs:{label:"开奖号码："}},[n("div",{staticClass:"clearfix periods"},t._l(t.lotteryInfo,function(e,a){return n("p",{key:a,staticClass:"fl"},[n("Input",{staticClass:"inp",on:{"on-blur":function(e){return t.testNum(t.lotteryInfo[a])}},model:{value:t.lotteryInfo[a],callback:function(e){t.$set(t.lotteryInfo,a,e)},expression:"lotteryInfo[i]"}}),n("span",{staticClass:"p10 yc"},[t._v("-")])],1)}),0)]),n("FormItem",[n("Button",{staticClass:"primary save ml100 mt20 mb20",on:{click:t.save}},[t._v("确认保存")])],1)],1)],1)]),n("Modals",{ref:"openInit",attrs:{title:"预设期数",width:"422"}},[n("div",{attrs:{slot:"content"},slot:"content"},[n("Form",{ref:"openInitInfo",staticStyle:{width:"422px"},attrs:{"label-width":130,model:t.openInitInfo,rules:t.openInitInfoRules}},[n("FormItem",{attrs:{label:"彩票名称："}},[n("span",{staticClass:"ft20 f-color"},[t._v(t._s(t.$route.query.lotteryName))])]),n("FormItem",{staticClass:"fix",attrs:{label:"预设数量",prop:"count"}},[n("Input",{staticClass:"w160x",attrs:{placeholder:"请输入"},model:{value:t.openInitInfo.count,callback:function(e){t.$set(t.openInitInfo,"count",e)},expression:"openInitInfo.count"}})],1),n("FormItem",[n("Button",{staticClass:"w160x mt55",attrs:{type:"primary"},on:{click:t.addInit}},[t._v("确认新增")])],1)],1)],1)])],1)])},o=[],r=(n("a481"),n("5d73")),i=n.n(r),s=n("b6d0"),u=n.n(s),l=n("75fc"),c=(n("14b9"),n("ac6a"),n("e814")),d=n.n(c),p=(n("6762"),n("2fdb"),n("28a5"),n("cebc")),f=n("1184"),h=n("d027"),m=n("fa69"),g=n("2f62"),y=n("c276"),v={name:"fastLotteryDetails",components:{Tables:m["a"],Modals:h["a"]},computed:Object(p["a"])({},Object(g["d"])({sixLotteryColor:function(t){return t.info.sixLotteryColor}})),data:function(){var t=this;this.$createElement;return{adminType:Object(y["l"])(),authInPage:JSON.parse(localStorage.authInPage),stage:"",lotteryInfo:[],randOpen:"",issue:"",postData:{},testInfo:{},openInitInfo:{lotteryId:this.$route.query.lotteryId,count:1},openInitInfoRules:{count:[{required:!0,message:"请填写预设数量",trigger:"blur",pattern:/.+/},{message:"预设数量必须为正整数",trigger:"blur",pattern:/^[1-9]\d*$/}]},searchKey:{},table:{pageSizeOpts:[30],loading:!0,total:0,title:"彩票详情",data:[],columns:[{title:"期数",key:"qishu",align:"center"},{title:"开奖结果",key:"open",align:"center",width:300,render:function(e,n){var a,o=n.row.open,r=t.$route.query.lotteryId;return o?o.split(",").map(function(n){if(1==r||18==r||19==r)t.sixLotteryColor.map(function(t){t.number.includes(1*n)&&(a=t.color)});else{var o=d()(256*Math.random()),i=d()(256*Math.random()),s=d()(256*Math.random());a="rgba(".concat(o,",").concat(i,",").concat(s,",.9)")}return e("span",{style:{color:"#fff",cursor:"pointer",width:"20px",height:"20px",marginLeft:"5px",display:"inline-block",backgroundColor:a,textShadow:"1px 1px 1px #000"}},n)}):e("span",["-"])}},{title:"注单数量",key:"betCount",align:"center"},{title:"有效投注",key:"betMoney",align:"center"},{title:"会员输赢",key:"win",align:"center"},{title:"有效投注(黑名单)",key:"blackBetMoney",align:"center"},{title:"会员输赢(黑名单)",key:"blackWin",align:"center"},{title:"开奖模式",key:" killStatus",align:"center",render:function(t,e){var n=e.row.killStatus,a="rand"==n?"随机":"kill"==n?"控制":"open"==n?"放水":"人工开奖";return t("span",[a])}},{title:"状态",key:"status",align:"center",render:function(t,e){var n,a,o=e.row.status;return"init"==o?(a="待开奖",n="#666666"):"waitWincalc"==o?(a="等待预结算",n="#FF2626"):"waitOpen"==o?(a="等待开奖",n="#FF9655"):(a="已开奖",n="#73C32E"),t("span",{style:{color:n}},[a])}},{title:"开奖时间",key:"openTime",align:"center",render:function(e,n){var a=n.row.openTime;return e("span",[a?t.$root.unixTime(a):"-"])}},{title:"操作",align:"center",render:function(e,n){return e("div",[e("span",{style:{display:n.row.open?"block":"none"}},["-"]),e("span",{style:{color:"#62B1FD",display:n.row.open?"none":"block",cursor:"pointer"},on:{click:function(){if("single"==t.state){if("super"==t.adminType||-1!=t.authInPage.indexOf("fastLotteryUpdateOpenBySite")){var e=n.row,a=e.randOpen,o=e.id,r=e.qishu;t.randOpen=a.split("|"),t.lotteryInfo=a.split("|")[0].split(","),t.issue=r,t.postData.id=o,t.$refs.editLotteryOpen.show()}}else if("super"==t.adminType||-1!=t.authInPage.indexOf("fastLotteryUpdateOpen")){var i=n.row,s=i.randOpen,u=i.id,l=i.qishu;t.randOpen=s.split("|"),t.lotteryInfo=s.split("|")[0].split(","),t.issue=l,t.postData.id=u,t.$refs.editLotteryOpen.show()}}}},["修改"])])}}]}}},beforeRouteEnter:function(t,e,n){n(function(t){var e=t.$route.query,n=e.siteId,a=e.lotteryId;n?(t.searchKey={siteId:n,lotteryId:a},t.stage="single"):(t.searchKey={lotteryId:a},t.stage="all");var o={params:t.searchKey};t.getData(o)})},methods:{getData:function(t){var e=this;"single"==this.stage?(this.$root.startTableLoading(this),Object(f["g"])(t).then(function(t){var n=t.data,a=n.data,o=n.total;e.table.data=a,e.table.total=o})):(this.$root.startTableLoading(this),Object(f["f"])(t).then(function(t){var n=t.data,a=n.data,o=n.total;e.table.data=a,e.table.total=o})),this.testInfo={},this.testInfo=Object(y["B"])(this.openInitInfo.lotteryId)},openInit:function(){this.$refs.openInitInfo.resetFields(),this.$refs.openInit.show()},addInit:function(){var t=this;this.$refs.openInitInfo.validate(function(e){if(e)if(t.openInitInfo.count<=100)if("single"==t.stage){t.$refs.openInit.spinShow();var n=Object(p["a"])({},t.openInitInfo,{siteId:t.$root.nowSite.id});Object(f["k"])(n).then(function(e){200==e.code&&(t.$refs.openInit.spinHide(),t.$Tip.success({content:"预设期数成功"}),t.$refs.openInit.hide(),t.getData({params:t.searchKey}))}).catch(function(e){t.$refs.openInit.spinHide()})}else{t.$refs.openInit.spinShow();var a=Object(p["a"])({},t.openInitInfo);Object(f["j"])(a).then(function(e){200==e.code&&(t.$refs.openInit.spinHide(),t.$Tip.success({content:"预设期数成功"}),t.$refs.openInit.hide(),t.getData({params:t.searchKey}))}).catch(function(e){t.$refs.openInit.spinHide()})}else t.$Tip.info({content:"一次预设期数不能超过100期"})})},onPageChange:function(t){var e=Object(p["a"])({},this.searchKey);this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t,this.getData({params:this.searchKey})},save:function(){var t=this,e=this.$route.query,n=(e.lotteryId,e.siteId),a=e.lotteryName,o=!0,r=!0,s=[],c=/^[0-9]\d*$/,d=!0,p=!1,h=void 0;try{for(var m,g=i()(this.lotteryInfo.values());!(d=(m=g.next()).done);d=!0){var y=m.value;(!y||!c.test(y))&&(o=!1)}}catch(C){p=!0,h=C}finally{try{d||null==g.return||g.return()}finally{if(p)throw h}}if(o){this.randOpen.forEach(function(e){e=String(t.lotteryInfo),s.push(e)});s[0];s[0].split(",").forEach(function(e){t.randOpen[0].split(",").forEach(function(n){e.length>n.length&&(t.$Tip.info({content:"修改开奖号码不正确"}),r=!1)})});var v=this.testInfo;if((a.includes("时时彩")||a.includes("快3"))&&(v.repeat=!0),0==v.repeat){var b=Object(l["a"])(new u.a(this.lotteryInfo)),I=this.lotteryInfo.filter(function(t,e){return t<v.maxNum});I.length!==this.lotteryInfo.length&&(this.$Tip.info({content:"最小为0最大为"+(v.maxNum-1)}),r=!1),b.length!==this.lotteryInfo.length&&(this.$Tip.info({content:"该彩票开奖不能重复"}),r=!1)}else if(1==v.repeat){var x=this.lotteryInfo.filter(function(t,e){return t<v.maxNum});x.length!==this.lotteryInfo.length&&(this.$Tip.info({content:"最小为0最大为"+(v.maxNum-1)}),r=!1)}"single"==this.stage&&1==r?(this.$refs.editLotteryOpen.spinShow(),this.postData.randOpen=s.join("|"),this.postData.siteId=n,this.postData.issue=this.issue,Object(f["o"])(this.postData).then(function(e){t.$refs.editLotteryOpen.spinHide(),200==e.code&&(t.$refs.editLotteryOpen.hide(),t.getData({params:t.searchKey}))}).catch(function(e){t.$refs.editLotteryOpen.spinHide()})):"single"!=this.stage&&1==r&&(this.postData.randOpen=s.join("|"),this.postData.issue=this.issue,Object(f["n"])(this.postData).then(function(e){t.$refs.editLotteryOpen.spinHide(),200==e.code&&(t.$refs.editLotteryOpen.hide(),t.getData({params:t.searchKey}))}).catch(function(e){t.$refs.editLotteryOpen.spinHide()}))}else this.$Message.error("请检查您所填写的开奖号码")},testNum:function(t){var e=t.replace(/\D/g,""),n=this.testInfo.maxNum;!(e<n&&e>0)&&this.$Tip.info({content:"最小为0最大为"+(n-1)})}}},b=v,I=(n("0b07"),n("2877")),x=Object(I["a"])(b,a,o,!1,null,"503384e8",null);e["default"]=x.exports},4974:function(t,e,n){"use strict";var a=n("2178"),o=n.n(a);o.a},fa69:function(t,e,n){"use strict";var a=n("0ef3");e["a"]=a["a"]}}]);