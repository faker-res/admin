(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d739d16c"],{1184:function(t,e,r){"use strict";r.d(e,"z",function(){return n}),r.d(e,"B",function(){return o}),r.d(e,"L",function(){return s}),r.d(e,"w",function(){return d}),r.d(e,"G",function(){return u}),r.d(e,"u",function(){return i}),r.d(e,"y",function(){return c}),r.d(e,"t",function(){return l}),r.d(e,"H",function(){return f}),r.d(e,"I",function(){return m}),r.d(e,"J",function(){return p}),r.d(e,"K",function(){return v}),r.d(e,"s",function(){return h}),r.d(e,"x",function(){return y}),r.d(e,"v",function(){return b}),r.d(e,"C",function(){return M}),r.d(e,"D",function(){return q}),r.d(e,"E",function(){return L}),r.d(e,"p",function(){return _}),r.d(e,"q",function(){return x}),r.d(e,"r",function(){return w}),r.d(e,"A",function(){return S}),r.d(e,"F",function(){return g}),r.d(e,"a",function(){return C}),r.d(e,"f",function(){return I}),r.d(e,"h",function(){return N}),r.d(e,"l",function(){return D}),r.d(e,"b",function(){return O}),r.d(e,"c",function(){return k}),r.d(e,"d",function(){return B}),r.d(e,"e",function(){return T}),r.d(e,"g",function(){return U}),r.d(e,"i",function(){return $}),r.d(e,"m",function(){return E}),r.d(e,"n",function(){return A}),r.d(e,"o",function(){return j}),r.d(e,"k",function(){return F}),r.d(e,"j",function(){return P});var a=r("66df"),n=function(){var t={url:"lotteryNameList",method:"get"};return a["a"].request(t)},o=function(t){var e=t.siteId,r=t.lotteryId,n={url:"lotteryOddsSiteidLid/".concat(e,"/").concat(r),method:"get"};return a["a"].request(n)},s=function(t){var e=t.id,r=t.oddsInfo,n={id:e,oddsInfo:r},o={url:"lotteryUpdateOddsSiteidLid",method:"post",data:n};return a["a"].request(o)},d=function(t){var e={url:"lotteryLhcTimeList",method:"get",params:t};return a["a"].request(e)},u=function(t){var e=t.params,r=t.lid,n={url:"lotteryTimeList/".concat(r),method:"get",params:e};return a["a"].request(n)},i=function(t){var e={url:"lotteryLhcTimeAdd",method:"post",data:t};return a["a"].request(e)},c=function(t){var e={url:"lotteryLhcTimeUp",method:"post",data:t};return a["a"].request(e)},l=function(t){var e={url:"lotteryLhcAddNum",method:"post",data:t};return a["a"].request(e)},f=function(t){var e={url:"lotteryTimeOneUp",method:"post",data:t};return a["a"].request(e)},m=function(t){var e={url:"lotteryTimeUp",method:"post",data:t};return a["a"].request(e)},p=function(t){var e={url:"lotteryUpNum",method:"post",data:t};return a["a"].request(e)},v=function(t){var e={url:"lotteryUpNumFast",method:"post",data:t};return a["a"].request(e)},h=function(t){var e={url:"lotteryAgainPrizeFast",method:"post",data:t};return a["a"].request(e)},y=function(t){var e={url:"lotteryLhcTimeSetUp",method:"post",data:t};return a["a"].request(e)},b=function(t){var e={url:"lotteryLhcTimeDel",method:"post",data:t};return a["a"].request(e)},M=function(t){var e=t.params,r=t.query,n={url:"lotteryOpenNumberList",method:"post",data:e,query:r};return r&&(n.params=r),a["a"].request(n)},q=function(t){var e=t.params,r=t.query,n={url:"lotteryOpenNumberListFast",method:"post",data:e};return r&&(n.params=r),a["a"].request(n)},L=function(t){var e={url:"lotteryPayMoney",method:"post",data:t};return a["a"].request(e)},_=function(t){var e={url:"lotteryAddNum",method:"post",data:t};return a["a"].request(e)},x=function(t){var e={url:"lotteryAddNumFast",method:"post",data:t};return a["a"].request(e)},w=function(t){var e={url:"lotteryAgainPrize",method:"post",data:t};return a["a"].request(e)},S=function(t){var e={url:"lotteryNoNumLottery",method:"post",data:t};return a["a"].request(e)},g=function(t){var e={url:"lotteryRevocation",method:"post",data:t};return a["a"].request(e)},C=function(t){var e={url:"fastLottery",method:"post",data:t};return a["a"].request(e)},I=function(t){var e=t.params,r=t.query,n={url:"fastLotteryDetail",method:"post",data:e};return r&&(n.params=r),a["a"].request(n)},N=function(t){var e={url:"fastLotteryInit",method:"post",data:t};return a["a"].request(e)},D=function(t){var e={url:"fastLotteryUpdate",method:"post",data:t};return a["a"].request(e)},O=function(t){var e=t.params,r=t.query,n={url:"fastLotteryBlackList",method:"post",data:e};return r&&(n.params=r),a["a"].request(n)},k=function(t){var e={url:"fastLotteryBlackListAdd",method:"post",data:t};return a["a"].request(e)},B=function(t){var e={url:"fastLotteryBlackListDel",method:"post",data:t};return a["a"].request(e)},T=function(t){var e={url:"fastLotteryBySite",method:"post",data:t};return a["a"].request(e)},U=function(t){var e=t.params,r=t.query,n={url:"fastLotteryDetailBySite",method:"post",data:e};return r&&(n.params=r),a["a"].request(n)},$=function(t){var e={url:"fastLotteryInitBySite",method:"post",data:t};return a["a"].request(e)},E=function(t){var e={url:"fastLotteryUpdateBySite",method:"post",data:t};return a["a"].request(e)},A=function(t){var e={url:"fastLotteryUpdateOpen",method:"post",data:t};return a["a"].request(e)},j=function(t){var e={url:"fastLotteryUpdateOpenBySite",method:"post",data:t};return a["a"].request(e)},F=function(t){var e={url:"fastLotteryOpenInitBySite",method:"post",data:t};return a["a"].request(e)},P=function(t){var e={url:"fastLotteryOpenInit",method:"post",data:t};return a["a"].request(e)}},"234a":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"v2-search clearfix"},["super"==t.adminType||-1!=t.authInPage.indexOf("lotteryUpdateOddsSiteidLid")?r("div",{staticClass:"v2-button fl"},[r("Button",{directives:[{name:"show",rawName:"v-show",value:t.oddsStatus,expression:"oddsStatus"}],staticClass:"w120x",on:{click:t.btnShow}},[t._v("修改赔率")]),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.oddsStatus,expression:"!oddsStatus"}],staticClass:"ib"},[r("Button",{staticClass:"w120x",attrs:{loading:t.$root.editBtnLoading},on:{click:function(e){return t.save(1)}}},[t._v("确认保存")]),r("Button",{staticClass:"w120x",on:{click:function(e){return t.save(0)}}},[t._v("取消修改")])],1)],1):t._e(),r("div",{staticClass:"fl clearfix"},[r("span",{staticClass:"ib mr15"},[t._v("玩法")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.play,expression:"play"}],staticClass:"w160x",staticStyle:{height:"30px"},attrs:{placeholder:"请输入完整的玩法描述"},domProps:{value:t.play},on:{input:function(e){e.target.composing||(t.play=e.target.value)}}}),r("Button",{staticClass:"ivu-btn bg ib ml15",attrs:{type:"primary"},on:{click:t.toTegional}},[t._v("查询")])],1),r("div",{staticClass:"font-bold ft18 fr mr30"},[t._v("当前彩票："+t._s(t.oddData.lotteryName||""))])]),r("div",{staticClass:"v2-table"},[r("table",{staticClass:"bt ivu-table ivu-table-default ivu-table-border",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[t._m(0),t._l(t.oddData.oddsInfo,function(e,a){return r("tr",{key:"row"+a},[r("td",{staticClass:"ivu-table-column-center w15 bl",style:{color:t.play==e.title?"#2D8CF0":""},attrs:{id:e.title}},[t._v(t._s(e.title))]),r("td",{staticClass:"ivu-table-column-center w60",style:{color:t.play==e.title?"#2D8CF0":""}},[t._v(t._s(e.ball))]),r("td",{staticClass:"ivu-table-column-center w10"},[t.oddsStatus?r("span",[t._v(t._s(e._oddsMin))]):r("span",{staticClass:"ib clearfix"},["number"===typeof e.oddsMin?r("InputNumber",{attrs:{step:.01,min:0},model:{value:e.oddsMin,callback:function(r){t.$set(e,"oddsMin",r)},expression:"item.oddsMin"}}):r("span",[r("InputNumber",{staticClass:"ib w40",attrs:{step:.01,min:0},model:{value:e.oddsMin[0],callback:function(r){t.$set(e.oddsMin,0,r)},expression:"item.oddsMin[0]"}}),r("InputNumber",{staticClass:"ib w40",attrs:{step:.01,min:0},model:{value:e.oddsMin[1],callback:function(r){t.$set(e.oddsMin,1,r)},expression:"item.oddsMin[1]"}})],1)],1)]),r("td",{staticClass:"ivu-table-column-center w10"},[t.oddsStatus?r("span",[t._v(t._s(e._fsrate))]):r("InputNumber",{attrs:{step:.01,min:0},model:{value:e.fsrate,callback:function(r){t.$set(e,"fsrate",r)},expression:"item.fsrate"}})],1)])})],2)])])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("tr",[r("th",{staticClass:"ivu-table-column-center w15 bl"},[t._v("描述")]),r("th",{staticClass:"ivu-table-column-center w60"},[t._v("号码")]),r("th",{staticClass:"ivu-table-column-center w10"},[t._v("赔率")]),r("th",{staticClass:"ivu-table-column-center w10"},[t._v("返水")])])}],o=r("a745"),s=r.n(o),d=r("f499"),u=r.n(d),i=(r("c5f6"),r("28a5"),r("6762"),r("2fdb"),r("ac6a"),r("1184")),c=r("c276"),l={data:function(){return{adminType:Object(c["l"])(),authInPage:JSON.parse(localStorage.authInPage),play:"",oddData:{},formKey:{lotteryId:this.$route.query.lotteryId,siteId:this.$root.nowSite.id},isTitle:!1,oddsStatus:!0}},created:function(){this.getData(this.formKey)},methods:{btnShow:function(){this.oddsStatus=!1,this.transform()},transform:function(){var t=this.oddData.oddsInfo;this.oddsStatus?t.forEach(function(t){t.oddsMin=t._oddsMin,t.oddsMax=t._oddsMax}):t.forEach(function(t){"string"===typeof t.oddsMin&&t.oddsMin.includes("/")&&(t.oddsMin=t.oddsMin.split("/"),t.oddsMin=t.oddsMin.map(Number),t.oddsMax=t.oddsMax.split("/"),t.oddsMax=t.oddsMax.map(Number))})},getData:function(t){var e=this;this.$root.startTableLoading(),Object(i["B"])(t).then(function(t){t.data.oddsInfo.forEach(function(t){t._oddsMin=t.oddsMin,t._oddsMax=t.oddsMax,t._fsrate=t.fsrate,t.oddsMin=t.oddsMin+"",t.oddsMin.includes("/")||(t.oddsMin=+t.oddsMin,t.oddsMax=+t.oddsMax,t._oddsMin=+t.oddsMin,t._oddsMax=+t.oddsMax),t.fsrate=+t.fsrate}),e.oddData=t.data})},toTegional:function(){document.querySelector("#".concat(this.play)).scrollIntoView(!0)},save:function(t){var e=this;if(1==t){var r=this.oddData.oddsInfo,a=JSON.parse(u()(r));a.forEach(function(t){s()(t.oddsMin)&&(t.oddsMin=t.oddsMin.join("/"),t.oddsMax=t.oddsMax.join("/")),delete t._oddsMin,delete t._oddsMax,delete t._fsrate}),a.forEach(function(t){t.oddsMax=t.oddsMin});var n={id:this.oddData.id,oddsInfo:u()(a)};this.$root.startEditLoading(),Object(i["L"])(n).then(function(t){200==t.code&&(e.oddsStatus=!0,e.getData(e.formKey))})}else this.oddsStatus=!0,this.transform()}}},f=l,m=(r("db92"),r("2877")),p=Object(m["a"])(f,a,n,!1,null,"57121229",null);e["default"]=p.exports},5570:function(t,e,r){},db92:function(t,e,r){"use strict";var a=r("5570"),n=r.n(a);n.a}}]);