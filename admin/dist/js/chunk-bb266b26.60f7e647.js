(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb266b26"],{"2aa1":function(t,e,a){"use strict";var r=a("6195"),n=a.n(r);n.a},"2ca4":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("collapse",{attrs:{simple:"",value:"1"}},[a("panel",{attrs:{name:"1","hide-arrow":!0}},[a("div",{staticClass:"title",on:{click:function(e){t.open=!t.open}}},[t._v("返点设置\n      "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:!t.open,expression:"!open"}],attrs:{type:"ios-arrow-down",size:"18",color:"#999"}}),a("Icon",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],attrs:{type:"ios-arrow-forward",size:"18",color:"#999"}})],1),a("div",{staticClass:"section p15",attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"btns"},t._l(t.lottMenu,function(e,r){return a("Button",{key:r,staticClass:"lottery mr20",class:t.showKey==e?"bd-bg":"bg-or",on:{click:function(a){return t.onselectLott(e,r)}}},[t._v(t._s(e))])}),1),a("div",{staticClass:"clearfix"},[t.$route.params.page?a("div",{staticClass:"clearfix"},[a("div",{staticClass:"fl clearfix h60"},[a("div",{staticClass:"label fl"},[t._v("统一设置：")]),a("Select",{staticClass:"fl",staticStyle:{width:"100px"},attrs:{placeholder:"请选择"},on:{"on-change":t.batchSetRebate},model:{value:t.batchRebate,callback:function(e){t.batchRebate=e},expression:"batchRebate"}},t._l(t.defaultOptions,function(e,r){return a("Option",{key:r,attrs:{value:e}},[t._v(t._s(e)+"%")])}),1)],1),a("div",{staticClass:"fl ml20 clearfix h60"},[a("div",{staticClass:"label fl"},[t._v("批量设置：")]),a("div",{staticClass:"fl"},[a("Button",{attrs:{icon:"ios-remove",size:"small"},on:{click:t.reduceRebate}}),a("Button",{staticClass:"ml20",attrs:{icon:"ios-add",size:"small"},on:{click:t.addRebate}})],1)])]):t._e(),t._l(t.lottSub[t.showKey],function(e){return a("div",{key:e.id,staticClass:"clearfix w25 h40 fl"},[a("div",{staticClass:"label fl"},[t._v(t._s(e.name)+"：")]),t.$route.params.page?a("div",{staticClass:"fl"},[a("Select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择"},on:{"on-change":t.selectSingleRabate},model:{value:e.rebate,callback:function(a){t.$set(e,"rebate",a)},expression:"lott.rebate"}},t._l(e.options,function(e,r){return a("Option",{key:r,attrs:{value:e}},[t._v(t._s(e)+"%")])}),1),t.showParent?a("span",{staticClass:"tip"},[t._v("上限："+t._s((+e.parent_rebate).toFixed(2)||"-")+"%")]):t._e()],1):a("div",[t._v(t._s(e.rebate)+"%")])])})],2)])])],1)},n=[],s=a("f499"),i=a.n(s),u=(a("c5f6"),a("ac6a"),a("83ae")),o=a("c276"),c={components:{Icons:u["a"]},props:{data:{type:Array,required:!0,default:function(){return[]}},showParent:{type:Boolean,default:!1}},data:function(){return{open:!1,lottIndex:0,showKey:"六合彩",batchRebate:""}},computed:{defaultOptions:function(){for(var t=[],e=0;e<3;e++)for(var a=0;a<=10;a++){var r=.1*a;t[t.length]=(e+r).toFixed(2)}return t},lottMenu:function(){for(var t=[],e=0;e<this.data.length;e++)t[t.length]=this.data[e].className;return Object(o["n"])(t)},lottSub:function(){for(var t={},e=0;e<this.lottMenu.length;e++){var a=this.lottMenu[e];t[a]=[];for(var r=0;r<this.data.length;r++)if(this.data[r].className===this.lottMenu[e]){var n=t[a].length;this.data[r].options=this.createOptions(+this.data[r].parent_rebate||3),t[a][n]=this.data[r]}}for(var s in t)t[s].forEach(function(t){t.rebate=Number(t.rebate).toFixed(2)});return t}},methods:{batchSetRebate:function(t){t&&(this.lottSub[this.showKey].forEach(function(e){e.rebate=t}),this.createData())},selectSingleRabate:function(){this.createData()},onselectLott:function(t,e){this.lottIndex=e,this.showKey=t,this.batchRebate=""},reduceRebate:function(t){this.lottSub[this.showKey].forEach(function(t){var e=+t.rebate-.1;e=e<=0?0:e,t.rebate=e.toFixed(2)}),this.createData()},addRebate:function(){this.lottSub[this.showKey].forEach(function(t){var e=+t.rebate+.1;e=e>=+t.parent_rebate?+t.parent_rebate:e,t.rebate=e.toFixed(2)}),this.createData()},createOptions:function(t){for(var e=[],a=0;a<t;a++)for(var r=0;r<=10;r++){var n=.1*r;a+n<=t&&e.push((a+n).toFixed(2))}return e},createData:function(){var t={};return this.data.forEach(function(e){var a="CT_".concat(e.id,"_LOTTERY");t[a]=e.rebate}),this.$emit("on-rebate-change",i()(t)),i()(t)}}},l=c,d=(a("8c6e"),a("2877")),f=Object(d["a"])(l,r,n,!1,null,"259de1b0",null),p=f.exports;e["a"]=p},6195:function(t,e,a){},8593:function(t,e,a){"use strict";a.d(e,"mb",function(){return n}),a.d(e,"rb",function(){return s}),a.d(e,"C",function(){return i}),a.d(e,"k",function(){return u}),a.d(e,"Ab",function(){return o}),a.d(e,"hb",function(){return c}),a.d(e,"I",function(){return l}),a.d(e,"J",function(){return d}),a.d(e,"db",function(){return f}),a.d(e,"gb",function(){return p}),a.d(e,"eb",function(){return v}),a.d(e,"fb",function(){return m}),a.d(e,"l",function(){return h}),a.d(e,"H",function(){return b}),a.d(e,"lb",function(){return _}),a.d(e,"nb",function(){return C}),a.d(e,"jb",function(){return q}),a.d(e,"kb",function(){return g}),a.d(e,"tb",function(){return y}),a.d(e,"wb",function(){return w}),a.d(e,"sb",function(){return I}),a.d(e,"ub",function(){return x}),a.d(e,"vb",function(){return S}),a.d(e,"xb",function(){return L}),a.d(e,"x",function(){return D}),a.d(e,"y",function(){return k}),a.d(e,"z",function(){return R}),a.d(e,"K",function(){return M}),a.d(e,"qb",function(){return $}),a.d(e,"D",function(){return U}),a.d(e,"ob",function(){return z}),a.d(e,"pb",function(){return A}),a.d(e,"L",function(){return N}),a.d(e,"ib",function(){return O}),a.d(e,"U",function(){return B}),a.d(e,"V",function(){return P}),a.d(e,"S",function(){return j}),a.d(e,"T",function(){return E}),a.d(e,"W",function(){return F}),a.d(e,"ab",function(){return K}),a.d(e,"Y",function(){return T}),a.d(e,"X",function(){return G}),a.d(e,"bb",function(){return J}),a.d(e,"Z",function(){return H}),a.d(e,"cb",function(){return W}),a.d(e,"P",function(){return Y}),a.d(e,"N",function(){return Q}),a.d(e,"M",function(){return V}),a.d(e,"Q",function(){return X}),a.d(e,"O",function(){return Z}),a.d(e,"R",function(){return tt}),a.d(e,"u",function(){return et}),a.d(e,"s",function(){return at}),a.d(e,"r",function(){return rt}),a.d(e,"v",function(){return nt}),a.d(e,"t",function(){return st}),a.d(e,"w",function(){return it}),a.d(e,"p",function(){return ut}),a.d(e,"A",function(){return ot}),a.d(e,"n",function(){return ct}),a.d(e,"o",function(){return lt}),a.d(e,"B",function(){return dt}),a.d(e,"m",function(){return ft}),a.d(e,"q",function(){return pt}),a.d(e,"i",function(){return vt}),a.d(e,"h",function(){return mt}),a.d(e,"j",function(){return ht}),a.d(e,"f",function(){return bt}),a.d(e,"g",function(){return _t}),a.d(e,"e",function(){return Ct}),a.d(e,"a",function(){return qt}),a.d(e,"d",function(){return gt}),a.d(e,"c",function(){return yt}),a.d(e,"b",function(){return wt}),a.d(e,"zb",function(){return It}),a.d(e,"yb",function(){return xt}),a.d(e,"F",function(){return St}),a.d(e,"E",function(){return Lt}),a.d(e,"G",function(){return Dt});var r=a("66df"),n=function(t){var e=t.params,a=t.query,n={url:"siteManagementList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},s=function(t){var e={url:"/menuSort",method:"post",data:t};return r["a"].request(e)},i=function(t){var e={url:"/menuDel",method:"post",data:t};return r["a"].request(e)},u=function(t){var e={url:"/menuAdd",method:"post",data:t};return r["a"].request(e)},o=function(t){var e={url:"/menuUpdate",method:"post",data:t};return r["a"].request(e)},c=function(t){var e={url:"/permissionSearchUri",method:"post",data:t};return r["a"].request(e)},l=function(t){var e={url:"/permissionList",method:"get",data:t};return r["a"].request(e)},d=function(){var t={url:"/roleList",method:"get"};return r["a"].request(t)},f=function(t){var e={url:"/roleAdd",method:"post",data:t};return r["a"].request(e)},p=function(t){var e={url:"/roleUpdate",method:"post",data:t};return r["a"].request(e)},v=function(t){var e={url:"/roleDel",method:"post",data:t};return r["a"].request(e)},m=function(t){var e={url:"/roleDetail",method:"post",data:t};return r["a"].request(e)},h=function(t){var e={url:"/adminModifyStatus",method:"get",params:t};return r["a"].request(e)},b=function(t){var e=t.params,a=t.query,n={url:"/adminLogList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},_=function(t){var e={url:"siteManagementDetail",method:"get",params:t};return r["a"].request(e)},C=function(t){var e={url:"siteManagementUpdate",method:"post",data:t};return r["a"].request(e)},q=function(t){var e={url:"siteManagementCreate",method:"post",data:t};return r["a"].request(e)},g=function(){var t={url:"siteManagementDbId",method:"get"};return r["a"].request(t)},y=function(t){var e=t.params,a=t.query,n={url:"systemMemberLevelList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},w=function(t){var e=t.params,a=t.query,n={url:"systemMemberRefundLevelList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},I=function(t){var e={url:"systemMemberLevelAdd",method:"post",data:t};return r["a"].request(e)},x=function(t){var e={url:"systemMemberLevelUp",method:"post",data:t};return r["a"].request(e)},S=function(t){var e={url:"systemMemberRefundLevelAdd",method:"post",data:t};return r["a"].request(e)},L=function(t){var e={url:"systemMemberRefundLevelUp",method:"post",data:t};return r["a"].request(e)},D=function(t){var e={url:"blackList",method:"get",params:t};return r["a"].request(e)},k=function(t){var e={url:"blackListCreate",method:"post",data:t};return r["a"].request(e)},R=function(t){var e={url:"blackListDelete",method:"get",params:t};return r["a"].request(e)},M=function(t){var e={url:"/slideList",method:"get",params:t};return r["a"].request(e)},$=function(t){var e={url:"slideIns",method:"post",data:t};return r["a"].request(e)},U=function(t){var e={url:"/slideDel",method:"get",params:t};return r["a"].request(e)},z=function(t){var e={url:"/slideImgInfo",method:"get",params:t};return r["a"].request(e)},A=function(t){var e={url:"slideImgInfoUpt",method:"post",data:t};return r["a"].request(e)},N=function(t){var e=t.params,a=t.query,n={url:"inBox",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},O=function(t){var e=t.params,a=t.query,n={url:"outBox",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},B=function(t){var e={url:"letterReply",method:"post",data:t};return r["a"].request(e)},P=function(t){var e={url:"letterSend",method:"post",data:t};return r["a"].request(e)},j=function(t){var e={url:"letterDel",method:"post",data:t};return r["a"].request(e)},E=function(t){var e={url:"/letterDetail",method:"get",params:t};return r["a"].request(e)},F=function(t){var e={url:"/letterUptRead",method:"get",params:t};return r["a"].request(e)},K=function(t){var e=t.params,a=t.query,n={url:"popupsList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},T=function(t){var e={url:"popupsDetail",method:"get",params:t};return r["a"].request(e)},G=function(t){var e={url:"/popupsDel",method:"get",params:t};return r["a"].request(e)},J=function(t){var e={url:"popupsStatusChange",method:"post",data:t};return r["a"].request(e)},H=function(t){var e={url:"popupsIns",method:"post",data:t};return r["a"].request(e)},W=function(t){var e={url:"popupsUpt",method:"post",data:t};return r["a"].request(e)},Y=function(t){var e=t.params,a=t.query,n={url:"lanternList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},Q=function(t){var e={url:"lanternDetail",method:"get",params:t};return r["a"].request(e)},V=function(t){var e={url:"/lanternDel",method:"get",params:t};return r["a"].request(e)},X=function(t){var e={url:"lanternStatusChange",method:"post",data:t};return r["a"].request(e)},Z=function(t){var e={url:"lanternIns",method:"post",data:t};return r["a"].request(e)},tt=function(t){var e={url:"lanternUpt",method:"post",data:t};return r["a"].request(e)},et=function(t){var e=t.params,a=t.query,n={url:"articleList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},at=function(t){var e={url:"articleDetail",method:"get",params:t};return r["a"].request(e)},rt=function(t){var e={url:"/articleDel",method:"get",params:t};return r["a"].request(e)},nt=function(t){var e={url:"articleStatusChange",method:"post",data:t};return r["a"].request(e)},st=function(t){var e={url:"articleIns",method:"post",data:t};return r["a"].request(e)},it=function(t){var e={url:"articleUpt",method:"post",data:t};return r["a"].request(e)},ut=function(t){var e=t.params,a=t.query,n={url:"adminNewList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},ot=function(t){var e={url:"changePassWord",method:"post",data:t};return r["a"].request(e)},ct=function(t){var e={url:"adminNewDelete",method:"post",data:t};return r["a"].request(e)},lt=function(t){var e={url:"adminNewDetail",method:"post",data:t};return r["a"].request(e)},dt=function(t){var e={url:"copyAdmin",method:"post",data:t};return r["a"].request(e)},ft=function(t){var e={url:"adminNewAdd",method:"post",data:t};return r["a"].request(e)},pt=function(t){var e={url:"adminNewUpdate",method:"post",data:t};return r["a"].request(e)},vt=function(t){var e=t.params,a=t.query,n={url:"activityList",method:"post",data:e};return a&&(n.params=a),r["a"].request(n)},mt=function(t){var e={url:"activityIns",method:"post",data:t};return r["a"].request(e)},ht=function(t){var e={url:"activityUpt",method:"post",data:t};return r["a"].request(e)},bt=function(t){var e={url:"/activityDel",method:"get",params:t};return r["a"].request(e)},_t=function(t){var e={url:"/activityDetail",method:"get",params:t};return r["a"].request(e)},Ct=function(t){var e={url:"activityChangeStatus",method:"post",data:t};return r["a"].request(e)},qt=function(t){var e={url:"/activityBySort",method:"get",params:t};return r["a"].request(e)},gt=function(t){var e={url:"/activityCateList",method:"get",params:t};return r["a"].request(e)},yt=function(t){var e={url:"activityCateIns",method:"post",data:t};return r["a"].request(e)},wt=function(t){var e={url:"/activityCateDel",method:"get",params:t};return r["a"].request(e)},It=function(t){var e={url:"systemSiteGameUp",method:"post",data:t};return r["a"].request(e)},xt=function(t){var e={url:"systemSiteGameList",method:"post",data:t};return r["a"].request(e)},St=function(t){var e={url:"gameConfigList",method:"post",data:t};return r["a"].request(e)},Lt=function(t){var e={url:"/gameConfigClassification",method:"get",params:t};return r["a"].request(e)},Dt=function(t){var e={url:"/gameConfigUpGameStatus",method:"post",data:t};return r["a"].request(e)}},"8c6e":function(t,e,a){"use strict";var r=a("fac7"),n=a.n(r);n.a},defb:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"clearfix"},[a("p",{staticClass:"pt10 pb10"},[t._v("个人信息")]),a("div",{staticClass:"w25 fl b h40"},[a("span",{staticClass:"pl20"},[t._v("站点名称：")]),a("span",[t._v(t._s(t.siteInfo.siteName))])]),a("div",{staticClass:"w25 fl bt bb br h40"},[a("span",{staticClass:"pl20"},[t._v("站点代号：")]),a("span",[t._v(t._s(t.siteInfo.siteCode))])]),a("div",{staticClass:"w25 fl bt bb br h40"},[a("span",{staticClass:"pl20"},[t._v("创建人：")]),a("span",[t._v(t._s(t.siteInfo.createUserName))])]),a("div",{staticClass:"w25 fl bt bb br h40"},[a("span",{staticClass:"pl20"},[t._v("创建时间：")]),a("span",[t._v(t._s(t.siteInfo.created_at?this.$root.unixTime(t.siteInfo.created_at):"-"))])])]),a("div",{staticClass:"clearfix mt10"},[a("p",{staticClass:"pt10 pb10"},[t._v("站点配置")]),a("div",{staticClass:"w33 b h40 fl"},[a("span",{staticClass:"pl20"},[t._v("最低存款：")]),a("span",[t._v(t._s(t.siteInfo.siteConfig.limit.paymentLimit))])]),a("div",{staticClass:"w33 fl h40 bt bb br"},[a("span",{staticClass:"pl20"},[t._v("汇款赠送比例：")]),a("span",[t._v(t._s(t.siteInfo.siteConfig.limit.paymentBonus))])]),a("div",{staticClass:"w33 fl h40 bt bb br"},[a("span",{staticClass:"pl20"},[t._v("最低取款：")]),a("span",[t._v(t._s(t.siteInfo.siteConfig.limit.withdrawalsLimit))])]),a("div",{staticClass:"w33 fl h40 bl br bb"},[a("span",{staticClass:"pl20"},[t._v("彩票最低下注金额：")]),a("span",[t._v(t._s(t.siteInfo.siteConfig.limit.lotteryBetMin))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("彩票最高下注金额：")]),a("span",[t._v(t._s(t.siteInfo.siteConfig.limit.lotteryBetMax))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("取款打码倍数：")]),a("span",[t._v(t._s(t.siteInfo.siteConfig.limit.withdrawalsMultiple))])]),a("div",{staticClass:"w33 fl h40 bb br bl"},[a("span",{staticClass:"pl20"},[t._v("待出款免审核：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.limit.checkBetAmount)))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("PC活动图：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.activity_pic_size.pc)))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("移动端活动图：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.activity_pic_size.app)))])]),a("div",{staticClass:"w33 fl h40 bb br bl"},[a("span",{staticClass:"pl20"},[t._v("自动出款上限：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.limit.onlineForceAudit)))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("移动banner图：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.banner_pic_size.app)))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("PC端banner图：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.banner_pic_size.pc)))])]),a("div",{staticClass:"w33 fl h40 bb br bl"},[a("span",{staticClass:"pl20"},[t._v("APP域名：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.app_domain)))])]),a("div",{staticClass:"w33 fl h40 bb br"},[a("span",{staticClass:"pl20"},[t._v("网站维护状态配置：")]),a("span",[t._v(t._s("off"==t.siteInfo.siteConfig.close.status?"正常":"维护中"))])]),a("div",{staticClass:"w33 fl h40 br"},[a("span",{staticClass:"pl20"},[t._v("静态资源路径：")]),a("span",[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.statics)))])]),a("div",{staticClass:"w33 fl lh40 br bb bl"},[a("span",{staticClass:"pl20"},[t._v("PC注册填写项：")]),a("span",{staticClass:"h40 pl20",staticStyle:{display:"block"}},[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.register.pc.join(","))))])]),a("div",{staticClass:"w33 fl br lh40 bb"},[a("span",{staticClass:"pl20"},[t._v("H5注册填写项：")]),a("span",{staticClass:"h40 pl20",staticStyle:{display:"block"}},[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.register.h5.join(","))))])]),a("div",{staticClass:"w33 fl br lh40 bb bt"},[a("span",{staticClass:"pl20"},[t._v("APP注册填写项：")]),a("span",{staticClass:"h40 pl20",staticStyle:{display:"block"}},[t._v(t._s(this.$root.text(t.siteInfo.siteConfig.register.app.join(","))))])])]),a("div",{staticClass:"mt20"},[a("RebateSelect",{attrs:{data:t.siteInfo.rebate}})],1)])},n=[],s=a("2ca4"),i=a("8593"),u={name:"siteDetail",components:{RebateSelect:s["a"]},data:function(){return{siteInfo:{siteConfig:{limit:{},activity_pic_size:{},banner_pic_size:{},close:{},register:{pc:[],app:[],h5:[]},Android:{},IOS:{},service:{}}}}},mounted:function(){var t=this;this.$nextTick(function(){var e=t.$route.query.id;t.getData({id:e})})},methods:{getData:function(t){var e=this;Object(i["lb"])(t).then(function(t){e.siteInfo=t.data,e.siteInfo.siteConfig.activity_pic_size||(e.siteInfo.siteConfig.activity_pic_size={pc:"",app:""}),e.siteInfo.siteConfig.banner_pic_size||(e.siteInfo.siteConfig.banner_pic_size={pc:"",app:""})})}}},o=u,c=(a("2aa1"),a("2877")),l=Object(c["a"])(o,r,n,!1,null,"1d4334dc",null);e["default"]=l.exports},fac7:function(t,e,a){}}]);