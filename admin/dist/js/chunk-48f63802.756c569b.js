(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48f63802"],{"7b46":function(t,n,e){"use strict";var a=e("e072"),o=e.n(a);o.a},e072:function(t,n,e){},fa9a:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"mt10 mb20"},["super"==t.adminType||-1!=t.authInPage.indexOf("slideIns")?e("Button",{staticClass:"w130x oldColor",on:{click:t.addLunbo}},[t._v("新增轮播图")]):t._e()],1),e("div",{staticClass:"v2-table"},[e("Tables",{attrs:{page:!1,loading:t.$root.tableLoading,value:t.table.data,columns:t.table.columns},on:{"on-look":t.onLook,"on-delete":t.del}})],1)])},o=[],i=e("83ae"),l=e("fa69"),r=e("53fe"),c=e.n(r),s=e("8593"),d=e("cac8"),u=e("c276"),p={name:"lunboBanner",components:{Tables:l["a"],Icons:i["a"],ViewImg:d["a"]},data:function(){var t=this;this.$createElement;return{adminType:Object(u["l"])(),authInPage:JSON.parse(localStorage.authInPage),table:{loading:!0,columns:[{title:"排序",align:"center",render:function(t,n){return t(i["a"],{props:{type:"paixukongjian",color:"#dadada",size:20}})}},{title:"终端",key:"clientType",align:"center"},{title:"图片",key:"tupian",align:"center",minWidth:350,render:function(t,n){var e=n.row.body;return e=e&&JSON.parse(e),console.log(55),e.slice(0,10).map(function(n){return console.log(66),t(d["a"],{attrs:{imgSrc:n.img}})})}},{title:"操作",align:"center",render:function(n,e){return n("div",[n("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("slideUpt")?"inline-block":"none"},on:{click:function(){t.onLook(e)}}},["查看"]),n("a",{class:"ib mr10",style:{display:"super"==t.adminType||-1!=t.authInPage.indexOf("slideDel")?"inline-block":"none"},on:{click:function(){t.del(e)}}},["删除"])])}}],data:[]}}},watch:{"$root.nowSite.id":function(t,n){this.getData()}},created:function(){this.getData(),this.$nextTick(function(){var t=document.querySelector(".ivu-table-tbody");c.a.create(t,{})})},methods:{getData:function(){var t=this,n={siteId:this.$root.nowSite.id};Object(s["K"])(n).then(function(n){t.table.data=n.data.data,console.log(t.table.data)})},addLunbo:function(){this.$router.push({name:"lunboEdit",params:{page:"create"}})},onLook:function(t){var n=this.$root.nowSite.id,e=t.row.promotionId;this.$router.push({name:"lunboEdit",params:{page:"edit"},query:{siteId:n,promotionId:e}})},del:function(t){var n=this,e={promotionId:t.row.promotionId,siteId:this.$root.nowSite.id};this.$Tip.confirm({content:"你确定要删除吗？",onOk:function(){Object(s["D"])(e).then(function(e){n.table.data.splice(t.index,1)})}})}}},b=p,f=(e("7b46"),e("2877")),m=Object(f["a"])(b,a,o,!1,null,"6a5174b7",null);n["default"]=m.exports}}]);