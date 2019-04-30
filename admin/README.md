# 一修大师
![img](https://castle.womany.net/images/content/pictures/37314/content_womany_starfish_1447997688-16069-0715.jpg)
## TG-admin
  基于iview-admin [github](https://github.com/iview/iview-admin) `https://github.com/iview/iview-admin`
  - vue-cli3 
  - webapck4 
  - babel7
## 弹窗
 - 全局提示  
    1. `this.$Tip.[info|success|error|confirm]({title,content,callback})`

 - 内容弹窗  
    1. `this.$refs.Modals.show()`  
    2. `this.$refs.Modals.hide()`

## 样式
  - class  全局的class  
    1. 例如：`ml10:{margin-left:10px}`  
    2. 使用：`<div class="ml"></div>`

  - global 全局影响的css  
    1. `v2-search` 搜索栏  
    2. `v2-table` 列表表格  
    3. `v2-edit` 编辑页面  
    4. `v2-details` 详情页面  
    5. `v2-form-wrapper` 弹窗内容居中wrapper 

  - color 主题颜色

  - function css函数

  - button 归类Button样式的css  
    1. 定义class `<Button class="xxx"></Button>`
    2. 单页面引入`@import "../styles/button.less"`

  - scrollbar 滚动条样式
  ***  