# 开发说明

## 安装使用

```bash
#安装fis3
npm install -g fis3

#下载项目
git clone git@git.detu.com:qk/detu-fis3-component.git

#安装依赖
npm install

#编译预览&实时监听刷新
cd detu-fis3-component
npm run dev

```
#### 目录结构

开发目录结构如下所示

```
project
  ├─ node_modules   (npm上第三方资源)  
  ├─ common    (公共资源)
  │  ├─ components  (共用组件)
  │  │  └─ player
  │  ├─ lib     (存放不在npm上的第三方资源)
  │  │  ├─ mod.js
  │  ├─ css
  │  └─ img 
  ├─ desktop    (pc端目录)
  │  ├─ components  (组件)
  │  │  ├─ header
  │  │  └─ footer
  │  └─ views       (页面)
  │     ├─ article
  │     └─ home
  ├─ mobile    (移动端目录)
  │  ├─ components  (组件)
  │  │  ├─ header
  │  │  └─ footer
  │  └─ views       (页面)
  │     ├─ article
  │     └─ home
  ├─ directive  (指令)
  │  	└─ more
  ├─ filter     (过滤器)
  │  	└─ more
  ├─ fis-conf.js    (fis编译配置)
  ...
```
common、desktop、mobile的组件均统一放到各自的components文件夹内。desktop、mobile的页面代码（php、js、less、img等）统一放到views文件夹内。每个组件或者页面都拥有一个独立的文件夹，资源就近维护。如common/components/hello组件，那么组件的代码以及资源文件应该全部都在common/components/hello/目录内。

#### 模板内嵌

VueJS组件开发过程中可以通过`__inline`轻松将模板内容编译到js中，提升可维护性。

```javascript
#ES5写法
module.exports = Vue.component("c-list", {
    template: __inline('list.html')
})

#ES6写法 组件同名
export default {
	template: __inline('list.html'),
}
```

## 前端语法支持

```
	vue jsx utc(.tmpl) es6 less

```
注：utc编写继承了之前的<%==%>不进行html转码，<%=%>进行html转码。

## 开发组件举例

### common内公共组件

新加一个hello公共组件，采用vue方式


## 同名自动引入

在require一个组件或者js库时，如果存在同名的css或less那么编译将自动引入这个样式文件。同样为了目录结构的清晰和引入组件的便利性，假如存在组件/common/components/hello，那么调用组件只需要require('common/components/hello')。