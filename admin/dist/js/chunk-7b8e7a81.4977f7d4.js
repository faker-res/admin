(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b8e7a81"],{"1c31":function(t,e,a){"use strict";a.d(e,"l",function(){return o}),a.d(e,"m",function(){return n}),a.d(e,"g",function(){return i}),a.d(e,"i",function(){return s}),a.d(e,"j",function(){return m}),a.d(e,"e",function(){return u}),a.d(e,"f",function(){return c}),a.d(e,"h",function(){return l}),a.d(e,"k",function(){return h}),a.d(e,"b",function(){return d}),a.d(e,"c",function(){return p}),a.d(e,"d",function(){return f}),a.d(e,"a",function(){return y});var r=a("66df"),o=function(t){var e=t.params,a=t.query,o={url:"/platformReports",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},n=function(t){var e=t.params,a=t.query,o={url:"/platformReportsDetail",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},i=function(t){var e=t.params,a=t.query,o={url:"/firstDepositReports",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},s=function(t){var e=t.params,a=t.query,o={url:"/lotteryReports",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},m=function(t){var e=t.params,a=t.query,o={url:"/lotteryReportsDetail",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},u=function(t){var e=t.params,a=t.query,o={url:"/agencyReports",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},c=function(t){var e=t.params,a=t.query,o={url:"/memberReports",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},l=function(t){var e=t.params,a=t.query,o={url:"/gameRecordsDetail",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},h=function(t){var e={url:"/multipleReports",method:"post",data:t};return r["a"].request(e)},d=function(t){var e=t.params,a=t.query,o={url:"domainReports",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},p=function(t){var e=t.params,a=t.query,o={url:"domainReportsDetailByDomain",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},f=function(t){var e=t.params,a=t.query,o={url:"domainReportsDetailByUser",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)},y=function(t){var e=t.params,a=t.query,o={url:"dayReport",method:"post",data:e};return a&&(o.params=a),r["a"].request(o)}},"1d76":function(t,e,a){},"2d2e":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"v2-search"},[a("Form",{ref:"searchKey",attrs:{inline:""}},[a("FormItem",{attrs:{label:"彩票分类"}},[a("LotterySelect",{ref:"LotterySelect",staticClass:"s-140",on:{"on-lottery-change":t.onLotteryChange}})],1),a("FormItem",{attrs:{label:"时区"}},[a("Select",{staticClass:"s-140",model:{value:t.searchKey.timeType,callback:function(e){t.$set(t.searchKey,"timeType",e)},expression:"searchKey.timeType"}},[a("Option",{attrs:{value:"cn"}},[t._v("北京时间")]),a("Option",{attrs:{value:"en"}},[t._v("美东时间")])],1)],1),a("FormItem",{attrs:{label:"开始时间"}},[a("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"开始时间"},model:{value:t.Time[0],callback:function(e){t.$set(t.Time,0,e)},expression:"Time[0]"}})],1),a("FormItem",{attrs:{label:"结束时间"}},[a("DatePicker",{staticClass:"s-180",attrs:{type:"datetime",placeholder:"结束时间",format:"yyyy-MM-dd 23:59:59"},model:{value:t.Time[1],callback:function(e){t.$set(t.Time,1,e)},expression:"Time[1]"}})],1),a("FormItem",{attrs:{label:"会员账号"}},[a("Input",{staticClass:"s-140",attrs:{placeholder:"请输入会员账号"},model:{value:t.searchKey.userName,callback:function(e){t.$set(t.searchKey,"userName",e)},expression:"searchKey.userName"}})],1),a("FormItem",[a("Button",{staticClass:"search",attrs:{type:"primary",loading:t.$root.searchBtnLoading},on:{click:t.searchSubmit}},[t._v("查询")])],1),a("FormItem",[a("Button",{staticClass:"ivu-btn export",attrs:{type:"primary",loading:t.$root.exportBtnLoading},on:{click:t.exportExcel}},[t._v("导出EXCEL")])],1)],1)],1),a("div",{staticClass:"v2-table"},[a("Tables",{ref:"table",attrs:{loading:t.$root.tableLoading,columns:t.table.columns,value:t.table.data,total:t.table.total,pageSizeOpts:t.table.pageSizeOpts},on:{"on-page-change":t.onPageChange,"on-page-size-change":t.onPageSizeChange,"on-sort-change":t.sortChange}})],1)])},o=[],n=a("cebc"),i=(a("c5f6"),a("d656")),s=a.n(i),m=a("768b"),u=a("fa69"),c=a("3445"),l=a("fab6"),h=a("1c31"),d={name:"lotteryReport",mixins:[l["a"]],components:{Tables:u["a"],LotterySelect:c["a"]},data:function(){var t=this;this.$createElement;return{searchKey:{timeType:"cn",startTime:this.$root.startTime(),endTime:this.$root.formatnightTimeS()},Time:[this.$root.newstartTime(),this.$root.formatnightTimeS()],table:{total:10,loading:!0,pageSizeOpts:[20,30,40,50],data:[],columns:[{title:"彩票名称",key:"gameName",align:"center",render:function(e,a){var r=a.row,o=r.gameName;r.platform;return e("span",{class:{"blue-font":"总计"!==o},on:{click:function(){t.goDetailPage(a)}}},[a.row.gameName])}},{title:"投注人数",key:"betUser",align:"center"},{title:"注单数量",key:"betCount",align:"center"},{title:"投注金额",key:"betAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.betAmount)])}},{title:"有效投注",key:"validBetAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.validBetAmount)])}},{title:"中奖金额",key:"winAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.winAmount)])}},{title:"撤单金额",key:"cancelBetAmount",align:"center",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.cancelBetAmount)])}},{title:"返点金额",key:"rebatePointsAmount",align:"center",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.rebatePointsAmount)])}},{title:"平台输赢",key:"netAmount",align:"center",sortable:"custom",render:function(e,a){return e("span",[t.$root.keepTwo(a.row.netAmount)])}},{title:"盈利",key:"winRate",align:"center",sortable:"custom",render:function(t,e){return t("span",["".concat(e.row.winRate,"%")])}}]}}},created:function(){var t=this;this.$nextTick(function(){t.$refs.LotterySelect.init()})},methods:{goDetailPage:function(t){console.log(t.row);var e=t.row.platform,a=this.searchKey.timeType,r=Object(m["a"])(this.Time,2),o=r[0],n=r[1];o=this.$root.formatTimeS(o),n=this.$root.formatnightTimeS(n),console.log(o,n),this.$router.push({name:"lotteryReportDetail",query:{platform:e,startTime:o,endTime:n,timeType:a}})},checkAll:function(t){return"ALL"===t&&s()(this.searchKey,"type")},onLotteryChange:function(t){this.checkAll(t.code)||(this.searchKey.type=t.code)},getData:function(t){var e=this,a=t.params;for(var r in a)a[r]||delete a[r];this.$root.startTableLoading(),t.params.isLike&&(t.params.isLike=Number(t.params.isLike)),Object(h["i"])(t).then(function(t){var a=t.data.data,r=a.list,o=a.total;r.length&&r.push(e.createTotalData(o)),e.table.data=r,e.table.total=t.data.total,console.log(e.table.total)})},createTotalData:function(t){var e=t.betUser,a=t.betCount,r=t.betAmount,o=t.validBetAmount,n=t.winAmount,i=t.cancelBetAmount,s=t.rebatePointsAmount,m=t.netAmount,u=t.winRate,c={gameName:"总计",betUser:e,betCount:a,betAmount:r,validBetAmount:o,winAmount:n,cancelBetAmount:i,rebatePointsAmount:s,netAmount:m,winRate:u};return c},searchSubmit:function(){this.$refs.table.setPage();var t=Object(n["a"])({},this.searchKey);if(t.siteId=this.nowSite.id,!this.$root.validateTime(this.Time))return!1;var e=this.$root.validateTime(this.Time),a=Object(m["a"])(e,2),r=a[0],o=a[1];t.startTime=r&&this.$root.formatTimeS(r),t.endTime=o&&this.$root.formatnightTimeS(o);var i=t.startTime,s=t.endTime;if(this.searchKey.startTime=i,this.searchKey.endTime=s,t.userName&&t.userName.length<5)return this.$Tip.info({content:"会员账号最小5个字符！"}),!1;for(var u in t.userName||delete t.isLike,t)t[u]||delete t[u];this.getData({params:t})}}},p=d,f=(a("3658"),a("2877")),y=Object(f["a"])(p,r,o,!1,null,"38ac66ca",null);e["default"]=y.exports},3658:function(t,e,a){"use strict";var r=a("1d76"),o=a.n(r);o.a},a465:function(t,e,a){var r=a("63b6"),o=a("bf0b").f,n=a("e4ae");r(r.S,"Reflect",{deleteProperty:function(t,e){var a=o(n(t),e);return!(a&&!a.configurable)&&delete t[e]}})},b5b1:function(t,e,a){a("a465"),t.exports=a("584a").Reflect.deleteProperty},d656:function(t,e,a){t.exports=a("b5b1")},fab6:function(t,e,a){"use strict";var r=a("cebc"),o=a("2f62"),n={data:function(){return{Time:[],searchKey:{},page:1,sortParams:{}}},computed:Object(r["a"])({},Object(o["d"])({nowSite:function(t){return t.user.nowSite}})),watch:{},filters:{},mounted:function(){var t={siteId:this.$root.nowSite.id};this.getData({params:Object(r["a"])({},this.searchKey,t)})},methods:{onPageChange:function(t){var e=Object(r["a"])({},this.searchKey,{siteId:this.nowSite.id});for(var a in e)e[a]||delete e[a];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),this.page=t,e=Object(r["a"])({},e,this.sortParams),this.getData({params:e,query:{page:t}})},onPageSizeChange:function(t){this.searchKey.limit=t;var e=Object(r["a"])({},this.searchKey,{siteId:this.nowSite.id,limit:t});for(var a in e)e[a]||delete e[a];delete e.startTime,delete e.endTime,"Invalid date"!==this.$root.formatTimeS(this.Time[0])&&(e.startTime=this.$root.formatTimeS(this.Time[0]),e.endTime=this.$root.formatnightTimeS(this.Time[1])),console.log(e),this.getData({params:e})},sortChange:function(t){t.column;var e=t.key,a=t.order,o={sortKey:e,sortVal:a,siteId:this.$root.nowSite.id};this.searchKey.startTime=this.$root.formatTimeS(this.Time[0]),this.searchKey.endTime=this.$root.formatnightTimeS(this.Time[1]),"normal"===o.sortVal&&(delete o.sortKey,delete o.sortVal),this.sortParams={},this.sortParams=Object(r["a"])({},o),1!==this.page?this.getData({params:Object(r["a"])({},this.searchKey,o),query:{page:this.page}}):this.getData({params:Object(r["a"])({},this.searchKey,o)})},exportExcel:function(){this.$root.exportBtnLoading=!0,this.$root.exportBtnLoading=!1}}};e["a"]=n}}]);