(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba58042a"],{"1c31":function(t,s,a){"use strict";a.d(s,"l",function(){return e}),a.d(s,"m",function(){return n}),a.d(s,"g",function(){return r}),a.d(s,"i",function(){return o}),a.d(s,"j",function(){return l}),a.d(s,"e",function(){return p}),a.d(s,"f",function(){return c}),a.d(s,"h",function(){return m}),a.d(s,"k",function(){return b}),a.d(s,"b",function(){return u}),a.d(s,"c",function(){return d}),a.d(s,"d",function(){return f}),a.d(s,"a",function(){return v});var i=a("66df"),e=function(t){var s=t.params,a=t.query,e={url:"/platformReports",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},n=function(t){var s=t.params,a=t.query,e={url:"/platformReportsDetail",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},r=function(t){var s=t.params,a=t.query,e={url:"/firstDepositReports",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},o=function(t){var s=t.params,a=t.query,e={url:"/lotteryReports",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},l=function(t){var s=t.params,a=t.query,e={url:"/lotteryReportsDetail",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},p=function(t){var s=t.params,a=t.query,e={url:"/agencyReports",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},c=function(t){var s=t.params,a=t.query,e={url:"/memberReports",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},m=function(t){var s=t.params,a=t.query,e={url:"/gameRecordsDetail",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},b=function(t){var s={url:"/multipleReports",method:"post",data:t};return i["a"].request(s)},u=function(t){var s=t.params,a=t.query,e={url:"domainReports",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},d=function(t){var s=t.params,a=t.query,e={url:"domainReportsDetailByDomain",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},f=function(t){var s=t.params,a=t.query,e={url:"domainReportsDetailByUser",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)},v=function(t){var s=t.params,a=t.query,e={url:"dayReport",method:"post",data:s};return a&&(e.params=a),i["a"].request(e)}},2124:function(t,s,a){},"86cd":function(t,s,a){"use strict";var i=a("2124"),e=a.n(i);e.a},aa25:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"v2-search",staticStyle:{"margin-bottom":"20px"}},[a("Form",{ref:"searchKey",attrs:{inline:""}},[t._l(t.btns,function(s,i){return a("FormItem",{key:s},[a("Button",{staticClass:"btn80 bd",class:t.index==i?"bd-bg":"bg-or",on:{click:function(s){return t.changeDate(i)}}},[t._v(t._s(s))])],1)}),a("FormItem",{attrs:{label:"开始日期"}},[a("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"请选择开始日期",format:t.format1},model:{value:t.Time[0],callback:function(s){t.$set(t.Time,0,s)},expression:"Time[0]"}})],1),a("FormItem",{attrs:{label:"结束日期"}},[a("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"请选择结束日期",format:t.format2},on:{"on-change":t.tickendTime},model:{value:t.Time[1],callback:function(s){t.$set(t.Time,1,s)},expression:"Time[1]"}})],1),a("FormItem",{attrs:{label:"时区"}},[a("Select",{staticClass:"s-120",on:{"on-change":t.changtime},model:{value:t.searchKey.timeType,callback:function(s){t.$set(t.searchKey,"timeType",s)},expression:"searchKey.timeType"}},[a("Option",{attrs:{value:"cn"}},[t._v("北京时间")]),a("Option",{attrs:{value:"en"}},[t._v("美东时间")]),a("Option",{attrs:{value:"cw"}},[t._v("财务时间")])],1)],1),a("FormItem",[a("Button",{staticClass:"ivu-btn search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.searchSubmit}},[t._v("查询")])],1),a("FormItem",[a("div",[a("div",{staticClass:"clearfix"},[a("span",{staticClass:"fl"},[t._v("计算公式")]),a("Poptip",{staticClass:"ml5 fl",attrs:{trigger:"hover",placement:"bottom-end"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("div",{staticClass:"mb10"},[t._v("网站盈利=会员输赢+代理收入+优惠金额")]),a("div",[t._v("现金利润=存款金额-取款金额")]),a("div",{staticClass:"mb10"},[t._v("现金利率=现金利润/存款金额")]),a("div",[t._v("本月利润=本月存款金额-本月取款金额")]),a("div",{staticClass:"mb10"},[t._v("本月利率=本月利润/本月存款金额")]),a("div",[t._v("代理收入=代理返水+代理返点")]),a("div",[t._v("代理返水：下级给上级的返水差金额")]),a("div",{staticClass:"mb10"},[t._v("代理返点：只包含彩票（下级给上级的返点金额）")]),a("div",{staticClass:"mb10"},[t._v("拒绝金额：存款和取款的总拒绝金额")]),a("div",[t._v("首存金额：当天注册，当天充值")]),a("div",{staticClass:"mb10"},[t._v("总首存金额：历史注册，今天充值")]),a("div",[t._v("时区统计时间：")]),a("div",[t._v("北京时间：00:00:00~23:59:59")]),a("div",[t._v("美东时间：12:00:00~次日11:59:59")]),a("div",[t._v("财务时间：09:00:00~次日08:59:59")])]),a("Icons",{attrs:{type:"bangzhutishi",color:"#E4E4E4",size:26}})],1)],1)])])],2)],1),a("div",{staticStyle:{position:"relative"}},[a("Spin",{directives:[{name:"show",rawName:"v-show",value:t.spinShow,expression:"spinShow"}],attrs:{fix:""}}),a("ul",{staticClass:"top clearfix pt20 pb20 pl20",staticStyle:{"padding-left":"0px"}},[a("li",{staticClass:"fl w25"},[a("div",{staticClass:"circle bgBule fl"},[a("Icons",{staticClass:"ib hv",staticStyle:{color:"#fff",marginTop:"4px",marginLeft:"7px"},attrs:{type:"zonghebaobiaoyouxiaotouzhu",size:"21"}})],1),a("div",{staticClass:"fl ml10"},[a("span",{staticClass:"db"},[t._v("有效投注")]),a("span",{staticClass:"red-font ft14"},[t._v(t._s(t.betData.validBetAmount)+"/"+t._s(t.betData.betUserCount)+"人")])])]),a("li",{staticClass:"fl w25"},[a("div",{staticClass:"circle bgPurple fl"},[a("Icons",{staticClass:"ib hv",staticStyle:{color:"#fff",marginTop:"3px",marginLeft:"8px"},attrs:{type:"zonghebaobiaohuiyuanshuying",size:"23"}})],1),a("div",{staticClass:"fl ml10"},[a("span",{staticClass:"db"},[t._v("会员输赢")]),a("span",{staticClass:"red-font ft14"},[t._v(t._s(t.betData.netAmount))])])]),a("li",{staticClass:"fl w25"},[a("div",{staticClass:"circle bgOrange fl"},[a("Icons",{staticClass:"ib hv",staticStyle:{color:"#fff","margin-top":"4px","margin-left":"7px"},attrs:{type:"zonghebaobiaopingtaiyingli",size:"22"}})],1),a("div",{staticClass:"fl ml10"},[a("span",{staticClass:"db"},[t._v("网站盈利")]),a("span",{staticClass:"red-font ft14"},[t._v(t._s(t.otherData.webProfit))])])]),a("li",{staticClass:"fl w25"},[a("div",{staticClass:"circle bgGreen fl"},[a("Icons",{staticClass:"ib hv",staticStyle:{color:"#fff",marginLeft:"8px",marginTop:"4px"},attrs:{type:"zonghebaobiaopingtaiyingshuai",size:"23"}})],1),a("div",{staticClass:"fl ml10"},[a("span",{staticClass:"db"},[t._v("现金利润")]),a("span",{staticClass:"red-font ft14"},[t._v(t._s(t.otherData.moneyProfit))])])])]),a("div",{staticClass:"mt20 clearfix"},[a("div",{staticClass:"fl w30 b"},[a("div",{staticClass:"f6f8-bg bb clearfix"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("存款金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 red-font"},[a("span",{staticClass:"ib pl20"},[t._v(t._s(t.depositData.amount)+"/")]),a("span",[t._v(t._s(t.depositData.userCount)+"人/")]),a("span",[t._v(t._s(t.depositData.count)+"笔")])])]),a("ul",{staticClass:"middle-con"},[t.depositData.typeCount?a("ul",{staticClass:"middle-con"},t._l(t.depositData.typeCount,function(s,i){return a("li",{key:i,staticClass:"pt12 bb"},[a("span",{staticClass:"ib pl15 pb12 pl20"},[a("span",{key:i,staticClass:"ib box mr5",class:t.sstt[i]}),t._v("\n                "+t._s(s.depositClassName)+"\n              ")]),a("div",{staticClass:"fr mr20"},[a("span",{staticClass:"ib blue-font pl20"},[t._v(t._s(s.depositAmount)+"/")]),a("span",{staticClass:"blue-font"},[t._v(t._s(s.depositUserCount)+"人/")]),a("span",{staticClass:"blue-font"},[t._v(t._s(s.depositCount)+"笔")])])])}),0):t._e()]),a("div",{staticClass:"bb"},[t._m(0),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib blue-font pl20"},[t._v("\n              "+t._s(t.depositData.onlineUserCount)+"人/\n              "+t._s(t.depositData.onlineCount)+" 笔\n            ")])])]),a("div",[t._m(1),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib blue-font pl20"},[t._v("\n              "+t._s(t.depositData.offlineUserCount)+"人/\n              "+t._s(t.depositData.offlineCount)+"笔\n            ")])])]),a("div",{staticClass:"f6f8-bg bt"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("代理收入")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 red-font"},[a("span",{staticClass:"ib pl20"},[t._v(t._s(t.agencyIncome.amount)+"/")]),a("span",[t._v(t._s(t.agencyIncome.userCount)+"人")])])])]),a("div",{staticClass:"fl w30 b ml20"},[a("div",{staticClass:"f6f8-bg bb"},[a("span",{staticClass:"ib pt12 pb12 pl20 ft14"},[t._v("取款金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 red-font"},[a("span",{staticClass:"ib pl20"},[t._v(t._s(t.withdrawalData.amount)+"/")]),t._v("\n            "+t._s(t.withdrawalData.userCount)+"人/\n            "),a("span",[t._v(t._s(t.withdrawalData.count)+"笔")])])]),a("ul",{staticClass:"middle-con ft12"},[a("li",{staticClass:"bb"},[t._m(2),a("div",{staticClass:"fr pt12 pb12 blue-font ib mr20"},[a("span",{staticClass:"ib pl20"},[t._v(t._s(t.withdrawalData.systemAmount)+"/")]),t._v("\n              "+t._s(t.withdrawalData.systemUserCount)+"人\n              "),a("span",[t._v(t._s(t.withdrawalData.systemCount)+"笔")])])]),a("li",[t._m(3),a("div",{staticClass:"fr pt12 pb12 ib mr20 blue-font"},[a("span",{staticClass:"ib blue-font pl20"},[t._v(t._s(t.withdrawalData.adminAmount)+"/")]),t._v("\n              "+t._s(t.withdrawalData.adminUserCount)+"人\n              "),a("span",[t._v(t._s(t.withdrawalData.adminCount)+"笔")])])])]),a("div",{staticClass:"f6f8-bg bt bb"},[a("span",{staticClass:"ib pt12 pb12 pl20 ft14"},[t._v("优惠金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib red-font pl20"},[t._v(t._s(t.bonusData.amount)+"/")]),a("span",{staticClass:"red-font"},[t._v(t._s(t.bonusData.userCount)+"人")])])]),a("ul",{staticClass:"middle-con ft12"},[a("li",{staticClass:"bb"},[t._m(4),a("div",{staticClass:"fr pt12 pb12 ib mr20 blue-font"},[a("span",{staticClass:"ib pl20"},[t._v(t._s(t.bonusData.systemAmount)+"/")]),t._v("\n              "+t._s(t.bonusData.systemUserCount)+"人\n            ")])]),a("li",{staticClass:"bb"},[t._m(5),a("div",{staticClass:"fr pt12 pb12 ib mr20 blue-font"},[a("span",{staticClass:"ib blue-font pl20"},[t._v(t._s(t.bonusData.rebateAmount)+"/")]),t._v("\n              "+t._s(t.bonusData.rebateUserCount)+"人\n            ")])]),a("li",[t._m(6),a("div",{staticClass:"fr pt12 pb12 ib mr20 blue-font"},[a("span",{staticClass:"ib pl20"},[t._v(t._s(t.bonusData.adminAmount)+"/")]),t._v("\n              "+t._s(t.bonusData.adminUserCount)+"人\n            ")])])]),a("div",{staticClass:"bt f6f8-bg"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("在线人数")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 blue-font"},[a("span",{staticClass:"ib blue-font pl35"},[t._v(t._s(t.otherData.onlineUserCount)+"人")])])]),a("div",{staticClass:"bb bt"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("入款时间")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 red-font"},[a("span",{staticClass:"ib pl35"},[t._v(t._s(t.depositData.averageTime)+"秒")])])]),a("div",{staticClass:"f6f8-bg bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("取款时间")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 red-font"},[a("span",{staticClass:"ib pl35"},[t._v(t._s(t.withdrawalData.averageTime)+"秒")])])]),a("div",[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("拒绝金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20 red-font"},[a("span",{staticClass:"ib blue-font pl35"},[t._v(t._s(t.betData.cancelBetAmount)+"/")]),a("span",{staticClass:"blue-font"},[t._v(t._s(t.betData.cancelBetUserCount)+"人")])])]),a("div",{staticClass:"f6f8-bg"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("首存金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib blue-font pl35"},[t._v(t._s(t.otherData.firstDepositByRegAmount)+"/"+t._s(t.otherData.firstDepositByRegUserCount)+"人")])])]),a("div",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("总首存金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib blue-font pl20"},[t._v(t._s(t.otherData.firstDepositAmount)+"/"+t._s(t.otherData.firstDepositUserCount)+"人")])])])]),a("div",{staticClass:"fl w30 b ml20"},[a("ul",{staticClass:"right-con"},[a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("注单数量")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib pl20"},[t._v("\n                "+t._s(t.betData.betCount)+"/\n                "+t._s(t.betData.betUserCount)+"人\n              ")])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("撤单金额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib pl20"},[t._v("\n                "+t._s(t.betData.cancelBetAmount)+"/\n                "+t._s(t.betData.cancelBetUserCount)+"人\n              ")])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("会员余额")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"pl20"},[t._v(t._s(t.otherData.userBalanceAmount))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("本月输赢")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"pl20 red-font"},[t._v(t._s(t.totalMonth.netAmount))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("上月输赢")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"pl20 red-font"},[t._v(t._s(t.totalLastMonth.netAmount))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("本月盈利")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"red-font pl20"},[t._v(t._s(t.totalMonth.webProfit))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("上月盈利")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"red-font pl20"},[t._v(t._s(t.totalLastMonth.webProfit))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("本月利润")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"red-font pl20"},[t._v(t._s(t.totalMonth.moneyProfit))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("上月利润")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"red-font pl20"},[t._v(t._s(t.totalLastMonth.moneyProfit))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("本月利率")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"pl20"},[t._v(t._s(t.totalMonth.moneyProfitRate))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("上月利率")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"pl20"},[t._v(t._s(t.totalLastMonth.moneyProfitRate))])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("注册人数")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"ib red-font pl20"},[t._v(t._s(t.otherData.registerUserCount)+"人")])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("有效人数")]),a("div",{staticClass:"fr pt12 pb12 ib mr20"},[a("span",{staticClass:"red-font pl20"},[t._v(t._s(t.otherData.validUser)+"人")])])]),a("li",{staticClass:"bb"},[a("span",{staticClass:"ib pt12 pb12 pl20"},[t._v("当月有效")]),a("span",{staticClass:"red-font pl20"},[t._v(t._s(t.totalMonth.validUser))])])])])])],1)])},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss1 mr5"}),t._v("\n            在线支付笔数\n          ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss2 mr5"}),t._v("\n            公司入款笔数\n          ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss1 mr5"}),t._v("\n              线上取款\n            ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss2 mr5"}),t._v("\n              人工取款\n            ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss4 mr5"}),t._v("\n              活动派送\n            ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss1 mr5"}),t._v("\n              返水派送\n            ")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("span",{staticClass:"ib pt12 pb12 pl20"},[a("span",{staticClass:"ib box ss2 mr5"}),t._v("\n              人工派送\n            ")])}],n=a("768b"),r=a("cebc"),o=a("83ae"),l=a("1c31"),p={name:"complexReport",components:{Icons:o["a"]},data:function(){return{sstt:["ss1","ss2","ss3","ss4","ss1","ss2","ss3","ss4","ss1","ss2"],spinShow:!1,format1:"yyyy-MM-dd 00:00:00",format2:"yyyy-MM-dd 23:59:59",index:"",btns:["今天","昨天","本月","上月"],searchKey:{timeType:"cn",startTime:this.$root.startTime(),endTime:this.$root.formatnightTimeS()},Time:[this.$root.newstartTime(),new Date],otherData:{},depositData:[],agencyIncome:{},withdrawalData:[],bonusData:[{title:"活动派送",amount:"100000000.00",number:"1000"},{title:"返水派送",amount:"100000000.00",number:"1000"},{title:"人工派送",amount:"100000000.00",number:"1000",data:[{title:"活动",amount:"100000000.00",number:"100"},{title:"返水",amount:"100000000.00",number:"100"}]}],betData:{},totalMonth:{},totalLastMonth:{}}},created:function(){this.$root.nowSite.id;this.changeDate(0)},methods:{changeDate:function(t){this.index=t;var s,a,i=this.$moment;if(0==t)if("cn"==this.searchKey.timeType||"en"==this.searchKey.timeType)s=i().startOf("day").format("YYYY-MM-DD HH:mm:ss"),a=i().endOf("day").set("hours",23).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss");else{var e=(new Date).getHours();e>9?(s=i().startOf("day").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().day(i().day()+1).endOf("day").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss")):(s=i().day(i().day()-1).startOf("day").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().day(i().day()).endOf("day").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss"))}else if(1==t)if("cn"==this.searchKey.timeType||"en"==this.searchKey.timeType)s=i().day(i().day()-1).startOf("day").format("YYYY-MM-DD HH:mm:ss"),a=i().day(i().day()-1).endOf("day").format("YYYY-MM-DD HH:mm:ss");else{var n=(new Date).getHours();n>9?(s=i().day(i().day()-1).startOf("day").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().day(i().day()).startOf("day").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss")):(s=i().day(i().day()-2).startOf("day").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().day(i().day()-1).startOf("day").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss"))}else if(2==t)if("cn"==this.searchKey.timeType||"en"==this.searchKey.timeType)s=i().month(i().month()).startOf("month").format("YYYY-MM-DD HH:mm:ss"),a=i().endOf("day").format("YYYY-MM-DD HH:mm:ss");else{var r=(new Date).getHours();r>9?(s=i().month(i().month()).startOf("month").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().day(i().day()+1).endOf("day").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss")):(s=i().month(i().month()).startOf("month").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().endOf("day").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss"))}else 3==t&&("cn"==this.searchKey.timeType||"en"==this.searchKey.timeType?(s=i().month(i().month()-1).startOf("month").format("YYYY-MM-DD HH:mm:ss"),a=i().month(i().month()-1).endOf("month").format("YYYY-MM-DD HH:mm:ss")):(s=i().month(i().month()-1).startOf("month").set("hours",9).set("minutes",0).format("YYYY-MM-DD HH:mm:ss"),a=i().month(i().month()).startOf("month").set("hours",8).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss")));this.Time=[s,a],this.searchSubmit()},changtime:function(t){this.changeDate(0),"cw"==t?(this.format1="yyyy-MM-dd 09:00:00",this.format2="yyyy-MM-dd 08:59:59"):(this.format1="yyyy-MM-dd 00:00:00",this.format2="yyyy-MM-dd 23:59:59")},tickendTime:function(t){if("cw"==this.searchKey.timeType){this.format1="yyyy-MM-dd 09:00:00",this.format2="yyyy-MM-dd 08:59:59";var s=(new Date).getHours();this.Time[1]=s>9?this.$root.nextTime(t):this.$root.lastTime(t)}else this.format1="yyyy-MM-dd 00:00:00",this.format2="yyyy-MM-dd 23:59:59"},getData:function(t){var s=this;this.spinShow=!0,this.$root.startTableLoading(),Object(l["k"])(t).then(function(t){var a=t.data,i=a.agencyIncome,e=a.bet,n=a.bonus,r=a.deposit,o=a.firstDepositUserCount,l=a.firstDepositByRegUserCount,p=a.firstDepositByRegAmount,c=a.onlineUserCount,m=a.profit,b=a.profitRate,u=a.registerUserCount,d=a.totalLastMonth,f=a.totalMonth,v=a.userBalanceAmount,C=a.firstDepositAmount,h=a.withdrawals,_=a.moneyProfit,y=a.webProfit,D=a.validUser;for(var Y in s.otherData={moneyProfit:_,profit:m,profitRate:b,userBalanceAmount:v,onlineUserCount:c,firstDepositUserCount:o,firstDepositByRegUserCount:l,registerUserCount:u,firstDepositByRegAmount:p,firstDepositAmount:C,webProfit:y,validUser:D},s.depositData=r,console.log(s.depositData),s.depositData.typeCount);s.agencyIncome=i,s.withdrawalData=h,s.bonusData=n,s.betData=e,s.totalMonth=f,console.log(s.totalMonth),s.totalLastMonth=d,s.spinShow=!1})},searchSubmit:function(){var t=Object(r["a"])({},this.searchKey);if(t.siteId=this.$root.nowSite.id,!this.$root.validateTime(this.Time))return!1;var s=this.$root.validateTime(this.Time),a=Object(n["a"])(s,2),i=a[0],e=a[1];if("cn"==t.timeType||"en"==t.timeType)t.startTime=i&&this.$root.formatTimeS(i),t.endTime=e&&this.$root.formatnightTimeS(e);else{(new Date).getHours();t.startTime=this.$root.moneyTime(this.Time[0]),t.endTime=this.$root.lastTime(this.Time[1])}for(var o in t)t[o]||delete t[o];"cw"==t.timeType&&(t.timeType="cn"),this.getData(t)}}},c=p,m=(a("86cd"),a("2877")),b=Object(m["a"])(c,i,e,!1,null,"634b6fec",null);s["default"]=b.exports}}]);