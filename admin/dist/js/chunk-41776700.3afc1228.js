(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41776700"],{"134a":function(t,a,s){},2346:function(t,a,s){"use strict";var e=s("6957"),n=s.n(e);n.a},"5c64":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("collapse",{attrs:{simple:"",value:"1"}},[s("panel",{attrs:{name:"1","hide-arrow":!0}},[s("div",{staticClass:"title",on:{click:function(a){t.open=!t.open}}},[t._v("\n      返水设置\n      "),s("Icon",{directives:[{name:"show",rawName:"v-show",value:!t.open,expression:"!open"}],attrs:{type:"ios-arrow-down",size:"18",color:"#999"}}),s("Icon",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],attrs:{type:"ios-arrow-forward",size:"18",color:"#999"}})],1),s("div",{staticClass:"section p15",attrs:{slot:"content"},slot:"content"},[s("div",{staticClass:"btns"},t._l(t._data_,function(a,e){return s("Button",{key:a.name,staticClass:"lottery mr20",class:t.showKey==e?"bd-bg":"bg-or",on:{click:function(a){return t.onselectMenu(e)}}},[t._v(t._s(a.name))])}),1),t._data_[t.showKey]?s("div",{staticClass:"clearfix info pt10"},t._l(t._data_[t.showKey].list,function(a){return s("div",{key:a.name_en,staticClass:"clearfix w20 h40 fl"},[s("div",{staticClass:"label fl"},[t._v(t._s(a.name_cn)+"：")]),t.$route.params.page?s("div",{staticClass:"fl"},[s("InputNumber",{staticClass:"w60xh36",attrs:{step:.1,max:a.parent_refund,min:0},on:{"on-change":t.onChange},model:{value:a.refund,callback:function(s){t.$set(a,"refund",s)},expression:"sub.refund"}}),t.showParent?s("span",{staticClass:"tip"},[s("span",{staticClass:"mr5"},[t._v("上限")]),t._v("\n              "+t._s(a.parent_refund.toFixed(2)||"-")+"\n            ")]):t._e()],1):s("div",[t._v(t._s(a.refund))])])}),0):t._e()])])],1)},n=[],i=s("f499"),c=s.n(i),r=(s("ac6a"),s("cebc")),o=s("83ae"),l=(s("c276"),{components:{Icons:o["a"]},props:{data:{type:[Object,Array],required:!0,default:function(){}},showParent:{type:Boolean,required:!1,default:!1}},data:function(){return{open:!1,showKey:"live"}},computed:{_data_:function(){var t=Object(r["a"])({},this.data);for(var a in t)t[a].list.forEach(function(t){t.refund=+t.refund,t.parent_refund=+t.parent_refund});return t}},methods:{onselectMenu:function(t){this.showKey=t},onChange:function(t){this.createData()},createData:function(){var t={};for(var a in this._data_)this._data_[a].list.forEach(function(a){t[a.name_en]=a.refund});return this.$emit("on-refund-change",c()(t)),c()(t)}}}),u=l,d=(s("6e9d"),s("2877")),f=Object(d["a"])(u,e,n,!1,null,"deef8c56",null),v=f.exports;a["a"]=v},6957:function(t,a,s){},"6e9d":function(t,a,s){"use strict";var e=s("134a"),n=s.n(e);n.a},a456:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"v2-details"},[s("div",{staticClass:"items mt15"},[s("div",{staticClass:"title"},[t._v("基础信息")]),s("div",{staticClass:"section br flex-row"},[s("div",{staticClass:"row ti20 w25 btl w20"},[s("div",{staticClass:"col bb"},[t._v("等级名称:"+t._s(t.basic.levelName))]),s("div",{staticClass:"col"},[t._v("默认等级：是")])]),s("div",{staticClass:"row ti20 w25 btl w20"},[s("div",{staticClass:"col bb"},[t._v("等级别称："+t._s(t.basic.levelAlias))]),s("div",{staticClass:"col"})]),s("div",{staticClass:"row ti20 w25 btl w20"},[s("div",{staticClass:"col bb"},[t._v("最低下注："+t._s(t.basic.lessBetAmount))])]),s("div",{staticClass:"row ti20 w25 btl w20"},[s("div",{staticClass:"col bb"},[t._v("最大返水："+t._s(t.basic.maxBonusAmonut))])])]),s("div",{staticClass:"remarks ti20 b"},[t._v("备注："+t._s(t.basic.remark))])]),s("div",{staticClass:"items mt15"},[s("RefundSelect",{attrs:{data:t.refund}})],1)])},n=[],i=s("83ae"),c=s("8194"),r=s("5c64"),o={components:{Icons:i["a"],RefundSelect:r["a"]},data:function(){return{basic:[],refund:[]}},created:function(){this.getData()},methods:{getData:function(){var t=this,a=this.$route.query;Object(c["k"])(a).then(function(a){var s=a.data,e=s.basic,n=s.refund;t.basic=e,t.refund=n})}}},l=o,u=(s("2346"),s("2877")),d=Object(u["a"])(l,e,n,!1,null,"1b261c92",null);a["default"]=d.exports}}]);