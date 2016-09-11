<template>
  <div id="app">
    <img class="logo" src="/src/assets/logo.png">
    <hello></hello>
    <p>
      这是FIS3+Vue脚手架
    </p>
    <p>
      具体使用请阅读README.MD
    </p>
    <p>
      技术支持：
      <a href="https://github.com/vuejs/vue" target="_blank">vue</a>，
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a>，
      <a href="http://fis.baidu.com/fis3/docs/beginning/intro.html" target="_blank">fis3</a>
    </p>
  </div>
</template>

<script>
import Hello from '/src/components/Hello'

export default {
  components: {
    Hello
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>