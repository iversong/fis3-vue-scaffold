## 安装使用

```bash
#安装fis3
npm install -g fis3

#下载项目
git clone https://github.com/iversong/fis3-vue-scaffold.git

#安装依赖
npm install

#编译预览&实时监听刷新浏览器
cd fis3-vue-scaffold
npm run dev

```

## 目录结构

```
project
  ├─ node_modules   (npm上第三方资源)  
  ├─ common    (公共资源)
  │  ├─ components  (共用组件)
  │  │  └─ player
  │  ├─ lib     (存放不在npm上的第三方资源)
  │  │  └─ mod.js
  ├─ src    (业务逻辑主目录)
  │  ├─ components  (组件)
  │  │  ├─ header
  │  │  └─ footer
  │  ├─ views       (页面)
  │  │  ├─ article
  │  │  └─ home
  │  ├─ router      (路由)
  │  │  └─ router.js
  │  ├─ store       (状态管理vuex)
  │  │  └─ store.js
  │  ├─ filter     (过滤器)
  │   └─ filter.js
  ├─ fis-conf.js    (fis编译配置)
  ├─ map.json       (静态资源表，可选)
  ...
```
建议每个组件或者页面都拥有一个独立的文件夹，资源就近维护。如src/components/hello组件，那么组件的代码以及静态资源文件应该全部都在common/components/hello/目录内。
```javascript
#例子
components
    ├─ hello
        ├─ hello.vue
        └─ img
            └─ a.jpg
```

## 单文件组件

使用Vue.js官方推荐的单文件组件方式，每个组件在同一地方封装它的 CSS 样式，模板和 JavaScript 定义；在FIS3中使用[fis3-parser-vue-component](https://github.com/ccqgithub/fis3-parser-vue-component)构建单文件Vue组件。

## 命名规范

文件、目录、组件名称、页面名称等均采用起始为小写，多个单词使用驼峰法命名。


## 同名自动引入

在require一个Vue组件或者js库时，只需引入同名目录，假如存在组件/src/components/hello/hello.vue，那么调用组件只需要require('/src/components/hello')。

## 异步加载js

mod方式有提供异步加载js的功能，其书写方式有require.async('moudle')和require(['module'])这两种。为了更加方便与区分理解，异步加载我们统一使用require.async的方式。

## mock假数据模拟，包括ajax模拟数据

  这里使用fis官方推荐的方式，[Mock假数据模拟](http://fis.baidu.com/fis3/docs/node-mock.html)。

  * 所有json数据都放在mock目录下，对应服务端目录，数据文件以.json后缀

  * 使用方式依然是之前的方式 this.$http.post('/ajax/user/get_userinfo'), /ajax/user/get_userinfo会自动去匹配 /mock/user/get_userinfo.json